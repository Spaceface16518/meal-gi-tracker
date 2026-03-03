import OpenAI from "openai";
import { MealExtraction } from "./types";

const configuredModel = process.env.OPENAI_MODEL?.trim();
const fallbackVisionModel = "gpt-4.1-mini";
export const MEAL_PROMPT_VERSION = "v1";

const extractionSchema = {
  name: "meal_extraction",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["rawTextSummary", "searchText", "extracted", "uncertaintyNotes", "confidence"],
    properties: {
      rawTextSummary: { type: "string" },
      searchText: { type: "string" },
      extracted: {
        type: "object",
        additionalProperties: false,
        required: ["estimatedMacros", "fiberRichness", "facts"],
        properties: {
          estimatedMacros: {
            type: ["object", "null"],
            additionalProperties: false,
            required: ["caloriesRange", "proteinGramsRange", "carbsGramsRange", "fatGramsRange"],
            properties: {
              caloriesRange: { type: ["string", "null"] },
              proteinGramsRange: { type: ["string", "null"] },
              carbsGramsRange: { type: ["string", "null"] },
              fatGramsRange: { type: ["string", "null"] }
            }
          },
          fiberRichness: {
            type: "string",
            enum: ["low", "medium", "high", "unknown"]
          },
          facts: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["key", "value"],
              properties: {
                key: { type: "string" },
                value: { type: "string" }
              }
            }
          }
        }
      },
      uncertaintyNotes: {
        type: "array",
        items: { type: "string" }
      },
      confidence: {
        type: ["object", "null"],
        additionalProperties: false,
        required: ["overall", "rationale"],
        properties: {
          overall: { type: ["string", "null"] },
          rationale: { type: ["string", "null"] }
        }
      }
    }
  }
} as const;

export function extractJsonFromResponse(response: any): MealExtraction {
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
  imageBase64?: string;
  mimeType?: string;
  notes?: string;
  debugId?: string;
}): Promise<{ data: MealExtraction; model: string; promptVersion: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const client = new OpenAI({ apiKey });
  const promptVersion = MEAL_PROMPT_VERSION;
  const primaryModel = configuredModel || fallbackVisionModel;
  const candidateModels = [primaryModel];
  if (primaryModel !== fallbackVisionModel) {
    candidateModels.push(fallbackVisionModel);
  }
  const hasImage = Boolean(params.imageBase64 && params.mimeType);

  console.info("[meal-ai] extraction start", {
    debugId: params.debugId,
    hasImage,
    notesLength: (params.notes || "").length,
    candidateModels
  });

  let lastError: unknown;

  for (const model of candidateModels) {
    try {
      const userContent: Array<{ type: string; text?: string; image_url?: string }> = [
        {
          type: "input_text",
          text: `User notes: ${params.notes || "(none)"}`
        }
      ];
      if (hasImage) {
        userContent.push({
          type: "input_image",
          image_url: `data:${params.mimeType};base64,${params.imageBase64}`
        });
      }

      console.info("[meal-ai] model attempt", {
        debugId: params.debugId,
        model,
        hasImage
      });

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
            content: userContent
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
      console.info("[meal-ai] extraction success", {
        debugId: params.debugId,
        model,
        hasImage
      });
      return { data, model, promptVersion };
    } catch (error) {
      console.error("[meal-ai] model attempt failed", {
        debugId: params.debugId,
        model,
        hasImage,
        error: error instanceof Error ? error.message : String(error)
      });
      lastError = error;
    }
  }

  const message = lastError instanceof Error ? lastError.message : "OpenAI request failed";
  throw new Error(
    `Meal extraction failed for model(s): ${candidateModels.join(", ")}. ${message}`
  );
}

export async function enqueueMealExtraction(params: {
  imageBase64?: string;
  mimeType?: string;
  notes?: string;
  debugId?: string;
  metadata?: Record<string, string>;
}): Promise<{ responseId: string; model: string; promptVersion: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const client = new OpenAI({ apiKey });
  const model = configuredModel || fallbackVisionModel;
  const hasImage = Boolean(params.imageBase64 && params.mimeType);

  const userContent: Array<{ type: string; text?: string; image_url?: string }> = [
    {
      type: "input_text",
      text: `User notes: ${params.notes || "(none)"}`
    }
  ];

  if (hasImage) {
    userContent.push({
      type: "input_image",
      image_url: `data:${params.mimeType};base64,${params.imageBase64}`
    });
  }

  const response = await client.responses.create({
    model,
    background: true,
    metadata: params.metadata,
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
        content: userContent
      }
    ],
    text: {
      format: {
        type: "json_schema",
        ...extractionSchema
      }
    }
  } as any);

  console.info("[meal-ai] extraction enqueued", {
    debugId: params.debugId,
    model,
    hasImage,
    responseId: response.id
  });

  return {
    responseId: response.id,
    model,
    promptVersion: MEAL_PROMPT_VERSION
  };
}
