import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Readable } from "stream";
import { requirePasscode } from "@/lib/auth";
import { getBucket, getDb } from "@/lib/mongo";
import { extractMealData } from "@/lib/openaiExtract";
import { EntryDoc, EntryType } from "@/lib/types";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 4_500_000;

function normalizeText(parts: Array<string | undefined>): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

async function uploadToGridFs(file: File): Promise<{
  gridFsId: ObjectId;
  contentType: string;
  sizeBytes: number;
  sha256: string;
  buffer: Buffer;
}> {
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

function parseEntryType(value: string | null): EntryType | null {
  if (value === "meal" || value === "gi_event" || value === "bm") {
    return value;
  }
  return null;
}

export async function POST(request: NextRequest) {
  const authError = requirePasscode(request);
  if (authError) return authError;

  try {
    const db = await getDb();
    const entries = db.collection<EntryDoc>("entries");
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const type = parseEntryType(String(form.get("type") || ""));
      const notes = String(form.get("notes") || "").trim();

      if (type !== "meal") {
        return NextResponse.json({ error: "Multipart supported only for meal type" }, { status: 400 });
      }

      const fileValue = form.get("image");
      const imageFile = fileValue instanceof File ? fileValue : null;

      if (!imageFile || imageFile.size <= 0) {
        return NextResponse.json({ error: "Meal image is required" }, { status: 400 });
      }

      if (imageFile.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: "Image too large. Max 4.5MB" }, { status: 413 });
      }

      const uploaded = await uploadToGridFs(imageFile);
      const image: EntryDoc["image"] = {
        gridFsId: uploaded.gridFsId,
        contentType: uploaded.contentType,
        sha256: uploaded.sha256,
        sizeBytes: uploaded.sizeBytes
      };

      const extracted = await extractMealData({
        imageBase64: uploaded.buffer.toString("base64"),
        mimeType: uploaded.contentType,
        notes
      });

      const ai: EntryDoc["ai"] = {
        model: extracted.model,
        promptVersion: extracted.promptVersion,
        rawTextSummary: extracted.data.rawTextSummary,
        extracted: extracted.data.extracted,
        searchText: extracted.data.searchText,
        confidence: extracted.data.confidence,
        uncertaintyNotes: extracted.data.uncertaintyNotes
      };

      const doc: EntryDoc = {
        ts: new Date(),
        type: "meal",
        userId: "me",
        input: {
          notes: notes || undefined
        },
        image,
        ai,
        search: {
          text: normalizeText([notes, ai?.searchText, ai?.rawTextSummary])
        }
      };

      if (!doc.search.text) {
        doc.search.text = notes || "meal";
      }

      const result = await entries.insertOne(doc);
      return NextResponse.json({ id: result.insertedId, ai });
    }

    const body = await request.json();
    const type = parseEntryType(body?.type || null);
    const notes = String(body?.notes || "").trim();
    const fields = (body?.fields as Record<string, unknown> | undefined) || undefined;

    if (!type || type === "meal") {
      return NextResponse.json({ error: "Use multipart meal flow for meal entries" }, { status: 400 });
    }

    const keyFieldText = fields
      ? Object.entries(fields)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
          .join(" ")
      : "";

    const doc: EntryDoc = {
      ts: new Date(),
      type,
      userId: "me",
      input: {
        notes: notes || undefined,
        fields
      },
      search: {
        text: normalizeText([notes, keyFieldText]) || type
      }
    };

    const result = await entries.insertOne(doc);
    return NextResponse.json({ id: result.insertedId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
