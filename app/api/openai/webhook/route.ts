import OpenAI from "openai";
import { ObjectId } from "mongodb";
import { extractJsonFromResponse, MEAL_PROMPT_VERSION } from "@/lib/openaiExtract";
import { getDb } from "@/lib/mongo";
import { EntryDoc } from "@/lib/types";

function normalizeText(parts: Array<string | undefined>): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const webhookSecret = process.env.OPENAI_WEBHOOK_SECRET;

  if (!apiKey || !webhookSecret) {
    console.error("[meal-ai] webhook env not configured");
    return new Response("Webhook not configured", { status: 500 });
  }

  const client = new OpenAI({ apiKey, webhookSecret });
  const rawBody = await request.text();

  let event: any;
  try {
    event = client.webhooks.unwrap(rawBody, request.headers);
  } catch (error) {
    console.error("[meal-ai] invalid webhook signature", error);
    return new Response("Invalid signature", { status: 400 });
  }

  const responseData = event.data;
  const metadata = responseData?.metadata || {};
  const entryId = metadata.entryId;
  const userId = metadata.userId;

  if (!entryId || !userId || !ObjectId.isValid(entryId) || !ObjectId.isValid(userId)) {
    console.warn("[meal-ai] webhook missing metadata", {
      eventType: event.type,
      entryId,
      userId,
      responseId: responseData?.id
    });
    return Response.json({ ok: true });
  }

  const db = await getDb();
  const entries = db.collection<EntryDoc>("entries");
  const filter = {
    _id: new ObjectId(entryId),
    userId: new ObjectId(userId)
  };

  if (event.type === "response.completed") {
    try {
      const extraction = extractJsonFromResponse(responseData);
      const entry = await entries.findOne(filter, { projection: { input: 1, search: 1 } });
      if (!entry) {
        return Response.json({ ok: true });
      }

      const ai: NonNullable<EntryDoc["ai"]> = {
        model: responseData.model || process.env.OPENAI_MODEL || "gpt-4.1-mini",
        promptVersion: metadata.promptVersion || MEAL_PROMPT_VERSION,
        rawTextSummary: extraction.rawTextSummary,
        extracted: extraction.extracted,
        searchText: extraction.searchText,
        confidence: extraction.confidence,
        uncertaintyNotes: extraction.uncertaintyNotes
      };

      await entries.updateOne(
        filter,
        {
          $set: {
            ai,
            aiJob: {
              status: "completed",
              responseId: responseData.id,
              model: ai.model,
              promptVersion: ai.promptVersion,
              requestedAt: entry.aiJob?.requestedAt || new Date(),
              completedAt: new Date()
            },
            search: {
              ...(entry.search || {}),
              text:
                normalizeText([entry.input?.notes, extraction.searchText, extraction.rawTextSummary]) ||
                entry.search?.text ||
                "meal"
            }
          }
        }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await entries.updateOne(filter, {
        $set: {
          aiJob: {
            status: "failed",
            responseId: responseData?.id,
            promptVersion: metadata.promptVersion || MEAL_PROMPT_VERSION,
            requestedAt: new Date(),
            completedAt: new Date(),
            error: `Webhook processing failed: ${message}`
          }
        }
      });
    }
  }

  if (event.type === "response.failed") {
    const failureMessage = responseData?.error?.message || "OpenAI background response failed";
    await entries.updateOne(filter, {
      $set: {
        aiJob: {
          status: "failed",
          responseId: responseData?.id,
          model: responseData?.model,
          promptVersion: metadata.promptVersion || MEAL_PROMPT_VERSION,
          requestedAt: new Date(),
          completedAt: new Date(),
          error: failureMessage
        }
      }
    });
  }

  return Response.json({ ok: true });
}
