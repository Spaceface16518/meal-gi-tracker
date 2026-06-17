export type SensitivityMeal = {
  eatenAt?: DateLike;
  status?: string;
  analysis?: unknown;
};

export type SensitivityEvent = {
  occurredAt?: DateLike;
  severity?: number;
  symptoms?: string[];
  stoolType?: number;
  durationMinutes?: number;
};

export type SensitivityOptions = {
  halfLifeHours?: number;
  maxLookbackHours?: number;
  symptomFilter?: string;
};

export type SensitivityScore = {
  irritant: string;
  exposureCount: number;
  weightedSymptomScore: number;
  normalizedSensitivity: number;
};

type DateLike =
  | Date
  | string
  | number
  | {
      toDate?: () => Date;
      seconds?: number;
      nanoseconds?: number;
    };

type MutableSensitivityScore = Omit<SensitivityScore, "normalizedSensitivity">;

const defaultHalfLifeHours = 24;
const defaultMaxLookbackHours = 120;
const irritantFields = [
  "irritants",
  "allergens",
  "allergenTags",
  "fodmaps",
  "fodmap",
  "fodmapTags",
  "fodmapRelatedTags",
  "tags",
];

export function computeIrritantSensitivity(
  meals: SensitivityMeal[],
  events: SensitivityEvent[],
  options: SensitivityOptions = {},
): SensitivityScore[] {
  const halfLifeHours = positiveOrDefault(options.halfLifeHours, defaultHalfLifeHours);
  const maxLookbackHours = positiveOrDefault(options.maxLookbackHours, defaultMaxLookbackHours);
  const symptomFilter = normalizeTag(options.symptomFilter);
  const eligibleEvents = events
    .map((event) => ({
      occurredAt: toMillis(event.occurredAt),
      severity: validSeverity(event.severity),
      symptoms: Array.isArray(event.symptoms) ? event.symptoms.map(normalizeTag) : [],
    }))
    .filter(isUsableEvent)
    .filter((event) => !symptomFilter || event.symptoms.includes(symptomFilter));

  const byIrritant = new Map<string, MutableSensitivityScore>();

  for (const meal of meals) {
    if (meal.status !== "analyzed") continue;

    const eatenAt = toMillis(meal.eatenAt);
    const irritants = extractIrritants(meal.analysis);
    if (eatenAt == null || irritants.length === 0) continue;

    for (const irritant of irritants) {
      const current = byIrritant.get(irritant) ?? {
        irritant,
        exposureCount: 0,
        weightedSymptomScore: 0,
      };
      current.exposureCount += 1;

      for (const event of eligibleEvents) {
        const hoursAfter = (event.occurredAt - eatenAt) / 3_600_000;
        if (hoursAfter < 0 || hoursAfter > maxLookbackHours) continue;

        // Exponential decay gives events near the meal more influence; each half-life halves the event burden.
        const weight = 0.5 ** (hoursAfter / halfLifeHours);
        current.weightedSymptomScore += event.severity * weight;
      }

      byIrritant.set(irritant, current);
    }
  }

  return [...byIrritant.values()]
    .map((score) => ({
      ...score,
      weightedSymptomScore: roundScore(score.weightedSymptomScore),
      // Normalizing by exposure count keeps frequent foods from ranking high solely because they appear often.
      normalizedSensitivity: roundScore(score.weightedSymptomScore / score.exposureCount),
    }))
    .sort((a, b) => (
      b.normalizedSensitivity - a.normalizedSensitivity ||
      b.weightedSymptomScore - a.weightedSymptomScore ||
      a.irritant.localeCompare(b.irritant)
    ));
}

function extractIrritants(analysis: unknown): string[] {
  if (!analysis || typeof analysis !== "object" || Array.isArray(analysis)) return [];

  const found = new Set<string>();
  const analysisRecord = analysis as Record<string, unknown>;

  for (const field of irritantFields) {
    collectTags(analysisRecord[field], found);
  }

  collectCategorizedTags(analysisRecord, found);

  return [...found];
}

function isUsableEvent(event: {
  occurredAt: number | null;
  severity: number | null;
  symptoms: string[];
}): event is { occurredAt: number; severity: number; symptoms: string[] } {
  return event.occurredAt != null && event.severity != null;
}

function collectTags(value: unknown, found: Set<string>) {
  if (typeof value === "string") {
    const tag = normalizeTag(value);
    if (tag) found.add(tag);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectTags(item, found);
    return;
  }

  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  collectTags(record.name ?? record.tag ?? record.label ?? record.value, found);
}

function collectCategorizedTags(value: Record<string, unknown>, found: Set<string>) {
  const category = normalizeTag(value.category);
  if (
    category === "allergen" ||
    category === "allergens" ||
    category === "fodmap" ||
    category === "fodmaps"
  ) {
    collectTags(value.name ?? value.tag ?? value.label ?? value.value, found);
  }

  for (const item of Object.values(value)) {
    if (Array.isArray(item)) {
      for (const nested of item) {
        if (nested && typeof nested === "object" && !Array.isArray(nested)) {
          collectCategorizedTags(nested as Record<string, unknown>, found);
        }
      }
    }
  }
}

function toMillis(value: DateLike | undefined): number | null {
  if (value instanceof Date) {
    const millis = value.getTime();
    return Number.isNaN(millis) ? null : millis;
  }

  if (typeof value === "string" || typeof value === "number") {
    const millis = new Date(value).getTime();
    return Number.isNaN(millis) ? null : millis;
  }

  if (!value || typeof value !== "object") return null;

  if (typeof value.toDate === "function") {
    const millis = value.toDate().getTime();
    return Number.isNaN(millis) ? null : millis;
  }

  if (typeof value.seconds === "number") {
    return value.seconds * 1000 + Math.floor((value.nanoseconds ?? 0) / 1_000_000);
  }

  return null;
}

function validSeverity(value: unknown): number | null {
  return typeof value === "number" && value >= 1 && value <= 10 ? value : null;
}

function normalizeTag(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function positiveOrDefault(value: unknown, fallback: number) {
  return typeof value === "number" && value > 0 ? value : fallback;
}

function roundScore(value: number) {
  return Math.round(value * 1000) / 1000;
}
