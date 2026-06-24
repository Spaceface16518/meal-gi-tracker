import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  type FieldValue,
  type DocumentData,
  type FirestoreError,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase";
import type { CorrelationAnalysis, GiEvent, Meal } from "@/lib/types";

type SubscriptionErrorHandler = (error: FirestoreError) => void;

function asDate(value: unknown) {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  return new Date();
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
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
    reanalyzedAt: data.reanalyzedAt ? asDate(data.reanalyzedAt) : undefined,
  };
}

function eventFromDoc(snapshot: QueryDocumentSnapshot<DocumentData>): GiEvent {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    uid: data.uid,
    occurredAt: asDate(data.occurredAt),
    severity: data.severity ?? 1,
    symptoms: asStringArray(data.symptoms),
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
    findings: Array.isArray(data.findings) ? data.findings : [],
    dataQualityNotes: asStringArray(data.dataQualityNotes),
  };
}

export async function ensureUserProfile(user: User) {
  const profileRef = doc(db, "users", user.uid);
  const profile = await getDoc(profileRef);
  const existingCreatedAt = profile.exists() ? profile.data().createdAt : null;

  await setDoc(profileRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    updatedAt: serverTimestamp(),
    createdAt: existingCreatedAt instanceof Timestamp ? existingCreatedAt : serverTimestamp(),
  });
}

export async function deleteMeal(uid: string, mealId: string) {
  await deleteDoc(doc(db, "users", uid, "meals", mealId));
}

export async function deleteGiEvent(uid: string, eventId: string) {
  await deleteDoc(doc(db, "users", uid, "events", eventId));
}

export async function updateMeal(
  uid: string,
  mealId: string,
  meal: Pick<Meal, "rawInput" | "interpretedText" | "eatenAt" | "notes" | "analysis">,
) {
  await updateDoc(doc(db, "users", uid, "meals", mealId), {
    rawInput: meal.rawInput,
    interpretedText: meal.interpretedText,
    eatenAt: Timestamp.fromDate(meal.eatenAt),
    notes: meal.notes ?? deleteField(),
    analysis: meal.analysis,
    updatedAt: serverTimestamp(),
  });
}

export async function updateGiEvent(
  uid: string,
  eventId: string,
  event: Pick<GiEvent, "occurredAt" | "severity" | "symptoms" | "notes" | "stoolType" | "durationMinutes">,
) {
  const payload: Record<string, string | number | string[] | Timestamp | FieldValue> = {
    occurredAt: Timestamp.fromDate(event.occurredAt),
    severity: event.severity,
    symptoms: event.symptoms,
    notes: event.notes ?? deleteField(),
  };

  payload.stoolType = event.stoolType ?? deleteField();
  payload.durationMinutes = event.durationMinutes ?? deleteField();

  await updateDoc(doc(db, "users", uid, "events", eventId), payload);
}

export async function getAllMeals(uid: string) {
  const mealsQuery = query(collection(db, "users", uid, "meals"), orderBy("eatenAt", "desc"));
  const snapshot = await getDocs(mealsQuery);
  return snapshot.docs.map(mealFromDoc);
}

export async function getAllGiEvents(uid: string) {
  const eventsQuery = query(collection(db, "users", uid, "events"), orderBy("occurredAt", "desc"));
  const snapshot = await getDocs(eventsQuery);
  return snapshot.docs.map(eventFromDoc);
}

export function subscribeMeals(
  uid: string,
  onMeals: (meals: Meal[]) => void,
  onError: SubscriptionErrorHandler,
) {
  const mealsQuery = query(
    collection(db, "users", uid, "meals"),
    orderBy("eatenAt", "desc"),
    limit(25),
  );

  return onSnapshot(mealsQuery, (snapshot) => onMeals(snapshot.docs.map(mealFromDoc)), onError);
}

export function subscribeGiEvents(
  uid: string,
  onEvents: (events: GiEvent[]) => void,
  onError: SubscriptionErrorHandler,
) {
  const eventsQuery = query(
    collection(db, "users", uid, "events"),
    orderBy("occurredAt", "desc"),
    limit(25),
  );

  return onSnapshot(eventsQuery, (snapshot) => onEvents(snapshot.docs.map(eventFromDoc)), onError);
}

export function subscribeCurrentAnalysis(
  uid: string,
  onAnalysis: (analysis: CorrelationAnalysis | null) => void,
  onError: SubscriptionErrorHandler,
) {
  return onSnapshot(
    doc(db, "users", uid, "analyses", "current"),
    (snapshot) => onAnalysis(snapshot.exists() ? analysisFromDoc(snapshot) : null),
    onError,
  );
}
