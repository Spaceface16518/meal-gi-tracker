import Link from "next/link";
import { EntryTypeCards } from "@/components/EntryTypeCards";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";

export default function HomePage() {
  return (
    <>
      <PageHero
        title="Choose Entry Type"
        subtitle="Pick what you want to log, then complete a focused flow."
      />
      <EntryTypeCards />
      <Surface>
        <h2>History</h2>
        <p>Use the Search page for recent entries and full history.</p>
        <Link href="/search" className="primary-link">
          Open Search
        </Link>
      </Surface>
    </>
  );
}
