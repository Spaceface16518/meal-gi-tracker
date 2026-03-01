"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { StatusMessage } from "@/components/StatusMessage";
import { Surface } from "@/components/Surface";
import { EntryType } from "@/lib/types";

type SearchItem = {
  _id: string;
  ts: string;
  type: EntryType;
  snippet: string;
};

export default function SearchPage() {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Searching...");
    setError("");

    try {
      const fd = new FormData(event.currentTarget);
      const q = String(fd.get("q") || "").trim();
      const type = String(fd.get("type") || "");

      const params = new URLSearchParams({ q });
      if (type) {
        params.set("type", type);
      }

      const res = await fetch(`/api/entries/search?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Search failed");
      }

      setItems(json.items || []);
      setStatus(`Found ${json.items?.length || 0} entries`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("");
    }
  }

  return (
    <>
      <PageHero title="Search Entries" subtitle="Find logs using full text and type filters." />
      <Surface>
        <form onSubmit={onSearch}>
          <label>
            Query
            <input name="q" required placeholder="e.g. oats bloating" />
          </label>
          <label>
            Type (optional)
            <select name="type" defaultValue="">
              <option value="">All</option>
              <option value="meal">Meal</option>
              <option value="gi_event">GI Event</option>
              <option value="bm">BM</option>
            </select>
          </label>
          <button type="submit">Search</button>
        </form>
      </Surface>

      <StatusMessage status={status} error={error} />

      <div className="result-list">
        {items.map((item) => (
          <Surface key={item._id}>
            <p>
              <strong>{item.type}</strong> | {new Date(item.ts).toLocaleString()}
            </p>
            <p>{item.snippet}</p>
            <Link href={`/entry/${item._id}`}>Open Entry</Link>
          </Surface>
        ))}
      </div>
    </>
  );
}
