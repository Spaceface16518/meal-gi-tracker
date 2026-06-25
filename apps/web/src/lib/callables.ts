import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import type {
  CorrelationAnalysis,
  CreateGiEventPayload,
  CreateMealPayload,
  GiEvent,
  Meal,
  ReanalyzeMealPayload,
  SaveSkinEntryPayload,
  SkinEntry,
} from "@/lib/types";

const createMealFn = httpsCallable<CreateMealPayload, { meal: Meal }>(functions, "createMeal");

const createGiEventFn = httpsCallable<CreateGiEventPayload, { event: GiEvent }>(
  functions,
  "createGiEvent",
);

const saveSkinEntryFn = httpsCallable<SaveSkinEntryPayload, { entry: SkinEntry }>(
  functions,
  "saveSkinEntry",
);

const analyzeCorrelationsFn = httpsCallable<void, { analysis: CorrelationAnalysis }>(
  functions,
  "analyzeCorrelations",
);

const reanalyzeMealFn = httpsCallable<ReanalyzeMealPayload, { meal: Meal }>(
  functions,
  "reanalyzeMeal",
);

export async function createMeal(payload: CreateMealPayload) {
  const result = await createMealFn(payload);
  return result.data.meal;
}

export async function createGiEvent(payload: CreateGiEventPayload) {
  const result = await createGiEventFn(payload);
  return result.data.event;
}

export async function saveSkinEntry(payload: SaveSkinEntryPayload) {
  const result = await saveSkinEntryFn(payload);
  return result.data.entry;
}

export async function analyzeCorrelations() {
  const result = await analyzeCorrelationsFn();
  return result.data.analysis;
}

export async function reanalyzeMeal(mealId: string) {
  const result = await reanalyzeMealFn({ mealId });
  return result.data.meal;
}
