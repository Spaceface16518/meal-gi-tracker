import { createSignal } from "solid-js";
import { BarChart3, CircleAlert, FileJson, FileText, RefreshCcw } from "lucide-solid";
import { analyzeCorrelations } from "@/lib/callables";
import { exportAnalysisHtml, exportAnalysisJson, exportMealsJson } from "@/lib/export-data";
import { getErrorMessage } from "@/lib/errors";
import { getAllGiEvents, getAllMeals, getAllSkinEntries } from "@/lib/firestore";
import { demoReadOnlyMessage } from "@/lib/demo";
import type { CorrelationAnalysis } from "@/lib/types";
import { EmptyState, StatusMessage } from "@/components/tracker/ui";

export function AnalysisPanel(props: {
  uid: string;
  analysis: CorrelationAnalysis | null;
  mealCount: number;
  eventCount: number;
  readOnly?: boolean;
}) {
  const [busy, setBusy] = createSignal(false);
  const [exporting, setExporting] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isError, setIsError] = createSignal(false);

  async function runAnalysis() {
    setBusy(true);
    setMessage("");
    setIsError(false);
    if (props.readOnly) {
      setMessage(demoReadOnlyMessage);
      setBusy(false);
      return;
    }

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

  async function loadExportData() {
    const [meals, events, skinEntries] = await Promise.all([
      getAllMeals(props.uid),
      getAllGiEvents(props.uid),
      getAllSkinEntries(props.uid),
    ]);
    return { meals, events, skinEntries };
  }

  async function exportData(kind: "analysis-html" | "analysis-json" | "meals-json") {
    setExporting(kind);
    setMessage("");
    setIsError(false);

    try {
      const { meals, events, skinEntries } = await loadExportData();
      if (kind === "analysis-html") {
        exportAnalysisHtml({ analysis: props.analysis, meals, events, skinEntries });
        setMessage("Analysis HTML exported.");
      } else if (kind === "analysis-json") {
        exportAnalysisJson({ analysis: props.analysis, meals, events, skinEntries });
        setMessage("Analysis JSON exported.");
      } else {
        exportMealsJson(meals);
        setMessage("Meals JSON exported.");
      }
    } catch (err) {
      setIsError(true);
      setMessage(getErrorMessage(err, "Export could not be prepared."));
    } finally {
      setExporting("");
    }
  }

  return (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold">Correlation analysis</h2>
          <p class="text-sm text-muted">
            {props.analysis
              ? `Updated ${props.analysis.generatedAt.toLocaleString()}`
              : `${props.mealCount} meals and ${props.eventCount} GI events available`}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => exportData("analysis-html")}
            disabled={Boolean(exporting())}
            class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Export analysis HTML"
            title="Export analysis HTML"
          >
            <FileText size={17} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => exportData("analysis-json")}
            disabled={Boolean(exporting())}
            class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Export analysis JSON"
            title="Export analysis JSON"
          >
            <FileJson size={17} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => exportData("meals-json")}
            disabled={Boolean(exporting())}
            class="flex h-10 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-muted-strong shadow-sm transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Export all meals JSON"
            title="Export all meals JSON"
          >
            <FileJson size={16} aria-hidden />
            Meals
          </button>
          <button
            type="button"
            onClick={runAnalysis}
            disabled={busy()}
            class="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw size={16} class={busy() ? "animate-spin" : ""} aria-hidden />
            {busy() ? "Starting" : "Run"}
          </button>
        </div>
      </div>

      {message() ? (
        <div class="mb-4">
          <StatusMessage tone={isError() ? "error" : "info"}>{message()}</StatusMessage>
        </div>
      ) : null}

      {props.analysis ? (
        <div class="grid gap-4">
          <div class="rounded-lg bg-surface-accent p-4">
            <p class="text-sm font-medium text-brand">{props.analysis.summary}</p>
            <p class="mt-2 text-xs text-muted-strong">
              {props.analysis.mealCount} meals, {props.analysis.eventCount} GI events
            </p>
          </div>

          <div class="grid gap-3">
            {props.analysis.findings.map((finding) => (
              <article class="rounded-lg border border-border p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="font-semibold">{finding.irritant}</h3>
                    <p class="text-sm text-muted">
                      {finding.direction === "possible_trigger"
                        ? "possible sensitivity"
                        : finding.direction.replaceAll("_", " ")}{" "}
                      within {finding.windowHours}h
                    </p>
                  </div>
                  <span class="rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-muted-strong">
                    {Math.round(finding.confidence * 100)}%
                  </span>
                </div>
                <p class="mt-3 text-sm text-muted-strong">{finding.evidence}</p>
                <p class="mt-2 text-sm font-medium text-brand">{finding.suggestedAction}</p>
              </article>
            ))}
          </div>

          {props.analysis.dataQualityNotes.length ? (
            <div class="rounded-lg border border-warning-border bg-warning-soft p-4">
              <div class="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
                <CircleAlert size={16} aria-hidden />
                Data notes
              </div>
              <ul class="grid gap-1 text-sm text-warning">
                {props.analysis.dataQualityNotes.map((note) => (
                  <li>{note}</li>
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
