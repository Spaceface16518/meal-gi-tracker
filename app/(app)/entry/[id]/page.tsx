import { EntryViewer } from "@/components/EntryViewer";
import { PageHero } from "@/components/PageHero";

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PageHero title="Entry Detail" subtitle="Full document view for this entry." />
      <EntryViewer id={id} />
    </>
  );
}
