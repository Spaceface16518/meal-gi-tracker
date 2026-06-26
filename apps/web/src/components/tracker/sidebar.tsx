import { createMemo, createSignal } from "solid-js";
import {
  Activity,
  BarChart3,
  CalendarClock,
  FileJson,
  RefreshCcw,
  Sparkles,
  Trash2,
  Utensils,
} from "lucide-solid";
import { useLocation, useNavigate } from "@solidjs/router";
import { reanalyzeMeal } from "@/lib/callables";
import { formatRelativeTime } from "@/lib/date";
import { exportMealJson } from "@/lib/export-data";
import { getErrorMessage } from "@/lib/errors";
import { deleteGiEvent, deleteMeal, deleteSkinEntry } from "@/lib/firestore";
import { demoReadOnlyMessage } from "@/lib/demo";
import type { CorrelationAnalysis, GiEvent, Meal, SkinEntry } from "@/lib/types";
import type { RecentEntry } from "@/components/tracker/entry-detail-page";
import { EmptyState, Stat, StatusMessage } from "@/components/tracker/ui";

function describeEvent(event: GiEvent) {
  const details = [...event.symptoms];
  if (event.stoolType) details.push(`stool type ${event.stoolType}`);
  return details.length ? details.join(", ") : "No details recorded";
}

function describeSkinEntry(entry: SkinEntry) {
  if (entry.entryType === "daily") {
    return entry.conditions.length
      ? entry.conditions
          .map((condition) => `${condition.condition} ${condition.severity}/10`)
          .join(" · ")
      : "No condition assessments recorded";
  }

  const details = [...entry.symptoms];
  if (entry.bodyAreas.length) details.push(entry.bodyAreas.join(", "));
  return details.length ? details.join(" · ") : "No skin details recorded";
}

export function StatsStrip(props: {
  meals: Meal[];
  events: GiEvent[];
  skinEntries: SkinEntry[];
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
    <section class="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Stat icon={<Utensils size={17} />} label="Meals" value={props.meals.length.toString()} />
      <Stat icon={<Activity size={17} />} label="GI" value={props.events.length.toString()} />
      <Stat
        icon={<Sparkles size={17} />}
        label="Skin"
        value={props.skinEntries.length.toString()}
      />
      <Stat
        icon={<BarChart3 size={17} />}
        label="Signal"
        value={props.analysis ? topIrritant() : "Pending"}
      />
    </section>
  );
}

export function RecentEntries(props: {
  uid: string;
  meals: Meal[];
  events: GiEvent[];
  skinEntries: SkinEntry[];
  readOnly?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [reanalyzingMealId, setReanalyzingMealId] = createSignal("");
  const [deletingEntryId, setDeletingEntryId] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isError, setIsError] = createSignal(false);
  const combined = createMemo<RecentEntry[]>(() =>
    [
      ...props.meals.map((meal) => ({ kind: "meal" as const, date: meal.eatenAt, meal })),
      ...props.events.map((event) => ({ kind: "event" as const, date: event.occurredAt, event })),
      ...props.skinEntries.map((skinEntry) => ({
        kind: "skin" as const,
        date: skinEntry.sortAt,
        skinEntry,
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime()),
  );

  function entryPath(entry: RecentEntry) {
    if (entry.kind === "meal") return `/entries/meals/${entry.meal.id}`;
    if (entry.kind === "event") return `/entries/events/${entry.event.id}`;
    return `/entries/skin/${entry.skinEntry.id}`;
  }

  function openEntry(entry: RecentEntry) {
    navigate(entryPath(entry));
  }

  function isSelectedEntry(entry: RecentEntry) {
    return location.pathname === entryPath(entry);
  }

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

  async function removeEntry(
    entry:
      | { kind: "meal"; id: string }
      | { kind: "event"; id: string }
      | { kind: "skin"; id: string },
  ) {
    const label = entry.kind === "meal" ? "meal" : entry.kind === "event" ? "event" : "skin entry";
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
      } else if (entry.kind === "event") {
        await deleteGiEvent(props.uid, entry.id);
      } else {
        await deleteSkinEntry(props.uid, entry.id);
      }
      setMessage(
        `${entry.kind === "meal" ? "Meal" : entry.kind === "event" ? "Event" : "Skin entry"} deleted.`,
      );
    } catch (err) {
      setIsError(true);
      setMessage(getErrorMessage(err, `The ${label} could not be deleted.`));
    } finally {
      setDeletingEntryId("");
    }
  }

  return (
    <>
      <section class="rounded-lg border border-border bg-surface p-4 shadow-sm">
        <div class="mb-3 flex items-center gap-2">
          <CalendarClock size={18} class="text-brand" aria-hidden />
          <h2 class="font-semibold">Past entries</h2>
        </div>
        {message() ? (
          <div class="mb-3">
            <StatusMessage tone={isError() ? "error" : "info"}>{message()}</StatusMessage>
          </div>
        ) : null}
        {combined().length ? (
          <div class="grid gap-3">
            {combined().map((item) => {
              if (item.kind === "meal") {
                return (
                  <article
                    classList={{
                      "cursor-pointer rounded-lg border p-3 transition hover:bg-surface-accent": true,
                      "border-brand bg-brand-soft shadow-sm": isSelectedEntry(item),
                      "border-transparent bg-surface-muted": !isSelectedEntry(item),
                    }}
                    role="button"
                    aria-current={isSelectedEntry(item) ? "page" : undefined}
                    tabIndex={0}
                    onClick={() => openEntry(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") openEntry(item);
                    }}
                  >
                    <div class="flex items-start justify-between gap-3">
                      <h3 class="text-sm font-semibold">{item.meal.analysis.mealName}</h3>
                      <div class="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            redoMealAnalysis(item.meal.id);
                          }}
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
                          onClick={(event) => {
                            event.stopPropagation();
                            exportMealJson(item.meal);
                          }}
                          class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label="Export meal JSON"
                          title="Export meal JSON"
                        >
                          <FileJson size={14} aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeEntry({ kind: "meal", id: item.meal.id });
                          }}
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
                    <p class="mt-1 line-clamp-2 text-sm text-muted-strong">
                      {item.meal.interpretedText}
                    </p>
                    <div class="mt-2 flex flex-wrap gap-1">
                      {item.meal.analysis.irritants.slice(0, 3).map((irritant) => (
                        <span class="rounded bg-surface px-2 py-1 text-xs font-medium text-muted-strong">
                          {irritant.name}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              }
              if (item.kind === "event") {
                return (
                  <article
                    classList={{
                      "cursor-pointer rounded-lg border p-3 transition hover:bg-surface-accent": true,
                      "border-brand bg-brand-soft shadow-sm": isSelectedEntry(item),
                      "border-transparent bg-surface-muted": !isSelectedEntry(item),
                    }}
                    role="button"
                    aria-current={isSelectedEntry(item) ? "page" : undefined}
                    tabIndex={0}
                    onClick={() => openEntry(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") openEntry(item);
                    }}
                  >
                    <div class="flex items-start justify-between gap-3">
                      <h3 class="text-sm font-semibold">Severity {item.event.severity}</h3>
                      <div class="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeEntry({ kind: "event", id: item.event.id });
                          }}
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
                );
              }
              return (
                <article
                  classList={{
                    "cursor-pointer rounded-lg border p-3 transition hover:bg-surface-accent": true,
                    "border-brand bg-brand-soft shadow-sm": isSelectedEntry(item),
                    "border-transparent bg-surface-muted": !isSelectedEntry(item),
                  }}
                  role="button"
                  aria-current={isSelectedEntry(item) ? "page" : undefined}
                  tabIndex={0}
                  onClick={() => openEntry(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") openEntry(item);
                  }}
                >
                  <div class="flex items-start justify-between gap-3">
                    <h3 class="text-sm font-semibold">
                      {item.skinEntry.entryType === "daily"
                        ? "Skin day"
                        : `Skin observation · Severity ${item.skinEntry.severity ?? 1}`}
                    </h3>
                    <div class="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeEntry({ kind: "skin", id: item.skinEntry.id });
                        }}
                        disabled={deletingEntryId() === `skin-${item.skinEntry.id}`}
                        class="grid size-7 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label="Delete skin entry"
                        title="Delete skin entry"
                      >
                        <Trash2 size={14} aria-hidden />
                      </button>
                      <span class="text-xs text-muted">
                        {item.skinEntry.entryType === "daily" && item.skinEntry.localDate
                          ? new Date(`${item.skinEntry.localDate}T12:00:00`).toLocaleDateString()
                          : formatRelativeTime(item.date)}
                      </span>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-muted-strong">{describeSkinEntry(item.skinEntry)}</p>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState icon={<CalendarClock size={22} />} title="No entries yet" />
        )}
      </section>
    </>
  );
}
