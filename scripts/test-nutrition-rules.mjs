// Run against a Firestore emulator with @firebase/rules-unit-testing and firebase installed.
import { readFile } from "node:fs/promises";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

const env = await initializeTestEnvironment({
  projectId: "demo-meal-nutrition",
  firestore: {
    rules: await readFile(
      process.argv[2] || new URL("../firestore.rules", import.meta.url),
      "utf8",
    ),
  },
});
const uid = "nutrition-test-user";
const db = env.authenticatedContext(uid).firestore();
const analysis = {
  mealName: "Beans",
  foods: ["beans"],
  irritants: [],
  summary: "One bowl",
};
const nutrition = {
  caloriesKcal: 240,
  proteinGrams: 15,
  fiberGrams: 13,
  carbsGrams: 40,
  fatGrams: 1,
  confidence: "low",
  assumptions: "One bowl.",
};
const meal = {
  uid,
  inputMode: "text",
  rawInput: "Beans",
  interpretedText: "Beans",
  status: "analyzed",
  analysis,
  eatenAt: Timestamp.now(),
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};
let passed = 0;
async function check(label, run) {
  await run();
  passed++;
  console.log(`PASS ${label}`);
}

try {
  const legacyRef = doc(db, "users", uid, "meals", "legacy");
  await check("legacy meal create and edit", async () => {
    await assertSucceeds(setDoc(legacyRef, meal));
    await assertSucceeds(updateDoc(legacyRef, { notes: "Edited" }));
  });
  const mealRef = doc(db, "users", uid, "meals", "estimated");
  await check("meal with nutrition create and metadata edit", async () => {
    await assertSucceeds(
      setDoc(mealRef, { ...meal, analysis: { ...analysis, nutrition } }),
    );
    await assertSucceeds(updateDoc(mealRef, { notes: "Edited" }));
  });
  await check("zero and unknown amounts", async () => {
    await assertSucceeds(
      updateDoc(mealRef, {
        analysis: {
          ...analysis,
          nutrition: { ...nutrition, proteinGrams: 0, fiberGrams: null },
        },
      }),
    );
  });
  for (const [label, invalid] of [
    ["negative amount", { ...nutrition, fiberGrams: -1 }],
    ["string amount", { ...nutrition, proteinGrams: "15" }],
    ["oversized amount", { ...nutrition, caloriesKcal: 100001 }],
    ["invalid confidence", { ...nutrition, confidence: "certain" }],
    ["extra fields", { ...nutrition, unexpected: true }],
    ["missing fields", { proteinGrams: 15 }],
  ]) {
    await check(`rejects ${label}`, () =>
      assertFails(
        updateDoc(mealRef, { analysis: { ...analysis, nutrition: invalid } }),
      ),
    );
  }
  await check("clearing stale nutrition", () =>
    assertSucceeds(updateDoc(mealRef, { analysis })),
  );
  await check("other users cannot edit nutrition", () =>
    assertFails(
      updateDoc(
        doc(
          env.authenticatedContext("other-user").firestore(),
          "users",
          uid,
          "meals",
          "estimated",
        ),
        { analysis: { ...analysis, nutrition } },
      ),
    ),
  );
  await check("unauthenticated users cannot edit", () =>
    assertFails(
      updateDoc(
        doc(
          env.unauthenticatedContext().firestore(),
          "users",
          uid,
          "meals",
          "estimated",
        ),
        { notes: "Unauthorized" },
      ),
    ),
  );
  console.log(`${passed} Firestore nutrition checks passed.`);
} finally {
  await env.cleanup();
}
