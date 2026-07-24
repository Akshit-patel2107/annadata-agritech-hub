import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
  profile: z
    .object({
      name: z.string().optional(),
      village: z.string().optional(),
      state: z.string().optional(),
      role: z.string().optional(),
    })
    .optional(),
});

export const askAdvisor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { ok: false as const, error: "AI is not configured on this server yet." };
    }

    const p = data.profile;
    const persona =
      p && p.name
        ? `The farmer you are talking to is ${p.name}${p.village ? ` from ${p.village}` : ""}${p.state ? `, ${p.state}` : ""} (role: ${p.role ?? "Farmer"}). Address them by first name.`
        : `You do not know the farmer's name yet. Ask them politely if useful.`;

    const system = `You are अन्नData Advisor — a warm, practical Indian agriculture expert.
${persona}
Give concise, actionable advice for Indian conditions (ICAR practices, IMD weather, local mandi realities).
Prefer bullet points and bold key numbers with **markdown**. Reply in the same language the farmer used (English, हिंदी, or ગુજરાતી).
If asked about pricing, storage, transport or buyers, mention that अन्नData can help via its marketplace, warehouse and procurement tools.
Keep answers under 180 words unless the farmer asks for more detail.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "google/gemini-3.6-flash",
          messages: [{ role: "system", content: system }, ...data.messages],
        }),
      });

      if (res.status === 429) return { ok: false as const, error: "Rate limit reached. Please try again in a moment." };
      if (res.status === 402) return { ok: false as const, error: "AI credits exhausted. Please top up your Lovable AI credits." };
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        return { ok: false as const, error: `AI error (${res.status}): ${t.slice(0, 200)}` };
      }

      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const text = json.choices?.[0]?.message?.content?.trim();
      if (!text) return { ok: false as const, error: "AI returned an empty response." };
      return { ok: true as const, text };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Network error" };
    }
  });
