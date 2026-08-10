import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { commodities } from "@/lib/mock-data";
import {
  baselineMarkets,
  feeSlabs,
  indianBenchmark,
  quoteExportFee,
  type ExportMarket,
} from "@/lib/export-data";
import { analyzeExportDemand, type AiExportInsight } from "@/lib/export.functions";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Globe2, Sparkles, Ship, TrendingUp, AlertTriangle, IndianRupee } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { title: "Export Desk · Global Prices for Your Crop · अन्नData" },
      {
        name: "description",
        content:
          "Compare your Indian mandi price with global buyer prices, find the best export destination, and see अन्नData's 0.5–1.5% commission or flat consultation fee upfront.",
      },
      { property: "og:title", content: "Export Desk · अन्नData" },
      {
        property: "og:description",
        content: "Find where in the world your commodity earns the best price, with AI demand analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExportDesk,
});

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function ExportDesk() {
  const run = useServerFn(analyzeExportDemand);
  const [commodity, setCommodity] = useState("Wheat");
  const [variety, setVariety] = useState("");
  const [qty, setQty] = useState(250);
  const [indianPrice, setIndianPrice] = useState(indianBenchmark["Wheat"] ?? 2550);
  const [insight, setInsight] = useState<AiExportInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const onCommodity = (c: string) => {
    setCommodity(c);
    setIndianPrice(indianBenchmark[c] ?? 3000);
    setInsight(null);
  };

  const markets: ExportMarket[] = useMemo(() => {
    if (insight) {
      return insight.markets.map((m) => ({
        country: m.country,
        flag: m.flag,
        pricePerQuintal: m.pricePerQuintal,
        demand: m.demand,
        note: m.note,
      }));
    }
    return baselineMarkets[commodity] ?? [];
  }, [insight, commodity]);

  const ranked = useMemo(
    () => [...markets].sort((a, b) => b.pricePerQuintal - a.pricePerQuintal),
    [markets],
  );
  const best = ranked[0];

  const domesticValue = qty * indianPrice;
  const exportValue = best ? qty * best.pricePerQuintal : 0;
  const uplift = exportValue - domesticValue;
  const fee = quoteExportFee(exportValue || domesticValue);
  const netGain = uplift - fee.fee;

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await run({
        data: {
          commodity,
          variety: variety || undefined,
          indianPricePerQuintal: indianPrice,
          quantityQuintals: qty,
        },
      });
      if (res.ok) {
        setInsight(res.insight);
        toast.success("Global demand analysed", { description: `Best market: ${res.insight.bestCountry}` });
      } else {
        toast.error(res.error);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not reach the export desk AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="Export Desk · Global"
          title={
            <>
              Sell where the world <span className="text-layered">pays most.</span>
            </>
          }
          hindi="निर्यात"
          desc="Compare your mandi price against live global demand, pick the best destination, and see exactly what अन्नData charges — 0.5%–1.5% commission, or a flat consultation fee for small batches."
        />

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Consignment form */}
          <section className="h-fit rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6">
            <h2 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-extrabold">
              <Ship className="size-5 text-[color:var(--forest)]" /> Your consignment
            </h2>
            <div className="grid gap-4">
              <Field label="Commodity">
                <select
                  value={commodity}
                  onChange={(e) => onCommodity(e.target.value)}
                  className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-semibold"
                >
                  {commodities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Variety (optional)">
                <input
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. Sharbati, Basmati 1121"
                  className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5"
                />
              </Field>
              <Field label="Quantity (quintals)">
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5"
                />
              </Field>
              <Field label="Your Indian price / quintal">
                <div className="relative">
                  <IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-50" />
                  <input
                    type="number"
                    min={1}
                    value={indianPrice}
                    onChange={(e) => setIndianPrice(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] py-2.5 pl-9 pr-3"
                  />
                </div>
              </Field>

              <button
                onClick={analyze}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--forest)] px-5 py-3 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)] disabled:opacity-60"
              >
                <Sparkles className="size-4" />
                {loading ? "Scanning world markets…" : "Analyse global demand with AI"}
              </button>

              <div className="rounded-2xl bg-[color:var(--charcoal)]/5 p-4 text-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
                  Domestic value
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold">
                  {inr(domesticValue)}
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="grid gap-6">
            <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-extrabold">
                  <Globe2 className="size-5 text-[color:var(--forest)]" /> World price comparison
                </h2>
                <span className="rounded-full border border-[color:var(--charcoal)]/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  {insight ? "AI analysed" : "Baseline corridors"}
                </span>
              </div>

              {ranked.length === 0 ? (
                <p className="text-sm text-[color:var(--charcoal)]/70">
                  No baseline corridor for this commodity yet — run the AI analysis above.
                </p>
              ) : (
                <div className="grid gap-2">
                  {ranked.map((m) => {
                    const diff = ((m.pricePerQuintal - indianPrice) / indianPrice) * 100;
                    return (
                      <div
                        key={m.country}
                        className="grid gap-2 rounded-2xl border border-[color:var(--charcoal)]/15 p-4 md:grid-cols-[1fr_auto] md:items-center"
                      >
                        <div>
                          <div className="flex items-center gap-2 font-bold">
                            <span className="text-xl">{m.flag}</span>
                            {m.country}
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                                m.demand === "High"
                                  ? "bg-[color:var(--forest)] text-[color:var(--cream)]"
                                  : m.demand === "Medium"
                                    ? "bg-[color:var(--mustard)]"
                                    : "bg-[color:var(--charcoal)]/10"
                              }`}
                            >
                              {m.demand} demand
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[color:var(--charcoal)]/70">{m.note}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                            {inr(m.pricePerQuintal)}
                            <span className="text-xs font-semibold opacity-60">/qtl</span>
                          </div>
                          <div
                            className={`text-xs font-bold ${diff >= 0 ? "text-[color:var(--forest)]" : "text-[color:var(--charcoal)]/60"}`}
                          >
                            {diff >= 0 ? "+" : ""}
                            {diff.toFixed(1)}% vs India ({inr(indianPrice)})
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {insight && (
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl bg-[color:var(--forest)]/10 p-4 text-sm leading-relaxed">
                    <b>Best market: {insight.bestCountry}.</b> {insight.summary}
                  </div>
                  {insight.risks.length > 0 && (
                    <ul className="grid gap-1.5 text-sm">
                      {insight.risks.map((r, i) => (
                        <li key={i} className="flex gap-2">
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[color:var(--mustard)]" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Earnings + fee */}
            {best && (
              <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)]">
                <h2 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-extrabold">
                  <TrendingUp className="size-5" /> If you export to {best.flag} {best.country}
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Stat label="Export value" value={inr(exportValue)} />
                  <Stat label="Extra vs mandi" value={`${uplift >= 0 ? "+" : ""}${inr(uplift)}`} />
                  <Stat label={fee.label} value={`− ${inr(fee.fee)}`} />
                </div>
                <div className="mt-4 rounded-2xl bg-[color:var(--cream)]/10 p-4">
                  <div className="text-xs font-bold uppercase tracking-widest opacity-70">
                    Your net gain after अन्नData charges
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[color:var(--mustard)]">
                    {netGain >= 0 ? "+" : ""}
                    {inr(netGain)}
                  </div>
                  <p className="mt-1 text-xs opacity-70">{fee.reason}</p>
                </div>
                <button
                  onClick={() =>
                    toast.success("Export request received", {
                      description: `Our trade desk will call you about ${qty} qtl of ${commodity} for ${best.country}.`,
                    })
                  }
                  className="mt-4 rounded-full bg-[color:var(--mustard)] px-6 py-3 text-sm font-semibold text-[color:var(--charcoal)] transition hover:bg-[color:var(--cream)]"
                >
                  Start export with अन्नData
                </button>
              </div>
            )}

            {/* Fee slabs */}
            <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl font-extrabold">
                What अन्नData charges <span className="font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]">शुल्क</span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {feeSlabs.map((s) => (
                  <div key={s.range} className="rounded-2xl border border-[color:var(--charcoal)]/15 p-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
                      {s.range}
                    </div>
                    <div className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[color:var(--forest)]">
                      {s.charge}
                    </div>
                    <p className="text-xs text-[color:var(--charcoal)]/70">{s.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[color:var(--charcoal)]/60">
                Commission is charged only on realised export value. Freight, insurance and duties are quoted
                separately before you confirm.
              </p>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[color:var(--cream)]/10 p-4">
      <div className="text-xs font-bold uppercase tracking-widest opacity-70">{label}</div>
      <div className="font-[family-name:var(--font-display)] text-xl font-extrabold">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
        {label}
      </span>
      {children}
    </label>
  );
}
