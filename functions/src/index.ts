import { GoogleGenAI } from "@google/genai";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getRemoteConfig } from "firebase-admin/remote-config";
import { logger, setGlobalOptions } from "firebase-functions";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { computeIrritantSensitivity, type SensitivityScore } from "./sensitivity.js";

initializeApp();
setGlobalOptions({ region: "us-central1", maxInstances: 10 });

const db = getFirestore();
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const defaultMealModelName = "gemini-2.5-flash-lite";
const defaultCorrelationModelName = "gemini-3.1-pro-preview";

type InputMode = "text" | "voice" | "image";

type IrritantSignal = {
  name: string;
  category:
    | "dairy"
    | "gluten"
    | "fodmap"
    | "fat"
    | "spice"
    | "caffeine"
    | "alcohol"
    | "additive"
    | "fiber"
    | "other";
  confidence: number;
  evidence: string;
};

type MealAnalysis = {
  mealName: string;
  foods: string[];
  irritants: IrritantSignal[];
  summary: string;
};

type CorrelationFinding = {
  irritant: string;
  confidence: number;
  direction: "possible_trigger" | "unlikely_trigger" | "insufficient_data";
  windowHours: number;
  evidence: string;
  suggestedAction: string;
};

type CorrelationAnalysis = {
  uid: string;
  status: "ready" | "insufficient_data" | "failed";
  generatedAt: Timestamp;
  mealCount: number;
  eventCount: number;
  summary: string;
  findings: CorrelationFinding[];
  dataQualityNotes: string[];
};

type CreateMealData = {
  mode?: InputMode;
  text?: string;
  mediaBase64?: string;
  mimeType?: string;
  eatenAt?: string;
  notes?: string;
  processingSource?: "local" | "cloud";
  localProcessingWarning?: string;
};

type CreateEventData = {
  occurredAt?: string;
  severity?: number;
  symptoms?: string[];
  notes?: string;
  stoolType?: number;
  durationMinutes?: number;
};

type ReanalyzeMealData = {
  mealId?: string;
};

type PromptConfig = {
  mealModelName: string;
  correlationModelName: string;
  mealAnalysisPromptTemplate: string;
  correlationAnalysisPromptTemplate: string;
  audioMealInstruction: string;
  imageMealInstruction: string;
};

type MealDocument = {
  uid: string;
  inputMode: InputMode;
  rawInput: string;
  interpretedText: string;
  eatenAt: Timestamp;
  notes?: string;
  status: "analyzed" | "needs_review" | "failed";
  analysis: MealAnalysis;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  processingSource?: "local" | "cloud";
  localProcessingWarning?: string;
  reanalyzedAt?: Timestamp;
};

type EventDocument = {
  uid: string;
  occurredAt: Timestamp;
  severity: number;
  symptoms: string[];
  notes?: string;
  stoolType?: number;
  durationMinutes?: number;
  createdAt: Timestamp;
};

type SensitivityContext = {
  explanation: string;
  categoryNormalization: CategoryNormalizationMap;
  overall: SensitivityScore[];
  bySymptom: Array<{
    symptom: string;
    scores: SensitivityScore[];
  }>;
};

type CategoryNormalizationMap = Record<string, string[]>;

type IrritantCatalogEntry = {
  name: string;
  category: IrritantSignal["category"];
  examples: string[];
  evidence: string;
  aliases?: string[];
};

type MealAnalysisContext = {
  availableIrritants: IrritantCatalogEntry[];
};

export const createMeal = onCall(
  { secrets: [geminiApiKey], timeoutSeconds: 120, memory: "512MiB" },
  async (request) => {
    const uid = requireUid(request.auth?.uid);
    const data = request.data as CreateMealData;
    const mode = data.mode;

    if (!mode || !["text", "voice", "image"].includes(mode)) {
      throw new HttpsError("invalid-argument", "A valid meal input mode is required.");
    }

    const eatenAt = parseDate(data.eatenAt, "eatenAt");
    const notes = optionalString(data.notes, 1000);
    const localText = optionalString(data.text, 8000);
    const requestedProcessingSource = optionalProcessingSource(data.processingSource);
    const localProcessingWarning = optionalString(data.localProcessingWarning, 1000);
    const now = Timestamp.now();

    let rawInput = "";
    let interpretedText = "";
    let analysis: MealAnalysis;
    let processingSource: "local" | "cloud" | undefined;

    if (mode === "text") {
      rawInput = requiredString(data.text, "text", 8000);
      interpretedText = rawInput;
      analysis = await analyzeMealText(uid, rawInput);
      processingSource = requestedProcessingSource;
    } else if (localText) {
      rawInput = `[${mode}:local-text]`;
      interpretedText = localText;
      analysis = await analyzeMealText(uid, localText);
      processingSource = "local";
    } else {
      const mediaBase64 = requiredString(data.mediaBase64, "mediaBase64", 8_000_000);
      const originalMimeType = requiredString(data.mimeType, "mimeType", 120);
      const mimeType = normalizeMediaMimeType(originalMimeType);
      rawInput = `[${mode}:${mimeType}]`;
      logger.info("createMeal media input received", {
        mode,
        originalMimeType,
        mimeType,
        approxBytes: approximateBase64Bytes(mediaBase64),
      });
      const interpreted = await interpretMediaMeal(uid, mode, mediaBase64, mimeType);
      interpretedText = interpreted.interpretedText;
      analysis = interpreted.analysis;
      processingSource = "cloud";
    }

    const meal: MealDocument = {
      uid,
      inputMode: mode,
      rawInput,
      interpretedText,
      eatenAt,
      status: "analyzed",
      analysis,
      createdAt: now,
      updatedAt: now,
      ...(notes ? { notes } : {}),
      ...(processingSource ? { processingSource } : {}),
      ...(localProcessingWarning ? { localProcessingWarning } : {}),
    };

    const docRef = await db.collection("users").doc(uid).collection("meals").add(meal);
    await ensureUserExists(uid);

    return { meal: { id: docRef.id, ...serializeTimestamps(meal) } };
  },
);

export const createGiEvent = onCall(async (request) => {
  const uid = requireUid(request.auth?.uid);
  const data = request.data as CreateEventData;
  const occurredAt = parseDate(data.occurredAt, "occurredAt");
  const severity = validateNumber(data.severity, "severity", 1, 10);
  const stoolType =
    data.stoolType == null ? undefined : validateNumber(data.stoolType, "stoolType", 1, 7);
  const symptoms = validateStringList(data.symptoms, "symptoms", 0, 12, 40);
  const notes = optionalString(data.notes, 1000);
  const durationMinutes =
    data.durationMinutes == null
      ? undefined
      : validateNumber(data.durationMinutes, "durationMinutes", 1, 1440);

  if (symptoms.length === 0 && stoolType == null) {
    throw new HttpsError("invalid-argument", "Choose a symptom or stool type.");
  }

  const eventDoc: EventDocument = {
    uid,
    occurredAt,
    severity,
    symptoms,
    createdAt: Timestamp.now(),
    ...(notes ? { notes } : {}),
    ...(stoolType ? { stoolType } : {}),
    ...(durationMinutes ? { durationMinutes } : {}),
  };

  const docRef = await db.collection("users").doc(uid).collection("events").add(eventDoc);
  await ensureUserExists(uid);

  return { event: { id: docRef.id, ...serializeTimestamps(eventDoc) } };
});

export const reanalyzeMeal = onCall(
  { secrets: [geminiApiKey], timeoutSeconds: 120, memory: "512MiB" },
  async (request) => {
    const uid = requireUid(request.auth?.uid);
    const data = request.data as ReanalyzeMealData;
    const mealId = requiredString(data.mealId, "mealId", 160);

    if (!/^[A-Za-z0-9_-]+$/.test(mealId)) {
      throw new HttpsError("invalid-argument", "mealId has an invalid format.");
    }

    const mealRef = db.collection("users").doc(uid).collection("meals").doc(mealId);
    const snapshot = await mealRef.get();
    if (!snapshot.exists) throw new HttpsError("not-found", "Meal was not found.");

    const meal = snapshot.data() as MealDocument;
    const sourceText = meal.inputMode === "text"
      ? meal.rawInput || meal.interpretedText
      : meal.interpretedText || meal.rawInput;
    const analysis = await analyzeMealText(uid, sourceText, { excludeMealId: mealId });
    const now = Timestamp.now();
    const update = {
      analysis,
      interpretedText: sourceText,
      status: "analyzed" as const,
      updatedAt: now,
      reanalyzedAt: now,
    };

    await mealRef.update(update);

    return {
      meal: {
        id: mealId,
        ...serializeTimestamps({
          ...meal,
          ...update,
        }),
      },
    };
  },
);

export const analyzeCorrelations = onCall(
  { secrets: [geminiApiKey], timeoutSeconds: 180, memory: "512MiB" },
  async (request) => {
    const uid = requireUid(request.auth?.uid);
    const analysis = await runCorrelationForUser(uid);
    return { analysis: serializeTimestamps(analysis) };
  },
);

export const weeklyCorrelationSweep = onSchedule(
  {
    schedule: "every monday 03:00",
    timeZone: "America/Denver",
    secrets: [geminiApiKey],
    timeoutSeconds: 540,
    memory: "512MiB",
  },
  async () => {
    const users = await db.collection("users").limit(100).get();
    for (const user of users.docs) {
      try {
        await runCorrelationForUser(user.id);
      } catch (error) {
        logger.error("weekly correlation failed", { uid: user.id, error });
      }
    }
  },
);

async function interpretMediaMeal(
  uid: string,
  mode: InputMode,
  mediaBase64: string,
  mimeType: string,
) {
  const ai = getGeminiClient();
  if (!ai) {
    const fallbackText =
      mode === "voice"
        ? "Audio meal entry awaiting Gemini transcription."
        : "Image meal entry awaiting Gemini interpretation.";
    return {
      interpretedText: fallbackText,
      analysis: heuristicMealAnalysis(fallbackText),
    };
  }

  const promptConfig = await getPromptConfig();
  const instruction =
    mode === "voice" ? promptConfig.audioMealInstruction : promptConfig.imageMealInstruction;
  const analysisContext = await buildMealAnalysisContext(uid);
  const prompt = renderMealAnalysisPrompt(promptConfig.mealAnalysisPromptTemplate, {
    input: instruction,
    analysisContext,
  });

  try {
    const text = await generateJson(ai, [
      { text: prompt },
      { inlineData: { mimeType, data: mediaBase64 } },
    ], promptConfig.mealModelName);
    const parsed = parseMealAnalysis(text, analysisContext);

    logger.info("Gemini media meal analysis succeeded", {
      mode,
      mimeType,
      approxBytes: approximateBase64Bytes(mediaBase64),
    });

    return {
      interpretedText: parsed.summary || parsed.foods.join(", ") || parsed.mealName,
      analysis: parsed,
    };
  } catch (error) {
    logger.error("Gemini media meal analysis failed", {
      mode,
      mimeType,
      approxBytes: approximateBase64Bytes(mediaBase64),
      error: formatLogError(error),
    });
    throw new HttpsError(
      "internal",
      mode === "voice"
        ? "Voice meal analysis failed. Try a shorter recording or enter the meal as text."
        : "Image meal analysis failed. Try a smaller image or enter the meal as text.",
    );
  }
}

async function analyzeMealText(
  uid: string,
  text: string,
  options: { excludeMealId?: string } = {},
) {
  const ai = getGeminiClient();
  if (!ai) return heuristicMealAnalysis(text);

  try {
    const promptConfig = await getPromptConfig();
    const analysisContext = await buildMealAnalysisContext(uid, options);
    const prompt = renderMealAnalysisPrompt(promptConfig.mealAnalysisPromptTemplate, {
      input: text,
      analysisContext,
    });
    const json = await generateJson(ai, [{ text: prompt }], promptConfig.mealModelName);
    return parseMealAnalysis(json, analysisContext);
  } catch (error) {
    logger.warn("Gemini meal analysis failed; using heuristic fallback", { error });
    return heuristicMealAnalysis(text);
  }
}

async function runCorrelationForUser(uid: string) {
  const [mealsSnapshot, eventsSnapshot] = await Promise.all([
    db.collection("users").doc(uid).collection("meals").orderBy("eatenAt", "desc").limit(200).get(),
    db.collection("users").doc(uid).collection("events").orderBy("occurredAt", "desc").limit(200).get(),
  ]);

  if (mealsSnapshot.empty || eventsSnapshot.empty) {
    const insufficient: CorrelationAnalysis = {
      uid,
      status: "insufficient_data",
      generatedAt: Timestamp.now(),
      mealCount: mealsSnapshot.size,
      eventCount: eventsSnapshot.size,
      summary: "Add meals and GI events before running correlation analysis.",
      findings: [],
      dataQualityNotes: ["At least one meal and one GI event are required."],
    };
    await saveAnalysis(uid, insufficient);
    return insufficient;
  }

  const meals = mealsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const events = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const ai = getGeminiClient();
  const promptConfig = ai ? await getPromptConfig() : undefined;
  const categoryNormalization = ai
    ? await buildCategoryNormalizationMap(meals, ai, promptConfig?.correlationModelName)
    : heuristicCategoryNormalizationMap(meals);
  const normalizedMeals = normalizeMealsForSensitivity(meals, categoryNormalization);
  const sensitivityContext = buildSensitivityContext(normalizedMeals, events, categoryNormalization);

  const analysis = ai
    ? await analyzeCorrelationsWithGemini(
        uid,
        normalizedMeals,
        events,
        sensitivityContext,
        ai,
        promptConfig,
      )
    : heuristicCorrelationAnalysis(uid, normalizedMeals, events, sensitivityContext);

  await saveAnalysis(uid, analysis);
  return analysis;
}

async function analyzeCorrelationsWithGemini(
  uid: string,
  meals: FirebaseFirestore.DocumentData[],
  events: FirebaseFirestore.DocumentData[],
  sensitivityContext: SensitivityContext,
  ai: GoogleGenAI,
  promptConfig?: PromptConfig,
) {
  try {
    const config = promptConfig ?? await getPromptConfig();
    const mealPayload = meals.map((meal) => ({
      id: meal.id,
      eatenAt: meal.eatenAt?.toDate?.()?.toISOString(),
      mealName: meal.analysis?.mealName,
      foods: meal.analysis?.foods ?? [],
      irritants: meal.analysis?.irritants ?? [],
      notes: meal.notes ?? "",
    }));
    const eventPayload = events.map((event) => ({
      id: event.id,
      occurredAt: event.occurredAt?.toDate?.()?.toISOString(),
      severity: event.severity,
      symptoms: event.symptoms ?? [],
      notes: event.notes ?? "",
      stoolType: event.stoolType,
      durationMinutes: event.durationMinutes,
    }));

    const prompt =
      renderTemplate(config.correlationAnalysisPromptTemplate, {
        mealsJson: JSON.stringify(mealPayload),
        eventsJson: JSON.stringify(eventPayload),
        sensitivityExplanation: sensitivityContext.explanation,
        sensitivityJson: JSON.stringify(sensitivityContext),
        categoryNormalizationJson: JSON.stringify(sensitivityContext.categoryNormalization),
      }) +
      renderSensitivityPromptBlock(sensitivityContext);
    const json = await generateJson(ai, [
      {
        text: prompt,
      },
    ], config.correlationModelName);

    const parsed = parseJsonObject(json);
    return normalizeCorrelationAnalysis(uid, meals.length, events.length, parsed);
  } catch (error) {
    logger.warn("Gemini correlation analysis failed; using heuristic fallback", { error });
    return heuristicCorrelationAnalysis(uid, meals, events, sensitivityContext);
  }
}

async function saveAnalysis(uid: string, analysis: CorrelationAnalysis) {
  const currentRef = db.collection("users").doc(uid).collection("analyses").doc("current");
  const runRef = db.collection("users").doc(uid).collection("analyses").doc();
  await Promise.all([currentRef.set(analysis), runRef.set(analysis)]);
}

async function buildCategoryNormalizationMap(
  meals: FirebaseFirestore.DocumentData[],
  ai: GoogleGenAI,
  modelName?: string,
): Promise<CategoryNormalizationMap> {
  const labels = extractAnalysisLabels(meals);
  if (labels.length === 0) return {};

  try {
    const prompt = renderCategoryNormalizationPrompt(labels);
    const json = await generateJson(ai, [{ text: prompt }], modelName || defaultCorrelationModelName);
    return normalizeCategoryNormalizationMap(parseJsonObject(json), labels);
  } catch (error) {
    logger.warn("Gemini category normalization failed; using heuristic category map", { error });
    return heuristicCategoryNormalizationMap(meals);
  }
}

function renderCategoryNormalizationPrompt(labels: string[]) {
  return `Group meal-analysis irritant labels into canonical analysis categories.

Return only JSON with this shape:
{
  "canonical category": ["original label", "synonym label"]
}

Rules:
- Every input label must appear in exactly one list.
- Use short, specific canonical labels that are useful for GI tracking.
- Merge synonyms, spelling variants, category/name duplicates, and close equivalents
  such as "dairy", "lactose", and "lactose/dairy"; "gluten", "wheat/gluten",
  and "barley/gluten"; or "spice", "capsaicin", and "spice/capsaicin".
- Do not over-merge distinct triggers. For example, keep lactose separate from
  high fat unless the labels clearly refer to the same trigger.

Input labels:
${JSON.stringify(labels)}`;
}

function normalizeCategoryNormalizationMap(
  parsed: Record<string, unknown>,
  inputLabels: string[],
): CategoryNormalizationMap {
  const remaining = new Map(inputLabels.map((label) => [canonicalKey(label), label]));
  const map: CategoryNormalizationMap = {};

  for (const [rawCanonical, rawAliases] of Object.entries(parsed)) {
    const canonical = cleanGeneratedString(rawCanonical, "", 100);
    if (!canonical || !Array.isArray(rawAliases)) continue;
    const labels = rawAliases
      .map((item) => cleanGeneratedString(item, "", 100))
      .filter(Boolean)
      .filter((label) => remaining.has(canonicalKey(label)));
    if (labels.length === 0) continue;
    map[canonical] = [...new Set([...(map[canonical] ?? []), ...labels])];
    for (const label of labels) remaining.delete(canonicalKey(label));
  }

  for (const label of remaining.values()) {
    const canonical = heuristicCanonicalCategory(label);
    map[canonical] = [...new Set([...(map[canonical] ?? []), label])];
  }

  return sortCategoryNormalizationMap(map);
}

function heuristicCategoryNormalizationMap(meals: FirebaseFirestore.DocumentData[]) {
  const map: CategoryNormalizationMap = {};
  for (const label of extractAnalysisLabels(meals)) {
    const canonical = heuristicCanonicalCategory(label);
    map[canonical] = [...new Set([...(map[canonical] ?? []), label])];
  }
  return sortCategoryNormalizationMap(map);
}

function sortCategoryNormalizationMap(map: CategoryNormalizationMap) {
  return Object.fromEntries(
    Object.entries(map)
      .map(([canonical, labels]): [string, string[]] => [
        canonical,
        [...labels].sort((a, b) => a.localeCompare(b)),
      ])
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

function normalizeMealsForSensitivity(
  meals: FirebaseFirestore.DocumentData[],
  categoryNormalization: CategoryNormalizationMap,
) {
  const lookup = buildCategoryLookup(categoryNormalization);
  return meals.map((meal) => {
    const analysis = meal.analysis && typeof meal.analysis === "object"
      ? meal.analysis as Record<string, unknown>
      : {};
    const irritants = Array.isArray(analysis.irritants)
      ? analysis.irritants.map((irritant) => normalizeIrritantForSensitivity(irritant, lookup))
      : analysis.irritants;

    return {
      ...meal,
      analysis: {
        ...analysis,
        irritants,
        allergens: normalizeTagFieldForSensitivity(analysis.allergens, lookup),
        allergenTags: normalizeTagFieldForSensitivity(analysis.allergenTags, lookup),
        fodmaps: normalizeTagFieldForSensitivity(analysis.fodmaps, lookup),
        fodmap: normalizeTagFieldForSensitivity(analysis.fodmap, lookup),
        fodmapTags: normalizeTagFieldForSensitivity(analysis.fodmapTags, lookup),
        fodmapRelatedTags: normalizeTagFieldForSensitivity(analysis.fodmapRelatedTags, lookup),
        tags: normalizeTagFieldForSensitivity(analysis.tags, lookup),
      },
    };
  });
}

function normalizeIrritantForSensitivity(
  irritant: unknown,
  lookup: Map<string, string>,
) {
  if (!irritant || typeof irritant !== "object" || Array.isArray(irritant)) return irritant;
  const record = irritant as Record<string, unknown>;
  const name = cleanGeneratedString(record.name, "", 100);
  const category = cleanGeneratedString(record.category, "", 100);
  const canonical = lookup.get(canonicalKey(name)) ?? lookup.get(canonicalKey(category));
  if (!canonical) return irritant;
  return { ...record, name: canonical, category: canonical };
}

function normalizeTagFieldForSensitivity(value: unknown, lookup: Map<string, string>): unknown {
  if (typeof value === "string") {
    return lookup.get(canonicalKey(value)) ?? value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeTagFieldForSensitivity(item, lookup));
  }

  if (!value || typeof value !== "object") return value;
  const record = value as Record<string, unknown>;
  const rawLabel = cleanGeneratedString(record.name ?? record.tag ?? record.label ?? record.value, "", 100);
  const rawCategory = cleanGeneratedString(record.category, "", 100);
  const canonical = lookup.get(canonicalKey(rawLabel)) ?? lookup.get(canonicalKey(rawCategory));
  if (!canonical) return value;
  return { ...record, name: canonical, tag: canonical, label: canonical, value: canonical, category: canonical };
}

function buildCategoryLookup(categoryNormalization: CategoryNormalizationMap) {
  const lookup = new Map<string, string>();
  for (const [canonical, labels] of Object.entries(categoryNormalization)) {
    lookup.set(canonicalKey(canonical), canonical);
    for (const label of labels) lookup.set(canonicalKey(label), canonical);
  }
  return lookup;
}

function extractAnalysisLabels(meals: FirebaseFirestore.DocumentData[]) {
  const labels = new Set<string>();
  for (const meal of meals) {
    const analysis = meal.analysis;
    if (!analysis || typeof analysis !== "object" || Array.isArray(analysis)) continue;
    const record = analysis as Record<string, unknown>;
    collectIrritantLabels(record.irritants, labels);
    collectTagLabels(record.allergens, labels);
    collectTagLabels(record.allergenTags, labels);
    collectTagLabels(record.fodmaps, labels);
    collectTagLabels(record.fodmap, labels);
    collectTagLabels(record.fodmapTags, labels);
    collectTagLabels(record.fodmapRelatedTags, labels);
    collectTagLabels(record.tags, labels);
  }
  return [...labels].sort((a, b) => a.localeCompare(b)).slice(0, 160);
}

function collectIrritantLabels(value: unknown, labels: Set<string>) {
  if (!Array.isArray(value)) return;
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const record = item as Record<string, unknown>;
    collectTagLabels(record.name, labels);
    collectTagLabels(record.category, labels);
  }
}

function collectTagLabels(value: unknown, labels: Set<string>) {
  if (typeof value === "string") {
    const label = cleanGeneratedString(value, "", 100);
    if (label) labels.add(label);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectTagLabels(item, labels);
    return;
  }

  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  collectTagLabels(record.name ?? record.tag ?? record.label ?? record.value, labels);
  collectTagLabels(record.category, labels);
}

async function generateJson(ai: GoogleGenAI, parts: unknown[], modelName: string) {
  const response = await ai.models.generateContent({
    model: modelName || defaultMealModelName,
    contents: parts as never,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
      maxOutputTokens: 4096,
    },
  });
  return response.text ?? "";
}

const defaultMealAnalysisPromptTemplate = `Analyze this meal input for possible GI irritants.

Return only JSON with this exact shape:
{
  "mealName": "short name",
  "foods": ["food item"],
  "irritants": [
    {
      "name": "lactose",
      "category": "dairy" | "gluten" | "fodmap" | "fat" | "spice" | "caffeine" | "alcohol" | "additive" | "fiber" | "other",
      "confidence": 0.0,
      "evidence": "brief reason"
    }
  ],
  "summary": "plain language meal description"
}

Use conservative confidence scores. Include likely irritants only, but include
multiple irritants when a common food implies more than one plausible trigger.
Prefer specific irritant names over broad categories. Reuse existing irritant names
from this user's log when they fit; create a new irritant only for a truly distinct
trigger not covered by the available list.

{{availableIrritants}}

{{knownIrritants}}

Input:
{{input}}`;

const defaultCorrelationAnalysisPromptTemplate = `Analyze meal irritant correlation with GI events.

Return only JSON with this shape:
{
  "status": "ready" | "insufficient_data",
  "summary": "brief useful summary",
  "findings": [
    {
      "irritant": "string",
      "confidence": 0.0,
      "direction": "possible_trigger" | "unlikely_trigger" | "insufficient_data",
      "windowHours": 24,
      "evidence": "string",
      "suggestedAction": "string"
    }
  ],
  "dataQualityNotes": ["string"]
}

Use conservative language. Do not make medical claims. Look for repeated GI events within 2, 6, 12, 24, 48, and 120 hour windows after meals.
Meal irritant labels have been normalized into canonical categories before statistical scoring.

Meals:
{{mealsJson}}

GI events:
{{eventsJson}}

Category normalization map:
{{categoryNormalizationJson}}`;

let promptConfigCache: { expiresAt: number; values: PromptConfig } | null = null;

async function getPromptConfig(): Promise<PromptConfig> {
  const fallback: PromptConfig = {
    mealModelName: defaultMealModelName,
    correlationModelName: defaultCorrelationModelName,
    mealAnalysisPromptTemplate: defaultMealAnalysisPromptTemplate,
    correlationAnalysisPromptTemplate: defaultCorrelationAnalysisPromptTemplate,
    audioMealInstruction: "Transcribe this audio meal note, then analyze the meal.",
    imageMealInstruction: "Interpret this meal photo, then analyze the visible meal.",
  };

  if (promptConfigCache && promptConfigCache.expiresAt > Date.now()) {
    return promptConfigCache.values;
  }

  try {
    const template = await getRemoteConfig().getTemplate();
    const values: PromptConfig = {
      mealModelName:
        getRemoteConfigValue(template.parameters.gemini_model_name) || fallback.mealModelName,
      correlationModelName:
        getRemoteConfigValue(template.parameters.correlation_analysis_model_name) ||
        fallback.correlationModelName,
      mealAnalysisPromptTemplate:
        getRemoteConfigValue(template.parameters.meal_analysis_prompt_template) ||
        fallback.mealAnalysisPromptTemplate,
      correlationAnalysisPromptTemplate:
        getRemoteConfigValue(template.parameters.correlation_analysis_prompt_template) ||
        fallback.correlationAnalysisPromptTemplate,
      audioMealInstruction:
        getRemoteConfigValue(template.parameters.media_meal_audio_instruction) ||
        fallback.audioMealInstruction,
      imageMealInstruction:
        getRemoteConfigValue(template.parameters.media_meal_image_instruction) ||
        fallback.imageMealInstruction,
    };
    promptConfigCache = { expiresAt: Date.now() + 5 * 60 * 1000, values };
    return values;
  } catch (error) {
    logger.warn("Remote Config prompt fetch failed; using checked-in prompt templates", { error });
    promptConfigCache = { expiresAt: Date.now() + 60 * 1000, values: fallback };
    return fallback;
  }
}

function getRemoteConfigValue(parameter: unknown) {
  if (!parameter || typeof parameter !== "object") return "";
  const value = (parameter as { defaultValue?: { value?: unknown } }).defaultValue?.value;
  return typeof value === "string" ? value : "";
}

const knownIrritantCatalog: IrritantCatalogEntry[] = [
  {
    name: "lactose",
    category: "dairy",
    examples: ["milk", "ice cream", "soft cheese", "yogurt", "cream", "whey"],
    evidence: "Lactose is a FODMAP disaccharide found in many dairy products.",
    aliases: ["dairy", "lactose/dairy"],
  },
  {
    name: "wheat/gluten",
    category: "gluten",
    examples: ["bread", "pasta", "pizza", "crackers", "cereal", "pastries"],
    evidence: "Wheat, barley, and rye are gluten grains and can overlap with fructan exposure.",
    aliases: ["gluten", "wheat"],
  },
  {
    name: "wheat fructans",
    category: "fodmap",
    examples: ["wheat bread", "pasta", "flour tortillas", "baked goods"],
    evidence: "Wheat and related grains can contribute fructans, a FODMAP oligosaccharide.",
    aliases: ["wheat fodmap", "wheat/fructans"],
  },
  {
    name: "barley/gluten",
    category: "gluten",
    examples: ["beer", "malt", "barley", "stout", "malt vinegar"],
    evidence: "Barley and malt are gluten grain sources.",
    aliases: ["barley", "malt"],
  },
  {
    name: "grain fructans",
    category: "fodmap",
    examples: ["barley", "rye", "malt", "wheat beer"],
    evidence: "Barley, rye, and wheat can contribute fructans/FODMAPs.",
  },
  {
    name: "fructans",
    category: "fodmap",
    examples: ["onion", "garlic", "leeks", "shallots", "inulin", "chicory root"],
    evidence: "Fructans are FODMAP oligosaccharides common in alliums and some additives.",
    aliases: ["onion/garlic fructans"],
  },
  {
    name: "GOS/FODMAP",
    category: "fodmap",
    examples: ["beans", "lentils", "chickpeas", "peas", "cashews", "pistachios"],
    evidence: "Galactooligosaccharides are FODMAPs common in legumes and some nuts.",
    aliases: ["GOS", "galactooligosaccharides", "galactans"],
  },
  {
    name: "excess fructose",
    category: "fodmap",
    examples: ["apple", "pear", "mango", "watermelon", "honey", "high-fructose corn syrup"],
    evidence: "Excess fructose is a FODMAP monosaccharide in some fruits and sweeteners.",
    aliases: ["fructose", "high fructose"],
  },
  {
    name: "polyols",
    category: "fodmap",
    examples: [
      "sorbitol",
      "mannitol",
      "xylitol",
      "maltitol",
      "isomalt",
      "stone fruits",
      "mushrooms",
      "cauliflower",
    ],
    evidence: "Polyols are FODMAP sugar alcohols found in some produce and sugar-free products.",
    aliases: ["sugar alcohols"],
  },
  {
    name: "high fat",
    category: "fat",
    examples: ["fried foods", "fast food", "bacon", "sausage", "heavy cream", "rich sauces"],
    evidence: "High-fat meals are commonly linked with reflux symptoms and can affect motility.",
    aliases: ["fatty foods", "fried foods"],
  },
  {
    name: "spice/capsaicin",
    category: "spice",
    examples: ["hot sauce", "chili", "jalapeno", "curry", "pepper-heavy foods"],
    evidence: "Spicy foods are commonly linked with reflux symptoms and GI discomfort.",
    aliases: ["spice", "capsaicin", "spicy foods"],
  },
  {
    name: "caffeine",
    category: "caffeine",
    examples: ["coffee", "espresso", "energy drinks", "cola", "black tea", "green tea", "matcha"],
    evidence: "Coffee and other caffeine sources are commonly linked with GERD symptoms.",
  },
  {
    name: "alcohol",
    category: "alcohol",
    examples: ["beer", "wine", "liquor", "cocktails", "hard seltzer"],
    evidence: "Alcoholic drinks are commonly linked with GERD symptoms.",
  },
  {
    name: "carbonation",
    category: "other",
    examples: ["soda", "sparkling water", "beer", "hard seltzer", "tonic"],
    evidence: "Carbonated drinks can contribute bloating and reflux-like symptoms for some people.",
    aliases: ["carbonated drinks"],
  },
  {
    name: "acidic foods",
    category: "other",
    examples: ["citrus", "tomatoes", "tomato sauce", "vinegar-heavy foods"],
    evidence: "Citrus and tomatoes are commonly linked with GERD symptoms.",
    aliases: ["citrus/tomato acid", "acid"],
  },
  {
    name: "chocolate",
    category: "caffeine",
    examples: ["chocolate", "cocoa", "brownies", "mocha"],
    evidence: "Chocolate is commonly linked with GERD symptoms and may overlap with caffeine/fat.",
  },
  {
    name: "mint",
    category: "other",
    examples: ["peppermint", "spearmint", "mint tea", "mint candy"],
    evidence: "Mint is commonly linked with GERD symptoms.",
    aliases: ["peppermint"],
  },
  {
    name: "additives",
    category: "additive",
    examples: [
      "artificial sweeteners",
      "emulsifiers",
      "processed meats",
      "cured meats",
      "packaged snacks",
    ],
    evidence: "Processed foods and additives can be relevant when specifically indicated.",
    aliases: ["processed food additives"],
  },
  {
    name: "insoluble fiber load",
    category: "fiber",
    examples: ["bran", "large raw salads", "cruciferous vegetables", "whole-grain overload"],
    evidence: "Fiber tolerance varies; rapid increases can trigger gas and bloating.",
    aliases: ["fiber"],
  },
];

async function buildMealAnalysisContext(
  uid: string,
  options: { excludeMealId?: string } = {},
): Promise<MealAnalysisContext> {
  const snapshot = await db.collection("users").doc(uid).collection("meals")
    .orderBy("updatedAt", "desc")
    .limit(120)
    .get();

  const byName = new Map<string, IrritantCatalogEntry>();
  for (const doc of snapshot.docs) {
    if (doc.id === options.excludeMealId) continue;
    const meal = doc.data() as Partial<MealDocument>;
    const irritants = Array.isArray(meal.analysis?.irritants) ? meal.analysis.irritants : [];
    for (const irritant of irritants) {
      if (!irritant?.name) continue;
      const name = cleanGeneratedString(irritant.name, "", 80);
      if (!name) continue;
      const key = canonicalKey(name);
      if (byName.has(key)) continue;
      byName.set(key, {
        name,
        category: normalizeCategory(irritant.category),
        examples: [],
        evidence: cleanGeneratedString(irritant.evidence, "Previously used in this user's log.", 160),
      });
    }
  }

  return { availableIrritants: [...byName.values()].slice(0, 60) };
}

function renderMealAnalysisPrompt(
  template: string,
  values: { input: string; analysisContext: MealAnalysisContext },
) {
  const base = renderTemplate(template, {
    input: values.input,
    knownIrritants: renderKnownIrritantCatalog(),
    availableIrritants: renderAvailableIrritants(values.analysisContext),
  });

  const needsKnownBlock = !template.includes("{{knownIrritants}}");
  const needsAvailableBlock = !template.includes("{{availableIrritants}}");
  if (!needsKnownBlock && !needsAvailableBlock) return base;

  return `${base}

${needsAvailableBlock ? renderAvailableIrritants(values.analysisContext) : ""}

${needsKnownBlock ? renderKnownIrritantCatalog() : ""}`;
}

function renderAvailableIrritants(context: MealAnalysisContext) {
  const rows = context.availableIrritants.length
    ? context.availableIrritants.map((item) => {
        const category = item.category ? ` (${item.category})` : "";
        return `- ${item.name}${category}`;
      }).join("\n")
    : "- None yet for this user.";

  return `Available irritants already used in this user's meal log:
${rows}

Prefer these exact existing irritant names when they fit the meal. Add a new irritant only
when the meal clearly contains a materially different GI-relevant trigger that is not covered
by the available list.`;
}

function renderKnownIrritantCatalog() {
  const rows = knownIrritantCatalog.map((item) => {
    const examples = item.examples.length ? ` Examples: ${item.examples.join(", ")}.` : "";
    return `- ${item.name} (${item.category}).${examples} ${item.evidence}`;
  }).join("\n");

  return `Known GI irritant catalog for novel irritants:
${rows}`;
}

function canonicalKey(value: string) {
  return value.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g, " ").trim();
}

function heuristicCanonicalCategory(value: string) {
  const key = canonicalKey(value);
  const matched = knownIrritantCatalog.find((item) => (
    canonicalKey(item.name) === key ||
    item.aliases?.some((alias) => canonicalKey(alias) === key)
  ));
  return matched?.name ?? value.trim().toLowerCase();
}

function renderTemplate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replaceAll(`{{${key}}}`, value),
    template,
  );
}

function parseMealAnalysis(text: string, context?: MealAnalysisContext): MealAnalysis {
  const parsed = parseJsonObject(text);
  const foods = validateGeneratedStringList(parsed.foods, 24, 80);
  const irritants = Array.isArray(parsed.irritants)
    ? parsed.irritants.slice(0, 20).map((item) => normalizeGeneratedIrritant(item, context))
    : [];

  return {
    mealName: cleanGeneratedString(parsed.mealName, foods[0] ?? "Meal", 120),
    foods,
    irritants,
    summary: cleanGeneratedString(parsed.summary, foods.join(", ") || "Meal", 500),
  };
}

function normalizeGeneratedIrritant(
  value: unknown,
  context?: MealAnalysisContext,
): IrritantSignal {
  const item = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const generatedName = cleanGeneratedString(item.name, "unknown", 80);
  const matched = findCatalogMatch(generatedName, context);
  return {
    name: matched?.name ?? generatedName,
    category: matched?.category ?? normalizeCategory(item.category),
    confidence: clampNumber(Number(item.confidence ?? 0.4), 0, 1),
    evidence: cleanGeneratedString(item.evidence, matched?.evidence ?? "Possible irritant.", 240),
  };
}

function findCatalogMatch(name: string, context?: MealAnalysisContext) {
  const key = canonicalKey(name);
  if (!key) return undefined;

  const existing = context?.availableIrritants.find((item) => canonicalKey(item.name) === key);
  if (existing) return existing;

  return knownIrritantCatalog.find((item) => (
    canonicalKey(item.name) === key ||
    item.aliases?.some((alias) => canonicalKey(alias) === key)
  ));
}

function normalizeCorrelationAnalysis(
  uid: string,
  mealCount: number,
  eventCount: number,
  parsed: Record<string, unknown>,
): CorrelationAnalysis {
  const findings = Array.isArray(parsed.findings)
    ? parsed.findings.slice(0, 12).map((item) => {
        const row = item as Record<string, unknown>;
        const irritant = cleanGeneratedString(row.irritant, "Unknown", 100);
        return {
          irritant,
          confidence: clampNumber(Number(row.confidence ?? 0.3), 0, 1),
          direction: normalizeDirection(row.direction),
          windowHours: clampNumber(Number(row.windowHours ?? 24), 1, 120),
          evidence: cleanGeneratedString(row.evidence, "Limited evidence.", 500),
          suggestedAction: cleanGeneratedString(
            row.suggestedAction,
            "Track more meals before changing diet.",
            300,
          ),
        };
      })
    : [];

  return {
    uid,
    status: parsed.status === "insufficient_data" ? "insufficient_data" : "ready",
    generatedAt: Timestamp.now(),
    mealCount,
    eventCount,
    summary: cleanGeneratedString(parsed.summary, "Correlation analysis is ready.", 800),
    findings,
    dataQualityNotes: validateGeneratedStringList(parsed.dataQualityNotes, 8, 240),
  };
}

function buildSensitivityContext(
  meals: FirebaseFirestore.DocumentData[],
  events: FirebaseFirestore.DocumentData[],
  categoryNormalization: CategoryNormalizationMap = {},
): SensitivityContext {
  const symptoms = [...new Set(
    events.flatMap((event) => (
      Array.isArray(event.symptoms)
        ? event.symptoms.filter((symptom): symptom is string => typeof symptom === "string")
        : []
    )),
  )]
    .map((symptom) => symptom.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);

  return {
    explanation:
      "Deterministic irritant sensitivity is weighted symptom burden after analyzed meals. " +
      "Events closer to a meal count more using a 24 hour half-life, events after 120 hours " +
      "are ignored, and scores are normalized per exposure. These are exploratory associations, " +
      "not evidence that an irritant causes symptoms.",
    categoryNormalization,
    overall: computeIrritantSensitivity(meals, events).slice(0, 12),
    bySymptom: symptoms.map((symptom) => ({
      symptom,
      scores: computeIrritantSensitivity(meals, events, { symptomFilter: symptom }).slice(0, 8),
    })),
  };
}

function renderSensitivityPromptBlock(sensitivityContext: SensitivityContext) {
  return `

Deterministic sensitivity context:
${sensitivityContext.explanation}

Use these hard statistical rankings to inform the findings. Prefer irritants with higher
normalizedSensitivity and enough exposureCount, but keep cautious language such as
"associated with symptoms" or "possible sensitivity". Do not say an irritant causes symptoms.
Do not expose raw score values, weighted scores, formulas, or calculation output in the response.
The rankings use canonical categories from the categoryNormalization map, so findings should use
canonical category names and may mention grouped source labels only as plain-language context.

Sensitivity rankings JSON:
${JSON.stringify(sensitivityContext)}
`;
}

function heuristicMealAnalysis(text: string): MealAnalysis {
  const lower = text.toLowerCase();
  const rules: Array<[string, IrritantSignal[]]> = [
    [
      "\\bbeer\\b|\\bipa\\b|\\blager\\b|\\bale\\b|\\bstout\\b|\\bporter\\b|\\bmalt\\b",
      [
        signal("alcohol", "alcohol", "Beer or malt beverage terms were present."),
        signal("barley/gluten", "gluten", "Most beer is brewed with barley or other gluten grains unless labeled gluten-free."),
        signal("grain fructans", "fodmap", "Barley and wheat can contribute fructans/FODMAPs."),
        signal("carbonation", "other", "Beer is typically carbonated."),
      ],
    ],
    [
      "milk|cream|yogurt|ice cream|latte|whey|cottage cheese|ricotta|soft cheese",
      [signal("lactose", "dairy", "Lactose-containing dairy terms were present.")],
    ],
    [
      "bread|pasta|wheat|pizza|bun|sandwich|cracker|cereal|flour tortilla|pastry|bagel|muffin",
      [
        signal("wheat/gluten", "gluten", "Wheat or bread terms were present."),
        signal("wheat fructans", "fodmap", "Wheat-based foods can contribute fructans/FODMAPs."),
      ],
    ],
    [
      "barley|rye|malt|malted|malt vinegar",
      [
        signal("barley/gluten", "gluten", "Barley, rye, or malt terms were present."),
        signal("grain fructans", "fodmap", "Barley and rye can contribute fructans/FODMAPs."),
      ],
    ],
    [
      "onion|garlic|leek|shallot|inulin|chicory",
      [signal("fructans", "fodmap", "Onion, garlic, or related fructan-rich terms were present.")],
    ],
    [
      "beans|lentils|chickpeas|peas|cashews|pistachios",
      [signal("GOS/FODMAP", "fodmap", "Legume or high-FODMAP nut terms were present.")],
    ],
    [
      "apple|pear|mango|watermelon|honey|high-fructose corn syrup|hfcs",
      [signal("excess fructose", "fodmap", "High-fructose food terms were present.")],
    ],
    [
      "sorbitol|xylitol|mannitol|maltitol|isomalt|sugar-free gum|mushroom|cauliflower|avocado|plum|prune|peach|cherry",
      [signal("polyols", "fodmap", "Polyol-containing food or sweetener terms were present.")],
    ],
    [
      "fried|fries|burger|bacon|sausage|pepperoni|heavy cream|rich sauce|fast food",
      [signal("high fat", "fat", "High-fat food terms were present.")],
    ],
    [
      "spicy|hot sauce|jalapeno|chili|chile|curry|pepper-heavy",
      [signal("spice/capsaicin", "spice", "Spicy ingredient terms were present.")],
    ],
    [
      "coffee|espresso|coke|cola|energy drink|black tea|green tea|matcha",
      [signal("caffeine", "caffeine", "Caffeine terms were present.")],
    ],
    [
      "wine|cocktail|liquor|vodka|whiskey|whisky|rum|tequila|hard seltzer",
      [signal("alcohol", "alcohol", "Alcohol terms were present.")],
    ],
    [
      "soda|sparkling water|carbonated|seltzer|tonic",
      [signal("carbonation", "other", "Carbonated beverage terms were present.")],
    ],
    [
      "citrus|orange|lemon|lime|grapefruit|tomato|tomato sauce|marinara|vinegar",
      [signal("acidic foods", "other", "Acidic food terms were present.")],
    ],
    [
      "chocolate|cocoa|brownie|mocha",
      [signal("chocolate", "caffeine", "Chocolate or cocoa terms were present.")],
    ],
    [
      "peppermint|spearmint|mint tea|mint candy|\\bmint\\b",
      [signal("mint", "other", "Mint terms were present.")],
    ],
    [
      "processed meat|cured meat|deli meat|emulsifier|artificial sweetener|sucralose|aspartame",
      [signal("additives", "additive", "Processed food or additive terms were present.")],
    ],
    [
      "bran|large salad|raw salad|cruciferous|whole-grain overload",
      [signal("insoluble fiber load", "fiber", "Large or rough-fiber food terms were present.")],
    ],
  ];
  const irritants = rules
    .filter(([pattern]) => new RegExp(pattern).test(lower))
    .flatMap(([, items]) => items);
  const uniqueIrritants = [...new Map(irritants.map((item) => [item.name, item])).values()];
  const foods = text
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);

  return {
    mealName: foods[0] || "Meal",
    foods: foods.length ? foods : [text.slice(0, 80)],
    irritants: uniqueIrritants,
    summary: text.slice(0, 500),
  };
}

function heuristicCorrelationAnalysis(
  uid: string,
  meals: FirebaseFirestore.DocumentData[],
  events: FirebaseFirestore.DocumentData[],
  sensitivityContext?: SensitivityContext,
): CorrelationAnalysis {
  const sensitivityScores = sensitivityContext?.overall ?? computeIrritantSensitivity(meals, events);

  const findings = sensitivityScores
    .slice(0, 8)
    .map((score) => {
      const confidence = clampNumber(score.normalizedSensitivity / 10, 0.1, 0.8);
      return {
        irritant: score.irritant,
        confidence: clampNumber(confidence, 0.1, 0.8),
        direction: score.normalizedSensitivity > 0 ? "possible_trigger" : "insufficient_data",
        windowHours: 120,
        evidence:
          "This irritant ranked higher in the time-weighted symptom association pass. " +
          "That means it is associated with symptoms in the log, not that it causes symptoms.",
        suggestedAction: "Keep logging consistently before making diet changes.",
      } satisfies CorrelationFinding;
    });

  return {
    uid,
    status: findings.length ? "ready" : "insufficient_data",
    generatedAt: Timestamp.now(),
    mealCount: meals.length,
    eventCount: events.length,
    summary: findings.length
      ? "A preliminary possible sensitivity ranking is ready. Treat it as a tracking signal, not a diagnosis."
      : "No repeated irritant patterns are visible yet.",
    findings,
    dataQualityNotes: [
      "Heuristic analysis was used because Gemini was not configured or was unavailable.",
      "More consistent meal and event timing improves confidence.",
    ],
  };
}

function signal(
  name: string,
  category: IrritantSignal["category"],
  evidence: string,
): IrritantSignal {
  return { name, category, confidence: 0.55, evidence };
}

function getGeminiClient() {
  const apiKey = safeSecretValue();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

function safeSecretValue() {
  try {
    return geminiApiKey.value() || process.env.GEMINI_API_KEY || "";
  } catch {
    return process.env.GEMINI_API_KEY || "";
  }
}

function requireUid(uid?: string) {
  if (!uid) throw new HttpsError("unauthenticated", "Sign in before making changes.");
  return uid;
}

async function ensureUserExists(uid: string) {
  const profileRef = db.collection("users").doc(uid);
  const profile = await profileRef.get();

  if (profile.exists) {
    await profileRef.set({ updatedAt: Timestamp.now() }, { merge: true });
    return;
  }

  await profileRef.set({
      uid,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    });
}

function requiredString(value: unknown, field: string, maxLength: number) {
  if (typeof value !== "string" || !value.trim()) {
    throw new HttpsError("invalid-argument", `${field} is required.`);
  }
  if (value.length > maxLength) {
    throw new HttpsError("invalid-argument", `${field} is too large.`);
  }
  return value.trim();
}

function optionalString(value: unknown, maxLength: number) {
  if (value == null || value === "") return undefined;
  if (typeof value !== "string" || value.length > maxLength) {
    throw new HttpsError("invalid-argument", "Invalid text value.");
  }
  return value.trim();
}

function optionalProcessingSource(value: unknown) {
  if (value == null || value === "") return undefined;
  if (value === "local" || value === "cloud") return value;
  throw new HttpsError("invalid-argument", "processingSource is invalid.");
}

function normalizeMediaMimeType(value: string) {
  const baseMimeType = value.split(";")[0]?.trim().toLowerCase();
  if (!baseMimeType) throw new HttpsError("invalid-argument", "mimeType is invalid.");
  if (!/^(audio|image)\//.test(baseMimeType)) {
    throw new HttpsError("invalid-argument", "Only audio and image media are supported.");
  }
  return baseMimeType;
}

function approximateBase64Bytes(value: string) {
  const padding = value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((value.length * 3) / 4) - padding);
}

function formatLogError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack?.split("\n").slice(0, 5).join("\n"),
    };
  }
  return { message: String(error) };
}

function parseDate(value: unknown, field: string) {
  if (typeof value !== "string") {
    throw new HttpsError("invalid-argument", `${field} is required.`);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new HttpsError("invalid-argument", `${field} must be a valid date.`);
  }
  return Timestamp.fromDate(date);
}

function validateNumber(value: unknown, field: string, min: number, max: number) {
  if (typeof value !== "number" || Number.isNaN(value) || value < min || value > max) {
    throw new HttpsError("invalid-argument", `${field} must be between ${min} and ${max}.`);
  }
  return value;
}

function validateStringList(
  value: unknown,
  field: string,
  minLength: number,
  maxLength: number,
  maxItemLength: number,
) {
  if (!Array.isArray(value) || value.length < minLength || value.length > maxLength) {
    throw new HttpsError("invalid-argument", `${field} has an invalid item count.`);
  }
  return value.map((item) => {
    if (typeof item !== "string" || !item.trim() || item.length > maxItemLength) {
      throw new HttpsError("invalid-argument", `${field} contains an invalid item.`);
    }
    return item.trim();
  });
}

function validateGeneratedStringList(value: unknown, maxLength: number, maxItemLength: number) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => String(item).trim().slice(0, maxItemLength))
    .slice(0, maxLength);
}

function parseJsonObject(text: string): Record<string, unknown> {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  const parsed = JSON.parse(cleaned) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Generated response was not an object.");
  }
  return parsed as Record<string, unknown>;
}

function cleanGeneratedString(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  return value.trim().slice(0, maxLength);
}

function normalizeCategory(value: unknown): IrritantSignal["category"] {
  const allowed = new Set([
    "dairy",
    "gluten",
    "fodmap",
    "fat",
    "spice",
    "caffeine",
    "alcohol",
    "additive",
    "fiber",
    "other",
  ]);
  return typeof value === "string" && allowed.has(value)
    ? (value as IrritantSignal["category"])
    : "other";
}

function normalizeDirection(value: unknown): CorrelationFinding["direction"] {
  if (
    value === "possible_trigger" ||
    value === "unlikely_trigger" ||
    value === "insufficient_data"
  ) {
    return value;
  }
  return "insufficient_data";
}

function clampNumber(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function serializeTimestamps<T>(value: T): T {
  if (value instanceof Timestamp) return value.toDate().toISOString() as T;
  if (Array.isArray(value)) return value.map((item) => serializeTimestamps(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, serializeTimestamps(item)]),
    ) as T;
  }
  return value;
}
