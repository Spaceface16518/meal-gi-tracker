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
};

export type CreateMealPayload = {
  mode: InputMode;
  text?: string;
  mediaBase64?: string;
  mimeType?: string;
  eatenAt: string;
  notes?: string;
};

export type CreateGiEventPayload = {
  occurredAt: string;
  severity: number;
  symptoms: string[];
  notes?: string;
  stoolType?: number;
  durationMinutes?: number;
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
