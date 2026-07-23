import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { weather7Day } from "@/lib/mock-data";
import { Sun, Cloud, CloudRain, Zap, Droplets, Wind, Sunrise, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Hyperlocal Weather · अन्नData" },
      { name: "description", content: "Village-level forecasts and cropping-calendar alerts tuned for Indian agriculture." },
      { property: "og:title", content: "Hyperlocal Weather · अन्नData" },
      { property: "og:description", content: "Village-level forecasts and cropping-calendar alerts tuned for Indian agriculture." },
    ],
  }),
  component: Weather,
});

const icons = { sun: Sun, cloud: Cloud, rain: CloudRain, storm: Zap } as const;

function Weather() {
  const today = weather7Day[0];
  const Ic = icons[today.icon as keyof typeof icons];

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <PageHeader kicker="Hyperlocal · Sehore, MP" title={<>Your <span className="text-layered">7-day sky.</span></>} hindi="मौसम" />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-gradient-to-br from-[color:var(--turquoise)]/30 to-[color:var(--mustard)]/20 p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Now</div>
                <div className="font-[family-name:var(--font-display)] text-7xl font-extrabold">{today.temp}°</div>
                <div className="text-lg font-semibold">{today.cond}</div>
              </div>
              <Ic className="size-32 text-[color:var(--orange-deep)]" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Metric icon={Droplets} label="Rain" value={`${today.rain}%`} />
              <Metric icon={Wind} label="Wind" value="12 km/h" />
              <Metric icon={Sunrise} label="Sunrise" value="6:14" />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)]">
            <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--mustard)]">Cropping alerts</div>
            <div className="mt-4 space-y-3">
              <Alert level="warn" title="Heavy rain Thursday" desc="Delay urea top-dressing on wheat by 3 days. Cover harvested lots." />
              <Alert level="ok" title="Ideal spraying window" desc="Tomorrow 6–10 AM: low wind, no rain. Pest management OK." />
              <Alert level="info" title="Rabi sowing" desc="Soil moisture optimal in your zone by next week." />
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-extrabold">7-day forecast</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {weather7Day.map((d) => {
              const DIc = icons[d.icon as keyof typeof icons];
              return (
                <div key={d.day} className="rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4 text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{d.day}</div>
                  <DIc className="mx-auto my-2 size-10 text-[color:var(--forest)]" />
                  <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold">{d.temp}°</div>
                  <div className="text-xs text-[color:var(--charcoal)]/60">low {d.low}° · {d.rain}%</div>
                  <div className="mt-1 text-[11px] font-semibold">{d.cond}</div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function Metric({ icon: Ic, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--cream)]/70 p-3 text-center">
      <Ic className="mx-auto size-4 text-[color:var(--charcoal)]/70" />
      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{label}</div>
      <div className="text-base font-bold">{value}</div>
    </div>
  );
}

function Alert({ level, title, desc }: { level: "warn" | "ok" | "info"; title: string; desc: string }) {
  const color =
    level === "warn" ? "var(--orange-deep)" : level === "ok" ? "var(--emerald)" : "var(--turquoise)";
  return (
    <div className="flex gap-3 rounded-xl bg-[color:var(--cream)]/5 p-3">
      <AlertTriangle className="mt-0.5 size-5 shrink-0" style={{ color }} />
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs opacity-80">{desc}</div>
      </div>
    </div>
  );
}
