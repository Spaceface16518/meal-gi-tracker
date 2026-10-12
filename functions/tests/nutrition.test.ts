import { describe, expect, it } from "vitest";
import { normalizeNutrition, nutritionPrompt, unavailableNutrition } from "../src/nutrition.js";

describe("nutrition estimates", () => {
  it("retains zero amounts and rounds estimates without coercing unknown quantities to zero", () => {
    expect(
      normalizeNutrition({
        proteinGrams: 24.36,
        fiberGrams: 0,
        carbsGrams: "10",
        caloriesKcal: 500,
        confidence: "medium",
        assumptions: "  One bowl.  ",
      }),
    ).toEqual({
      caloriesKcal: 500,
      proteinGrams: 24.4,
      fiberGrams: 0,
      carbsGrams: null,
      fatGrams: null,
      confidence: "medium",
      assumptions: "One bowl.",
    });
  });

  it("rejects negative, nonfinite, and implausibly large values independently", () => {
    const result = normalizeNutrition({
      caloriesKcal: Infinity,
      proteinGrams: -3,
      fiberGrams: NaN,
      carbsGrams: 10001,
      fatGrams: 10,
    });
    expect(result.caloriesKcal).toBeNull();
    expect(result.proteinGrams).toBeNull();
    expect(result.fiberGrams).toBeNull();
    expect(result.carbsGrams).toBeNull();
    expect(result.fatGrams).toBe(10);
    expect(result.confidence).toBe("low");
  });

  it.each([undefined, null, [], "unknown"])(
    "returns unavailable estimates for missing or malformed output: %s",
    (value) => {
      expect(normalizeNutrition(value)).toEqual(
        unavailableNutrition("The meal analysis did not return a nutrition estimate."),
      );
    },
  );

  it("bounds generated explanatory text", () => {
    expect(normalizeNutrition({ assumptions: "a".repeat(2000) }).assumptions).toHaveLength(1000);
  });

  it("includes portion context and requires totals for the consumed meal", () => {
    const prompt = nutritionPrompt({
      portionMultiplier: 2,
      mealSize: "large",
      notes: "200 g tofu",
    });
    expect(prompt).toContain('"portionMultiplier":2');
    expect(prompt).toContain("200 g tofu");
    expect(prompt).toContain("Never multiply an explicit consumed quantity again");
    expect(prompt).toContain('"proteinGrams"');
    expect(prompt).toContain('"fiberGrams"');
  });
});
