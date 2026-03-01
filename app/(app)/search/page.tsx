import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { deleteEntryById, getRecentEntries, searchEntries } from "@/lib/server/entries";
import { formatTs } from "@/lib/server/time";
import { EntryType } from "@/lib/types";

function readParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function parseType(value: string): EntryType | "" {
  if (value === "meal" || value === "gi_event" || value === "bm") {
    return value;
  }
  return "";
}

function buildSearchHref(params: { q?: string; type?: EntryType | ""; deletedId?: string; deleteError?: string }) {
  const next = new URLSearchParams();
  if (params.q) next.set("q", params.q);
  if (params.type) next.set("type", params.type);
  if (params.deletedId) next.set("deleted", params.deletedId);
  if (params.deleteError) next.set("delete_error", params.deleteError);
  return `/search${next.toString() ? `?${next.toString()}` : ""}`;
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  async function deleteAction(formData: FormData) {
    "use server";

    const id = String(formData.get("id") || "");
    const currentQ = String(formData.get("currentQ") || "");
    const currentType = parseType(String(formData.get("currentType") || ""));

    try {
      await deleteEntryById(id);
      redirect(buildSearchHref({ q: currentQ, type: currentType, deletedId: id }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed";
      redirect(buildSearchHref({ q: currentQ, type: currentType, deleteError: message }));
    }
  }

  const params = await searchParams;
  const q = readParam(params.q);
  const type = parseType(readParam(params.type));
  const deletedId = readParam(params.deleted);
  const deleteError = readParam(params.delete_error);
  const items = q ? await searchEntries({ q, type }) : await getRecentEntries(30, type);

  return (
    <>
      <PageHero title="Search Entries" subtitle="Find logs using full text and type filters." />
      <Surface>
        <form method="GET">
          <label>
            Query (optional)
            <input name="q" defaultValue={q} placeholder="e.g. oats bloating" />
          </label>
          <label>
            Type (optional)
            <select name="type" defaultValue={type}>
              <option value="">All</option>
              <option value="meal">Meal</option>
              <option value="gi_event">GI Event</option>
              <option value="bm">BM</option>
            </select>
          </label>
          <button type="submit">Search</button>
        </form>
      </Surface>

      {q ? (
        <div className="status-wrap">
          <p className="status-ok">Found {items.length} entries</p>
        </div>
      ) : (
        <div className="status-wrap">
          <p className="status-ok">Showing recent history ({items.length})</p>
        </div>
      )}
      {deletedId ? (
        <div className="status-wrap">
          <p className="status-ok">Deleted entry: {deletedId}</p>
        </div>
      ) : null}
      {deleteError ? (
        <div className="status-wrap">
          <p className="status-error">{deleteError}</p>
        </div>
      ) : null}

      <div className="result-list">
        {items.map((item) => (
          <Surface key={item._id}>
            <p>
              <strong>{item.type}</strong> | {formatTs(item.ts, item.time)}
            </p>
            <p>{item.snippet}</p>
            <p>
              <Link href={`/entry/${item._id}`}>Open Entry</Link>
            </p>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={item._id} />
              <input type="hidden" name="currentQ" value={q} />
              <input type="hidden" name="currentType" value={type} />
              <button type="submit">Delete Entry</button>
            </form>
          </Surface>
        ))}
      </div>
    </>
  );
}
