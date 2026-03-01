"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { StatusMessage } from "@/components/StatusMessage";
import { Surface } from "@/components/Surface";

export default function BmPage() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving BM...");
    setError("");

    try {
      const formEl = event.currentTarget;
      const fd = new FormData(formEl);

      const payload = {
        type: "bm",
        notes: String(fd.get("notes") || ""),
        fields: {
          bristol: Number(fd.get("bristol") || 4),
          color: String(fd.get("color") || "brown"),
          urgency: fd.get("urgency") === "on"
        }
      };

      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to save BM entry");
      }

      setStatus(`Saved BM entry: ${json.id}`);
      formEl.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("");
    }
  }

  return (
    <>
      <PageHero title="Log BM" subtitle="Record stool details with quick structured fields." />
      <Surface>
        <form onSubmit={onSubmit}>
          <label>
            <a href="https://en.wikipedia.org/wiki/Bristol_stool_scale" target="_blank" rel="noopener noreferrer">
              Bristol (1-7)
            </a>
            <input name="bristol" type="number" min={1} max={7} defaultValue={4} required />
          </label>
          <label>
            Color
            <select name="color" defaultValue="brown">
              <option value="brown">Brown</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="pale">Pale</option>
            </select>
          </label>
          <label className="inline-check">
            <input type="checkbox" name="urgency" />
            Urgency
          </label>
          <label>
            Notes
            <textarea name="notes" placeholder="Optional notes" />
          </label>
          <button type="submit">Save BM</button>
        </form>
      </Surface>

      <StatusMessage status={status} error={error} />
    </>
  );
}
