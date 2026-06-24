import { createMemo, createSignal } from "solid-js";
import { Activity, BarChart3, CalendarClock, FileJson, RefreshCcw, Trash2, Utensils } from "lucide-solid";
import { reanalyzeMeal } from "@/lib/callables";
import { formatRelativeTime } from "@/lib/date";
import { exportMealJson } from "@/lib/export-data";
import { getErrorMessage } from "@/lib/errors";
import { deleteGiEvent, deleteMeal } from "@/lib/firestore";
import { demoReadOnlyMessage } from "@/lib/demo";
import type { CorrelationAnalysis, GiEvent, Meal } from "@/lib/types";
import { EmptyState, Stat, StatusMessage } from "@/components/tracker/ui";

function describeEvent(event: GiEvent) {
  const details = [...event.symptoms];
  if (event.stoolType) details.push(`stool type ${event.stoolType}`);
  return details.length ? details.join(", ") : "No details recorded";
}

export function StatsStrip(props: {
  meals: Meal[];
  events: GiEvent[];
  analysis: CorrelationAnalysis | null;
}) {
  const topIrritant = createMemo(() => {
    const counts = new Map<string, number>();
    for (const meal of props.meals) {
      for (const irritant of meal.analysis.irritants ?? []) {
        counts.set(irritant.name, (counts.get(irritant.name) ?? 0) + 1);
      }
    }

    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None";
  });

  return (
    <section class="grid grid-cols-3 gap-2">
      <Stat icon={<Utensils size={17} />} label="Meals" value={props.meals.length.toString()} />
      <Stat icon={<Activity size={17} />} label="Events" value={props.events.length.toString()} />
      <Stat icon={<BarChart3 size={17} />} label="Signal" value={props.analysis ? topIrritant() : "Pending"} />
    </section>
  );
}

export function RecentEntries(props: { uid: string; meals: Meal[]; events: GiEvent[]; readOnly?: boolean }) {
  const [reanalyzingMealId, setReanalyzingMealId] = createSignal("");
  const [deletingEntryId, setDeletingEntryId] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isError, setIsError] = createSignal(false);
  const combined = createMemo(() =>
    [
      ...props.meals.map((meal) => ({ kind: "meal" as const, date: meal.eatenAt, meal })),
      ...props.events.map((event) => ({ kind: "event" as const, date: event.occurredAt, event })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 12),
  );

  async function redoMealAnalysis(mealId: string) {
    setReanalyzingMealId(mealId);
    setMessage("");
    setIsError(false);

    if (props.readOnly) {
      setMessage(demoReadOnlyMessage);
      setReanalyzingMealId("");
      return;
    }

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

  async function removeEntry(entry: { kind: "meal"; id: string } | { kind: "event"; id: string }) {
    const label = entry.kind === "meal" ? "meal" : "event";
    if (props.readOnly) {
      setMessage(demoReadOnlyMessage);
      setIsError(false);
      return;
    }

    const confirmed = window.confirm(`Delete this ${label}? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingEntryId(`${entry.kind}-${entry.id}`);
    setMessage("");
    setIsError(false);

    try {
      if (entry.kind === "meal") {
        await deleteMeal(props.uid, entry.id);
      } else {
        await deleteGiEvent(props.uid, entry.id);
      }
      setMessage(`${label === "meal" ? "Meal" : "Event"} deleted.`);
    } catch (err) {
      setIsError(true);
      setMessage(getErrorMessage(err, `The ${label} could not be deleted.`));
    } finally {
      setDeletingEntryId("");
    }
  }

  return (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div class="mb-3 flex items-center gap-2">
        <CalendarClock size={18} class="text-brand" aria-hidden />
        <h2 class="font-semibold">Recent</h2>
      </div>
      {message() ? (
        <div class="mb-3">
          <StatusMessage tone={isError() ? "error" : "info"}>{message()}</StatusMessage>
        </div>
      ) : null}
      {combined().length ? (
        <div class="grid gap-3">
          {combined().map((item) =>
            item.kind === "meal" ? (
              <article class="rounded-lg bg-surface-muted p-3">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="text-sm font-semibold">{item.meal.analysis.mealName}</h3>
                  <div class="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => redoMealAnalysis(item.meal.id)}
                      disabled={reanalyzingMealId() === item.meal.id}
                      class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Redo meal analysis"
                      title="Redo meal analysis"
                    >
                      <RefreshCcw
                        size={14}
                        class={reanalyzingMealId() === item.meal.id ? "animate-spin" : ""}
                        aria-hidden
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => exportMealJson(item.meal)}
                      class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Export meal JSON"
                      title="Export meal JSON"
                    >
                      <FileJson size={14} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeEntry({ kind: "meal", id: item.meal.id })}
                      disabled={deletingEntryId() === `meal-${item.meal.id}`}
                      class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Delete meal"
                      title="Delete meal"
                    >
                      <Trash2 size={14} aria-hidden />
                    </button>
                    <span class="text-xs text-muted">{formatRelativeTime(item.date)}</span>
                  </div>
                </div>
                <p class="mt-1 line-clamp-2 text-sm text-muted-strong">{item.meal.interpretedText}</p>
                <div class="mt-2 flex flex-wrap gap-1">
                  {item.meal.analysis.irritants.slice(0, 3).map((irritant) => (
                    <span
                      class="rounded bg-surface px-2 py-1 text-xs font-medium text-muted-strong"
                    >
                      {irritant.name}
                    </span>
                  ))}
                </div>
              </article>
            ) : (
              <article class="rounded-lg bg-surface-muted p-3">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="text-sm font-semibold">Severity {item.event.severity}</h3>
                  <div class="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeEntry({ kind: "event", id: item.event.id })}
                      disabled={deletingEntryId() === `event-${item.event.id}`}
                      class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Delete event"
                      title="Delete event"
                    >
                      <Trash2 size={14} aria-hidden />
                    </button>
                    <span class="text-xs text-muted">{formatRelativeTime(item.date)}</span>
                  </div>
                </div>
                <p class="mt-1 text-sm text-muted-strong">{describeEvent(item.event)}</p>
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
