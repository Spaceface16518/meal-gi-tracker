import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requirePasscode } from "@/lib/auth";
import { getDb } from "@/lib/mongo";
import { EntryDoc } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requirePasscode(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const db = await getDb();
    const entries = db.collection<EntryDoc>("entries");

    const doc = await entries.findOne({ _id: new ObjectId(id), userId: "me" });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
