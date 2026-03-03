"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { compressImage } from "@/lib/compressImage";
import { TimezoneFields } from "@/components/forms/TimezoneFields";

type MealActionResult = {
  ok: boolean;
  id?: string;
  aiSummary?: string;
  error?: string;
};

export function MealForm({
  action
}: {
  action: (formData: FormData) => Promise<MealActionResult>;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<MealActionResult | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;

    startTransition(async () => {
      const formData = new FormData(formEl);
      const image = formData.get("image");

      if (image instanceof File && image.size > 0) {
        try {
          const compressed = await compressImage(image);
          formData.set("image", compressed, compressed.name);
        } catch (error) {
          setResult({
            ok: false,
            error: error instanceof Error ? error.message : "Failed to compress image"
          });
          return;
        }
      }

      const nextResult = await action(formData);
      setResult(nextResult);

      if (nextResult.ok) {
        formEl.reset();
      }
    });
  }

  return (
    <>
      <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
        <TimezoneFields />
        <label>
          Photo (optional)
          <input name="image" type="file" accept="image/*" capture="environment" />
        </label>
        <label>
          Notes
          <textarea name="notes" placeholder="What did you eat?" />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Saving meal + running summary..." : "Save Meal"}
        </button>
      </form>

      {result?.ok ? (
        <div className="status-wrap">
          <p className="status-ok">Saved meal: {result.id}</p>
          <p>
            <Link href={`/entry/${result.id}`}>View entry</Link> | <Link href="/search">View history</Link>
          </p>
          {result.aiSummary ? (
            <div className="surface">
              <h2>AI Summary</h2>
              <p>{result.aiSummary}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {result?.ok === false ? (
        <div className="status-wrap">
          <p className="status-error">{result.error || "Submission failed"}</p>
        </div>
      ) : null}
    </>
  );
}
