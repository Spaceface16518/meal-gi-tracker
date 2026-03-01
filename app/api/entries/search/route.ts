import { NextRequest, NextResponse } from "next/server";
import { Filter } from "mongodb";
import { requirePasscode } from "@/lib/auth";
import { getDb } from "@/lib/mongo";
import { EntryDoc, EntryType } from "@/lib/types";

export const runtime = "nodejs";

function shortSnippet(text: string): string {
  return text.slice(0, 180);
}

export async function GET(request: NextRequest) {
  const authError = requirePasscode(request);
  if (authError) return authError;

  try {
    const q = request.nextUrl.searchParams.get("q")?.trim();
    const typeParam = request.nextUrl.searchParams.get("type")?.trim() as EntryType | null;
    const type = typeParam === "meal" || typeParam === "gi_event" || typeParam === "bm" ? typeParam : null;

    if (!q) {
      return NextResponse.json({ error: "Missing q" }, { status: 400 });
    }

    const db = await getDb();
    const entries = db.collection<EntryDoc>("entries");

    const filter: Filter<EntryDoc> = {
      userId: "me",
      $text: { $search: q }
    };

    if (type) {
      filter.type = type;
    }

    const docs = await entries
      .find(filter, {
        projection: {
          ts: 1,
          type: 1,
          search: 1
        }
      })
      .sort({ ts: -1 })
      .limit(100)
      .toArray();

    const items = docs.map((d) => ({
      _id: d._id,
      ts: d.ts,
      type: d.type,
      snippet: shortSnippet(d.search?.text || d.input?.notes || "")
    }));

    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
