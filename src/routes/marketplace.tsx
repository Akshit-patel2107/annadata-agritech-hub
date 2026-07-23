import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { listings, commodities, type Listing } from "@/lib/mock-data";
import { Search, Star, MapPin, Leaf } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace · अन्नData" },
      { name: "description", content: "Browse verified, grade-tagged commodity lots from farmers across India." },
      { property: "og:title", content: "Marketplace · अन्नData" },
      { property: "og:description", content: "Browse verified, grade-tagged commodity lots from farmers across India." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [organic, setOrganic] = useState(false);
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "rating">("rating");

  const filtered = useMemo(() => {
    let arr = listings.filter((l) => {
      if (cat !== "All" && l.commodity !== cat) return false;
      if (organic && !l.organic) return false;
      if (q && !`${l.variety} ${l.commodity} ${l.location} ${l.seller}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.pricePerQuintal - b.pricePerQuintal);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.pricePerQuintal - a.pricePerQuintal);
    if (sort === "rating") arr = [...arr].sort((a, b) => b.sellerRating - a.sellerRating);
    return arr;
  }, [q, cat, organic, sort]);

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="Marketplace"
          title={<>Every crop. <span className="text-layered">One market.</span></>}
          hindi="बाज़ार"
          desc="Verified lots, transparent grading, digital settlement."
        />

        {/* Filters */}
        <div className="mb-6 rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search variety, location, seller…"
                className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--forest)]"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 text-sm font-semibold outline-none"
            >
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </select>
            <label className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--charcoal)]/20 px-3 py-2.5 text-sm font-semibold">
              <input type="checkbox" checked={organic} onChange={(e) => setOrganic(e.target.checked)} />
              <Leaf className="size-4 text-[color:var(--forest)]" /> Organic only
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["All", ...commodities].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border-2 px-3 py-1 text-xs font-bold transition ${
                  cat === c
                    ? "border-[color:var(--charcoal)] bg-[color:var(--charcoal)] text-[color:var(--cream)]"
                    : "border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] hover:border-[color:var(--charcoal)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3 text-sm text-[color:var(--charcoal)]/60">
          Showing <b>{filtered.length}</b> of {listings.length} lots
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-[color:var(--charcoal)]/30 p-16 text-center text-[color:var(--charcoal)]/60">
            No listings match your filters.
          </div>
        )}
      </main>
    </AppShell>
  );
}

function ListingCard({ l }: { l: Listing }) {
  return (
    <Link
      to="/marketplace/$id"
      params={{ id: l.id }}
      className="group overflow-hidden rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--charcoal)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={l.image} alt={l.commodity} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-[color:var(--mustard)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Grade {l.grade}</span>
          {l.organic && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--forest)] px-2 py-0.5 text-[10px] font-bold uppercase text-[color:var(--cream)]">
              <Leaf className="size-3" /> Organic
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight">{l.variety}</div>
            <div className="text-xs uppercase tracking-widest text-[color:var(--charcoal)]/60">{l.commodity}</div>
          </div>
          <span className="font-[family-name:var(--font-devanagari)] text-2xl text-[color:var(--forest)]">{l.hindi}</span>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-[color:var(--charcoal)]/70">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {l.location}</span>
          <span className="inline-flex items-center gap-1"><Star className="size-3 fill-[color:var(--mustard)] text-[color:var(--mustard)]" /> {l.sellerRating}</span>
        </div>
        <div className="mt-3 flex items-end justify-between border-t border-dashed border-[color:var(--charcoal)]/20 pt-3">
          <div>
            <div className="text-2xl font-bold text-[color:var(--forest)]">₹{l.pricePerQuintal.toLocaleString("en-IN")}</div>
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--charcoal)]/50">per quintal</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">{l.quantityQuintals} qtl</div>
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--charcoal)]/50">available</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
