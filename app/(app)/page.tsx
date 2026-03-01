import Link from "next/link";
import { EntryTypeCards } from "@/components/EntryTypeCards";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { getRecentEntries } from "@/lib/server/entries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recent = await getRecentEntries(8);

  return (
    <>
      <PageHero
        title="Choose Entry Type"
        subtitle="Pick what you want to log, then complete a focused flow."
      />
      <EntryTypeCards />
      <Surface>
        <h2>Recent History</h2>
        {recent.length === 0 ? <p>No entries yet.</p> : null}
        {recent.map((item) => (
          <p key={item._id}>
            <strong>{item.type}</strong> | {new Date(item.ts).toLocaleString()} |{" "}
            <Link href={`/entry/${item._id}`}>Open</Link>
          </p>
        ))}
        <Link href="/search" className="primary-link">
          Open Search
        </Link>
      </Surface>
    </>
  );
}
