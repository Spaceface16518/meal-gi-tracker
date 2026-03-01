import "server-only";

import { createHash } from "crypto";
import { ObjectId } from "mongodb";
import { Readable } from "stream";
import { getBucket, getDb } from "@/lib/mongo";
import { extractMealData } from "@/lib/openaiExtract";
import { EntryDoc, EntryTimeMeta, EntryType } from "@/lib/types";

const MAX_UPLOAD_BYTES = 4_500_000;

function normalizeText(parts: Array<string | undefined>): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function fieldsToText(fields?: Record<string, unknown>): string {
  if (!fields) return "";
  return Object.entries(fields)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
    .join(" ");
}

async function uploadToGridFs(file: File): Promise<{
  gridFsId: ObjectId;
  contentType: string;
  sizeBytes: number;
  sha256: string;
  buffer: Buffer;
}> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image too large. Max 4.5MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const hash = createHash("sha256").update(buffer).digest("hex");
  const bucket = await getBucket();

  const uploadStream = bucket.openUploadStream(file.name || "meal.jpg", {
    contentType: file.type || "image/jpeg"
  });

  await new Promise<void>((resolve, reject) => {
    Readable.from(buffer)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => resolve());
  });

  return {
    gridFsId: uploadStream.id as ObjectId,
    contentType: file.type || "image/jpeg",
    sizeBytes: buffer.byteLength,
    sha256: hash,
    buffer
  };
}

async function readGridFsBuffer(gridFsId: ObjectId): Promise<{ buffer: Buffer; contentType: string }> {
  const bucket = await getBucket();
  const fileDoc = await bucket.find({ _id: gridFsId }).next();
  if (!fileDoc) {
    throw new Error("Image not found in GridFS");
  }

  const stream = bucket.openDownloadStream(gridFsId);
  const chunks: Buffer[] = [];

  await new Promise<void>((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve());
    stream.on("error", reject);
  });

  return {
    buffer: Buffer.concat(chunks),
    contentType: fileDoc.contentType || "image/jpeg"
  };
}

export async function createMealEntry(params: {
  notes?: string;
  imageFile?: File | null;
  debugId?: string;
  time?: EntryTimeMeta;
}): Promise<{ id: string; aiSummary?: string }> {
  const notes = (params.notes || "").trim();
  console.info("[meal-ai] createMealEntry start", {
    debugId: params.debugId,
    notesLength: notes.length,
    hasImage: Boolean(params.imageFile && params.imageFile.size > 0)
  });
  const db = await getDb();
  const entries = db.collection<EntryDoc>("entries");

  let image: EntryDoc["image"];
  let ai: EntryDoc["ai"];
  let imageBase64: string | undefined;
  let mimeType: string | undefined;

  if (params.imageFile && params.imageFile.size > 0) {
    console.info("[meal-ai] image upload start", {
      debugId: params.debugId,
      imageSize: params.imageFile.size,
      imageType: params.imageFile.type
    });
    const uploaded = await uploadToGridFs(params.imageFile);
    console.info("[meal-ai] image upload done", {
      debugId: params.debugId,
      gridFsId: uploaded.gridFsId.toString(),
      imageSize: uploaded.sizeBytes,
      imageType: uploaded.contentType
    });
    image = {
      gridFsId: uploaded.gridFsId,
      contentType: uploaded.contentType,
      sha256: uploaded.sha256,
      sizeBytes: uploaded.sizeBytes
    };
    imageBase64 = uploaded.buffer.toString("base64");
    mimeType = uploaded.contentType;
  } else {
    console.info("[meal-ai] no image provided; running notes-only extraction", {
      debugId: params.debugId
    });
  }

  const extracted = await extractMealData({
    imageBase64,
    mimeType,
    notes,
    debugId: params.debugId
  });

  ai = {
    model: extracted.model,
    promptVersion: extracted.promptVersion,
    rawTextSummary: extracted.data.rawTextSummary,
    extracted: extracted.data.extracted,
    searchText: extracted.data.searchText,
    confidence: extracted.data.confidence,
    uncertaintyNotes: extracted.data.uncertaintyNotes
  };
  console.info("[meal-ai] extraction persisted in entry payload", {
    debugId: params.debugId,
    model: ai.model
  });

  const doc: EntryDoc = {
    ts: new Date(),
    time: params.time,
    type: "meal",
    userId: "me",
    input: {
      notes: notes || undefined
    },
    image,
    ai,
    search: {
      text: normalizeText([notes, ai?.searchText, ai?.rawTextSummary]) || notes || "meal"
    }
  };

  const result = await entries.insertOne(doc);
  console.info("[meal-ai] createMealEntry done", {
    debugId: params.debugId,
    entryId: result.insertedId.toString()
  });
  return {
    id: result.insertedId.toString(),
    aiSummary: ai?.rawTextSummary
  };
}

export async function createGiEntry(params: {
  notes?: string;
  severity: number;
  locations: string[];
  time?: EntryTimeMeta;
}): Promise<string> {
  const notes = (params.notes || "").trim();
  const fields = {
    severity: Math.max(0, Math.min(10, params.severity)),
    locations: params.locations
  };

  const doc: EntryDoc = {
    ts: new Date(),
    time: params.time,
    type: "gi_event",
    userId: "me",
    input: {
      notes: notes || undefined,
      fields
    },
    search: {
      text: normalizeText([notes, fieldsToText(fields)]) || "gi_event"
    }
  };

  const db = await getDb();
  const result = await db.collection<EntryDoc>("entries").insertOne(doc);
  return result.insertedId.toString();
}

export async function createBmEntry(params: {
  notes?: string;
  bristol: number;
  color: string;
  urgency: boolean;
  time?: EntryTimeMeta;
}): Promise<string> {
  const notes = (params.notes || "").trim();
  const fields = {
    bristol: Math.max(1, Math.min(7, params.bristol)),
    color: params.color,
    urgency: params.urgency
  };

  const doc: EntryDoc = {
    ts: new Date(),
    time: params.time,
    type: "bm",
    userId: "me",
    input: {
      notes: notes || undefined,
      fields
    },
    search: {
      text: normalizeText([notes, fieldsToText(fields)]) || "bm"
    }
  };

  const db = await getDb();
  const result = await db.collection<EntryDoc>("entries").insertOne(doc);
  return result.insertedId.toString();
}

export async function searchEntries(params: { q: string; type?: EntryType | "" }) {
  const q = params.q.trim();
  if (!q) return [];

  const db = await getDb();
  const filter: Record<string, unknown> = {
    userId: "me",
    $text: { $search: q }
  };

  if (params.type) {
    filter.type = params.type;
  }

  const docs = await db
    .collection<EntryDoc>("entries")
    .find(filter, {
      projection: { ts: 1, time: 1, type: 1, search: 1, input: 1 }
    })
    .sort({ ts: -1 })
    .limit(100)
    .toArray();

  return docs.map((doc) => ({
    _id: doc._id?.toString() || "",
    ts: doc.ts,
    time: doc.time,
    type: doc.type,
    snippet: (doc.search?.text || doc.input?.notes || "").slice(0, 180)
  }));
}

export async function getRecentEntries(limit = 20, type?: EntryType | "") {
  const db = await getDb();
  const filter: Record<string, unknown> = { userId: "me" };
  if (type) {
    filter.type = type;
  }

  const docs = await db
    .collection<EntryDoc>("entries")
    .find(filter, {
      projection: { ts: 1, time: 1, type: 1, search: 1, input: 1 }
    })
    .sort({ ts: -1 })
    .limit(Math.max(1, Math.min(200, limit)))
    .toArray();

  return docs.map((doc) => ({
    _id: doc._id?.toString() || "",
    ts: doc.ts,
    time: doc.time,
    type: doc.type,
    snippet: (doc.search?.text || doc.input?.notes || "").slice(0, 180)
  }));
}

export async function getEntryById(id: string): Promise<EntryDoc | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  return db.collection<EntryDoc>("entries").findOne({ _id: new ObjectId(id), userId: "me" });
}

export async function retryMealSummary(entryId: string): Promise<{ id: string; summary: string }> {
  if (!ObjectId.isValid(entryId)) {
    throw new Error("Invalid entry id");
  }

  const db = await getDb();
  const entries = db.collection<EntryDoc>("entries");
  const _id = new ObjectId(entryId);

  const entry = await entries.findOne({ _id, userId: "me" });
  if (!entry) {
    throw new Error("Entry not found");
  }
  if (entry.type !== "meal") {
    throw new Error("AI retry is only supported for meal entries");
  }
  if (!entry.image?.gridFsId) {
    throw new Error("This meal has no image to summarize");
  }

  const imageData = await readGridFsBuffer(entry.image.gridFsId);
  const extracted = await extractMealData({
    imageBase64: imageData.buffer.toString("base64"),
    mimeType: imageData.contentType,
    notes: entry.input?.notes
  });

  const ai: NonNullable<EntryDoc["ai"]> = {
    model: extracted.model,
    promptVersion: extracted.promptVersion,
    rawTextSummary: extracted.data.rawTextSummary,
    extracted: extracted.data.extracted,
    searchText: extracted.data.searchText,
    confidence: extracted.data.confidence,
    uncertaintyNotes: extracted.data.uncertaintyNotes
  };

  const searchText =
    normalizeText([entry.input?.notes, ai.searchText, ai.rawTextSummary]) || entry.search?.text || "meal";

  await entries.updateOne(
    { _id, userId: "me" },
    {
      $set: {
        ai,
        search: {
          ...(entry.search || {}),
          text: searchText
        }
      }
    }
  );

  return {
    id: _id.toString(),
    summary: ai.rawTextSummary
  };
}
