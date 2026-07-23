import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { warehouses } from "@/lib/mock-data";
import { MapPin, ShieldCheck, Thermometer, IndianRupee } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/warehouse")({
  head: () => ({
    meta: [
      { title: "Warehouse Booking · अन्नData" },
      { name: "description", content: "Discover, book and manage storage capacity across our partner warehouse network." },
      { property: "og:title", content: "Warehouse Booking · अन्नData" },
      { property: "og:description", content: "Discover, book and manage storage capacity across our partner warehouse network." },
    ],
  }),
  component: WarehousePage,
});

function WarehousePage() {
  const [qty, setQty] = useState(100);
  const [months, setMonths] = useState(3);

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <PageHeader kicker="Storage Network" title={<>Store today. <span className="text-layered">Sell smart.</span></>} hindi="गोदाम" desc="Certified warehouses across India — book by quintal, get a warehouse receipt, use it for finance." />

        <div className="mb-6 grid gap-3 rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Quantity (quintals)</span>
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-bold" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Duration (months)</span>
            <input type="number" min={1} max={12} value={months} onChange={(e) => setMonths(Math.max(1, Math.min(12, Number(e.target.value))))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-bold" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {warehouses.map((w) => {
            const total = qty * w.pricePerQtlMonth * months;
            const canFit = qty <= w.availableQtl;
            return (
              <div key={w.id} className="flex flex-col justify-between rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-5">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-xl font-extrabold">{w.name}</div>
                      <div className="mt-1 inline-flex items-center gap-1 text-xs text-[color:var(--charcoal)]/70">
                        <MapPin className="size-3" /> {w.location}
                      </div>
                    </div>
                    {w.certified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--forest)]/15 px-2 py-0.5 text-[10px] font-bold text-[color:var(--forest)]">
                        <ShieldCheck className="size-3" /> WDRA
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <Chip label="Available" value={`${w.availableQtl.toLocaleString("en-IN")} qtl`} />
                    <Chip label="Total cap" value={`${w.capacityQtl.toLocaleString("en-IN")} qtl`} />
                    <Chip label="Temp" value={w.temperature} icon={Thermometer} />
                    <Chip label="Rate" value={`₹${w.pricePerQtlMonth}/qtl·mo`} icon={IndianRupee} />
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[color:var(--charcoal)]/10">
                    <div className="h-full bg-[color:var(--forest)]" style={{ width: `${100 - (w.availableQtl / w.capacityQtl) * 100}%` }} />
                  </div>
                </div>

                <div className="mt-4 border-t border-dashed border-[color:var(--charcoal)]/20 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[color:var(--charcoal)]/60">You pay</span>
                    <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[color:var(--forest)]">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    disabled={!canFit}
                    onClick={() => toast.success(`Booked ${qty} qtl at ${w.name}`, { description: "Warehouse receipt will be issued after intake." })}
                    className="mt-3 w-full rounded-full bg-[color:var(--charcoal)] py-2.5 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--forest)] disabled:opacity-40"
                  >
                    {canFit ? "Book now" : "Not enough capacity"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </AppShell>
  );
}

function Chip({ label, value, icon: Ic }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-lg bg-[color:var(--charcoal)]/5 p-2">
      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
        {Ic && <Ic className="size-3" />}{label}
      </div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
}
