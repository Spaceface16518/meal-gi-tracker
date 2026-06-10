"use client";

import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import type {
  CorrelationAnalysis,
  CreateGiEventPayload,
  CreateMealPayload,
  GiEvent,
  Meal,
} from "@/lib/types";

const createMealFn = httpsCallable<CreateMealPayload, { meal: Meal }>(
  functions,
  "createMeal",
);

const createGiEventFn = httpsCallable<CreateGiEventPayload, { event: GiEvent }>(
  functions,
  "createGiEvent",
);

const analyzeCorrelationsFn = httpsCallable<void, { analysis: CorrelationAnalysis }>(
  functions,
  "analyzeCorrelations",
);

export async function createMeal(payload: CreateMealPayload) {
  const result = await createMealFn(payload);
  return result.data.meal;
}

export async function createGiEvent(payload: CreateGiEventPayload) {
  const result = await createGiEventFn(payload);
  return result.data.event;
}

export async function analyzeCorrelations() {
  const result = await analyzeCorrelationsFn();
  return result.data.analysis;
}
