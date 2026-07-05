export const lagWindows = [
  { key: "0-2h", startHours: 0, endHours: 2 },
  { key: "2-6h", startHours: 2, endHours: 6 },
  { key: "6-12h", startHours: 6, endHours: 12 },
  { key: "12-24h", startHours: 12, endHours: 24 },
  { key: "24-48h", startHours: 24, endHours: 48 },
  { key: "48-120h", startHours: 48, endHours: 120 },
] as const;

export type LagWindow = (typeof lagWindows)[number]["key"];
export type EvidenceGrade = "insufficient" | "weak" | "moderate" | "stronger";

type DateLike = Date | string | number | { toDate?: () => Date; seconds?: number };

export type AssociationMeal = {
  id?: string;
  eatenAt?: DateLike;
  status?: string;
  analysis?: unknown;
};

export type AssociationEvent = {
  id?: string;
  occurredAt?: DateLike;
  symptoms?: string[];
};

export type WindowStat = {
  window: LagWindow;
  exposedEventRate: number;
  baselineEventRate: number;
  riskRatio: number | null;
  riskDifference: number;
};

export type SymptomAssociation = WindowStat & {
  symptom: string;
  eventCountAfterExposure: number;
};

export type WindowedAssociationFinding = WindowStat & {
  irritant: string;
  exposureCount: number;
  eventCountAfterExposure: number;
  strongestWindow: LagWindow;
  evidenceGrade: EvidenceGrade;
  symptomBreakdown: SymptomAssociation[];
  windowStats: WindowStat[];
  recentExampleMealIds: string[];
  followedEventIds: string[];
  toleratedExposureMealIds: string[];
};

type Exposure = { id?: string; at: number; weight: number; irritants: Map<string, number> };
type TimedEvent = { id?: string; at: number; symptoms: string[] };

export function computeWindowedAssociationStats(
  meals: AssociationMeal[],
  events: AssociationEvent[],
): WindowedAssociationFinding[] {
  const exposures = meals
    .filter((meal) => meal.status === "analyzed")
    .map(toExposure)
    .filter((meal): meal is Exposure => meal !== null);
  const timedEvents = events.map(toEvent).filter((event): event is TimedEvent => event !== null);
  const irritants = [...new Set(exposures.flatMap((meal) => [...meal.irritants.keys()]))];
  const symptoms = [...new Set(timedEvents.flatMap((event) => event.symptoms))].sort();

  return irritants.map((irritant) => {
    const weightedExposureCount = exposures.reduce(
      (sum, meal) => sum + (meal.irritants.get(irritant) ?? 0), 0,
    );
    const windowStats = lagWindows.map((window) =>
      computeWindow(exposures, timedEvents, irritant, window),
    );
    const strongest = [...windowStats].sort(
      (a, b) => b.riskDifference - a.riskDifference || b.exposedEventRate - a.exposedEventRate,
    )[0];
    const associatedEvents = eventsAfter(exposures, timedEvents, irritant, strongest.window);
    const exposedMeals = exposures.filter((meal) => meal.irritants.has(irritant));
    const followedIds = new Set(associatedEvents.map((event) => event.id).filter(Boolean));
    const tolerated = exposedMeals.filter(
      (meal) => eventsInWindow(meal.at, timedEvents, strongest.window).length === 0,
    );
    const symptomBreakdown = symptoms
      .map((symptom) => {
        const stat = computeWindow(
          exposures,
          timedEvents.filter((event) => event.symptoms.includes(symptom)),
          irritant,
          lagWindows.find((item) => item.key === strongest.window)!,
        );
        return { symptom, ...stat, eventCountAfterExposure: round(eventsAfter(exposures, timedEvents.filter((event) => event.symptoms.includes(symptom)), irritant, strongest.window).length) };
      })
      .filter((item) => item.exposedEventRate > 0 || item.baselineEventRate > 0)
      .sort((a, b) => b.riskDifference - a.riskDifference);

    return {
      irritant,
      exposureCount: round(weightedExposureCount),
      eventCountAfterExposure: associatedEvents.length,
      exposedEventRate: strongest.exposedEventRate,
      baselineEventRate: strongest.baselineEventRate,
      riskRatio: strongest.riskRatio,
      riskDifference: strongest.riskDifference,
      strongestWindow: strongest.window,
      window: strongest.window,
      evidenceGrade: grade(weightedExposureCount, strongest.riskDifference, strongest.riskRatio),
      symptomBreakdown,
      windowStats,
      recentExampleMealIds: exposedMeals.slice(0, 5).flatMap((meal) => meal.id ? [meal.id] : []),
      followedEventIds: [...followedIds].slice(0, 8) as string[],
      toleratedExposureMealIds: tolerated.slice(0, 5).flatMap((meal) => meal.id ? [meal.id] : []),
    };
  }).sort((a, b) => gradeRank(b.evidenceGrade) - gradeRank(a.evidenceGrade) || b.riskDifference - a.riskDifference || b.exposureCount - a.exposureCount || a.irritant.localeCompare(b.irritant));
}

function computeWindow(exposures: Exposure[], events: TimedEvent[], irritant: string, window: (typeof lagWindows)[number]): WindowStat {
  let exposedWeight = 0;
  let exposedEvents = 0;
  let baselineCount = 0;
  let baselineEvents = 0;
  for (const meal of exposures) {
    const hasEvent = eventsInWindow(meal.at, events, window.key).length > 0 ? 1 : 0;
    const weight = meal.irritants.get(irritant);
    if (weight != null) {
      exposedWeight += weight;
      exposedEvents += weight * hasEvent;
    } else {
      baselineCount += 1;
      baselineEvents += hasEvent;
    }
  }
  const exposedRate = exposedWeight ? exposedEvents / exposedWeight : 0;
  const baselineRate = baselineCount ? baselineEvents / baselineCount : 0;
  return {
    window: window.key,
    exposedEventRate: round(exposedRate),
    baselineEventRate: round(baselineRate),
    riskRatio: baselineRate > 0 ? round(exposedRate / baselineRate) : null,
    riskDifference: round(exposedRate - baselineRate),
  };
}

function eventsAfter(exposures: Exposure[], events: TimedEvent[], irritant: string, window: LagWindow) {
  const found = new Map<string, TimedEvent>();
  for (const meal of exposures.filter((item) => item.irritants.has(irritant))) {
    for (const event of eventsInWindow(meal.at, events, window)) found.set(event.id ?? `${event.at}`, event);
  }
  return [...found.values()];
}

function eventsInWindow(at: number, events: TimedEvent[], key: LagWindow) {
  const window = lagWindows.find((item) => item.key === key)!;
  return events.filter((event) => {
    const hours = (event.at - at) / 3_600_000;
    return hours >= window.startHours && hours < window.endHours;
  });
}

function toExposure(meal: AssociationMeal): Exposure | null {
  const at = toMillis(meal.eatenAt);
  if (at == null) return null;
  const irritants = new Map<string, number>();
  const rows = (meal.analysis as { irritants?: unknown[] } | undefined)?.irritants;
  if (Array.isArray(rows)) for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const item = row as Record<string, unknown>;
    const name = typeof item.name === "string" ? item.name.trim().toLowerCase() : "";
    if (name) irritants.set(name, Math.max(irritants.get(name) ?? 0, clamp(item.confidence)));
  }
  return { id: meal.id, at, weight: 1, irritants };
}

function toEvent(event: AssociationEvent): TimedEvent | null {
  const at = toMillis(event.occurredAt);
  if (at == null) return null;
  return { id: event.id, at, symptoms: (event.symptoms ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean) };
}

function toMillis(value: DateLike | undefined) {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.getTime();
  if (typeof value === "string" || typeof value === "number") { const n = new Date(value).getTime(); return Number.isNaN(n) ? null : n; }
  if (value?.toDate) return value.toDate().getTime();
  return typeof value?.seconds === "number" ? value.seconds * 1000 : null;
}

function clamp(value: unknown) { return typeof value === "number" && Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.5; }
function round(value: number) { return Math.round(value * 1000) / 1000; }
function grade(count: number, difference: number, ratio: number | null): EvidenceGrade {
  if (count < 3) return "insufficient";
  if (count < 6) return "weak";
  if (count < 10) return "moderate";
  return difference >= 0.1 && (ratio == null || ratio >= 1.2) ? "stronger" : "moderate";
}
function gradeRank(value: EvidenceGrade) { return ({ insufficient: 0, weak: 1, moderate: 2, stronger: 3 })[value]; }
