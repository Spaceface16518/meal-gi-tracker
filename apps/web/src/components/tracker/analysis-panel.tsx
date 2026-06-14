"use client";

import { useState } from "react";
import { BarChart3, CircleAlert, RefreshCcw } from "lucide-react";
import { analyzeCorrelations } from "@/lib/callables";
import { getErrorMessage } from "@/lib/errors";
import type { CorrelationAnalysis } from "@/lib/types";
import { EmptyState, StatusMessage } from "@/components/tracker/ui";

export function AnalysisPanel({
  analysis,
  mealCount,
  eventCount,
}: {
  analysis: CorrelationAnalysis | null;
  mealCount: number;
  eventCount: number;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function runAnalysis() {
    setBusy(true);
    setMessage("");
    setIsError(false);
    try {
      await analyzeCorrelations();
      setMessage("Analysis queued.");
    } catch (err) {
      setIsError(true);
      setMessage(getErrorMessage(err, "Analysis could not be started."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Correlation analysis</h2>
          <p className="text-sm text-muted">
            {analysis
              ? `Updated ${analysis.generatedAt.toLocaleString()}`
              : `${mealCount} meals and ${eventCount} GI events available`}
          </p>
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={busy}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw size={16} className={busy ? "animate-spin" : ""} aria-hidden />
          {busy ? "Starting" : "Run"}
        </button>
      </div>

      {message ? (
        <div className="mb-4">
          <StatusMessage tone={isError ? "error" : "info"}>{message}</StatusMessage>
        </div>
      ) : null}

      {analysis ? (
        <div className="grid gap-4">
          <div className="rounded-lg bg-surface-accent p-4">
            <p className="text-sm font-medium text-brand">{analysis.summary}</p>
            <p className="mt-2 text-xs text-muted-strong">
              {analysis.mealCount} meals, {analysis.eventCount} GI events
            </p>
          </div>

          <div className="grid gap-3">
            {analysis.findings.map((finding) => (
              <article
                key={`${finding.irritant}-${finding.windowHours}`}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{finding.irritant}</h3>
                    <p className="text-sm text-muted">
                      {finding.direction.replaceAll("_", " ")} within {finding.windowHours}h
                    </p>
                  </div>
                  <span className="rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-muted-strong">
                    {Math.round(finding.confidence * 100)}%
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-strong">{finding.evidence}</p>
                <p className="mt-2 text-sm font-medium text-brand">{finding.suggestedAction}</p>
              </article>
            ))}
          </div>

          {analysis.dataQualityNotes.length ? (
            <div className="rounded-lg border border-warning-border bg-warning-soft p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
                <CircleAlert size={16} aria-hidden />
                Data notes
              </div>
              <ul className="grid gap-1 text-sm text-warning">
                {analysis.dataQualityNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState icon={<BarChart3 size={22} />} title="No analysis yet" />
      )}
    </section>
  );
}
