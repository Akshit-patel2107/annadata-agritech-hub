import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { commodities, getPriceHistory, mandiSnapshot } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Mandi Prices · अन्नData" },
      { name: "description", content: "Live mandi prices, 14-day trends and AI demand forecasts across India." },
      { property: "og:title", content: "Mandi Prices · अन्नData" },
      { property: "og:description", content: "Live mandi prices, 14-day trends and AI demand forecasts across India." },
    ],
  }),
  component: Prices,
});

function Prices() {
  const [c, setC] = useState<string>("Wheat");
  const history = getPriceHistory(c);
  const latest = history[history.length - 1].price;
  const first = history[0].price;
  const delta = ((latest - first) / first) * 100;
  const forecast = Array.from({ length: 7 }).map((_, i) => ({
    day: `+${i + 1}d`,
    price: Math.round(latest * (1 + i * 0.006 + Math.sin(i) * 0.01)),
  }));

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <PageHeader kicker="Mandi Intelligence" title={<>Prices, <span className="text-layered">forecast, act.</span></>} hindi="भाव" desc="Track commodities across mandis and see where demand is moving next." />

        <div className="mb-6 flex flex-wrap gap-1.5">
          {commodities.map((x) => (
            <button key={x} onClick={() => setC(x)}
              className={`rounded-full border-2 px-3 py-1 text-xs font-bold transition ${c === x ? "border-[color:var(--charcoal)] bg-[color:var(--charcoal)] text-[color:var(--cream)]" : "border-[color:var(--charcoal)]/20 hover:border-[color:var(--charcoal)]"}`}>
              {x}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 lg:col-span-2">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{c} · Avg / quintal</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-5xl font-extrabold text-[color:var(--forest)]">₹{latest.toLocaleString("en-IN")}</div>
              </div>
              <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${delta >= 0 ? "bg-[color:var(--forest)]/15 text-[color:var(--forest)]" : "bg-[color:var(--orange-deep)]/15 text-[color:var(--orange-deep)]"}`}>
                {delta >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                {delta.toFixed(1)}% · 14d
              </div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--forest)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--forest)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={60} />
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                  <Area type="monotone" dataKey="price" stroke="var(--forest)" strokeWidth={3} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)]">
            <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--mustard)]">7-day AI Forecast</div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold">₹{forecast[forecast.length - 1].price.toLocaleString("en-IN")}</div>
            <div className="text-xs text-[color:var(--cream)]/70">expected in 7 days</div>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecast}>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--cream)" }} />
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                  <Line type="monotone" dataKey="price" stroke="var(--mustard)" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs text-[color:var(--cream)]/70">
              Model factors: sowing area, weather, exports, historical seasonality.
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Top mandis today</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mandiSnapshot.map((m) => (
              <div key={m.mandi} className="rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4">
                <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{m.mandi}</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="font-[family-name:var(--font-display)] text-xl font-extrabold">{m.commodity}</div>
                  <div className={`inline-flex items-center gap-1 text-lg font-bold ${m.trend === "up" ? "text-[color:var(--forest)]" : "text-[color:var(--orange-deep)]"}`}>
                    ₹{m.price.toLocaleString("en-IN")}
                    {m.trend === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
