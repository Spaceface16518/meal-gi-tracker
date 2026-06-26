import { describe, expect, it, vi } from "vitest";
import { formatRelativeTime } from "../../src/lib/date";

describe("formatRelativeTime", () => {
  it("formats recent timestamps with stable relative units", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-25T12:00:00.000Z"));

    expect(formatRelativeTime(new Date("2026-06-25T11:59:45.000Z"))).toBe("just now");
    expect(formatRelativeTime(new Date("2026-06-25T11:15:00.000Z"))).toBe("45m ago");
    expect(formatRelativeTime(new Date("2026-06-25T08:00:00.000Z"))).toBe("4h ago");
    expect(formatRelativeTime(new Date("2026-06-23T12:00:00.000Z"))).toBe("2d ago");

    vi.useRealTimers();
  });
});
