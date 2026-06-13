"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import { createGiEvent } from "@/lib/callables";
import { toDatetimeLocalValue } from "@/lib/date";
import { getErrorMessage } from "@/lib/errors";
import { symptomOptions } from "@/components/tracker/constants";
import { SubmitRow } from "@/components/tracker/ui";

type MessageTone = "info" | "error" | "success";

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
          <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-1">
            Stool type
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="number"
              min="1"
              max="7"
              value={stoolType}
              onChange={(event) => setStoolType(event.target.value)}
            />
          </label>
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
