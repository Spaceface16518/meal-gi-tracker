"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import { createGiEvent } from "@/lib/callables";
import { toDatetimeLocalValue } from "@/lib/date";
import { getErrorMessage } from "@/lib/errors";
import { symptomOptions } from "@/components/tracker/constants";
import { SubmitRow } from "@/components/tracker/ui";

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

function StoolTypeIcon({ type }: { type: StoolTypeValue | null }) {
  const fill = type ? "#5f4b32" : "#d6d3d1";
  const stroke = type ? "#3f3323" : "#a8a29e";

  return (
    <svg
      className="h-12 w-20 shrink-0"
      viewBox="0 0 80 48"
      role="img"
      aria-label={type ? `Bristol stool type ${type}` : "No stool type selected"}
    >
      {type === 1 ? (
        <>
          <circle cx="22" cy="26" r="7" fill={fill} stroke={stroke} strokeWidth="2" />
          <circle cx="38" cy="20" r="6" fill={fill} stroke={stroke} strokeWidth="2" />
          <circle cx="52" cy="29" r="7" fill={fill} stroke={stroke} strokeWidth="2" />
          <circle cx="62" cy="18" r="5" fill={fill} stroke={stroke} strokeWidth="2" />
        </>
      ) : null}
      {type === 2 ? (
        <>
          <ellipse cx="40" cy="25" rx="29" ry="11" fill={fill} stroke={stroke} strokeWidth="2" />
          <path d="M18 24c8-8 16 7 24-1s14 6 22-1" fill="none" stroke="#f3efe7" strokeWidth="3" />
        </>
      ) : null}
      {type === 3 ? (
        <>
          <ellipse cx="40" cy="25" rx="30" ry="10" fill={fill} stroke={stroke} strokeWidth="2" />
          <path d="M25 18l5 8M40 16l-3 10M53 19l-5 8" stroke="#f3efe7" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      {type === 4 ? (
        <path
          d="M14 27c8-13 21-16 34-11 10 4 16 1 20 8 4 8-5 15-20 14-12-1-23 5-32-1-4-3-5-6-2-10Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
      ) : null}
      {type === 5 ? (
        <>
          <ellipse cx="24" cy="27" rx="11" ry="9" fill={fill} stroke={stroke} strokeWidth="2" />
          <ellipse cx="43" cy="22" rx="12" ry="9" fill={fill} stroke={stroke} strokeWidth="2" />
          <ellipse cx="57" cy="31" rx="10" ry="8" fill={fill} stroke={stroke} strokeWidth="2" />
        </>
      ) : null}
      {type === 6 ? (
        <>
          <path d="M18 30c-5-9 8-18 17-11 8-8 23 0 18 12 8-1 12 10 4 14H21c-9-1-11-10-3-15Z" fill={fill} stroke={stroke} strokeWidth="2" />
          <path d="M29 22l-6 5M43 20l4 6M53 33l-7 4" stroke="#f3efe7" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : null}
      {type === 7 ? (
        <>
          <ellipse cx="40" cy="29" rx="31" ry="10" fill="#8b6f47" opacity="0.55" />
          <ellipse cx="31" cy="26" rx="9" ry="4" fill={fill} opacity="0.7" />
          <ellipse cx="52" cy="31" rx="11" ry="4" fill={fill} opacity="0.6" />
        </>
      ) : null}
      {!type ? (
        <path
          d="M17 28c7-11 18-14 29-10 8 3 14 1 17 7 4 8-4 14-17 13-10-1-20 4-28-1-4-2-4-6-1-9Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
      ) : null}
    </svg>
  );
}

export function GiEventForm() {
  const [occurredAt, setOccurredAt] = useState(toDatetimeLocalValue(new Date()));
  const [severity, setSeverity] = useState(4);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [stoolType, setStoolType] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<MessageTone>("info");
  const selectedStoolType = getStoolType(stoolType);

  function toggleSymptom(symptom: string) {
    setSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setMessageTone("info");

    const occurredAtDate = new Date(occurredAt);
    if (Number.isNaN(occurredAtDate.getTime())) {
      setMessageTone("error");
      setMessage("Choose a valid event time.");
      setBusy(false);
      return;
    }

    if (symptoms.length === 0 && !stoolType) {
      setMessageTone("error");
      setMessage("Choose a symptom or stool type.");
      setBusy(false);
      return;
    }

    try {
      await createGiEvent({
        occurredAt: occurredAtDate.toISOString(),
        severity,
        symptoms,
        notes: notes.trim() || undefined,
        stoolType: stoolType ? Number(stoolType) : undefined,
        durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
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
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">GI event</h2>
          <p className="text-sm text-stone-500">Record timing, severity, and symptoms.</p>
        </div>
        <Activity className="mt-1 text-emerald-950" size={20} aria-hidden />
      </div>

      <form className="grid gap-4" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Occurred at
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="datetime-local"
              value={occurredAt}
              onChange={(event) => setOccurredAt(event.target.value)}
              required
            />
          </label>

          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Severity: {severity}
            <input
              className="h-11 accent-emerald-950"
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(event) => setSeverity(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">Symptoms</span>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`h-9 rounded-md border px-3 text-sm font-medium transition ${
                  symptoms.includes(symptom)
                    ? "border-emerald-950 bg-emerald-950 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2 text-sm font-medium text-stone-700 sm:col-span-1">
            <a
              className="w-fit underline decoration-stone-300 underline-offset-4 transition hover:text-emerald-900 hover:decoration-emerald-900"
              href={bristolScaleUrl}
              target="_blank"
              rel="noreferrer"
            >
              Stool type
            </a>
            <div className="rounded-lg border border-stone-300 bg-white p-3">
              <div className="mb-3 flex min-h-14 items-center gap-3">
                <StoolTypeIcon type={selectedStoolType?.value ?? null} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-semibold text-stone-900">
                      {selectedStoolType ? `Type ${selectedStoolType.value}` : "Not set"}
                    </p>
                    {selectedStoolType ? (
                      <button
                        type="button"
                        onClick={() => setStoolType("")}
                        className="rounded px-1.5 py-0.5 text-xs font-semibold text-stone-500 transition hover:bg-stone-100 hover:text-stone-700"
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>
                  <p className="line-clamp-2 text-xs font-medium text-stone-500">
                    {selectedStoolType?.label ?? "Move slider to set"}
                  </p>
                </div>
              </div>
              <input
                className="h-6 w-full accent-emerald-950"
                type="range"
                min="1"
                max="7"
                step="1"
                value={stoolType || "4"}
                onPointerDown={() => setStoolType((current) => current || "4")}
                onChange={(event) => setStoolType(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    !stoolType &&
                    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)
                  ) {
                    setStoolType("4");
                  }
                }}
                aria-label="Bristol stool type"
              />
              <div className="mt-1 flex justify-between text-[11px] font-medium text-stone-400">
                <span>1</span>
                <span>7</span>
              </div>
            </div>
          </div>
          <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-1">
            Minutes
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="number"
              min="1"
              max="1440"
              value={durationMinutes}
              onChange={(event) => setDurationMinutes(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-1">
            Notes
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
        </div>

        <SubmitRow
          busy={busy}
          disabled={(symptoms.length === 0 && !stoolType) || busy}
          message={message}
          tone={messageTone}
          label="Save event"
        />
      </form>
    </section>
  );
}
