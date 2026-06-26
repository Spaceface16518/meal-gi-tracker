import { describe, expect, it } from "vitest";
import { computeIrritantSensitivity } from "../src/sensitivity";

describe("computeIrritantSensitivity", () => {
  it("normalizes sensitivity by exposure count and sorts strongest signals first", () => {
    const scores = computeIrritantSensitivity(
      [
        {
          eatenAt: "2026-06-25T08:00:00.000Z",
          status: "analyzed",
          analysis: { irritants: [{ name: "Dairy" }, { name: "Gluten" }] },
        },
        {
          eatenAt: "2026-06-25T10:00:00.000Z",
          status: "analyzed",
          analysis: { irritants: ["dairy"] },
        },
      ],
      [
        {
          occurredAt: "2026-06-25T12:00:00.000Z",
          severity: 8,
          symptoms: ["bloating"],
        },
      ],
      { halfLifeHours: 24, maxLookbackHours: 12 },
    );

    expect(scores.map((score) => score.irritant)).toEqual(["dairy", "gluten"]);
    expect(scores[0]).toMatchObject({
      exposureCount: 2,
      normalizedSensitivity: 7.339,
    });
    expect(scores[1]).toMatchObject({
      exposureCount: 1,
      normalizedSensitivity: 7.127,
    });
  });
});
