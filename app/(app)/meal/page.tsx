"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { StatusMessage } from "@/components/StatusMessage";
import { Surface } from "@/components/Surface";
import { compressImage } from "@/lib/compressImage";

export default function MealPage() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [aiSummary, setAiSummary] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving meal...");
    setError("");
    setAiSummary("");

    try {
      const formEl = event.currentTarget;
      const formData = new FormData(formEl);
      const notes = String(formData.get("notes") || "");
      const file = formData.get("image");

      if (!(file instanceof File) || file.size === 0) {
        throw new Error("Photo is required.");
      }

      const compressed = await compressImage(file);
      const outgoing = new FormData();
      outgoing.set("type", "meal");
      outgoing.set("notes", notes);
      outgoing.set("image", compressed, compressed.name);

      const res = await fetch("/api/entries", {
        method: "POST",
        body: outgoing
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to save meal");
      }

      setStatus(`Saved meal: ${json.id}`);
      setAiSummary(json?.ai?.rawTextSummary || "No summary returned.");
      formEl.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("");
    }
  }

  return (
    <>
      <PageHero
        title="Log Meal"
        subtitle="Capture meal photo + notes. AI extraction runs on meal entries."
      />
      <Surface>
        <form onSubmit={onSubmit}>
          <label>
            Photo
            <input name="image" type="file" accept="image/*" capture="environment" required />
          </label>
          <label>
            Notes
            <textarea name="notes" placeholder="What did you eat?" />
          </label>
          <button type="submit">Save Meal</button>
        </form>
      </Surface>

      <StatusMessage status={status} error={error} />

      {aiSummary ? (
        <Surface>
          <h2>AI Summary</h2>
          <p>{aiSummary}</p>
        </Surface>
      ) : null}
    </>
  );
}
