"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { StatusMessage } from "@/components/StatusMessage";
import { Surface } from "@/components/Surface";

export default function GiPage() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving GI event...");
    setError("");

    try {
      const formEl = event.currentTarget;
      const fd = new FormData(formEl);

      const payload = {
        type: "gi_event",
        notes: String(fd.get("notes") || ""),
        fields: {
          severity: Number(fd.get("severity") || 0),
          locations: fd.getAll("locations").map(String)
        }
      };

      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to save GI event");
      }

      setStatus(`Saved GI event: ${json.id}`);
      formEl.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("");
    }
  }

  return (
    <>
      <PageHero title="Log GI Event" subtitle="Record GI symptoms and context." />
      <Surface>
        <form onSubmit={onSubmit}>
          <label>
            Severity (0-10)
            <input name="severity" type="number" min={0} max={10} defaultValue={3} required />
          </label>
          <fieldset>
            <legend>Location</legend>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="upper_stomach" />
              Upper stomach
            </label>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="lower_abdomen" />
              Lower abdomen
            </label>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="cramps" />
              Cramps
            </label>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="bloating" />
              Bloating
            </label>
          </fieldset>
          <label>
            Notes
            <textarea name="notes" placeholder="Optional notes" />
          </label>
          <button type="submit">Save GI Event</button>
        </form>
      </Surface>

      <StatusMessage status={status} error={error} />
    </>
  );
}
