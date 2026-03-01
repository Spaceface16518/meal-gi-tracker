import OpenAI from "openai";
import { MealExtraction } from "./types";

const model = process.env.OPENAI_MODEL || "gpt-5-mini";

const extractionSchema = {
  name: "meal_extraction",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["rawTextSummary", "searchText", "extracted", "uncertaintyNotes"],
    properties: {
      rawTextSummary: { type: "string" },
      searchText: { type: "string" },
      extracted: {
        type: "object",
        additionalProperties: true,
        properties: {
          estimatedMacros: {
            type: "object",
            additionalProperties: true,
            properties: {
              caloriesRange: { type: "string" },
              proteinGramsRange: { type: "string" },
              carbsGramsRange: { type: "string" },
              fatGramsRange: { type: "string" }
            }
          },
          fiberRichness: {
            type: "string",
            enum: ["low", "medium", "high", "unknown"]
          }
        }
      },
      uncertaintyNotes: {
        type: "array",
        items: { type: "string" }
      },
      confidence: {
        type: "object",
        additionalProperties: true
      }
    }
  }
} as const;

function extractJsonFromResponse(response: any): MealExtraction {
  const text = response.output_text;
  if (text) {
    return JSON.parse(text) as MealExtraction;
  }

  const possible = response.output?.find((item: any) => item.type === "message")?.content;
  const firstText = possible?.find((c: any) => c.type === "output_text")?.text;
  if (!firstText) {
    throw new Error("No structured output returned by OpenAI");
  }
  return JSON.parse(firstText) as MealExtraction;
}

export async function extractMealData(params: {
  imageBase64: string;
  mimeType: string;
  notes?: string;
}): Promise<{ data: MealExtraction; model: string; promptVersion: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const client = new OpenAI({ apiKey });
  const promptVersion = "v1";

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              `You are a meal logging extractor for GI tracking. Return JSON
              only. Be honest about uncertainty. Use ranges for macro estimates
              when uncertain. Do not provide diagnosis or medical advice; only
              log and potential trigger observations.`
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `User notes: ${params.notes || "(none)"}`
          },
          {
            type: "input_image",
            image_url: `data:${params.mimeType};base64,${params.imageBase64}`
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        ...extractionSchema
      }
    }
  } as any);

  const data = extractJsonFromResponse(response);
  return { data, model, promptVersion };
}
