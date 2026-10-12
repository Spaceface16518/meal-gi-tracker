import type { Meal, NutritionEstimate } from "./types";

export function formatNutrient(value: number | null | undefined, unit = "g") {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return "Unavailable";
  return `~${new Intl.NumberFormat(undefined, { maximumFractionDigits: unit === "kcal" ? 0 : 1 }).format(value)} ${unit}`;
}

export function nutritionForEditedMeal(
  meal: Meal,
  description: string,
  foods: string[],
  notes?: string,
): NutritionEstimate | undefined {
  const originalDescription = meal.interpretedText.trim() || meal.rawInput.trim();
  const sameFoods =
    foods.length === meal.analysis.foods.length &&
    foods.every((food, index) => food.trim() === meal.analysis.foods[index].trim());
  // A changed meal must be reanalyzed before displaying its previous estimates.
  const sameNotes = (notes ?? "").trim() === (meal.notes ?? "").trim();
  return description.trim() === originalDescription && sameFoods && sameNotes
    ? meal.analysis.nutrition
    : undefined;
}
