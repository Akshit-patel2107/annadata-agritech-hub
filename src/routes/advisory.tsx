import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Bot, User, Send, Sparkles, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askAdvisor } from "@/lib/advisory.functions";
import { useProfile } from "@/lib/profile";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: "AI Crop Advisory · अन्नData" },
      { name: "description", content: "Sowing, fertiliser, irrigation and pest guidance calibrated to your farm — powered by Lovable AI." },
      { property: "og:title", content: "AI Crop Advisory · अन्नData" },
      { property: "og:description", content: "Sowing, fertiliser, irrigation and pest guidance — powered by Lovable AI." },
    ],
  }),
  component: Advisory,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "When should I sow wheat in Sehore?",
  "Fertiliser schedule for basmati rice?",
  "How to control pink bollworm in cotton?",
  "मूंग की फसल में पीले पत्ते क्यों हो रहे हैं?",
];

function renderMd(text: string) {
  // minimal markdown: **bold**, line breaks, bullets
  const esc = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/^\s*[-*]\s+(.+)$/gm, "• $1")
    .replace(/\n/g, "<br/>");
}

function Advisory() {
  const { profile } = useProfile();
  const ask = useServerFn(askAdvisor);
  const greetingName = profile?.name?.split(" ")[0] ?? "friend";
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Namaste ${greetingName} 🙏 I'm your अन्नData advisor. Ask me about sowing, pests, fertilisers, storage or market timing — in English, हिंदी or ગુજરાતી.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [msgs, thinking]);

  const send = async (text: string) => {
    if (!text.trim() || thinking) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setThinking(true);
    try {
      const result = await ask({
        data: {
          messages: next.filter((m) => m.role === "user" || m.role === "assistant"),
          profile: profile
            ? { name: profile.name, village: profile.village, state: profile.state, role: profile.role }
            : undefined,
        },
      });
      if (result.ok) {
        setMsgs((m) => [...m, { role: "assistant", content: result.text }]);
      } else {
        setMsgs((m) => [...m, { role: "assistant", content: `⚠️ ${result.error}` }]);
      }
    } catch (e) {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: `⚠️ ${e instanceof Error ? e.message : "Could not reach the AI right now."}` },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="AI Advisory · Live"
          title={<>Ask your <span className="text-layered">agronomist.</span></>}
          hindi="सलाह"
          desc="Powered by Lovable AI (Gemini) — trained on ICAR practices, IMD weather signals and Indian mandi realities."
        />

        {!profile && (
          <div className="mb-4 flex items-start gap-2 rounded-2xl border-2 border-[color:var(--mustard)] bg-[color:var(--mustard)]/20 p-3 text-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>Tip: <a href="/auth" className="font-bold underline">create a free account</a> so advice is personalised to your farm.</span>
          </div>
        )}

        <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4 md:p-6">
          <div ref={scrollRef} className="h-[460px] space-y-4 overflow-y-auto pr-2">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-[color:var(--forest)] text-[color:var(--cream)]" : "bg-[color:var(--mustard)]"}`}>
                  {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-[color:var(--forest)] text-[color:var(--cream)]" : "bg-[color:var(--charcoal)]/5"}`}
                  dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
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
              <button key={s} onClick={() => send(s)} disabled={thinking} className="inline-flex items-center gap-1 rounded-full border border-[color:var(--charcoal)]/20 px-3 py-1 text-xs font-semibold hover:bg-[color:var(--mustard)] disabled:opacity-50">
                <Sparkles className="size-3" /> {s}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} disabled={thinking} placeholder="Ask anything — in English, हिंदी or ગુજરાતી…" className="flex-1 rounded-full border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--forest)] disabled:opacity-60" />
            <button type="submit" disabled={thinking || !input.trim()} className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--forest)] px-5 py-2.5 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)] disabled:opacity-50">
              <Send className="size-4" /> Ask
            </button>
          </form>
        </div>
      </main>
    </AppShell>
  );
}
