import { describe, expect, it } from "vitest";
import { formatNutrient, nutritionForEditedMeal } from "../../src/lib/nutrition";
import type { Meal } from "../../src/lib/types";

const meal = {
  rawInput: "one bowl of beans",
  interpretedText: "one bowl of beans",
  analysis: {
    foods: ["beans"],
    nutrition: {
      caloriesKcal: 240,
      proteinGrams: 15,
      fiberGrams: 13,
      carbsGrams: 40,
      fatGrams: 1,
      confidence: "low",
      assumptions: "One bowl.",
    },
  },
} as Meal;

describe("nutrition display", () => {
  it("distinguishes known zero from unavailable values", () => {
    expect(formatNutrient(0)).toBe("~0 g");
    expect(formatNutrient(null)).toBe("Unavailable");
    expect(formatNutrient(undefined)).toBe("Unavailable");
    expect(formatNutrient(NaN)).toBe("Unavailable");
    expect(formatNutrient(-1)).toBe("Unavailable");
  });

  it("formats grams and calories with appropriate precision", () => {
    expect(formatNutrient(15.26)).toBe("~15.3 g");
    expect(formatNutrient(240.4, "kcal")).toBe("~240 kcal");
  });

  it("preserves estimates when editing metadata or whitespace", () => {
    expect(nutritionForEditedMeal(meal, " one bowl of beans ", ["beans"])).toEqual(
      meal.analysis.nutrition,
    );
  });

  it("clears stale estimates after changing the consumed meal or detected foods", () => {
    expect(nutritionForEditedMeal(meal, "two bowls of beans", ["beans"])).toBeUndefined();
    expect(nutritionForEditedMeal(meal, "one bowl of beans", ["rice"])).toBeUndefined();
    expect(nutritionForEditedMeal(meal, "one bowl of beans", ["beans", "rice"])).toBeUndefined();
  });

  it("clears estimates when notes used for portion context change", () => {
    expect(
      nutritionForEditedMeal(meal, meal.rawInput, ["beans"], "Actually two bowls"),
    ).toBeUndefined();
    const annotatedMeal = { ...meal, notes: "One cup" };
    expect(nutritionForEditedMeal(annotatedMeal, meal.rawInput, ["beans"], " One cup ")).toEqual(
      meal.analysis.nutrition,
    );
  });

  it("supports legacy meals without nutrition", () => {
    expect(
      nutritionForEditedMeal(
        { ...meal, analysis: { ...meal.analysis, nutrition: undefined } },
        meal.rawInput,
        ["beans"],
      ),
    ).toBeUndefined();
  });
});
