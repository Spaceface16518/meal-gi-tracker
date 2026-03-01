"use client";

import { useEffect, useState } from "react";
import { StatusMessage } from "@/components/StatusMessage";
import { Surface } from "@/components/Surface";

export function EntryViewer({ id }: { id: string }) {
  const [entry, setEntry] = useState<any>(null);
  const [status, setStatus] = useState("Loading entry...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const res = await fetch(`/api/entries/${id}`);
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || "Failed to load entry");
        }
        setEntry(json);
        setStatus("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setStatus("");
      }
    }

    void load();
  }, [id]);

  return (
    <>
      <StatusMessage status={status} error={error} />

      {entry ? (
        <Surface>
          <p>
            <strong>Type:</strong> {entry.type}
          </p>
          <p>
            <strong>Time:</strong> {new Date(entry.ts).toLocaleString()}
          </p>
          {entry.image?.gridFsId ? (
            <img className="entry-image" alt="Meal" src={`/api/files/${entry.image.gridFsId}`} />
          ) : null}
          <pre>{JSON.stringify(entry, null, 2)}</pre>
        </Surface>
      ) : null}
    </>
  );
}
