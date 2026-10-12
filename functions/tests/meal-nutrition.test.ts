import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  generate: vi.fn(),
  add: vi.fn(),
  update: vi.fn(),
  get: vi.fn(),
  secret: vi.fn(() => "test-key"),
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = { generateContent: mocks.generate };
  },
}));
vi.mock("firebase-admin/app", () => ({ initializeApp: vi.fn() }));
vi.mock("firebase-admin/firestore", async (importOriginal) => {
  const { Timestamp } = await importOriginal<typeof import("firebase-admin/firestore")>();
  const ref = {
    collection: () => ref,
    doc: () => ref,
    orderBy: () => ref,
    limit: () => ref,
    get: mocks.get,
    add: mocks.add,
    update: mocks.update,
    set: vi.fn(),
  };
  return {
    getFirestore: () => ref,
    Timestamp,
  };
});
vi.mock("firebase-admin/remote-config", () => ({
  getRemoteConfig: () => ({
    getTemplate: async () => ({
      parameters: {
        meal_analysis_prompt_template: {
          defaultValue: { value: "Old prompt with no nutrition schema. {{input}}" },
        },
      },
    }),
  }),
}));
vi.mock("firebase-functions", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  setGlobalOptions: vi.fn(),
}));
vi.mock("firebase-functions/params", () => ({ defineSecret: () => ({ value: mocks.secret }) }));
vi.mock("firebase-functions/v2/https", () => ({
  onCall: (...args: unknown[]) => args.at(-1),
  HttpsError: class extends Error {},
}));
vi.mock("firebase-functions/v2/scheduler", () => ({ onSchedule: vi.fn() }));

import { createMeal, reanalyzeMeal } from "../src/index.js";

// onCall is replaced by the handler, so no network, account, or model access is used.
const create = createMeal as unknown as (request: unknown) => Promise<unknown>;
const reanalyze = reanalyzeMeal as unknown as (request: unknown) => Promise<unknown>;
const nutrition = {
  caloriesKcal: 240,
  proteinGrams: 15,
  fiberGrams: 13,
  carbsGrams: 40,
  fatGrams: 1,
  confidence: "low",
  assumptions: "One bowl.",
};
const analysis = {
  mealName: "Beans",
  foods: ["beans"],
  irritants: [],
  summary: "One bowl of beans",
  nutrition,
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.secret.mockReturnValue("test-key");
  mocks.generate.mockResolvedValue({ text: JSON.stringify(analysis) });
  mocks.get.mockResolvedValue({ docs: [], exists: true });
  mocks.add.mockResolvedValue({ id: "new-meal" });
});

describe("meal nutrition integration", () => {
  it.each(["text", "voice", "image"])(
    "persists nutrition for %s entries and extends old Remote Config prompts",
    async (mode) => {
      await create({
        auth: { uid: "test-user" },
        data: {
          mode,
          text: mode === "text" ? "One bowl of beans" : undefined,
          mediaBase64: "aGVsbG8=",
          mimeType: mode === "image" ? "image/jpeg" : "audio/wav",
          eatenAt: "2026-10-12T12:00:00Z",
          portionMultiplier: 2,
          mealSize: "large",
        },
      });
      expect(mocks.add.mock.calls[0][0].analysis.nutrition).toEqual(nutrition);
      const prompt = mocks.generate.mock.calls[0][0].contents[0].text;
      expect(prompt).toContain("Old prompt with no nutrition schema");
      expect(prompt).toContain('"proteinGrams"');
      expect(prompt).toContain('"portionMultiplier":2');
    },
  );

  it("uses saved portion context when reanalyzing an older meal", async () => {
    mocks.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        inputMode: "text",
        rawInput: "Beans",
        portionMultiplier: 0.5,
        mealSize: "small",
      }),
    });
    await reanalyze({ auth: { uid: "test-user" }, data: { mealId: "old-meal" } });
    expect(mocks.update.mock.calls[0][0].analysis.nutrition).toEqual(nutrition);
    expect(mocks.generate.mock.calls[0][0].contents[0].text).toContain('"portionMultiplier":0.5');
  });

  it("leaves nutrients unavailable when the AI request fails", async () => {
    mocks.generate.mockRejectedValueOnce(new Error("Model unavailable"));
    await create({
      auth: { uid: "test-user" },
      data: { mode: "text", text: "Beans", eatenAt: "2026-10-12T12:00:00Z" },
    });
    expect(mocks.add.mock.calls[0][0].analysis.nutrition.proteinGrams).toBeNull();
    expect(mocks.add.mock.calls[0][0].analysis.nutrition.fiberGrams).toBeNull();
  });

  it("leaves nutrients unavailable without an AI key", async () => {
    mocks.secret.mockReturnValue("");
    await create({
      auth: { uid: "test-user" },
      data: { mode: "text", text: "Beans", eatenAt: "2026-10-12T12:00:00Z" },
    });
    expect(mocks.generate).not.toHaveBeenCalled();
    expect(mocks.add.mock.calls[0][0].analysis.nutrition.proteinGrams).toBeNull();
  });
});
