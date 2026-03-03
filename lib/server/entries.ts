import "server-only";

import { createHash } from "crypto";
import { ObjectId } from "mongodb";
import { Readable } from "stream";
import { getAuthenticatedUserId } from "@/lib/auth";
import { getBucket, getDb } from "@/lib/mongo";
import { MEAL_PROMPT_VERSION, enqueueMealExtraction, extractMealData } from "@/lib/openaiExtract";
import { EntryDoc, EntryTimeMeta, EntryType } from "@/lib/types";

const MAX_UPLOAD_BYTES = 4_500_000;

async function getEntriesForUser() {
  const userId = await getAuthenticatedUserId();
  const db = await getDb();
  return {
    userId,
    entries: db.collection<EntryDoc>("entries")
  };
}

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

async function uploadToGridFs(file: File, userId: ObjectId): Promise<{
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
    contentType: file.type || "image/jpeg",
    metadata: { userId: userId.toHexString() }
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
  const { userId, entries } = await getEntriesForUser();
  const notes = (params.notes || "").trim();
  console.info("[meal-ai] createMealEntry start", {
    debugId: params.debugId,
    notesLength: notes.length,
    hasImage: Boolean(params.imageFile && params.imageFile.size > 0)
  });
  let image: EntryDoc["image"];
  let aiJob: EntryDoc["aiJob"];
  let imageBase64: string | undefined;
  let mimeType: string | undefined;

  if (params.imageFile && params.imageFile.size > 0) {
    console.info("[meal-ai] image upload start", {
      debugId: params.debugId,
      imageSize: params.imageFile.size,
      imageType: params.imageFile.type
    });
    const uploaded = await uploadToGridFs(params.imageFile, userId);
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
    console.info("[meal-ai] no image provided; scheduling notes-only extraction", {
      debugId: params.debugId
    });
  }
  aiJob = {
    status: "queued",
    promptVersion: MEAL_PROMPT_VERSION,
    requestedAt: new Date()
  };

  const doc: EntryDoc = {
    ts: new Date(),
    time: params.time,
    type: "meal",
    userId,
    input: {
      notes: notes || undefined
    },
    image,
    aiJob,
    search: {
      text: normalizeText([notes]) || "meal"
    }
  };

  const result = await entries.insertOne(doc);

  try {
    const queued = await enqueueMealExtraction({
      imageBase64,
      mimeType,
      notes,
      debugId: params.debugId,
      metadata: {
        entryId: result.insertedId.toString(),
        userId: userId.toString(),
        promptVersion: MEAL_PROMPT_VERSION
      }
    });

    await entries.updateOne(
      { _id: result.insertedId, userId },
      {
        $set: {
          aiJob: {
            ...aiJob,
            status: "queued",
            responseId: queued.responseId,
            model: queued.model,
            promptVersion: queued.promptVersion
          }
        }
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[meal-ai] enqueue failed", {
      debugId: params.debugId,
      entryId: result.insertedId.toString(),
      error: message
    });
    await entries.updateOne(
      { _id: result.insertedId, userId },
      {
        $set: {
          aiJob: {
            ...aiJob,
            status: "failed",
            error: message,
            completedAt: new Date()
          }
        }
      }
    );
  }

  console.info("[meal-ai] createMealEntry done", {
    debugId: params.debugId,
    entryId: result.insertedId.toString()
  });
  return {
    id: result.insertedId.toString()
  };
}

export async function createGiEntry(params: {
  notes?: string;
  severity: number;
  locations: string[];
  time?: EntryTimeMeta;
}): Promise<string> {
  const { userId, entries } = await getEntriesForUser();
  const notes = (params.notes || "").trim();
  const fields = {
    severity: Math.max(0, Math.min(10, params.severity)),
    locations: params.locations
  };

  const doc: EntryDoc = {
    ts: new Date(),
    time: params.time,
    type: "gi_event",
    userId,
    input: {
      notes: notes || undefined,
      fields
    },
    search: {
      text: normalizeText([notes, fieldsToText(fields)]) || "gi_event"
    }
  };

  const result = await entries.insertOne(doc);
  return result.insertedId.toString();
}

export async function createBmEntry(params: {
  notes?: string;
  bristol: number;
  color: string;
  urgency: boolean;
  time?: EntryTimeMeta;
}): Promise<string> {
  const { userId, entries } = await getEntriesForUser();
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
    userId,
    input: {
      notes: notes || undefined,
      fields
    },
    search: {
      text: normalizeText([notes, fieldsToText(fields)]) || "bm"
    }
  };

  const result = await entries.insertOne(doc);
  return result.insertedId.toString();
}

export async function searchEntries(params: { q: string; type?: EntryType | "" }) {
  const { userId, entries } = await getEntriesForUser();
  const q = params.q.trim();
  if (!q) return [];

  const filter: Record<string, unknown> = {
    userId,
    $text: { $search: q }
  };

  if (params.type) {
    filter.type = params.type;
  }

  const docs = await entries
    .find(filter, { projection: { ts: 1, time: 1, type: 1, search: 1, input: 1 } })
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
  const { userId, entries } = await getEntriesForUser();
  const filter: Record<string, unknown> = { userId };
  if (type) {
    filter.type = type;
  }

  const docs = await entries
    .find(filter, { projection: { ts: 1, time: 1, type: 1, search: 1, input: 1 } })
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
  const { userId, entries } = await getEntriesForUser();
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return entries.findOne({ _id: new ObjectId(id), userId });
}

export async function deleteEntryById(id: string): Promise<void> {
  const { userId, entries } = await getEntriesForUser();
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid entry id");
  }

  const _id = new ObjectId(id);

  const entry = await entries.findOne({ _id, userId });
  if (!entry) {
    throw new Error("Entry not found");
  }

  if (entry.image?.gridFsId) {
    const bucket = await getBucket();
    try {
      await bucket.delete(entry.image.gridFsId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.toLowerCase().includes("file not found")) {
        throw error;
      }
    }
  }

  await entries.deleteOne({ _id, userId });
}

export async function retryMealSummary(entryId: string): Promise<{ id: string; summary: string }> {
  const { userId, entries } = await getEntriesForUser();
  if (!ObjectId.isValid(entryId)) {
    throw new Error("Invalid entry id");
  }

  const _id = new ObjectId(entryId);

  const entry = await entries.findOne({ _id, userId });
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
    { _id, userId },
    {
      $set: {
        ai,
        aiJob: {
          status: "completed",
          model: ai.model,
          promptVersion: ai.promptVersion,
          requestedAt: entry.aiJob?.requestedAt || new Date(),
          completedAt: new Date()
        },
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
