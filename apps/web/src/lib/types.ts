export type InputMode = "text" | "voice" | "image";

export type MealStatus = "analyzed" | "needs_review" | "failed";

export type IrritantSignal = {
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

export type MealAnalysis = {
  mealName: string;
  foods: string[];
  irritants: IrritantSignal[];
  summary: string;
};

export type Meal = {
  id: string;
  uid: string;
  inputMode: InputMode;
  rawInput: string;
  interpretedText: string;
  eatenAt: Date;
  notes?: string;
  status: MealStatus;
  analysis: MealAnalysis;
  createdAt: Date;
  updatedAt: Date;
  reanalyzedAt?: Date;
  mealSize?: "snack" | "small" | "medium" | "large" | "very_large";
  portionMultiplier?: number;
  sourceType?: "restaurant" | "homemade" | "packaged";
  alcoholServings?: number;
  caffeineAmount?: number;
  uncertainIngredientsNotes?: string;
  containsUnknownSauce?: boolean;
  descriptionComplete?: boolean;
};

export type GiEvent = {
  id: string;
  uid: string;
  occurredAt: Date;
  severity: number;
  symptoms: string[];
  notes?: string;
  stoolType?: number;
  durationMinutes?: number;
  urgencyScore?: number;
  stressLevel?: number;
  sleepQuality?: number;
  recentIllness?: boolean;
  medicationFlags?: string[];
  exerciseIntensity?: "none" | "light" | "moderate" | "vigorous";
  suspectedCause?: string;
  createdAt: Date;
};

export type SkinEntryType = "daily" | "timed";

export type SkinConditionAssessment = {
  condition: string;
  severity: number;
  bodyAreas: string[];
};

export type SkinEntry = {
  id: string;
  uid: string;
  entryType: SkinEntryType;
  severity?: number;
  symptoms: string[];
  bodyAreas: string[];
  conditions: SkinConditionAssessment[];
  notes?: string;
  durationMinutes?: number;
  localDate?: string;
  occurredAt?: Date;
  sortAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CorrelationFinding = {
  irritant: string;
  confidence: number;
  direction: "possible_trigger" | "unlikely_trigger" | "insufficient_data";
  windowHours: number;
  evidence: string;
  suggestedAction: string;
  exposureCount: number;
  eventCountAfterExposure: number;
  exposedEventRate: number;
  baselineEventRate: number;
  riskRatio: number | null;
  riskDifference: number;
  strongestWindow: "0-2h" | "2-6h" | "6-12h" | "12-24h" | "24-48h" | "48-120h";
  evidenceGrade: "insufficient" | "weak" | "moderate" | "stronger";
  symptomBreakdown: Array<{ symptom: string; exposedEventRate: number; baselineEventRate: number; riskRatio: number | null; riskDifference: number; eventCountAfterExposure: number }>;
  windowStats: Array<{ window: CorrelationFinding["strongestWindow"]; exposedEventRate: number; baselineEventRate: number; riskRatio: number | null; riskDifference: number }>;
  plainLanguageExplanation: string;
  recentExampleMealIds: string[];
  followedEventIds: string[];
  toleratedExposureMealIds: string[];
};

export type CorrelationAnalysis = {
  id: string;
  uid: string;
  status: "ready" | "insufficient_data" | "failed";
  generatedAt: Date;
  mealCount: number;
  eventCount: number;
  summary: string;
  findings: CorrelationFinding[];
  dataQualityNotes: string[];
  dataQuality?: { mealsWithPortionSize: number; eventsWithSeverityDuration: number; topMissingFields: string[] };
};

export type CreateMealPayload = {
  mode: InputMode;
  text?: string;
  mediaBase64?: string;
  mimeType?: string;
  eatenAt: string;
  notes?: string;
  mealSize?: Meal["mealSize"];
  portionMultiplier?: number;
  sourceType?: Meal["sourceType"];
  alcoholServings?: number;
  caffeineAmount?: number;
  uncertainIngredientsNotes?: string;
  containsUnknownSauce?: boolean;
  descriptionComplete?: boolean;
};

export type CreateGiEventPayload = {
  occurredAt: string;
  severity: number;
  symptoms: string[];
  notes?: string;
  stoolType?: number;
  durationMinutes?: number;
  urgencyScore?: number;
  stressLevel?: number;
  sleepQuality?: number;
  recentIllness?: boolean;
  medicationFlags?: string[];
  exerciseIntensity?: GiEvent["exerciseIntensity"];
  suspectedCause?: string;
};

export type SaveSkinEntryPayload = {
  entryType: SkinEntryType;
  severity?: number;
  symptoms?: string[];
  bodyAreas?: string[];
  conditions?: SkinConditionAssessment[];
  notes?: string;
  durationMinutes?: number;
  localDate?: string;
  occurredAt?: string;
};

export type ReanalyzeMealPayload = {
  mealId: string;
};
