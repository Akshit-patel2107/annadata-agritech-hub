import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: "AI Crop Advisory · अन्नData" },
      { name: "description", content: "Sowing, fertiliser, irrigation and pest guidance calibrated to your farm — in your language." },
      { property: "og:title", content: "AI Crop Advisory · अन्नData" },
      { property: "og:description", content: "Sowing, fertiliser, irrigation and pest guidance calibrated to your farm." },
    ],
  }),
  component: Advisory,
});

type Msg = { role: "user" | "bot"; text: string };

const SUGGESTIONS = [
  "When should I sow wheat in Sehore?",
  "Fertiliser schedule for basmati rice?",
  "How to control pink bollworm in cotton?",
  "Best storage for mustard seed?",
];

const CANNED: Record<string, string> = {
  wheat: "Sow between **Nov 5–20** for Sehore. Use certified Sharbati or HD-3226 at 40 kg/acre. Apply DAP 50 kg + MOP 20 kg as basal. First irrigation at 21 days (CRI stage).",
  basmati: "For Basmati 1121: transplant 25-day nursery at 20×15 cm spacing. Apply 60 kg N in 3 splits: 50% basal, 25% at tillering, 25% at panicle initiation. Keep 2–3 cm standing water till milking.",
  bollworm: "Scout 20 bolls/acre weekly. Threshold: 10% infestation. Spray **Emamectin benzoate 5% SG** at 200 g/ha OR pheromone traps at 8/acre. Rotate modes of action every spray.",
  mustard: "Dry seeds to 8% moisture. Store in HDPE bags on wooden pallets, room 25–30°C, RH <60%. Fumigate with aluminium phosphide 3 g/tonne if stored >3 months.",
  default: "Based on your farm profile (Sehore, MP · 4.2 acres · black cotton soil), here's what I recommend. Ask about a specific crop, pest or stage and I'll go deeper.",
};

function reply(q: string) {
  const lc = q.toLowerCase();
  for (const k of Object.keys(CANNED)) if (k !== "default" && lc.includes(k)) return CANNED[k];
  return CANNED.default;
}

function Advisory() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Namaste Ramesh 🙏 I'm your अन्नData advisor. Ask me about sowing, pests, fertilisers, storage or market timing." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(text) }]);
      setThinking(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 20);
    }, 700);
  };

  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        <PageHeader kicker="AI Advisory" title={<>Ask your <span className="text-layered">agronomist.</span></>} hindi="सलाह" desc="Trained on ICAR data, IMD weather and thousands of Indian farms." />

        <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4 md:p-6">
          <div ref={scrollRef} className="h-[420px] space-y-4 overflow-y-auto pr-2">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-[color:var(--forest)] text-[color:var(--cream)]" : "bg-[color:var(--mustard)]"}`}>
                  {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-[color:var(--forest)] text-[color:var(--cream)]" : "bg-[color:var(--charcoal)]/5"}`}
                  dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") }}
                />
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-[color:var(--mustard)]"><Bot className="size-4" /></div>
                <div className="rounded-2xl bg-[color:var(--charcoal)]/5 px-4 py-3 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-[color:var(--forest)]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-[color:var(--forest)] [animation-delay:0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-[color:var(--forest)] [animation-delay:0.3s]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="inline-flex items-center gap-1 rounded-full border border-[color:var(--charcoal)]/20 px-3 py-1 text-xs font-semibold hover:bg-[color:var(--mustard)]">
                <Sparkles className="size-3" /> {s}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything — in English or हिंदी…" className="flex-1 rounded-full border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--forest)]" />
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--forest)] px-5 py-2.5 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)]">
              <Send className="size-4" /> Ask
            </button>
          </form>
        </div>
      </main>
    </AppShell>
  );
}
