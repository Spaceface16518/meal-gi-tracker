import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { MealForm } from "@/components/forms/MealForm";
import { createMealEntry } from "@/lib/server/entries";
import { parseTimeMetaFromFormData } from "@/lib/server/time";

export default function MealPage() {
  async function submitMeal(formData: FormData) {
    "use server";

    const debugId = `meal-${Date.now()}`;

    try {
      const notes = String(formData.get("notes") || "");
      const imageValue = formData.get("image");
      const imageFile = imageValue instanceof File ? imageValue : null;
      const time = parseTimeMetaFromFormData(formData);
      console.info("[meal-ai] submitMeal received", {
        debugId,
        hasImage: Boolean(imageFile && imageFile.size > 0),
        imageSize: imageFile?.size || 0,
        notesLength: notes.length,
        timezone: time.timezone,
        utcOffsetMinutes: time.utcOffsetMinutes
      });

      const result = await createMealEntry({
        notes,
        imageFile,
        debugId,
        time
      });
      console.info("[meal-ai] submitMeal success", {
        debugId,
        entryId: result.id,
        hasSummary: Boolean(result.aiSummary)
      });

      return {
        ok: true,
        id: result.id,
        aiSummary: result.aiSummary
      };
    } catch (error) {
      console.error("[meal-ai] submitMeal failed", {
        debugId,
        error: error instanceof Error ? error.message : String(error)
      });
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to save meal"
      };
    }
  }

  return (
    <>
      <PageHero
        title="Log Meal"
        subtitle="Capture meal notes and optional photo. AI extraction runs in the background after save."
      />
      <Surface>
        <MealForm action={submitMeal} />
      </Surface>
    </>
  );
}
