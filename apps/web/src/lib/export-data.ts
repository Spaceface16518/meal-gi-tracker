import type { CorrelationAnalysis, GiEvent, Meal, SkinEntry } from "@/lib/types";

type AnalysisExportInput = {
  analysis: CorrelationAnalysis | null;
  meals: Meal[];
  events: GiEvent[];
  skinEntries?: SkinEntry[];
  exportedAt?: Date;
};

function iso(date: Date | undefined) {
  return date ? date.toISOString() : undefined;
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "meal";
}

function serializableMeal(meal: Meal) {
  return {
    ...meal,
    eatenAt: iso(meal.eatenAt),
    createdAt: iso(meal.createdAt),
    updatedAt: iso(meal.updatedAt),
    reanalyzedAt: iso(meal.reanalyzedAt),
  };
}

function serializableEvent(event: GiEvent) {
  return {
    ...event,
    occurredAt: iso(event.occurredAt),
    createdAt: iso(event.createdAt),
  };
}

function serializableSkinEntry(entry: SkinEntry) {
  return {
    ...entry,
    occurredAt: iso(entry.occurredAt),
    sortAt: iso(entry.sortAt),
    createdAt: iso(entry.createdAt),
    updatedAt: iso(entry.updatedAt),
  };
}

function serializableAnalysis(analysis: CorrelationAnalysis | null) {
  if (!analysis) return null;
  return {
    ...analysis,
    generatedAt: iso(analysis.generatedAt),
  };
}

function downloadTextFile(filename: string, mimeType: string, content: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function exportMealJson(meal: Meal) {
  const name = slug(meal.analysis.mealName || meal.id);
  downloadTextFile(
    `meal-signal-meal-${name}-${meal.eatenAt.toISOString().slice(0, 10)}.json`,
    "application/json",
    JSON.stringify({ exportedAt: new Date().toISOString(), meal: serializableMeal(meal) }, null, 2),
  );
}

export function exportMealsJson(meals: Meal[]) {
  downloadTextFile(
    `meal-signal-meals-${new Date().toISOString().slice(0, 10)}.json`,
    "application/json",
    JSON.stringify({ exportedAt: new Date().toISOString(), mealCount: meals.length, meals: meals.map(serializableMeal) }, null, 2),
  );
}

export function exportAnalysisJson({ analysis, meals, events, skinEntries = [], exportedAt = new Date() }: AnalysisExportInput) {
  downloadTextFile(
    `meal-signal-analysis-${exportedAt.toISOString().slice(0, 10)}.json`,
    "application/json",
    JSON.stringify(
      {
        exportedAt: exportedAt.toISOString(),
        analysis: serializableAnalysis(analysis),
        meals: meals.map(serializableMeal),
        giEvents: events.map(serializableEvent),
        skinEntries: skinEntries.map(serializableSkinEntry),
      },
      null,
      2,
    ),
  );
}

export function exportAnalysisHtml({ analysis, meals, events, skinEntries = [], exportedAt = new Date() }: AnalysisExportInput) {
  const findings = analysis?.findings ?? [];
  const dataNotes = analysis?.dataQualityNotes ?? [];
  const topMeals = meals.slice(0, 50);
  const topEvents = events.slice(0, 50);
  const topSkinEntries = skinEntries.slice(0, 50);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meal Signal Analysis Export</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #171717; background: #ffffff; }
    body { margin: 0; padding: 32px; line-height: 1.45; }
    main { max-width: 920px; margin: 0 auto; }
    h1, h2, h3 { margin: 0; line-height: 1.2; }
    h1 { font-size: 28px; }
    h2 { margin-top: 32px; padding-top: 18px; border-top: 1px solid #d7d7d7; font-size: 18px; }
    h3 { font-size: 15px; }
    p { margin: 6px 0 0; }
    .muted { color: #616161; font-size: 13px; }
    .summary { margin-top: 18px; padding: 16px; border: 1px solid #d7d7d7; border-radius: 8px; background: #f7f7f2; }
    .grid { display: grid; gap: 12px; }
    .card { break-inside: avoid; padding: 14px; border: 1px solid #d7d7d7; border-radius: 8px; }
    .row { display: flex; justify-content: space-between; gap: 16px; }
    .pill { display: inline-block; margin: 6px 6px 0 0; padding: 3px 7px; border-radius: 5px; background: #ecebe3; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
    th, td { text-align: left; vertical-align: top; border-bottom: 1px solid #e2e2e2; padding: 8px 6px; }
    th { font-size: 12px; text-transform: uppercase; color: #616161; }
    @media print { body { padding: 18px; } .card, .summary { break-inside: avoid; } }
  </style>
</head>
<body>
  <main>
    <h1>Meal Signal Analysis</h1>
    <p class="muted">Exported ${escapeHtml(exportedAt.toLocaleString())}${
      analysis ? ` · analysis generated ${escapeHtml(analysis.generatedAt.toLocaleString())}` : ""
    }</p>
    <div class="summary">
      <h2 style="margin-top:0;padding-top:0;border-top:0;">Summary</h2>
      <p>${escapeHtml(analysis?.summary ?? "No analysis has been generated yet.")}</p>
      <p class="muted">${meals.length} meals, ${events.length} GI events, and ${skinEntries.length} skin entries included in this export.</p>
      <p class="muted">Current correlation analysis remains GI-focused; skin entries are exported as tracked context only.</p>
    </div>

    <h2>Findings</h2>
    <div class="grid">
      ${
        findings.length
          ? findings
              .map(
                (finding) => `<article class="card">
        <div class="row"><h3>${escapeHtml(finding.irritant)}</h3><strong>${escapeHtml(Math.round(finding.confidence * 100))}%</strong></div>
        <p class="muted">${escapeHtml(finding.direction.replaceAll("_", " "))} within ${escapeHtml(finding.windowHours)}h</p>
        <p>${escapeHtml(finding.evidence)}</p>
        <p><strong>${escapeHtml(finding.suggestedAction)}</strong></p>
      </article>`,
              )
              .join("")
          : `<p class="muted">No findings available.</p>`
      }
    </div>

    <h2>Data Notes</h2>
    ${
      dataNotes.length
        ? `<ul>${dataNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`
        : `<p class="muted">No data quality notes.</p>`
    }

    <h2>Recent Meals</h2>
    <table>
      <thead><tr><th>When</th><th>Meal</th><th>Foods</th><th>Irritants</th></tr></thead>
      <tbody>
        ${topMeals
          .map(
            (meal) => `<tr>
          <td>${escapeHtml(meal.eatenAt.toLocaleString())}</td>
          <td><strong>${escapeHtml(meal.analysis.mealName)}</strong><br><span class="muted">${escapeHtml(meal.interpretedText)}</span></td>
          <td>${escapeHtml(meal.analysis.foods.join(", ") || "None")}</td>
          <td>${meal.analysis.irritants.map((irritant) => `<span class="pill">${escapeHtml(irritant.name)}</span>`).join("") || "None"}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>

    <h2>Recent GI Events</h2>
    <table>
      <thead><tr><th>When</th><th>Severity</th><th>Details</th><th>Notes</th></tr></thead>
      <tbody>
        ${topEvents
          .map(
            (event) => `<tr>
          <td>${escapeHtml(event.occurredAt.toLocaleString())}</td>
          <td>${escapeHtml(event.severity)}</td>
          <td>${escapeHtml([...event.symptoms, event.stoolType ? `stool type ${event.stoolType}` : ""].filter(Boolean).join(", ") || "No details recorded")}</td>
          <td>${escapeHtml(event.notes ?? "")}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>

    <h2>Recent Skin Entries</h2>
    <table>
      <thead><tr><th>When</th><th>Type</th><th>Severity</th><th>Details</th><th>Notes</th></tr></thead>
      <tbody>
        ${topSkinEntries
          .map(
            (entry) => `<tr>
          <td>${escapeHtml(entry.entryType === "daily" ? entry.localDate ?? "" : entry.occurredAt?.toLocaleString() ?? "")}</td>
          <td>${escapeHtml(entry.entryType === "daily" ? "Skin day" : "Skin observation")}</td>
          <td>${escapeHtml(entry.severity)}</td>
          <td>${escapeHtml([...entry.symptoms, entry.bodyAreas.length ? `areas: ${entry.bodyAreas.join(", ")}` : ""].filter(Boolean).join("; ") || "No details recorded")}</td>
          <td>${escapeHtml(entry.notes ?? "")}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </main>
</body>
</html>`;

  downloadTextFile(
    `meal-signal-analysis-${exportedAt.toISOString().slice(0, 10)}.html`,
    "text/html",
    html,
  );
}
