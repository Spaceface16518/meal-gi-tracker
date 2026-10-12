import { formatNutrient } from "@/lib/nutrition";
import type { NutritionEstimate } from "@/lib/types";

export function NutritionSummary(props: { nutrition?: NutritionEstimate }) {
  return (
    <p class="mt-2 text-xs font-medium text-brand">
      Protein {formatNutrient(props.nutrition?.proteinGrams)} · Fiber{" "}
      {formatNutrient(props.nutrition?.fiberGrams)}
    </p>
  );
}

function SecondaryAmount(props: { value?: number | null; unit?: string }) {
  const formatted = () => formatNutrient(props.value, props.unit);
  return (
    <span aria-label={formatted() === "Unavailable" ? "Unavailable" : undefined}>
      {formatted() === "Unavailable" ? "—" : formatted()}
    </span>
  );
}

export function NutritionPanel(props: { nutrition?: NutritionEstimate }) {
  return (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-sm font-semibold">Estimated nutrition</h3>
        {props.nutrition ? (
          <span class="rounded bg-surface-muted px-2 py-1 text-xs text-muted-strong">
            {props.nutrition.confidence === "high"
              ? "High"
              : props.nutrition.confidence === "medium"
                ? "Medium"
                : "Low"}{" "}
            confidence
          </span>
        ) : null}
      </div>
      <dl class="grid grid-cols-2 gap-2">
        <div class="rounded-lg bg-brand-soft p-3">
          <dt class="text-sm font-medium text-brand">Protein</dt>
          <dd class="mt-1 text-base font-semibold text-brand sm:text-xl">
            {formatNutrient(props.nutrition?.proteinGrams)}
          </dd>
        </div>
        <div class="rounded-lg bg-brand-soft p-3">
          <dt class="text-sm font-medium text-brand">Fiber</dt>
          <dd class="mt-1 text-base font-semibold text-brand sm:text-xl">
            {formatNutrient(props.nutrition?.fiberGrams)}
          </dd>
        </div>
        <div class="col-span-2 grid grid-cols-3 gap-2">
          <div class="rounded-md bg-surface-muted p-2">
            <dt class="text-xs text-muted">Calories</dt>
            <dd class="mt-1 text-sm font-semibold">
              <SecondaryAmount value={props.nutrition?.caloriesKcal} unit="kcal" />
            </dd>
          </div>
          <div class="rounded-md bg-surface-muted p-2">
            <dt class="text-xs text-muted">Carbs</dt>
            <dd class="mt-1 text-sm font-semibold">
              <SecondaryAmount value={props.nutrition?.carbsGrams} />
            </dd>
          </div>
          <div class="rounded-md bg-surface-muted p-2">
            <dt class="text-xs text-muted">Fat</dt>
            <dd class="mt-1 text-sm font-semibold">
              <SecondaryAmount value={props.nutrition?.fatGrams} />
            </dd>
          </div>
        </div>
      </dl>
      <p class="mt-3 text-xs leading-5 text-muted">
        {props.nutrition?.assumptions ||
          "No nutrition estimate yet. Use Reanalyze to estimate this meal."}
      </p>
      <p class="mt-1 text-xs leading-5 text-muted">
        Approximate totals for this meal. Portions and ingredients affect accuracy.
      </p>
    </section>
  );
}
