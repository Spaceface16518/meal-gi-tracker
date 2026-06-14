import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold">Page not found</h1>
        <p className="text-sm text-muted-strong">
          The page you requested does not exist in Meal Signal.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
