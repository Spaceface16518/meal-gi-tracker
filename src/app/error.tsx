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
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] px-4 text-stone-950">
      <section className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-stone-600">
          Meal Signal could not finish loading. Try again, or refresh the page if
          the problem continues.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-5 flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          <RefreshCcw size={16} aria-hidden />
          Try again
        </button>
      </section>
    </main>
  );
}
