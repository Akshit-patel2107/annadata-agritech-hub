import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  commodity: z.string().min(1).max(60),
  variety: z.string().max(60).optional(),
  indianPricePerQuintal: z.number().positive(),
  quantityQuintals: z.number().positive(),
});

export type AiMarket = {
  country: string;
  flag: string;
  pricePerQuintal: number;
  demand: "High" | "Medium" | "Low";
  note: string;
};

export type AiExportInsight = {
  markets: AiMarket[];
  bestCountry: string;
  summary: string;
  risks: string[];
};

export const analyzeExportDemand = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const custom = process.env["AI_API_KEY"];
    const gateway = process.env["LOVABLE_API_KEY"];
    const key = custom || gateway;
    const baseUrl = custom
      ? process.env["AI_API_BASE_URL"] || "https://api.openai.com/v1"
      : "https://ai.gateway.lovable.dev/v1";
    const model = custom
      ? process.env["AI_MODEL"] || "gpt-4o-mini"
      : "google/gemini-3.6-flash";

    if (!key) {
      return { ok: false as const, error: "AI export desk is not configured yet." };
    }

    const prompt = `Indian farmer wants to export ${data.quantityQuintals} quintals of ${data.commodity}${
      data.variety ? ` (variety: ${data.variety})` : ""
    }. Current Indian mandi price is INR ${data.indianPricePerQuintal} per quintal.

Return the 5 countries with the strongest current import demand for this commodity from India.
For each: country name, its flag emoji, realistic landed wholesale price in INR per quintal in that market, demand level (High/Medium/Low), and a one-line practical note (route, certification, buyer type).
Also give the single best country, a 2-sentence summary comparing global prices with the Indian price, and 3 short risk/compliance points.
Prices must be realistic estimates in INR per quintal.`;

    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: custom
          ? { "content-type": "application/json", Authorization: `Bearer ${key}` }
          : { "content-type": "application/json", "Lovable-API-Key": key },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are the अन्नData export desk analyst. You know global agri trade flows, Indian export corridors and phytosanitary rules. Reply ONLY with JSON matching the requested schema.",
            },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "export_insight",
              strict: true,
              schema: {
                type: "object",
                additionalProperties: false,
                properties: {
                  markets: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        country: { type: "string" },
                        flag: { type: "string" },
                        pricePerQuintal: { type: "number" },
                        demand: { type: "string", enum: ["High", "Medium", "Low"] },
                        note: { type: "string" },
                      },
                      required: ["country", "flag", "pricePerQuintal", "demand", "note"],
                    },
                  },
                  bestCountry: { type: "string" },
                  summary: { type: "string" },
                  risks: { type: "array", items: { type: "string" } },
                },
                required: ["markets", "bestCountry", "summary", "risks"],
              },
            },
          },
        }),
      });

      if (res.status === 429) return { ok: false as const, error: "Rate limit reached. Try again in a moment." };
      if (res.status === 402) return { ok: false as const, error: "AI credits exhausted. Please top up credits." };
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        return { ok: false as const, error: `AI error (${res.status}): ${t.slice(0, 180)}` };
      }

      const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
      const raw = json.choices?.[0]?.message?.content?.trim();
      if (!raw) return { ok: false as const, error: "AI returned an empty response." };
      const parsed = JSON.parse(raw.replace(/^```json\s*|```$/g, "")) as AiExportInsight;
      return { ok: true as const, insight: parsed };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Network error" };
    }
  });
