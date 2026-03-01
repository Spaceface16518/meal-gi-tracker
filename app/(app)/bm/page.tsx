import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { createBmEntry } from "@/lib/server/entries";

function readParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function BmPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  async function submitBm(formData: FormData) {
    "use server";

    const notes = String(formData.get("notes") || "");
    const bristol = Number(formData.get("bristol") || 4);
    const color = String(formData.get("color") || "brown");
    const urgency = formData.get("urgency") === "on";

    const id = await createBmEntry({ notes, bristol, color, urgency });
    redirect(`/bm?saved=1&id=${id}`);
  }

  const params = await searchParams;
  const saved = readParam(params.saved) === "1";
  const id = readParam(params.id);

  return (
    <>
      <PageHero title="Log BM" subtitle="Record stool details with quick structured fields." />
      <Surface>
        <form action={submitBm}>
          <label>
            <a href="https://en.wikipedia.org/wiki/Bristol_stool_scale" target="_blank" rel="noopener noreferrer">
              Bristol (1-7)
            </a>
            <input name="bristol" type="number" min={1} max={7} defaultValue={4} required />
          </label>
          <label>
            Color
            <select name="color" defaultValue="brown">
              <option value="brown">Brown</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="pale">Pale</option>
            </select>
          </label>
          <label className="inline-check">
            <input type="checkbox" name="urgency" />
            Urgency
          </label>
          <label>
            Notes
            <textarea name="notes" placeholder="Optional notes" />
          </label>
          <button type="submit">Save BM</button>
        </form>
      </Surface>

      {saved && id ? (
        <div className="status-wrap">
          <p className="status-ok">Saved BM entry: {id}</p>
          <p>
            <Link href={`/entry/${id}`}>View entry</Link> | <Link href="/search">View history</Link>
          </p>
        </div>
      ) : null}
    </>
  );
}
