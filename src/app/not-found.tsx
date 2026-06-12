import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] px-4 text-stone-950">
      <section className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold">Page not found</h1>
        <p className="text-sm text-stone-600">
          The page you requested does not exist in Meal Signal.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
