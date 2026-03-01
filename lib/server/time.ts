import "server-only";

import { EntryTimeMeta } from "@/lib/types";

export function parseTimeMetaFromFormData(formData: FormData): EntryTimeMeta {
  const timezoneRaw = String(formData.get("clientTimezone") || "").trim();
  const offsetRaw = String(formData.get("clientUtcOffsetMinutes") || "").trim();
  const offset = Number(offsetRaw);

  return {
    timezone: timezoneRaw || "UTC",
    utcOffsetMinutes: Number.isFinite(offset) ? offset : 0
  };
}

export function formatTs(ts: Date | string, time?: EntryTimeMeta): string {
  const date = ts instanceof Date ? ts : new Date(ts);
  const zone = time?.timezone;

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
      ...(zone ? { timeZone: zone } : {})
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}
