import { GoogleGenAI } from "@google/genai";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getRemoteConfig } from "firebase-admin/remote-config";
import { logger, setGlobalOptions } from "firebase-functions";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { onSchedule } from "firebase-functions/v2/scheduler";

initializeApp();
setGlobalOptions({ region: "us-central1", maxInstances: 10 });

const db = getFirestore();
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const defaultModelName = "gemini-2.5-flash-lite";

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
  modelName: string;
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
    const now = Timestamp.now();

    let rawInput = "";
    let interpretedText = "";
    let analysis: MealAnalysis;

    if (mode === "text") {
      rawInput = requiredString(data.text, "text", 8000);
      interpretedText = rawInput;
      analysis = await analyzeMealText(rawInput);
    } else {
      const mediaBase64 = requiredString(data.mediaBase64, "mediaBase64", 8_000_000);
      const mimeType = requiredString(data.mimeType, "mimeType", 120);
      rawInput = `[${mode}:${mimeType}]`;
      const interpreted = await interpretMediaMeal(mode, mediaBase64, mimeType);
      interpretedText = interpreted.interpretedText;
      analysis = interpreted.analysis;
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
  const symptoms = validateStringList(data.symptoms, "symptoms", 1, 12, 40);
  const notes = optionalString(data.notes, 1000);
  const stoolType =
    data.stoolType == null ? undefined : validateNumber(data.stoolType, "stoolType", 1, 7);
  const durationMinutes =
    data.durationMinutes == null
      ? undefined
      : validateNumber(data.durationMinutes, "durationMinutes", 1, 1440);

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
    const analysis = await analyzeMealText(sourceText);
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

async function interpretMediaMeal(mode: InputMode, mediaBase64: string, mimeType: string) {
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
  const prompt = renderTemplate(promptConfig.mealAnalysisPromptTemplate, { input: instruction });

  const text = await generateJson(ai, [
    { text: prompt },
    { inlineData: { mimeType, data: mediaBase64 } },
  ], promptConfig.modelName);
  const parsed = parseMealAnalysis(text);

  return {
    interpretedText: parsed.summary || parsed.foods.join(", ") || parsed.mealName,
    analysis: parsed,
  };
}

async function analyzeMealText(text: string) {
  const ai = getGeminiClient();
  if (!ai) return heuristicMealAnalysis(text);

  try {
    const promptConfig = await getPromptConfig();
    const prompt = renderTemplate(promptConfig.mealAnalysisPromptTemplate, { input: text });
    const json = await generateJson(ai, [{ text: prompt }], promptConfig.modelName);
    return parseMealAnalysis(json);
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

  const analysis = ai
    ? await analyzeCorrelationsWithGemini(uid, meals, events, ai)
    : heuristicCorrelationAnalysis(uid, meals, events);

  await saveAnalysis(uid, analysis);
  return analysis;
}

async function analyzeCorrelationsWithGemini(
  uid: string,
  meals: FirebaseFirestore.DocumentData[],
  events: FirebaseFirestore.DocumentData[],
  ai: GoogleGenAI,
) {
  try {
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

    const promptConfig = await getPromptConfig();
    const prompt = renderTemplate(promptConfig.correlationAnalysisPromptTemplate, {
      mealsJson: JSON.stringify(mealPayload),
      eventsJson: JSON.stringify(eventPayload),
    });
    const json = await generateJson(ai, [
      {
        text: prompt,
      },
    ], promptConfig.modelName);

    const parsed = parseJsonObject(json);
    return normalizeCorrelationAnalysis(uid, meals.length, events.length, parsed);
  } catch (error) {
    logger.warn("Gemini correlation analysis failed; using heuristic fallback", { error });
    return heuristicCorrelationAnalysis(uid, meals, events);
  }
}

async function saveAnalysis(uid: string, analysis: CorrelationAnalysis) {
  const currentRef = db.collection("users").doc(uid).collection("analyses").doc("current");
  const runRef = db.collection("users").doc(uid).collection("analyses").doc();
  await Promise.all([currentRef.set(analysis), runRef.set(analysis)]);
}

async function generateJson(ai: GoogleGenAI, parts: unknown[], modelName: string) {
  const response = await ai.models.generateContent({
    model: modelName || defaultModelName,
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
Prefer specific irritant names over broad categories.

Common irritant mapping inspiration:
- Beer: alcohol, barley/gluten, wheat if wheat beer or unspecified beer style,
  carbonation, and fructans/FODMAP from barley or wheat.
- Bread, pasta, pizza, crackers, cereal, flour tortillas, pastries, baked goods:
  wheat/gluten and wheat fructans/FODMAP.
- Barley, rye, malt, malt vinegar, malted drinks: gluten grain and fructans/FODMAP.
- Milk, cream, soft cheese, yogurt, ice cream, whey: lactose/dairy.
- Onion, garlic, leeks, shallots, inulin, chicory root: fructans/FODMAP.
- Beans, lentils, chickpeas, peas, cashews, pistachios: GOS/FODMAP.
- Apple, pear, mango, watermelon, honey, high-fructose corn syrup: excess fructose/FODMAP.
- Stone fruits, avocado, mushrooms, cauliflower, sugar-free gum, xylitol, sorbitol,
  mannitol, maltitol, isomalt: polyols/FODMAP.
- Fried foods, fast food, bacon, sausage, heavy cream, rich sauces: high fat.
- Coffee, espresso, energy drinks, cola, black or green tea: caffeine.
- Hot sauce, chili, jalapeno, curry, pepper-heavy foods: spice/capsaicin.
- Wine, liquor, cocktails, hard seltzer: alcohol; cocktails may also include carbonation,
  fructose, or artificial sweeteners if indicated.
- Carbonated drinks, soda, sparkling water, beer, hard seltzer: carbonation.
- Processed meats, cured meats, packaged snacks, emulsifiers, sugar alcohols,
  artificial sweeteners: additives/other when specifically indicated.

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

Use conservative language. Do not make medical claims. Look for repeated GI events within 2, 6, 12, 24, and 48 hour windows after meals.

Meals:
{{mealsJson}}

GI events:
{{eventsJson}}`;

let promptConfigCache: { expiresAt: number; values: PromptConfig } | null = null;

async function getPromptConfig(): Promise<PromptConfig> {
  const fallback: PromptConfig = {
    modelName: defaultModelName,
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
      modelName: getRemoteConfigValue(template.parameters.gemini_model_name) || fallback.modelName,
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

function renderTemplate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replaceAll(`{{${key}}}`, value),
    template,
  );
}

function parseMealAnalysis(text: string): MealAnalysis {
  const parsed = parseJsonObject(text);
  const foods = validateGeneratedStringList(parsed.foods, 24, 80);
  const irritants = Array.isArray(parsed.irritants)
    ? parsed.irritants.slice(0, 20).map((item) => ({
        name: cleanGeneratedString(item?.name, "unknown", 80),
        category: normalizeCategory(item?.category),
        confidence: clampNumber(Number(item?.confidence ?? 0.4), 0, 1),
        evidence: cleanGeneratedString(item?.evidence, "Possible irritant.", 240),
      }))
    : [];

  return {
    mealName: cleanGeneratedString(parsed.mealName, foods[0] ?? "Meal", 120),
    foods,
    irritants,
    summary: cleanGeneratedString(parsed.summary, foods.join(", ") || "Meal", 500),
  };
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
        return {
          irritant: cleanGeneratedString(row.irritant, "Unknown", 100),
          confidence: clampNumber(Number(row.confidence ?? 0.3), 0, 1),
          direction: normalizeDirection(row.direction),
          windowHours: clampNumber(Number(row.windowHours ?? 24), 1, 72),
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

function heuristicMealAnalysis(text: string): MealAnalysis {
  const lower = text.toLowerCase();
  const rules: Array<[string, IrritantSignal[]]> = [
    [
      "\\bbeer\\b|\\bipa\\b|\\blager\\b|\\bale\\b|\\bstout\\b|\\bporter\\b|\\bmalt\\b",
      [
        signal("alcohol", "alcohol", "Beer or malt beverage terms were present."),
        signal("barley/gluten", "gluten", "Most beer is brewed with barley or other gluten grains unless labeled gluten-free."),
        signal("barley fructans", "fodmap", "Barley and wheat can contribute fructans/FODMAPs."),
        signal("carbonation", "other", "Beer is typically carbonated."),
      ],
    ],
    [
      "milk|cream|yogurt|ice cream|latte|whey|cottage cheese|ricotta|soft cheese",
      [signal("lactose/dairy", "dairy", "Lactose-containing dairy terms were present.")],
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
        signal("gluten grain", "gluten", "Barley, rye, or malt terms were present."),
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
      "processed meat|cured meat|deli meat|emulsifier|artificial sweetener|sucralose|aspartame",
      [signal("additives", "additive", "Processed food or additive terms were present.")],
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
): CorrelationAnalysis {
  const counts = new Map<string, { exposures: number; linkedEvents: number }>();

  for (const meal of meals) {
    const eatenAt = meal.eatenAt?.toDate?.();
    if (!eatenAt) continue;

    const irritants = meal.analysis?.irritants ?? [];
    for (const irritant of irritants) {
      const name = String(irritant.name ?? "unknown");
      const current = counts.get(name) ?? { exposures: 0, linkedEvents: 0 };
      current.exposures += 1;
      current.linkedEvents += events.some((event) => {
        const occurredAt = event.occurredAt?.toDate?.();
        if (!occurredAt) return false;
        const hours = (occurredAt.getTime() - eatenAt.getTime()) / 3_600_000;
        return hours >= 0 && hours <= 24;
      })
        ? 1
        : 0;
      counts.set(name, current);
    }
  }

  const findings = [...counts.entries()]
    .sort((a, b) => b[1].linkedEvents - a[1].linkedEvents)
    .slice(0, 8)
    .map(([irritant, count]) => {
      const confidence = count.exposures ? count.linkedEvents / count.exposures : 0;
      return {
        irritant,
        confidence: clampNumber(confidence, 0.1, 0.8),
        direction: confidence > 0.45 ? "possible_trigger" : "insufficient_data",
        windowHours: 24,
        evidence: `${count.linkedEvents} of ${count.exposures} logged exposures had a GI event within 24 hours.`,
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
      ? "A preliminary correlation pass is ready. Treat it as a tracking signal, not a diagnosis."
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
