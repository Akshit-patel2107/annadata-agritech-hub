import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { commodities } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { IndianRupee, ShieldCheck, Truck, Wallet, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/sell-to-us")({
  head: () => ({
    meta: [
      { title: "Sell to अन्नData · Guaranteed Procurement" },
      { name: "description", content: "Skip the middlemen. Sell your harvest directly to अन्नData at transparent, above-mandi rates with instant payment." },
      { property: "og:title", content: "Sell to अन्नData · Guaranteed Procurement" },
      { property: "og:description", content: "Guaranteed procurement with instant UPI payment, free pickup and transparent AI grading." },
    ],
  }),
  component: SellToUs,
});

const basePrice: Record<string, number> = {
  Wheat: 2550, Rice: 3800, Cotton: 7100, Pulses: 7200, Oilseeds: 5300,
  Tobacco: 12200, Chicory: 8600, Vegetables: 2000, Fruits: 15200,
};

const gradeMultiplier = { A: 1.08, B: 1.0, C: 0.9 } as const;

function SellToUs() {
  const [form, setForm] = useState({
    commodity: "Wheat",
    grade: "A" as "A" | "B" | "C",
    qty: 100,
    location: "",
    pickup: true,
    moisture: 12,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const offer = useMemo(() => {
    const b = basePrice[form.commodity] ?? 3000;
    const pricePerQtl = Math.round(b * gradeMultiplier[form.grade] * (form.moisture <= 12 ? 1.02 : 0.97));
    const gross = pricePerQtl * form.qty;
    const pickupFee = form.pickup ? Math.round(form.qty * 8) : 0;
    return { pricePerQtl, gross, pickupFee, net: gross - pickupFee };
  }, [form]);

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="Direct Procurement"
          title={<>Sell to <span className="text-layered">अन्नData.</span></>}
          hindi="हमें बेचें"
          desc="Guaranteed buyer, transparent AI grading, free pickup and instant UPI payment on quality confirmation."
        />

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Wallet, title: "Instant UPI Payment", desc: "Settled within 2 hours of quality check" },
            { icon: Truck, title: "Free Farm Pickup", desc: "500+ trucks across 12 states" },
            { icon: ShieldCheck, title: "Above-Mandi Rates", desc: "Bonus for grade & low moisture" },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4">
              <b.icon className="size-5 text-[color:var(--forest)]" />
              <div className="mt-2 font-[family-name:var(--font-display)] font-extrabold">{b.title}</div>
              <div className="text-sm text-[color:var(--charcoal)]/70">{b.desc}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Procurement request accepted", {
              description: `Our team will confirm pickup within 24 hrs. Net offer: ₹${offer.net.toLocaleString("en-IN")}`,
            });
          }}
          className="grid gap-6 rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 md:grid-cols-[1fr_360px] md:p-8"
        >
          <div className="grid gap-4">
            <Field label="Commodity">
              <select value={form.commodity} onChange={(e) => set("commodity", e.target.value)} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-semibold">
                {commodities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Grade (AI-suggested at pickup)">
              <div className="flex gap-2">
                {(["A", "B", "C"] as const).map((g) => (
                  <button type="button" key={g} onClick={() => set("grade", g)}
                    className={`flex-1 rounded-xl border-2 py-2 font-bold ${form.grade === g ? "border-[color:var(--forest)] bg-[color:var(--forest)] text-[color:var(--cream)]" : "border-[color:var(--charcoal)]/20"}`}>
                    Grade {g}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Quantity (quintals)">
                <input type="number" min={1} value={form.qty} onChange={(e) => set("qty", Number(e.target.value))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
              </Field>
              <Field label="Moisture %">
                <input type="number" min={5} max={25} value={form.moisture} onChange={(e) => set("moisture", Number(e.target.value))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
              </Field>
            </div>
            <Field label="Farm location">
              <input required value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Sehore, MP" className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
            </Field>
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={form.pickup} onChange={(e) => set("pickup", e.target.checked)} />
              Request free farm pickup (₹8 / qtl handling)
            </label>
          </div>

          <aside className="rounded-2xl bg-[color:var(--charcoal)] p-5 text-[color:var(--cream)]">
            <div className="text-xs font-bold uppercase tracking-widest opacity-70">Live offer</div>
            <div className="mt-1 flex items-baseline gap-1 font-[family-name:var(--font-display)] text-4xl font-extrabold">
              <IndianRupee className="size-6" />{offer.pricePerQtl.toLocaleString("en-IN")}
              <span className="text-sm font-semibold opacity-70">/qtl</span>
            </div>
            <div className="mt-4 space-y-1.5 text-sm">
              <Row k="Gross" v={`₹${offer.gross.toLocaleString("en-IN")}`} />
              <Row k="Pickup fee" v={`-₹${offer.pickupFee.toLocaleString("en-IN")}`} />
              <div className="my-2 border-t border-[color:var(--cream)]/20" />
              <Row k="Net payout" v={`₹${offer.net.toLocaleString("en-IN")}`} big />
            </div>
            <button type="submit" className="mt-5 w-full rounded-full bg-[color:var(--mustard)] px-4 py-3 text-sm font-bold text-[color:var(--charcoal)] transition hover:bg-[color:var(--cream)]">
              Accept & book pickup
            </button>
            <div className="mt-3 flex items-center gap-1.5 text-xs opacity-80">
              <CheckCircle2 className="size-3.5" /> Payment via UPI within 2 hrs of quality check
            </div>
          </aside>
        </form>
      </main>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{label}</span>
      {children}
    </label>
  );
}

function Row({ k, v, big }: { k: string; v: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="opacity-70">{k}</span>
      <span className={big ? "font-[family-name:var(--font-display)] text-xl font-extrabold text-[color:var(--mustard)]" : "font-semibold"}>{v}</span>
    </div>
  );
}
