"use client";

import { useMemo, useState } from "react";

function resolveTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function resolveOffsetMinutes() {
  return -new Date().getTimezoneOffset();
}

function toDateTimeLocalValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function toIsoString(localDateTime: string): string {
  if (!localDateTime) return "";
  const parsed = new Date(localDateTime);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString();
}

export function TimezoneFields() {
  const timezone = useMemo(() => resolveTimezone(), []);
  const utcOffsetMinutes = useMemo(() => resolveOffsetMinutes(), []);
  const [entryLocalDateTime, setEntryLocalDateTime] = useState(() => toDateTimeLocalValue(new Date()));
  const isoTimestamp = useMemo(() => toIsoString(entryLocalDateTime), [entryLocalDateTime]);

  return (
    <div className="timestamp-card">
      <label>
        Entry date and time
        <input
          name="entryLocalDateTime"
          type="datetime-local"
          value={entryLocalDateTime}
          max={toDateTimeLocalValue(new Date())}
          onChange={(event) => setEntryLocalDateTime(event.target.value)}
          required
        />
      </label>
      <p className="timestamp-help">
        Uses your browser&apos;s timezone (<strong>{timezone}</strong>). Change this if you need to log an older event.
      </p>
      <input type="hidden" name="clientTimezone" value={timezone} />
      <input type="hidden" name="clientUtcOffsetMinutes" value={String(utcOffsetMinutes)} />
      <input type="hidden" name="entryTimestampIso" value={isoTimestamp} />
    </div>
  );
}
