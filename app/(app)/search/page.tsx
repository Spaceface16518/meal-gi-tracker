import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { getRecentEntries, searchEntries } from "@/lib/server/entries";
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

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = readParam(params.q);
  const type = parseType(readParam(params.type));
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

      <div className="result-list">
        {items.map((item) => (
          <Surface key={item._id}>
            <p>
              <strong>{item.type}</strong> | {formatTs(item.ts, item.time)}
            </p>
            <p>{item.snippet}</p>
            <Link href={`/entry/${item._id}`}>Open Entry</Link>
          </Surface>
        ))}
      </div>
    </>
  );
}
