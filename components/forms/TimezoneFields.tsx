"use client";

import { useMemo } from "react";

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

export function TimezoneFields() {
  const timezone = useMemo(() => resolveTimezone(), []);
  const utcOffsetMinutes = useMemo(() => resolveOffsetMinutes(), []);

  return (
    <>
      <input type="hidden" name="clientTimezone" value={timezone} />
      <input type="hidden" name="clientUtcOffsetMinutes" value={String(utcOffsetMinutes)} />
    </>
  );
}
