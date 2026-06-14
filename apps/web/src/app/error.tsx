"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-strong">
          Meal Signal could not finish loading. Try again, or refresh the page if
          the problem continues.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-5 flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover"
        >
          <RefreshCcw size={16} aria-hidden />
          Try again
        </button>
      </section>
    </main>
  );
}
