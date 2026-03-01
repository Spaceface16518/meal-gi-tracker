import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { getEntryById, retryMealSummary } from "@/lib/server/entries";

function readParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function EntryPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;

  async function retrySummaryAction() {
    "use server";

    try {
      await retryMealSummary(id);
      redirect(`/entry/${id}?retried=1`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Retry failed";
      redirect(`/entry/${id}?retry_error=${encodeURIComponent(message)}`);
    }
  }

  const entry = await getEntryById(id);
  if (!entry) {
    notFound();
  }

  const query = await searchParams;
  const retried = readParam(query.retried) === "1";
  const retryError = readParam(query.retry_error);
  const prettyEntry = {
    ...entry,
    _id: entry._id?.toString(),
    image: entry.image
      ? {
          ...entry.image,
          gridFsId: entry.image.gridFsId.toString()
        }
      : undefined
  };

  return (
    <>
      <PageHero title="Entry Detail" subtitle="Full document view for this entry." />

      <Surface>
        <p>
          <strong>Type:</strong> {entry.type}
        </p>
        <p>
          <strong>Time:</strong> {new Date(entry.ts).toLocaleString()}
        </p>

        {entry.image?.gridFsId ? (
          <img className="entry-image" alt="Meal" src={`/api/files/${entry.image.gridFsId.toString()}`} />
        ) : null}

        {entry.type === "meal" && entry.image?.gridFsId ? (
          <form action={retrySummaryAction}>
            <button type="submit">Retry AI Summary</button>
          </form>
        ) : null}

        <p>
          <Link href="/search">View history</Link>
        </p>

        <pre>{JSON.stringify(prettyEntry, null, 2)}</pre>
      </Surface>

      {retried ? (
        <div className="status-wrap">
          <p className="status-ok">AI summary refreshed.</p>
        </div>
      ) : null}

      {retryError ? (
        <div className="status-wrap">
          <p className="status-error">{retryError}</p>
        </div>
      ) : null}
    </>
  );
}
