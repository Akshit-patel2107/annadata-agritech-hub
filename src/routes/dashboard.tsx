import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { listings, mandiSnapshot, weather7Day } from "@/lib/mock-data";
import { useProfile } from "@/lib/profile";
import {
  Sprout, TrendingUp, TrendingDown, Cloud, Sun, CloudRain, Zap,
  ArrowUpRight, ScanLine, Brain, Warehouse, Truck, Wallet, Package, IndianRupee,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · अन्नData" },
      { name: "description", content: "Your farm command center — listings, prices, weather and advisory in one place." },
      { property: "og:title", content: "Dashboard · अन्नData" },
      { property: "og:description", content: "Your farm command center — listings, prices, weather and advisory in one place." },
    ],
  }),
  component: Dashboard,
});

const icons = { sun: Sun, cloud: Cloud, rain: CloudRain, storm: Zap } as const;

function Dashboard() {
  const { profile } = useProfile();
  const firstName = profile?.name?.split(" ")[0] ?? "farmer";
  const place = profile ? `${profile.village || "your village"}, ${profile.state}` : "Sehore, MP";
  const myListings = listings.slice(0, 3);
  const today = weather7Day[0];
  const TodayIcon = icons[today.icon as keyof typeof icons];

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <PageHeader
          kicker={`Namaste, ${firstName}`}
          title={<>Your farm, <span className="text-layered">on tap.</span></>}
          hindi="स्वागत"
          desc={profile ? `Signed in as ${profile.name} · ${place}. Everything organized around you.` : "Everything you need to grow, price, store, move and sell — organized around you."}
        />


        {/* Stat strip */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Package} label="Active listings" value="3" sub="250 quintals live" tint="var(--forest)" />
          <StatCard icon={IndianRupee} label="This season" value="₹6.4L" sub="↑ 18% vs last" tint="var(--orange-deep)" />
          <StatCard icon={Warehouse} label="In storage" value="180 qtl" sub="Sehore hub" tint="var(--mustard)" />
          <StatCard icon={Wallet} label="Wallet" value="₹42,300" sub="Instant withdraw" tint="var(--turquoise)" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weather */}
          <Link to="/weather" className="group relative overflow-hidden rounded-3xl border-2 border-[color:var(--charcoal)] bg-gradient-to-br from-[color:var(--turquoise)]/25 to-[color:var(--cream)] p-6 transition hover:shadow-[8px_8px_0_0_var(--charcoal)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{place} · Now</div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-5xl font-extrabold">{today.temp}°</div>
                <div className="mt-1 text-sm font-semibold">{today.cond} · rain {today.rain}%</div>
              </div>
              <TodayIcon className="size-14 text-[color:var(--orange-deep)]" />
            </div>
            <div className="mt-4 flex gap-2">
              {weather7Day.slice(1, 6).map((d) => {
                const Ic = icons[d.icon as keyof typeof icons];
                return (
                  <div key={d.day} className="flex-1 rounded-xl bg-[color:var(--cream)]/70 p-2 text-center">
                    <div className="text-[10px] font-bold uppercase">{d.day}</div>
                    <Ic className="mx-auto my-1 size-4" />
                    <div className="text-xs font-bold">{d.temp}°</div>
                  </div>
                );
              })}
            </div>
            <ArrowUpRight className="absolute right-4 top-4 size-5 opacity-40 transition group-hover:opacity-100 group-hover:rotate-12" />
          </Link>

          {/* Mandi prices */}
          <Link to="/prices" className="group relative overflow-hidden rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 transition hover:shadow-[8px_8px_0_0_var(--charcoal)]">
            <div className="flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold">Live Mandi</h3>
              <span className="font-[family-name:var(--font-devanagari)] text-xl text-[color:var(--forest)]">भाव</span>
            </div>
            <div className="mt-3 space-y-2">
              {mandiSnapshot.slice(0, 5).map((m) => (
                <div key={m.mandi} className="flex items-center justify-between rounded-xl bg-[color:var(--charcoal)]/5 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{m.commodity}</div>
                    <div className="truncate text-[11px] text-[color:var(--charcoal)]/60">{m.mandi}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold ${m.trend === "up" ? "text-[color:var(--forest)]" : "text-[color:var(--orange-deep)]"}`}>
                    ₹{m.price.toLocaleString("en-IN")}
                    {m.trend === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  </div>
                </div>
              ))}
            </div>
            <ArrowUpRight className="absolute right-4 top-4 size-5 opacity-40 transition group-hover:opacity-100 group-hover:rotate-12" />
          </Link>

          {/* Quick actions */}
          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)]">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold">Quick actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <QuickAction to="/sell" icon={Sprout} label="List Produce" />
              <QuickAction to="/disease" icon={ScanLine} label="Scan Leaf" />
              <QuickAction to="/advisory" icon={Brain} label="Ask AI" />
              <QuickAction to="/warehouse" icon={Warehouse} label="Book Storage" />
              <QuickAction to="/marketplace" icon={Truck} label="Find Buyer" />
              <QuickAction to="/prices" icon={TrendingUp} label="Forecast" />
            </div>
          </div>
        </div>

        {/* My listings */}
        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">
              Your active listings <span className="font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]">सूची</span>
            </h2>
            <Link to="/marketplace" className="text-sm font-semibold text-[color:var(--forest)] hover:underline">
              View marketplace →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {myListings.map((l) => (
              <Link key={l.id} to="/marketplace/$id" params={{ id: l.id }} className="group overflow-hidden rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] transition hover:shadow-[8px_8px_0_0_var(--charcoal)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={l.image} alt={l.commodity} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                  <span className="absolute left-3 top-3 rounded-full bg-[color:var(--mustard)] px-2 py-0.5 text-[10px] font-bold uppercase">Grade {l.grade}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-[family-name:var(--font-display)] text-lg font-extrabold">{l.variety}</div>
                    <span className="font-[family-name:var(--font-devanagari)] text-lg text-[color:var(--forest)]">{l.hindi}</span>
                  </div>
                  <div className="mt-1 text-xs text-[color:var(--charcoal)]/60">{l.quantityQuintals} qtl · {l.location}</div>
                  <div className="mt-3 text-xl font-bold text-[color:var(--forest)]">₹{l.pricePerQuintal.toLocaleString("en-IN")}<span className="text-xs text-[color:var(--charcoal)]/50">/qtl</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function StatCard({ icon: Ic, label, value, sub, tint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string; tint: string }) {
  return (
    <div className="rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{label}</span>
        <span className="inline-flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: tint, color: "var(--cream)" }}>
          <Ic className="size-4" />
        </span>
      </div>
      <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold">{value}</div>
      <div className="text-xs text-[color:var(--charcoal)]/60">{sub}</div>
    </div>
  );
}

function QuickAction({ to, icon: Ic, label }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-start gap-2 rounded-xl border border-[color:var(--cream)]/15 bg-[color:var(--cream)]/5 p-3 text-left transition hover:bg-[color:var(--mustard)] hover:text-[color:var(--charcoal)]"
    >
      <Ic className="size-5" />
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}
