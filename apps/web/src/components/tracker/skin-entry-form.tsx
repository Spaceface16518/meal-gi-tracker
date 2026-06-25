import { createMemo, createSignal, For, Index } from "solid-js";
import { Sparkles } from "lucide-solid";
import { saveSkinEntry } from "@/lib/callables";
import { toDateInputValue, toDatetimeLocalValue } from "@/lib/date";
import { demoReadOnlyMessage } from "@/lib/demo";
import { getErrorMessage } from "@/lib/errors";
import { skinBodyAreaOptions, skinConditionOptions, skinSymptomOptions } from "@/components/tracker/constants";
import { SubmitRow } from "@/components/tracker/ui";
import type { SkinConditionAssessment } from "@/lib/types";

type MessageTone = "info" | "error" | "success";
type SkinMode = "daily" | "timed";

const dailySkinStorageKey = "meal-signal:daily-skin-settings:v1";

function defaultDailyConditions(): SkinConditionAssessment[] {
  return skinConditionOptions.map((condition) => ({ condition, severity: 0, bodyAreas: [] }));
}

function loadDailyConditions() {
  if (typeof window === "undefined") return defaultDailyConditions();

  try {
    const raw = window.localStorage.getItem(dailySkinStorageKey);
    if (!raw) return defaultDailyConditions();
    const parsed = JSON.parse(raw) as Partial<SkinConditionAssessment>[];
    if (!Array.isArray(parsed)) return defaultDailyConditions();
    const saved = new Map(
      parsed
        .filter((item) => typeof item.condition === "string")
        .map((item) => [
          item.condition!,
          {
            condition: item.condition!,
            severity: typeof item.severity === "number" ? Math.min(10, Math.max(0, item.severity)) : 0,
            bodyAreas: Array.isArray(item.bodyAreas)
              ? item.bodyAreas.filter((area): area is string => typeof area === "string" && skinBodyAreaOptions.includes(area))
              : [],
          },
        ]),
    );

    return skinConditionOptions.map((condition) => saved.get(condition) ?? { condition, severity: 0, bodyAreas: [] });
  } catch {
    return defaultDailyConditions();
  }
}

function saveDailyConditions(conditions: SkinConditionAssessment[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(dailySkinStorageKey, JSON.stringify(conditions));
}

function toggleValue(value: string, current: string[]) {
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
}

function AreaChips(props: { selected: string[]; onToggle: (area: string) => void }) {
  return (
    <div class="flex flex-wrap gap-2">
      <For each={skinBodyAreaOptions}>
        {(area) => (
          <button
            type="button"
            onClick={() => props.onToggle(area)}
            classList={{
              "h-8 rounded-md border px-2.5 text-xs font-medium transition": true,
              "border-brand bg-brand text-background": props.selected.includes(area),
              "border-border-strong bg-surface text-muted-strong hover:border-muted": !props.selected.includes(area),
            }}
          >
            {area}
          </button>
        )}
      </For>
    </div>
  );
}

export function SkinEntryForm(props: { readOnly?: boolean }) {
  const [mode, setMode] = createSignal<SkinMode>("daily");
  const [localDate, setLocalDate] = createSignal(toDateInputValue(new Date()));
  const [occurredAt, setOccurredAt] = createSignal(toDatetimeLocalValue(new Date()));
  const [severity, setSeverity] = createSignal(4);
  const [symptoms, setSymptoms] = createSignal<string[]>([]);
  const [bodyAreas, setBodyAreas] = createSignal<string[]>([]);
  const [conditions, setConditions] = createSignal<SkinConditionAssessment[]>(loadDailyConditions());
  const [durationMinutes, setDurationMinutes] = createSignal("");
  const [notes, setNotes] = createSignal("");
  const [busy, setBusy] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [messageTone, setMessageTone] = createSignal<MessageTone>("info");
  const canSave = createMemo(() => !busy() && (mode() === "daily" || symptoms().length > 0));

  function updateConditionSeverity(condition: string, value: number) {
    setConditions((current) =>
      current.map((item) => item.condition === condition ? { ...item, severity: value } : item),
    );
  }

  function toggleConditionArea(condition: string, area: string) {
    setConditions((current) =>
      current.map((item) =>
        item.condition === condition ? { ...item, bodyAreas: toggleValue(area, item.bodyAreas) } : item,
      ),
    );
  }

  async function submit(event: Event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setMessageTone("info");

    if (props.readOnly) {
      setMessage(demoReadOnlyMessage);
      setBusy(false);
      return;
    }

    const isDaily = mode() === "daily";
    if (!isDaily && symptoms().length === 0) {
      setMessageTone("error");
      setMessage("Choose at least one skin symptom.");
      setBusy(false);
      return;
    }

    const occurredAtDate = new Date(occurredAt());
    if (!isDaily && Number.isNaN(occurredAtDate.getTime())) {
      setMessageTone("error");
      setMessage("Choose a valid observation time.");
      setBusy(false);
      return;
    }

    try {
      await saveSkinEntry({
        entryType: mode(),
        severity: isDaily ? undefined : severity(),
        symptoms: isDaily ? undefined : symptoms(),
        bodyAreas: isDaily ? undefined : bodyAreas(),
        conditions: isDaily ? conditions() : undefined,
        notes: notes().trim() || undefined,
        durationMinutes: !isDaily && durationMinutes() ? Number(durationMinutes()) : undefined,
        localDate: isDaily ? localDate() : undefined,
        occurredAt: isDaily ? undefined : occurredAtDate.toISOString(),
      });
      if (isDaily) saveDailyConditions(conditions());
      setLocalDate(toDateInputValue(new Date()));
      setOccurredAt(toDatetimeLocalValue(new Date()));
      setSeverity(4);
      setSymptoms([]);
      setBodyAreas([]);
      setDurationMinutes("");
      setNotes("");
      setMessageTone("success");
      setMessage(isDaily ? "Skin day saved." : "Skin observation saved.");
    } catch (err) {
      setMessageTone("error");
      setMessage(getErrorMessage(err, "Skin entry could not be saved."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div class="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold">Skin</h2>
          <p class="text-sm text-muted">Record daily skin quality or a specific observation.</p>
        </div>
        <Sparkles class="mt-1 text-brand" size={20} aria-hidden />
      </div>

      <form class="grid gap-4" onSubmit={submit}>
        <div class="grid grid-cols-2 gap-1 rounded-lg border border-border bg-surface-muted p-1">
          <button
            type="button"
            onClick={() => setMode("daily")}
            classList={{
              "h-10 rounded-md text-sm font-semibold transition": true,
              "bg-brand text-background shadow-sm": mode() === "daily",
              "text-muted-strong hover:bg-surface": mode() !== "daily",
            }}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => setMode("timed")}
            classList={{
              "h-10 rounded-md text-sm font-semibold transition": true,
              "bg-brand text-background shadow-sm": mode() === "timed",
              "text-muted-strong hover:bg-surface": mode() !== "timed",
            }}
          >
            Time
          </button>
        </div>

        {mode() === "daily" ? (
          <>
            <label class="grid gap-1 text-sm font-medium text-muted-strong">
              Date
              <input
                class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                type="date"
                value={localDate()}
                onInput={(event) => setLocalDate((event.target as HTMLInputElement).value)}
                required
              />
            </label>

            <div class="grid gap-3">
              <Index each={conditions()}>
                {(condition) => (
                  <article class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3">
                    <div class="grid gap-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-center">
                      <div>
                        <h3 class="text-sm font-semibold capitalize">{condition().condition}</h3>
                        <p class="text-xs font-medium text-muted">Severity {condition().severity}</p>
                      </div>
                      <input
                        class="h-8 accent-brand"
                        type="range"
                        min="0"
                        max="10"
                        value={condition().severity}
                        aria-label={`${condition().condition} severity`}
                        onInput={(event) =>
                          updateConditionSeverity(condition().condition, Number((event.target as HTMLInputElement).value))
                        }
                      />
                    </div>
                    <AreaChips
                      selected={condition().bodyAreas}
                      onToggle={(area) => toggleConditionArea(condition().condition, area)}
                    />
                  </article>
                )}
              </Index>
            </div>
          </>
        ) : (
          <>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="grid gap-1 text-sm font-medium text-muted-strong">
                Observed at
                <input
                  class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  type="datetime-local"
                  value={occurredAt()}
                  onInput={(event) => setOccurredAt((event.target as HTMLInputElement).value)}
                  required
                />
              </label>

              <label class="grid gap-1 text-sm font-medium text-muted-strong">
                Severity: {severity()}
                <input
                  class="h-11 accent-brand"
                  type="range"
                  min="1"
                  max="10"
                  value={severity()}
                  onInput={(event) => setSeverity(Number((event.target as HTMLInputElement).value))}
                />
              </label>
            </div>

            <div class="grid gap-2">
              <span class="text-sm font-medium text-muted-strong">Symptoms</span>
              <div class="flex flex-wrap gap-2">
                <For each={skinSymptomOptions}>
                  {(symptom) => (
                    <button
                      type="button"
                      onClick={() => setSymptoms((current) => toggleValue(symptom, current))}
                      classList={{
                        "h-9 rounded-md border px-3 text-sm font-medium transition": true,
                        "border-brand bg-brand text-background": symptoms().includes(symptom),
                        "border-border-strong bg-surface text-muted-strong hover:border-muted": !symptoms().includes(symptom),
                      }}
                    >
                      {symptom}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class="grid gap-2">
              <span class="text-sm font-medium text-muted-strong">Body areas</span>
              <AreaChips selected={bodyAreas()} onToggle={(area) => setBodyAreas((current) => toggleValue(area, current))} />
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="grid gap-1 text-sm font-medium text-muted-strong">
                Minutes
                <input
                  class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  type="number"
                  min="1"
                  max="1440"
                  value={durationMinutes()}
                  onInput={(event) => setDurationMinutes((event.target as HTMLInputElement).value)}
                />
              </label>
              <label class="grid gap-1 text-sm font-medium text-muted-strong">
                Notes
                <input
                  class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  value={notes()}
                  maxLength={1000}
                  onInput={(event) => setNotes((event.target as HTMLInputElement).value)}
                />
              </label>
            </div>
          </>
        )}

        {mode() === "daily" ? (
          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Notes
            <input
              class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              value={notes()}
              maxLength={1000}
              onInput={(event) => setNotes((event.target as HTMLInputElement).value)}
            />
          </label>
        ) : null}

        <SubmitRow
          busy={busy()}
          disabled={!canSave()}
          message={message()}
          tone={messageTone()}
          label={mode() === "daily" ? "Save skin day" : "Save observation"}
        />
      </form>
    </section>
  );
}
