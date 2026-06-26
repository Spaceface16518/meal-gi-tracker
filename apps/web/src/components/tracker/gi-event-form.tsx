import { createSignal } from "solid-js";
import { Activity } from "lucide-solid";
import { createGiEvent } from "@/lib/callables";
import { toDatetimeLocalValue } from "@/lib/date";
import { getErrorMessage } from "@/lib/errors";
import { symptomOptions } from "@/components/tracker/constants";
import { SubmitRow } from "@/components/tracker/ui";
import { demoReadOnlyMessage } from "@/lib/demo";

type MessageTone = "info" | "error" | "success";

const bristolScaleUrl = "https://en.wikipedia.org/wiki/Bristol_stool_scale";

const stoolTypes = [
  { value: 1, label: "Separate hard lumps" },
  { value: 2, label: "Lumpy sausage" },
  { value: 3, label: "Cracked sausage" },
  { value: 4, label: "Smooth soft sausage" },
  { value: 5, label: "Soft blobs" },
  { value: 6, label: "Mushy pieces" },
  { value: 7, label: "Watery" },
] as const;

type StoolTypeValue = (typeof stoolTypes)[number]["value"];

function getStoolType(value: string) {
  const parsed = Number(value);
  return stoolTypes.find((type) => type.value === parsed) ?? null;
}

function StoolTypeIcon(props: { type: StoolTypeValue | null }) {
  const fill = () => (props.type ? "#5f4b32" : "#d6d3d1");
  const stroke = () => (props.type ? "#3f3323" : "#a8a29e");

  return (
    <svg
      class="h-12 w-20 shrink-0"
      viewBox="0 0 80 48"
      role="img"
      aria-label={props.type ? `Bristol stool type ${props.type}` : "No stool type selected"}
    >
      {props.type === 1 ? (
        <>
          <circle cx="22" cy="26" r="7" fill={fill()} stroke={stroke()} stroke-width="2" />
          <circle cx="38" cy="20" r="6" fill={fill()} stroke={stroke()} stroke-width="2" />
          <circle cx="52" cy="29" r="7" fill={fill()} stroke={stroke()} stroke-width="2" />
          <circle cx="62" cy="18" r="5" fill={fill()} stroke={stroke()} stroke-width="2" />
        </>
      ) : null}
      {props.type === 2 ? (
        <>
          <ellipse
            cx="40"
            cy="25"
            rx="29"
            ry="11"
            fill={fill()}
            stroke={stroke()}
            stroke-width="2"
          />
          <path d="M18 24c8-8 16 7 24-1s14 6 22-1" fill="none" stroke="#f3efe7" stroke-width="3" />
        </>
      ) : null}
      {props.type === 3 ? (
        <>
          <ellipse
            cx="40"
            cy="25"
            rx="30"
            ry="10"
            fill={fill()}
            stroke={stroke()}
            stroke-width="2"
          />
          <path
            d="M25 18l5 8M40 16l-3 10M53 19l-5 8"
            stroke="#f3efe7"
            stroke-width="3"
            stroke-linecap="round"
          />
        </>
      ) : null}
      {props.type === 4 ? (
        <path
          d="M14 27c8-13 21-16 34-11 10 4 16 1 20 8 4 8-5 15-20 14-12-1-23 5-32-1-4-3-5-6-2-10Z"
          fill={fill()}
          stroke={stroke()}
          stroke-width="2"
        />
      ) : null}
      {props.type === 5 ? (
        <>
          <ellipse
            cx="24"
            cy="27"
            rx="11"
            ry="9"
            fill={fill()}
            stroke={stroke()}
            stroke-width="2"
          />
          <ellipse
            cx="43"
            cy="22"
            rx="12"
            ry="9"
            fill={fill()}
            stroke={stroke()}
            stroke-width="2"
          />
          <ellipse
            cx="57"
            cy="31"
            rx="10"
            ry="8"
            fill={fill()}
            stroke={stroke()}
            stroke-width="2"
          />
        </>
      ) : null}
      {props.type === 6 ? (
        <>
          <path
            d="M18 30c-5-9 8-18 17-11 8-8 23 0 18 12 8-1 12 10 4 14H21c-9-1-11-10-3-15Z"
            fill={fill()}
            stroke={stroke()}
            stroke-width="2"
          />
          <path
            d="M29 22l-6 5M43 20l4 6M53 33l-7 4"
            stroke="#f3efe7"
            stroke-width="2"
            stroke-linecap="round"
          />
        </>
      ) : null}
      {props.type === 7 ? (
        <>
          <ellipse cx="40" cy="29" rx="31" ry="10" fill="#8b6f47" opacity="0.55" />
          <ellipse cx="31" cy="26" rx="9" ry="4" fill={fill()} opacity="0.7" />
          <ellipse cx="52" cy="31" rx="11" ry="4" fill={fill()} opacity="0.6" />
        </>
      ) : null}
      {!props.type ? (
        <path
          d="M17 28c7-11 18-14 29-10 8 3 14 1 17 7 4 8-4 14-17 13-10-1-20 4-28-1-4-2-4-6-1-9Z"
          fill={fill()}
          stroke={stroke()}
          stroke-width="2"
        />
      ) : null}
    </svg>
  );
}

export function GiEventForm(props: { readOnly?: boolean }) {
  const [occurredAt, setOccurredAt] = createSignal(toDatetimeLocalValue(new Date()));
  const [severity, setSeverity] = createSignal(4);
  const [symptoms, setSymptoms] = createSignal<string[]>([]);
  const [notes, setNotes] = createSignal("");
  const [stoolType, setStoolType] = createSignal("");
  const [durationMinutes, setDurationMinutes] = createSignal("");
  const [busy, setBusy] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [messageTone, setMessageTone] = createSignal<MessageTone>("info");
  const selectedStoolType = () => getStoolType(stoolType());

  function toggleSymptom(symptom: string) {
    const current = symptoms();
    setSymptoms(
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
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

    const occurredAtDate = new Date(occurredAt());
    if (Number.isNaN(occurredAtDate.getTime())) {
      setMessageTone("error");
      setMessage("Choose a valid event time.");
      setBusy(false);
      return;
    }

    if (symptoms().length === 0 && !stoolType()) {
      setMessageTone("error");
      setMessage("Choose a symptom or stool type.");
      setBusy(false);
      return;
    }

    try {
      await createGiEvent({
        occurredAt: occurredAtDate.toISOString(),
        severity: severity(),
        symptoms: symptoms(),
        notes: notes().trim() || undefined,
        stoolType: stoolType() ? Number(stoolType()) : undefined,
        durationMinutes: durationMinutes() ? Number(durationMinutes()) : undefined,
      });
      setOccurredAt(toDatetimeLocalValue(new Date()));
      setSeverity(4);
      setSymptoms([]);
      setNotes("");
      setStoolType("");
      setDurationMinutes("");
      setMessageTone("success");
      setMessage("Event saved.");
    } catch (err) {
      setMessageTone("error");
      setMessage(getErrorMessage(err, "Event could not be saved."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div class="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold">GI event</h2>
          <p class="text-sm text-muted">Record timing, severity, and symptoms.</p>
        </div>
        <Activity class="mt-1 text-brand" size={20} aria-hidden />
      </div>

      <form class="grid gap-4" onSubmit={submit}>
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
              onInput={(event) => setSeverity(Number((event.target as HTMLInputElement).value))}
            />
          </label>
        </div>

        <div class="grid gap-2">
          <span class="text-sm font-medium text-muted-strong">Symptoms</span>
          <div class="flex flex-wrap gap-2">
            {symptomOptions.map((symptom) => (
              <button
                type="button"
                onClick={() => toggleSymptom(symptom)}
                classList={{
                  "h-9 rounded-md border px-3 text-sm font-medium transition": true,
                  "border-brand bg-brand text-background": symptoms().includes(symptom),
                  "border-border-strong bg-surface text-muted-strong hover:border-muted":
                    !symptoms().includes(symptom),
                }}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div class="grid gap-2 text-sm font-medium text-muted-strong sm:col-span-1">
            <a
              class="w-fit underline decoration-border-strong underline-offset-4 transition hover:text-brand hover:decoration-brand"
              href={bristolScaleUrl}
              target="_blank"
              rel="noreferrer"
            >
              Stool type
            </a>
            <div class="rounded-lg border border-border-strong bg-surface p-3">
              <div class="mb-3 flex min-h-14 items-center gap-3">
                <StoolTypeIcon type={selectedStoolType()?.value ?? null} />
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-base font-semibold text-foreground">
                      {selectedStoolType() ? `Type ${selectedStoolType()!.value}` : "Not set"}
                    </p>
                    {selectedStoolType() ? (
                      <button
                        type="button"
                        onClick={() => setStoolType("")}
                        class="rounded px-1.5 py-0.5 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-muted-strong"
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>
                  <p class="line-clamp-2 text-xs font-medium text-muted">
                    {selectedStoolType()?.label ?? "Move slider to set"}
                  </p>
                </div>
              </div>
              <input
                class="h-6 w-full accent-brand"
                type="range"
                min="1"
                max="7"
                step="1"
                value={stoolType() || "4"}
                onPointerDown={() => setStoolType((current) => current || "4")}
                onInput={(event) => setStoolType((event.target as HTMLInputElement).value)}
                onKeyDown={(event) => {
                  if (
                    !stoolType() &&
                    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(
                      (event as KeyboardEvent).key,
                    )
                  ) {
                    setStoolType("4");
                  }
                }}
                aria-label="Bristol stool type"
              />
              <div class="mt-1 flex justify-between text-[11px] font-medium text-muted">
                <span>1</span>
                <span>7</span>
              </div>
            </div>
          </div>
          <label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">
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
          <label class="grid gap-1 text-sm font-medium text-muted-strong sm:col-span-1">
            Notes
            <input
              class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              value={notes()}
              onInput={(event) => setNotes((event.target as HTMLInputElement).value)}
            />
          </label>
        </div>

        <SubmitRow
          busy={busy()}
          disabled={(symptoms().length === 0 && !stoolType()) || busy()}
          message={message()}
          tone={messageTone()}
          label="Save event"
        />
      </form>
    </section>
  );
}
