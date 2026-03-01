import { ObjectId } from "mongodb";
import { Readable } from "stream";
import { auth } from "@/lib/auth";
import { getBucket, getDb } from "@/lib/mongo";

export const runtime = "nodejs";

async function getSessionUserId(): Promise<ObjectId | null> {
  const session = await auth();
  const userId = session?.user?.id;
  return userId && ObjectId.isValid(userId) ? new ObjectId(userId) : null;
}

export async function GET(_request: Request, context: { params: Promise<{ gridFsId: string }> }) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { gridFsId } = await context.params;
    if (!ObjectId.isValid(gridFsId)) {
      return new Response("Invalid file id", { status: 400 });
    }

    const bucket = await getBucket();
    const db = await getDb();
    const _id = new ObjectId(gridFsId);
    const fileDoc = await bucket.find({ _id }).next();

    if (!fileDoc) {
      return new Response("Not found", { status: 404 });
    }

    const owner = typeof fileDoc.metadata?.userId === "string" ? fileDoc.metadata.userId : null;
    if (owner && owner !== userId.toHexString()) {
      return new Response("Not found", { status: 404 });
    }
    if (!owner) {
      const legacyEntry = await db.collection("entries").findOne({
        userId,
        "image.gridFsId": _id
      });
      if (!legacyEntry) {
        return new Response("Not found", { status: 404 });
      }
    }

    const nodeStream = bucket.openDownloadStream(_id);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new Response(webStream, {
      headers: {
        "Content-Type": fileDoc.contentType || "application/octet-stream",
        "Content-Length": String(fileDoc.length),
        "Cache-Control": "private, max-age=3600"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
