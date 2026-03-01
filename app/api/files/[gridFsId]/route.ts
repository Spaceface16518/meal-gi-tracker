import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { Readable } from "stream";
import { requirePasscode } from "@/lib/auth";
import { getBucket } from "@/lib/mongo";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ gridFsId: string }> }
) {
  const authError = requirePasscode(request);
  if (authError) return authError;

  try {
    const { gridFsId } = await context.params;
    if (!ObjectId.isValid(gridFsId)) {
      return new Response("Invalid file id", { status: 400 });
    }

    const bucket = await getBucket();
    const _id = new ObjectId(gridFsId);
    const fileDoc = await bucket.find({ _id }).next();

    if (!fileDoc) {
      return new Response("Not found", { status: 404 });
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
