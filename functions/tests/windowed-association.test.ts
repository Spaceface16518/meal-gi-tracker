import { describe, expect, it } from "vitest";
import { computeWindowedAssociationStats } from "../src/windowed-association.js";

describe("computeWindowedAssociationStats", () => {
  it("uses confidence-weighted exposure counts and selects the strongest lag window", () => {
    const meals = [
      {
        id: "a",
        status: "analyzed",
        eatenAt: "2026-01-01T00:00:00Z",
        analysis: { irritants: [{ name: "polyols", confidence: 1 }] },
      },
      {
        id: "b",
        status: "analyzed",
        eatenAt: "2026-01-03T00:00:00Z",
        analysis: { irritants: [{ name: "polyols", confidence: 0.5 }] },
      },
      { id: "c", status: "analyzed", eatenAt: "2026-01-05T00:00:00Z", analysis: { irritants: [] } },
    ];
    const events = [
      { id: "e1", occurredAt: "2026-01-01T03:00:00Z", symptoms: ["bloating"] },
      { id: "e2", occurredAt: "2026-01-03T04:00:00Z", symptoms: ["gas"] },
    ];
    const result = computeWindowedAssociationStats(meals, events)[0];
    expect(result.exposureCount).toBe(1.5);
    expect(result.strongestWindow).toBe("2-6h");
    expect(result.evidenceGrade).toBe("insufficient");
    expect(result.symptomBreakdown.map((row) => row.symptom)).toEqual(["bloating", "gas"]);
  });

  it("clamps invalid confidence and is deterministic", () => {
    const meals = [
      { status: "analyzed", eatenAt: 0, analysis: { irritants: [{ name: "fat", confidence: 9 }] } },
    ];
    expect(computeWindowedAssociationStats(meals, [])).toEqual(
      computeWindowedAssociationStats(meals, []),
    );
    expect(computeWindowedAssociationStats(meals, [])[0].exposureCount).toBe(1);
  });
});
