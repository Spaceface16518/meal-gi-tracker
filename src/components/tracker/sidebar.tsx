"use client";

import { useMemo, useState } from "react";
import { Activity, BarChart3, CalendarClock, RefreshCcw, Utensils } from "lucide-react";
import { reanalyzeMeal } from "@/lib/callables";
import { formatRelativeTime } from "@/lib/date";
import { getErrorMessage } from "@/lib/errors";
import type { CorrelationAnalysis, GiEvent, Meal } from "@/lib/types";
import { EmptyState, Stat, StatusMessage } from "@/components/tracker/ui";

function describeEvent(event: GiEvent) {
  const details = [...event.symptoms];
  if (event.stoolType) details.push(`stool type ${event.stoolType}`);
  return details.length ? details.join(", ") : "No details recorded";
}

export function StatsStrip({
  meals,
  events,
  analysis,
}: {
  meals: Meal[];
  events: GiEvent[];
  analysis: CorrelationAnalysis | null;
}) {
  const topIrritant = useMemo(() => {
    const counts = new Map<string, number>();
    for (const meal of meals) {
      for (const irritant of meal.analysis.irritants ?? []) {
        counts.set(irritant.name, (counts.get(irritant.name) ?? 0) + 1);
      }
    }

    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None";
  }, [meals]);

  return (
    <section className="grid grid-cols-3 gap-2">
      <Stat icon={<Utensils size={17} />} label="Meals" value={meals.length.toString()} />
      <Stat icon={<Activity size={17} />} label="Events" value={events.length.toString()} />
      <Stat icon={<BarChart3 size={17} />} label="Signal" value={analysis ? topIrritant : "Pending"} />
    </section>
  );
}

export function RecentEntries({ meals, events }: { meals: Meal[]; events: GiEvent[] }) {
  const [reanalyzingMealId, setReanalyzingMealId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const combined = [
    ...meals.map((meal) => ({ kind: "meal" as const, date: meal.eatenAt, meal })),
    ...events.map((event) => ({ kind: "event" as const, date: event.occurredAt, event })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 12);

  async function redoMealAnalysis(mealId: string) {
    setReanalyzingMealId(mealId);
    setMessage("");
    setIsError(false);

    try {
      await reanalyzeMeal(mealId);
      setMessage("Meal analysis refreshed.");
    } catch (err) {
      setIsError(true);
      setMessage(getErrorMessage(err, "Meal analysis could not be refreshed."));
    } finally {
      setReanalyzingMealId("");
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <CalendarClock size={18} className="text-emerald-950" aria-hidden />
        <h2 className="font-semibold">Recent</h2>
      </div>
      {message ? (
        <div className="mb-3">
          <StatusMessage tone={isError ? "error" : "info"}>{message}</StatusMessage>
        </div>
      ) : null}
      {combined.length ? (
        <div className="grid gap-3">
          {combined.map((item) =>
            item.kind === "meal" ? (
              <article key={`meal-${item.meal.id}`} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">{item.meal.analysis.mealName}</h3>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => redoMealAnalysis(item.meal.id)}
                      disabled={reanalyzingMealId === item.meal.id}
                      className="grid size-7 place-items-center rounded-md border border-stone-300 bg-white text-stone-600 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Redo meal analysis"
                      title="Redo meal analysis"
                    >
                      <RefreshCcw
                        size={14}
                        className={reanalyzingMealId === item.meal.id ? "animate-spin" : ""}
                        aria-hidden
                      />
                    </button>
                    <span className="text-xs text-stone-500">{formatRelativeTime(item.date)}</span>
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-stone-600">{item.meal.interpretedText}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.meal.analysis.irritants.slice(0, 3).map((irritant) => (
                    <span
                      key={`${item.meal.id}-${irritant.name}`}
                      className="rounded bg-white px-2 py-1 text-xs font-medium text-stone-600"
                    >
                      {irritant.name}
                    </span>
                  ))}
                </div>
              </article>
            ) : (
              <article key={`event-${item.event.id}`} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">Severity {item.event.severity}</h3>
                  <span className="shrink-0 text-xs text-stone-500">{formatRelativeTime(item.date)}</span>
                </div>
                <p className="mt-1 text-sm text-stone-600">{describeEvent(item.event)}</p>
              </article>
            ),
          )}
        </div>
      ) : (
        <EmptyState icon={<CalendarClock size={22} />} title="No entries yet" />
      )}
    </section>
  );
}
