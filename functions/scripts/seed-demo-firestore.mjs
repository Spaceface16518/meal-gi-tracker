import { readFile } from "node:fs/promises";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldPath, getFirestore, Timestamp } from "firebase-admin/firestore";

const uid = process.env.DEMO_USER_UID || "WiIKxxa28abvJzcfpVdmBJ0gmeJ3";
const email = process.env.DEMO_USER_EMAIL || "demo@meal-signal.app";
const password = process.env.DEMO_USER_PASSWORD || "DemoMealSignal!2026";
const seedPath = process.env.DEMO_SEED_PATH || "data/demo-seed.json";

initializeApp();

const auth = getAuth();
const db = getFirestore();
const seed = JSON.parse(await readFile(seedPath, "utf8"));

if (!Array.isArray(seed.meals) || !Array.isArray(seed.events)) {
  throw new Error("Seed file must contain meals and events arrays.");
}

await upsertDemoUser();
await db
  .collection("users")
  .doc(uid)
  .set(
    {
      uid,
      email,
      displayName: "Meal Signal Demo",
      createdAt: Timestamp.fromDate(new Date("2026-04-13T12:00:00.000Z")),
      updatedAt: Timestamp.now(),
    },
    { merge: true },
  );

await deleteCollection(db.collection("users").doc(uid).collection("meals"));
await deleteCollection(db.collection("users").doc(uid).collection("events"));

await writeCollection("meals", seed.meals, convertMeal);
await writeCollection("events", seed.events, convertEvent);

console.log(
  `Seeded demo user ${uid} with ${seed.meals.length} meals and ${seed.events.length} events.`,
);

async function upsertDemoUser() {
  try {
    await auth.updateUser(uid, {
      email,
      password,
      displayName: "Meal Signal Demo",
      disabled: false,
      emailVerified: true,
    });
  } catch (error) {
    if (error?.code !== "auth/user-not-found") throw error;
    await auth.createUser({
      uid,
      email,
      password,
      displayName: "Meal Signal Demo",
      emailVerified: true,
    });
  }
}

async function writeCollection(name, docs, convert) {
  for (let index = 0; index < docs.length; index += 400) {
    const batch = db.batch();
    for (const item of docs.slice(index, index + 400)) {
      batch.set(db.collection("users").doc(uid).collection(name).doc(item.id), convert(item));
    }
    await batch.commit();
  }
}

async function deleteCollection(collectionRef) {
  for (;;) {
    const snapshot = await collectionRef.orderBy(FieldPath.documentId()).limit(400).get();
    if (snapshot.empty) return;
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
}

function convertMeal(meal) {
  return {
    uid,
    inputMode: meal.inputMode,
    rawInput: meal.rawInput,
    interpretedText: meal.interpretedText,
    eatenAt: timestamp(meal.eatenAt),
    ...(meal.notes ? { notes: meal.notes } : {}),
    status: meal.status,
    analysis: meal.analysis,
    createdAt: timestamp(meal.createdAt),
    updatedAt: timestamp(meal.updatedAt),
  };
}

function convertEvent(event) {
  return {
    uid,
    occurredAt: timestamp(event.occurredAt),
    severity: event.severity,
    symptoms: event.symptoms,
    ...(event.notes ? { notes: event.notes } : {}),
    ...(event.stoolType ? { stoolType: event.stoolType } : {}),
    ...(event.durationMinutes ? { durationMinutes: event.durationMinutes } : {}),
    createdAt: timestamp(event.createdAt),
  };
}

function timestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid timestamp: ${value}`);
  return Timestamp.fromDate(date);
}
