"use client";

import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase";
import type { CorrelationAnalysis, GiEvent, Meal } from "@/lib/types";

function asDate(value: unknown) {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") return new Date(value);
  return new Date();
}

function mealFromDoc(snapshot: QueryDocumentSnapshot<DocumentData>): Meal {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    uid: data.uid,
    inputMode: data.inputMode,
    rawInput: data.rawInput ?? "",
    interpretedText: data.interpretedText ?? "",
    eatenAt: asDate(data.eatenAt),
    notes: data.notes,
    status: data.status ?? "needs_review",
    analysis: data.analysis ?? {
      mealName: "Meal",
      foods: [],
      irritants: [],
      summary: "",
    },
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

function eventFromDoc(snapshot: QueryDocumentSnapshot<DocumentData>): GiEvent {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    uid: data.uid,
    occurredAt: asDate(data.occurredAt),
    severity: data.severity ?? 1,
    symptoms: data.symptoms ?? [],
    notes: data.notes,
    stoolType: data.stoolType,
    durationMinutes: data.durationMinutes,
    createdAt: asDate(data.createdAt),
  };
}

function analysisFromDoc(snapshot: QueryDocumentSnapshot<DocumentData>): CorrelationAnalysis {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    uid: data.uid,
    status: data.status ?? "insufficient_data",
    generatedAt: asDate(data.generatedAt),
    mealCount: data.mealCount ?? 0,
    eventCount: data.eventCount ?? 0,
    summary: data.summary ?? "No analysis has been generated yet.",
    findings: data.findings ?? [],
    dataQualityNotes: data.dataQualityNotes ?? [],
  };
}

export async function ensureUserProfile(user: User) {
  const profileRef = doc(db, "users", user.uid);
  const profile = await getDoc(profileRef);

  if (profile.exists()) {
    await updateDoc(profileRef, {
      email: user.email,
      displayName: user.displayName,
      updatedAt: serverTimestamp(),
    });
    return;
  }

  await setDoc(profileRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
}

export function subscribeMeals(uid: string, onMeals: (meals: Meal[]) => void) {
  const mealsQuery = query(
    collection(db, "users", uid, "meals"),
    orderBy("eatenAt", "desc"),
    limit(25),
  );

  return onSnapshot(mealsQuery, (snapshot) => {
    onMeals(snapshot.docs.map(mealFromDoc));
  });
}

export function subscribeGiEvents(uid: string, onEvents: (events: GiEvent[]) => void) {
  const eventsQuery = query(
    collection(db, "users", uid, "events"),
    orderBy("occurredAt", "desc"),
    limit(25),
  );

  return onSnapshot(eventsQuery, (snapshot) => {
    onEvents(snapshot.docs.map(eventFromDoc));
  });
}

export function subscribeCurrentAnalysis(
  uid: string,
  onAnalysis: (analysis: CorrelationAnalysis | null) => void,
) {
  return onSnapshot(doc(db, "users", uid, "analyses", "current"), (snapshot) => {
    onAnalysis(snapshot.exists() ? analysisFromDoc(snapshot) : null);
  });
}
