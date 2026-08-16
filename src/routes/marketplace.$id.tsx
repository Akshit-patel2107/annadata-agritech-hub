import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { listings, transporters } from "@/lib/mock-data";
import { Star, MapPin, Leaf, ShieldCheck, Truck, MessageCircle, ArrowLeft, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/marketplace/$id")({
  head: ({ params }) => {
    const l = listings.find((x) => x.id === params.id);
    return {
      meta: [
        { title: l ? `${l.variety} · ${l.commodity} · अन्नData` : "Listing · अन्नData" },
        { name: "description", content: l ? `${l.quantityQuintals} qtl of ${l.variety} ${l.commodity} from ${l.location} at ₹${l.pricePerQuintal}/qtl.` : "Commodity listing detail." },
        { property: "og:title", content: l ? `${l.variety} · ${l.commodity} · अन्नData` : "Listing · अन्नData" },
        { property: "og:description", content: l ? `${l.quantityQuintals} qtl of ${l.variety} ${l.commodity} from ${l.location} at ₹${l.pricePerQuintal}/qtl.` : "Commodity listing detail." },
        ...(l ? [{ property: "og:image", content: l.image }, { name: "twitter:image", content: l.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const l = listings.find((x) => x.id === params.id);
    if (!l) throw notFound();
    return l;
  },
  component: Detail,
  notFoundComponent: () => (
    <AppShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold">Listing not found</h1>
        <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-[color:var(--forest)] px-5 py-2.5 text-sm font-semibold text-[color:var(--cream)]">Back to marketplace</Link>
      </div>
    </AppShell>
  ),
  errorComponent: ({ error }) => <div className="p-8">{String(error)}</div>,
});

function Detail() {
  const loaded = Route.useLoaderData();
  const l = loaded!;
  const [qty, setQty] = useState(Math.min(50, l.quantityQuintals));
  const total = qty * l.pricePerQuintal;

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link to="/marketplace" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--charcoal)]/70 hover:text-[color:var(--forest)]">
          <ArrowLeft className="size-4" /> All listings
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border-4 border-[color:var(--charcoal)] shadow-[12px_12px_0_0_var(--charcoal)]">
            <img src={l.image} alt={l.commodity} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <span className="rounded-full bg-[color:var(--mustard)] px-3 py-1 text-xs font-bold uppercase">Grade {l.grade}</span>
              {l.organic && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--forest)] px-3 py-1 text-xs font-bold uppercase text-[color:var(--cream)]">
                  <Leaf className="size-3" /> Organic Certified
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
              {l.commodity} · {l.location}, {l.state}
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-extrabold leading-tight">
              {l.variety}
              <span className="ml-3 font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]">{l.hindi}</span>
            </h1>

            <div className="mt-6 rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-[color:var(--forest)]">
                    ₹{l.pricePerQuintal.toLocaleString("en-IN")}<span className="text-sm text-[color:var(--charcoal)]/50">/qtl</span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-[color:var(--charcoal)]/60">{l.quantityQuintals} qtl available</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--charcoal)]/5 px-3 py-1 text-sm font-bold">
                  <Star className="size-4 fill-[color:var(--mustard)] text-[color:var(--mustard)]" /> {l.sellerRating}
                </span>
              </div>

              <label className="mt-6 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Quantity (quintals)</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={l.quantityQuintals}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="flex-1 accent-[color:var(--forest)]"
                />
                <input
                  type="number"
                  value={qty}
                  min={1}
                  max={l.quantityQuintals}
                  onChange={(e) => setQty(Math.max(1, Math.min(l.quantityQuintals, Number(e.target.value) || 1)))}
                  className="w-20 rounded-lg border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-2 py-1.5 text-right font-bold"
                />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-dashed border-[color:var(--charcoal)]/20 pt-4">
                <span className="text-sm font-semibold">Order total</span>
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[color:var(--charcoal)]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => toast.success(`Reserved ${qty} qtl of ${l.variety}`, { description: "Seller notified. Complete escrow in wallet." })}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--forest)] px-4 py-3 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)]"
                >
                  <Wallet className="size-4" /> Reserve with Escrow
                </button>
                <button
                  onClick={() => toast(`Message sent to ${l.seller}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[color:var(--charcoal)] px-4 py-3 text-sm font-semibold transition hover:bg-[color:var(--charcoal)] hover:text-[color:var(--cream)]"
                >
                  <MessageCircle className="size-4" /> Message
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Info label="Seller" value={l.seller} icon={ShieldCheck} />
              <Info label="Harvest" value={new Date(l.harvestDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })} icon={Leaf} />
              <Info label="Location" value={`${l.location}, ${l.state}`} icon={MapPin} />
              <Info label="Grade" value={`${l.grade} · Lab tested`} icon={ShieldCheck} />
            </div>
          </div>
        </div>

        {/* Transport */}
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">
            Book transport <span className="font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]">परिवहन</span>
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {transporters.map((t) => (
              <div key={t.id} className="rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4">
                <Truck className="mb-3 size-6 text-[color:var(--orange-deep)]" />
                <div className="font-[family-name:var(--font-display)] text-base font-extrabold">{t.name}</div>
                <div className="text-xs text-[color:var(--charcoal)]/60">{t.truck}</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-[color:var(--forest)]">₹{t.rate}/qtl</span>
                  <span className="inline-flex items-center gap-1 text-xs"><Star className="size-3 fill-[color:var(--mustard)] text-[color:var(--mustard)]" /> {t.rating}</span>
                </div>
                <button
                  onClick={() => toast.success(`${t.name} booked · ETA ${t.eta}`)}
                  className="mt-3 w-full rounded-full bg-[color:var(--charcoal)] py-2 text-xs font-bold uppercase tracking-widest text-[color:var(--cream)] transition hover:bg-[color:var(--forest)]"
                >
                  Book · {t.eta}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function Info({ label, value, icon: Ic }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-xl border border-[color:var(--charcoal)]/15 bg-[color:var(--cream)] p-3">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
        <Ic className="size-3" /> {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
