import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { createGiEntry } from "@/lib/server/entries";

function readParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function GiPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  async function submitGi(formData: FormData) {
    "use server";

    const notes = String(formData.get("notes") || "");
    const severity = Number(formData.get("severity") || 0);
    const locations = formData.getAll("locations").map(String);

    const id = await createGiEntry({ notes, severity, locations });
    redirect(`/gi?saved=1&id=${id}`);
  }

  const params = await searchParams;
  const saved = readParam(params.saved) === "1";
  const id = readParam(params.id);

  return (
    <>
      <PageHero title="Log GI Event" subtitle="Record GI symptoms and context." />
      <Surface>
        <form action={submitGi}>
          <label>
            Severity (0-10)
            <input name="severity" type="number" min={0} max={10} defaultValue={3} required />
          </label>
          <fieldset>
            <legend>Location</legend>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="upper_stomach" />
              Upper stomach
            </label>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="lower_abdomen" />
              Lower abdomen
            </label>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="cramps" />
              Cramps
            </label>
            <label className="inline-check">
              <input type="checkbox" name="locations" value="bloating" />
              Bloating
            </label>
          </fieldset>
          <label>
            Notes
            <textarea name="notes" placeholder="Optional notes" />
          </label>
          <button type="submit">Save GI Event</button>
        </form>
      </Surface>

      {saved && id ? (
        <div className="status-wrap">
          <p className="status-ok">Saved GI event: {id}</p>
          <p>
            <Link href={`/entry/${id}`}>View entry</Link> | <Link href="/search">View history</Link>
          </p>
        </div>
      ) : null}
    </>
  );
}
