import { createEffect, createMemo, createSignal, For } from "solid-js";
import {
  Activity,
  ArrowLeft,
  CalendarClock,
  Check,
  Edit3,
  Plus,
  RefreshCcw,
  Save,
  Sparkles,
  Trash2,
  Utensils,
} from "lucide-solid";
import { A } from "@solidjs/router";
import type { JSX } from "solid-js";
import { reanalyzeMeal } from "@/lib/callables";
import { toDatetimeLocalValue } from "@/lib/date";
import { demoReadOnlyMessage } from "@/lib/demo";
import { getErrorMessage } from "@/lib/errors";
import { updateGiEvent, updateMeal, updateSkinEntry } from "@/lib/firestore";
import { skinBodyAreaOptions, skinSymptomOptions, symptomOptions } from "@/components/tracker/constants";
import { StatusMessage } from "@/components/tracker/ui";
import type { GiEvent, IrritantSignal, Meal, SkinEntry } from "@/lib/types";

export type RecentEntry =
  | { kind: "meal"; date: Date; meal: Meal }
  | { kind: "event"; date: Date; event: GiEvent }
  | { kind: "skin"; date: Date; skinEntry: SkinEntry };

type MessageTone = "info" | "error";

const irritantCategories: IrritantSignal["category"][] = [
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
];

function trimOrUndefined(value: string) {
  const trimmed = value.trim();
  return trimmed || undefined;
}

function detailTitle(entry: RecentEntry) {
  if (entry.kind === "meal") return entry.meal.analysis.mealName;
  if (entry.kind === "event") return `Severity ${entry.event.severity}`;
  return `${entry.skinEntry.entryType === "daily" ? "Skin day" : "Skin observation"} · Severity ${entry.skinEntry.severity}`;
}

function DetailSection(props: { title: string; icon: "meal" | "event" | "skin" | "record"; children: JSX.Element }) {
  return (
    <section class="rounded-lg border border-border bg-surface p-4">
      <div class="mb-3 flex items-center gap-2">
        {props.icon === "meal" ? (
          <Utensils size={17} class="text-brand" aria-hidden />
        ) : props.icon === "event" ? (
          <Activity size={17} class="text-brand" aria-hidden />
        ) : props.icon === "skin" ? (
          <Sparkles size={17} class="text-brand" aria-hidden />
        ) : (
          <CalendarClock size={17} class="text-brand" aria-hidden />
        )}
        <h3 class="text-sm font-semibold">{props.title}</h3>
      </div>
      {props.children}
    </section>
  );
}

function PillList(props: { values: string[]; empty: string }) {
  return props.values.length ? (
    <div class="flex flex-wrap gap-2">
      <For each={props.values}>
        {(value) => (
          <span class="rounded-md bg-surface-muted px-2.5 py-1.5 text-sm font-medium text-muted-strong">
            {value}
          </span>
        )}
      </For>
    </div>
  ) : (
    <p class="text-sm text-muted">{props.empty}</p>
  );
}

function DetailField(props: { label: string; value: string }) {
  return (
    <div class="flex items-start justify-between gap-4 border-b border-border py-2 last:border-0">
      <dt class="text-sm text-muted">{props.label}</dt>
      <dd class="text-right text-sm font-medium text-muted-strong">{props.value}</dd>
    </div>
  );
}

function MealDetailView(props: { meal: Meal }) {
  const description = () => props.meal.interpretedText.trim() || props.meal.rawInput;

  return (
    <div class="grid gap-3">
      <DetailSection title="Description" icon="meal">
        <p class="whitespace-pre-wrap text-sm leading-6 text-muted-strong">{description()}</p>
      </DetailSection>

      <DetailSection title="Detected foods" icon="meal">
        <PillList values={props.meal.analysis.foods} empty="No foods identified" />
      </DetailSection>

      <DetailSection title="Analysis" icon="record">
        {props.meal.analysis.summary ? (
          <p class="mb-3 whitespace-pre-wrap text-sm leading-6 text-muted-strong">{props.meal.analysis.summary}</p>
        ) : null}
        <div class="grid gap-2">
          <For each={props.meal.analysis.irritants}>
            {(irritant) => (
              <article class="rounded-md bg-surface-muted p-3">
                <div class="flex flex-wrap items-center gap-2">
                  <h4 class="text-sm font-semibold">{irritant.name}</h4>
                  <span class="rounded bg-surface px-2 py-0.5 text-xs font-medium text-muted">
                    {irritant.category}
                  </span>
                  <span class="text-xs text-muted">{Math.round(irritant.confidence * 100)}%</span>
                </div>
                <p class="mt-1 text-sm text-muted-strong">{irritant.evidence}</p>
              </article>
            )}
          </For>
        </div>
      </DetailSection>

      {props.meal.notes ? (
        <DetailSection title="Notes" icon="record">
          <p class="whitespace-pre-wrap text-sm leading-6 text-muted-strong">{props.meal.notes}</p>
        </DetailSection>
      ) : null}

      <DetailSection title="Record" icon="record">
        <dl>
          <DetailField label="Input" value={props.meal.inputMode} />
          <DetailField label="Status" value={props.meal.status.replace(/_/g, " ")} />
          <DetailField label="Eaten" value={props.meal.eatenAt.toLocaleString()} />
          <DetailField label="Updated" value={props.meal.updatedAt.toLocaleString()} />
          {props.meal.reanalyzedAt ? (
            <DetailField label="Reanalyzed" value={props.meal.reanalyzedAt.toLocaleString()} />
          ) : null}
        </dl>
      </DetailSection>
    </div>
  );
}

function EventDetailView(props: { event: GiEvent }) {
  return (
    <div class="grid gap-3">
      <DetailSection title="Symptoms" icon="event">
        <PillList values={props.event.symptoms} empty="No symptoms recorded" />
      </DetailSection>

      {props.event.notes ? (
        <DetailSection title="Notes" icon="record">
          <p class="whitespace-pre-wrap text-sm leading-6 text-muted-strong">{props.event.notes}</p>
        </DetailSection>
      ) : null}

      <DetailSection title="Record" icon="record">
        <dl>
          <DetailField label="Severity" value={`${props.event.severity}/10`} />
          <DetailField label="Stool type" value={props.event.stoolType ? `Type ${props.event.stoolType}` : "Not set"} />
          <DetailField
            label="Duration"
            value={props.event.durationMinutes ? `${props.event.durationMinutes} min` : "Not set"}
          />
          <DetailField label="Occurred" value={props.event.occurredAt.toLocaleString()} />
          <DetailField label="Created" value={props.event.createdAt.toLocaleString()} />
        </dl>
      </DetailSection>
    </div>
  );
}

function SkinDetailView(props: { entry: SkinEntry }) {
  return (
    <div class="grid gap-3">
      <DetailSection title="Symptoms" icon="skin">
        <PillList values={props.entry.symptoms} empty="No skin symptoms recorded" />
      </DetailSection>

      <DetailSection title="Body areas" icon="skin">
        <PillList values={props.entry.bodyAreas} empty="No body areas recorded" />
      </DetailSection>

      {props.entry.notes ? (
        <DetailSection title="Notes" icon="record">
          <p class="whitespace-pre-wrap text-sm leading-6 text-muted-strong">{props.entry.notes}</p>
        </DetailSection>
      ) : null}

      <DetailSection title="Record" icon="record">
        <dl>
          <DetailField label="Type" value={props.entry.entryType === "daily" ? "Daily skin state" : "Timed observation"} />
          <DetailField label="Severity" value={`${props.entry.severity}/10`} />
          {props.entry.entryType === "daily" ? (
            <DetailField label="Date" value={props.entry.localDate ?? "Not set"} />
          ) : (
            <DetailField label="Occurred" value={props.entry.occurredAt?.toLocaleString() ?? "Not set"} />
          )}
          <DetailField
            label="Duration"
            value={props.entry.durationMinutes ? `${props.entry.durationMinutes} min` : "Not set"}
          />
          <DetailField label="Updated" value={props.entry.updatedAt.toLocaleString()} />
          <DetailField label="Created" value={props.entry.createdAt.toLocaleString()} />
        </dl>
      </DetailSection>
    </div>
  );
}

function TextInput(props: {
  label: string;
  value: string;
  onInput: (value: string) => void;
  maxLength?: number;
  required?: boolean;
}) {
  return (
    <label class="grid gap-1 text-sm font-medium text-muted-strong">
      {props.label}
      <input
        class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        value={props.value}
        maxLength={props.maxLength}
        required={props.required}
        onInput={(event) => props.onInput((event.target as HTMLInputElement).value)}
      />
    </label>
  );
}

function TextAreaInput(props: {
  label: string;
  value: string;
  onInput: (value: string) => void;
  maxLength?: number;
}) {
  return (
    <label class="grid gap-1 text-sm font-medium text-muted-strong">
      {props.label}
      <textarea
        class="min-h-24 rounded-lg border border-border-strong bg-surface px-3 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        value={props.value}
        maxLength={props.maxLength}
        onInput={(event) => props.onInput((event.target as HTMLTextAreaElement).value)}
      />
    </label>
  );
}

function MealEditForm(props: {
  meal: Meal;
  readOnly?: boolean;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
  onReanalyzingChange: (isReanalyzing: boolean) => void;
}) {
  const [name, setName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [eatenAt, setEatenAt] = createSignal("");
  const [notes, setNotes] = createSignal("");
  const [foods, setFoods] = createSignal<string[]>([]);
  const [summary, setSummary] = createSignal("");
  const [irritants, setIrritants] = createSignal<IrritantSignal[]>([]);
  const [saving, setSaving] = createSignal(false);

  createEffect(() => {
    const meal = props.meal;
    setName(meal.analysis.mealName);
    setDescription(meal.interpretedText.trim() || meal.rawInput);
    setEatenAt(toDatetimeLocalValue(meal.eatenAt));
    setNotes(meal.notes ?? "");
    setFoods([...meal.analysis.foods]);
    setSummary(meal.analysis.summary);
    setIrritants(meal.analysis.irritants.map((irritant) => ({ ...irritant })));
  });

  const canSave = createMemo(() => {
    return !saving() && name().trim().length > 0 && description().trim().length > 2 &&
      foods().every((food) => food.trim().length > 0) &&
      irritants().every((irritant) => irritant.name.trim().length > 0);
  });

  function updateFood(index: number, value: string) {
    setFoods((current) => current.map((food, currentIndex) => currentIndex === index ? value.slice(0, 80) : food));
  }

  function removeFood(index: number) {
    setFoods((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function updateIrritant(index: number, value: Partial<IrritantSignal>) {
    setIrritants((current) =>
      current.map((irritant, currentIndex) =>
        currentIndex === index
          ? {
              ...irritant,
              ...value,
              name: value.name?.slice(0, 80) ?? irritant.name,
              evidence: value.evidence?.slice(0, 500) ?? irritant.evidence,
            }
          : irritant,
      ),
    );
  }

  function removeIrritant(index: number) {
    setIrritants((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function mealUpdatePayload() {
    const eatenAtDate = new Date(eatenAt());
    if (Number.isNaN(eatenAtDate.getTime())) {
      props.onError("Choose a valid meal time.");
      return null;
    }

    return {
      rawInput: description().trim(),
      interpretedText: description().trim(),
      eatenAt: eatenAtDate,
      notes: trimOrUndefined(notes()),
      analysis: {
        mealName: name().trim(),
        foods: foods().map((food) => food.trim()).filter(Boolean),
        irritants: irritants().map((irritant) => ({
          ...irritant,
          name: irritant.name.trim(),
          evidence: irritant.evidence.trim(),
          confidence: Math.min(1, Math.max(0, Number(irritant.confidence) || 0)),
        })),
        summary: summary().trim(),
      },
    };
  }

  async function saveDraft() {
    const payload = mealUpdatePayload();
    if (!payload) return false;

    await updateMeal(props.meal.uid, props.meal.id, payload);
    return true;
  }

  async function save(event: Event) {
    event.preventDefault();
    props.onError("");

    if (props.readOnly) {
      props.onSaved(demoReadOnlyMessage);
      return;
    }

    setSaving(true);
    try {
      const saved = await saveDraft();
      if (!saved) return;
      props.onSaved("Meal saved.");
    } catch (err) {
      props.onError(getErrorMessage(err, "Meal could not be saved."));
    } finally {
      setSaving(false);
    }
  }

  async function regenerate() {
    props.onError("");

    if (props.readOnly) {
      props.onSaved(demoReadOnlyMessage);
      return;
    }

    if (!canSave()) return;

    props.onReanalyzingChange(true);
    try {
      const saved = await saveDraft();
      if (!saved) return;
      await reanalyzeMeal(props.meal.id);
      props.onSaved("Meal analysis refreshed.");
    } catch (err) {
      props.onError(getErrorMessage(err, "Meal analysis could not be refreshed."));
    } finally {
      props.onReanalyzingChange(false);
    }
  }

  return (
    <form class="grid gap-4" onSubmit={save}>
      <div class="grid gap-4 sm:grid-cols-2">
        <TextInput label="Meal name" value={name()} onInput={setName} maxLength={120} required />
        <label class="grid gap-1 text-sm font-medium text-muted-strong">
          Eaten at
          <input
            class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            type="datetime-local"
            value={eatenAt()}
            onInput={(event) => setEatenAt((event.target as HTMLInputElement).value)}
            required
          />
        </label>
      </div>

      <TextAreaInput label="Description" value={description()} onInput={setDescription} maxLength={8000} />
      <TextInput label="Notes" value={notes()} onInput={setNotes} maxLength={1000} />

      <section class="grid gap-2">
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-sm font-semibold">Detected foods</h3>
          <button
            type="button"
            onClick={() => setFoods((current) => [...current, ""])}
            class="grid size-8 place-items-center rounded-md border border-border-strong text-muted-strong transition hover:border-muted"
            aria-label="Add food"
            title="Add food"
          >
            <Plus size={16} aria-hidden />
          </button>
        </div>
        <div class="grid gap-2">
          <For each={foods()}>
            {(food, index) => (
              <div class="flex gap-2">
                <input
                  class="h-10 min-w-0 flex-1 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  value={food}
                  maxLength={80}
                  onInput={(event) => updateFood(index(), (event.target as HTMLInputElement).value)}
                />
                <button
                  type="button"
                  onClick={() => removeFood(index())}
                  class="grid size-10 place-items-center rounded-md border border-border-strong text-muted-strong transition hover:border-danger hover:text-danger"
                  aria-label="Remove food"
                  title="Remove food"
                >
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
            )}
          </For>
        </div>
      </section>

      <TextAreaInput label="Analysis summary" value={summary()} onInput={setSummary} maxLength={4000} />

      <section class="grid gap-2">
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-sm font-semibold">Irritants</h3>
          <button
            type="button"
            onClick={() =>
              setIrritants((current) => [
                ...current,
                { name: "", category: "other", confidence: 1, evidence: "Manually edited in Meal Signal." },
              ])
            }
            class="grid size-8 place-items-center rounded-md border border-border-strong text-muted-strong transition hover:border-muted"
            aria-label="Add irritant"
            title="Add irritant"
          >
            <Plus size={16} aria-hidden />
          </button>
        </div>
        <div class="grid gap-3">
          <For each={irritants()}>
            {(irritant, index) => (
              <article class="grid gap-3 rounded-lg border border-border bg-surface-muted p-3">
                <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_150px_120px_40px]">
                  <input
                    class="h-10 min-w-0 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    value={irritant.name}
                    maxLength={80}
                    aria-label="Irritant name"
                    onInput={(event) => updateIrritant(index(), { name: (event.target as HTMLInputElement).value })}
                  />
                  <select
                    class="h-10 rounded-lg border border-border-strong bg-surface px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    value={irritant.category}
                    aria-label="Irritant category"
                    onChange={(event) =>
                      updateIrritant(index(), {
                        category: (event.target as HTMLSelectElement).value as IrritantSignal["category"],
                      })
                    }
                  >
                    <For each={irritantCategories}>
                      {(category) => <option value={category}>{category}</option>}
                    </For>
                  </select>
                  <label class="grid gap-1 text-xs font-medium text-muted">
                    Confidence
                    <input
                      class="accent-brand"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={irritant.confidence}
                      onChange={(event) =>
                        updateIrritant(index(), { confidence: Number((event.target as HTMLInputElement).value) })
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeIrritant(index())}
                    class="grid size-10 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-danger hover:text-danger"
                    aria-label="Remove irritant"
                    title="Remove irritant"
                  >
                    <Trash2 size={15} aria-hidden />
                  </button>
                </div>
                <textarea
                  class="min-h-20 rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  value={irritant.evidence}
                  maxLength={500}
                  aria-label="Irritant evidence"
                  onInput={(event) => updateIrritant(index(), { evidence: (event.target as HTMLTextAreaElement).value })}
                />
              </article>
            )}
          </For>
        </div>
      </section>

      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={regenerate}
          class="flex h-11 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 text-sm font-semibold text-muted-strong transition hover:border-muted"
        >
          <RefreshCcw size={16} aria-hidden />
          Regenerate analysis
        </button>
        <button
          type="submit"
          disabled={!canSave()}
          class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving() ? "Saving..." : "Save changes"}
          {saving() ? <RefreshCcw class="animate-spin" size={16} aria-hidden /> : <Save size={16} aria-hidden />}
        </button>
      </div>
    </form>
  );
}

function EventEditForm(props: {
  event: GiEvent;
  readOnly?: boolean;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [occurredAt, setOccurredAt] = createSignal("");
  const [severity, setSeverity] = createSignal(4);
  const [symptoms, setSymptoms] = createSignal<string[]>([]);
  const [notes, setNotes] = createSignal("");
  const [stoolType, setStoolType] = createSignal("");
  const [durationMinutes, setDurationMinutes] = createSignal("");
  const [saving, setSaving] = createSignal(false);

  createEffect(() => {
    const event = props.event;
    setOccurredAt(toDatetimeLocalValue(event.occurredAt));
    setSeverity(event.severity);
    setSymptoms([...event.symptoms]);
    setNotes(event.notes ?? "");
    setStoolType(event.stoolType?.toString() ?? "");
    setDurationMinutes(event.durationMinutes?.toString() ?? "");
  });

  const canSave = createMemo(() => !saving() && (symptoms().length > 0 || stoolType()));

  function toggleSymptom(symptom: string) {
    setSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
    );
  }

  async function save(event: Event) {
    event.preventDefault();

    if (props.readOnly) {
      props.onSaved(demoReadOnlyMessage);
      return;
    }

    const occurredAtDate = new Date(occurredAt());
    if (Number.isNaN(occurredAtDate.getTime())) {
      props.onError("Choose a valid event time.");
      return;
    }

    setSaving(true);
    try {
      await updateGiEvent(props.event.uid, props.event.id, {
        occurredAt: occurredAtDate,
        severity: severity(),
        symptoms: symptoms(),
        notes: trimOrUndefined(notes()),
        stoolType: stoolType() ? Number(stoolType()) : undefined,
        durationMinutes: durationMinutes() ? Number(durationMinutes()) : undefined,
      });
      props.onSaved("Event saved.");
    } catch (err) {
      props.onError(getErrorMessage(err, "Event could not be saved."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form class="grid gap-4" onSubmit={save}>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="grid gap-1 text-sm font-medium text-muted-strong">
          Occurred at
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
            onChange={(event) => setSeverity(Number((event.target as HTMLInputElement).value))}
          />
        </label>
      </div>

      <div class="grid gap-2">
        <span class="text-sm font-medium text-muted-strong">Symptoms</span>
        <div class="flex flex-wrap gap-2">
          <For each={symptomOptions}>
            {(symptom) => (
              <button
                type="button"
                onClick={() => toggleSymptom(symptom)}
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

      <div class="grid gap-4 sm:grid-cols-3">
        <label class="grid gap-1 text-sm font-medium text-muted-strong">
          Stool type
          <select
            class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            value={stoolType()}
            onChange={(event) => setStoolType((event.target as HTMLSelectElement).value)}
          >
            <option value="">Not set</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
            <option value="3">Type 3</option>
            <option value="4">Type 4</option>
            <option value="5">Type 5</option>
            <option value="6">Type 6</option>
            <option value="7">Type 7</option>
          </select>
        </label>
        <TextInput label="Minutes" value={durationMinutes()} onInput={setDurationMinutes} />
        <TextInput label="Notes" value={notes()} onInput={setNotes} maxLength={1000} />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          disabled={!canSave()}
          class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving() ? "Saving..." : "Save changes"}
          {saving() ? <RefreshCcw class="animate-spin" size={16} aria-hidden /> : <Save size={16} aria-hidden />}
        </button>
      </div>
    </form>
  );
}

function SkinEditForm(props: {
  entry: SkinEntry;
  readOnly?: boolean;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [occurredAt, setOccurredAt] = createSignal("");
  const [severity, setSeverity] = createSignal(4);
  const [symptoms, setSymptoms] = createSignal<string[]>([]);
  const [bodyAreas, setBodyAreas] = createSignal<string[]>([]);
  const [notes, setNotes] = createSignal("");
  const [durationMinutes, setDurationMinutes] = createSignal("");
  const [saving, setSaving] = createSignal(false);

  createEffect(() => {
    const entry = props.entry;
    setOccurredAt(entry.occurredAt ? toDatetimeLocalValue(entry.occurredAt) : "");
    setSeverity(entry.severity);
    setSymptoms([...entry.symptoms]);
    setBodyAreas([...entry.bodyAreas]);
    setNotes(entry.notes ?? "");
    setDurationMinutes(entry.durationMinutes?.toString() ?? "");
  });

  const canSave = createMemo(() => !saving() && symptoms().length > 0);

  function toggleValue(value: string, current: () => string[], setCurrent: (next: string[]) => void) {
    setCurrent(
      current().includes(value)
        ? current().filter((item) => item !== value)
        : [...current(), value],
    );
  }

  async function save(event: Event) {
    event.preventDefault();

    if (props.readOnly) {
      props.onSaved(demoReadOnlyMessage);
      return;
    }

    const occurredAtDate = props.entry.entryType === "timed" ? new Date(occurredAt()) : undefined;
    if (props.entry.entryType === "timed" && (!occurredAtDate || Number.isNaN(occurredAtDate.getTime()))) {
      props.onError("Choose a valid observation time.");
      return;
    }

    setSaving(true);
    try {
      await updateSkinEntry(props.entry.uid, props.entry.id, {
        entryType: props.entry.entryType,
        severity: severity(),
        symptoms: symptoms(),
        bodyAreas: bodyAreas(),
        notes: trimOrUndefined(notes()),
        durationMinutes: durationMinutes() ? Number(durationMinutes()) : undefined,
        localDate: props.entry.entryType === "daily" ? props.entry.localDate : undefined,
        occurredAt: occurredAtDate,
      });
      props.onSaved("Skin entry saved.");
    } catch (err) {
      props.onError(getErrorMessage(err, "Skin entry could not be saved."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form class="grid gap-4" onSubmit={save}>
      <div class="grid gap-4 sm:grid-cols-2">
        {props.entry.entryType === "daily" ? (
          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Date
            <input
              class="h-11 rounded-lg border border-border-strong bg-surface-muted px-3 text-base text-muted-strong outline-none"
              type="date"
              value={props.entry.localDate ?? ""}
              disabled
            />
          </label>
        ) : (
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
        )}
        <label class="grid gap-1 text-sm font-medium text-muted-strong">
          Severity: {severity()}
          <input
            class="h-11 accent-brand"
            type="range"
            min="1"
            max="10"
            value={severity()}
            onChange={(event) => setSeverity(Number((event.target as HTMLInputElement).value))}
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
                onClick={() => toggleValue(symptom, symptoms, setSymptoms)}
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
        <div class="flex flex-wrap gap-2">
          <For each={skinBodyAreaOptions}>
            {(area) => (
              <button
                type="button"
                onClick={() => toggleValue(area, bodyAreas, setBodyAreas)}
                classList={{
                  "h-9 rounded-md border px-3 text-sm font-medium transition": true,
                  "border-brand bg-brand text-background": bodyAreas().includes(area),
                  "border-border-strong bg-surface text-muted-strong hover:border-muted": !bodyAreas().includes(area),
                }}
              >
                {area}
              </button>
            )}
          </For>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        {props.entry.entryType === "timed" ? (
          <TextInput label="Minutes" value={durationMinutes()} onInput={setDurationMinutes} />
        ) : null}
        <TextInput label="Notes" value={notes()} onInput={setNotes} maxLength={1000} />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          disabled={!canSave()}
          class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving() ? "Saving..." : "Save changes"}
          {saving() ? <RefreshCcw class="animate-spin" size={16} aria-hidden /> : <Save size={16} aria-hidden />}
        </button>
      </div>
    </form>
  );
}

export function EntryDetailPage(props: {
  entry: RecentEntry;
  readOnly?: boolean;
}) {
  const [editing, setEditing] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [messageTone, setMessageTone] = createSignal<MessageTone>("info");
  const [reanalyzing, setReanalyzing] = createSignal(false);

  function setInfo(value: string) {
    setMessageTone("info");
    setMessage(value);
  }

  function setError(value: string) {
    setMessageTone("error");
    setMessage(value);
  }

  return (
      <section class="overflow-hidden rounded-lg border border-border bg-background shadow-sm">
        <header class="flex items-start justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-5">
          <div class="min-w-0 flex-1">
            <A
              href="/"
              class="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-strong transition hover:text-brand"
            >
              <ArrowLeft size={15} aria-hidden />
              Back to log
            </A>
            <div class="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-muted">
              {props.entry.kind === "meal" ? (
                <Utensils size={14} aria-hidden />
              ) : props.entry.kind === "event" ? (
                <Activity size={14} aria-hidden />
              ) : (
                <Sparkles size={14} aria-hidden />
              )}
              {props.entry.kind === "meal" ? "Meal" : props.entry.kind === "event" ? "GI event" : "Skin"}
            </div>
            <h2 id="entry-detail-title" class="truncate text-lg font-semibold">{detailTitle(props.entry)}</h2>
            <p class="text-sm text-muted">{props.entry.date.toLocaleString()}</p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setEditing((value) => !value);
              }}
              class="grid size-9 place-items-center rounded-md border border-border-strong bg-surface text-muted-strong transition hover:border-muted"
              aria-label={editing() ? "View entry" : "Edit entry"}
              title={editing() ? "View entry" : "Edit entry"}
            >
              {editing() ? <Check size={17} aria-hidden /> : <Edit3 size={17} aria-hidden />}
            </button>
          </div>
        </header>

        <div class="p-4 sm:p-5">
          {message() ? (
            <div class="mb-4">
              <StatusMessage tone={messageTone()}>{message()}</StatusMessage>
            </div>
          ) : null}
          {reanalyzing() ? (
            <div class="mb-4">
              <StatusMessage>
                <span class="inline-flex items-center gap-2">
                  <RefreshCcw class="animate-spin" size={14} aria-hidden />
                  Regenerating meal analysis...
                </span>
              </StatusMessage>
            </div>
          ) : null}

          {editing() ? (
            props.entry.kind === "meal" ? (
              <MealEditForm
                meal={props.entry.meal}
                readOnly={props.readOnly}
                onSaved={(value) => {
                  setInfo(value);
                  setEditing(false);
                }}
                onError={setError}
                onReanalyzingChange={setReanalyzing}
              />
            ) : props.entry.kind === "event" ? (
              <EventEditForm
                event={props.entry.event}
                readOnly={props.readOnly}
                onSaved={(value) => {
                  setInfo(value);
                  setEditing(false);
                }}
                onError={setError}
              />
            ) : (
              <SkinEditForm
                entry={props.entry.skinEntry}
                readOnly={props.readOnly}
                onSaved={(value) => {
                  setInfo(value);
                  setEditing(false);
                }}
                onError={setError}
              />
            )
          ) : props.entry.kind === "meal" ? (
            <MealDetailView meal={props.entry.meal} />
          ) : props.entry.kind === "event" ? (
            <EventDetailView event={props.entry.event} />
          ) : (
            <SkinDetailView entry={props.entry.skinEntry} />
          )}
        </div>
      </section>
  );
}
