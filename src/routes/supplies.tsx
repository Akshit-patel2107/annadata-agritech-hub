import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus, Trash2, ShieldCheck, Truck, Sprout, FlaskConical, Bug, Wrench } from "lucide-react";

export const Route = createFileRoute("/supplies")({
  head: () => ({
    meta: [
      { title: "Seeds & Fertilizer Store · अन्नData" },
      { name: "description", content: "Certified seeds, fertilizers, pesticides and farm tools delivered to your village at wholesale prices." },
      { property: "og:title", content: "Seeds & Fertilizer Store · अन्नData" },
      { property: "og:description", content: "Certified seeds, fertilizers, pesticides and farm tools at wholesale prices." },
    ],
  }),
  component: Supplies,
});

type Product = {
  id: string; name: string; hindi: string; category: "Seeds" | "Fertilizer" | "Pesticide" | "Tools";
  brand: string; unit: string; price: number; mrp: number; certified: boolean; emoji: string;
};

const products: Product[] = [
  { id: "s1", name: "Wheat HD-2967 Seed", hindi: "गेहूं बीज", category: "Seeds", brand: "IARI Certified", unit: "40 kg bag", price: 1450, mrp: 1650, certified: true, emoji: "🌾" },
  { id: "s2", name: "Basmati 1121 Seed", hindi: "बासमती बीज", category: "Seeds", brand: "Pusa", unit: "10 kg bag", price: 890, mrp: 1050, certified: true, emoji: "🌾" },
  { id: "s3", name: "BT Cotton Hybrid", hindi: "कपास बीज", category: "Seeds", brand: "Rasi RCH-659", unit: "450 g packet", price: 767, mrp: 850, certified: true, emoji: "🌱" },
  { id: "s4", name: "Tomato Hybrid Seed", hindi: "टमाटर बीज", category: "Seeds", brand: "Syngenta", unit: "10 g", price: 320, mrp: 380, certified: true, emoji: "🍅" },
  { id: "f1", name: "Urea 46% N", hindi: "यूरिया", category: "Fertilizer", brand: "IFFCO", unit: "45 kg bag", price: 266, mrp: 300, certified: true, emoji: "🧪" },
  { id: "f2", name: "DAP", hindi: "डीएपी", category: "Fertilizer", brand: "IFFCO", unit: "50 kg bag", price: 1350, mrp: 1450, certified: true, emoji: "🧪" },
  { id: "f3", name: "NPK 10:26:26", hindi: "एनपीके", category: "Fertilizer", brand: "Coromandel", unit: "50 kg bag", price: 1470, mrp: 1600, certified: true, emoji: "🧪" },
  { id: "f4", name: "Organic Vermicompost", hindi: "जैविक खाद", category: "Fertilizer", brand: "अन्नData Organics", unit: "50 kg bag", price: 480, mrp: 550, certified: true, emoji: "🍃" },
  { id: "p1", name: "Chlorpyrifos 20% EC", hindi: "कीटनाशक", category: "Pesticide", brand: "Dhanuka", unit: "1 litre", price: 380, mrp: 450, certified: true, emoji: "🧴" },
  { id: "p2", name: "Mancozeb 75% WP", hindi: "फफूंदनाशक", category: "Pesticide", brand: "UPL", unit: "1 kg", price: 420, mrp: 490, certified: true, emoji: "🧴" },
  { id: "t1", name: "Knapsack Sprayer 16L", hindi: "स्प्रेयर", category: "Tools", brand: "Neptune", unit: "1 unit", price: 1990, mrp: 2400, certified: false, emoji: "🛠️" },
  { id: "t2", name: "Drip Irrigation Kit", hindi: "ड्रिप किट", category: "Tools", brand: "Jain Irrigation", unit: "1 acre kit", price: 8900, mrp: 10500, certified: true, emoji: "💧" },
];

const cats = [
  { key: "All", icon: ShoppingCart },
  { key: "Seeds", icon: Sprout },
  { key: "Fertilizer", icon: FlaskConical },
  { key: "Pesticide", icon: Bug },
  { key: "Tools", icon: Wrench },
] as const;

function Supplies() {
  const [cat, setCat] = useState<(typeof cats)[number]["key"]>("All");
  const [cart, setCart] = useState<Record<string, number>>({});

  const visible = useMemo(() => cat === "All" ? products : products.filter((p) => p.category === cat), [cat]);
  const cartItems = Object.entries(cart).map(([id, qty]) => ({ p: products.find((x) => x.id === id)!, qty })).filter((x) => x.p);
  const subtotal = cartItems.reduce((s, x) => s + x.p.price * x.qty, 0);
  const savings = cartItems.reduce((s, x) => s + (x.p.mrp - x.p.price) * x.qty, 0);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const sub = (id: string) => setCart((c) => {
    const n = (c[id] ?? 0) - 1;
    const next = { ...c };
    if (n <= 0) delete next[id]; else next[id] = n;
    return next;
  });
  const remove = (id: string) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="Farm Store"
          title={<>Seeds, fertilizer & <span className="text-layered">more.</span></>}
          hindi="बीज व खाद"
          desc="Certified inputs at wholesale prices. Free delivery to your village on orders above ₹2,000."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${cat === c.key ? "border-[color:var(--forest)] bg-[color:var(--forest)] text-[color:var(--cream)]" : "border-[color:var(--charcoal)]/20 hover:border-[color:var(--charcoal)]"}`}>
              <c.icon className="size-4" /> {c.key}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => (
              <article key={p.id} className="flex flex-col rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-4">
                <div className="mb-3 flex h-28 items-center justify-center rounded-xl bg-[color:var(--forest)]/8 text-6xl">{p.emoji}</div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{p.brand}</div>
                    <div className="font-[family-name:var(--font-display)] font-extrabold leading-tight">{p.name}</div>
                    <div className="font-[family-name:var(--font-devanagari)] text-sm text-[color:var(--forest)]">{p.hindi}</div>
                  </div>
                  {p.certified && <ShieldCheck className="size-4 shrink-0 text-[color:var(--forest)]" />}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold">₹{p.price.toLocaleString("en-IN")}</span>
                  <span className="text-sm text-[color:var(--charcoal)]/50 line-through">₹{p.mrp}</span>
                  <span className="ml-auto text-xs text-[color:var(--charcoal)]/60">/ {p.unit}</span>
                </div>
                <div className="mt-4">
                  {cart[p.id] ? (
                    <div className="flex items-center justify-between rounded-full border-2 border-[color:var(--charcoal)] p-1">
                      <button onClick={() => sub(p.id)} className="grid size-8 place-items-center rounded-full bg-[color:var(--charcoal)]/10"><Minus className="size-4" /></button>
                      <span className="font-bold">{cart[p.id]}</span>
                      <button onClick={() => add(p.id)} className="grid size-8 place-items-center rounded-full bg-[color:var(--forest)] text-[color:var(--cream)]"><Plus className="size-4" /></button>
                    </div>
                  ) : (
                    <button onClick={() => add(p.id)} className="w-full rounded-full bg-[color:var(--charcoal)] py-2 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--forest)]">
                      Add to cart
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="sticky top-24 h-fit rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <ShoppingCart className="size-5 text-[color:var(--forest)]" />
              <div className="font-[family-name:var(--font-display)] text-xl font-extrabold">Your cart</div>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-sm text-[color:var(--charcoal)]/60">Cart is empty. Add seeds, fertilizer or tools to see your order.</p>
            ) : (
              <>
                <ul className="mb-4 space-y-2">
                  {cartItems.map(({ p, qty }) => (
                    <li key={p.id} className="flex items-center gap-2 text-sm">
                      <span className="text-xl">{p.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{p.name}</div>
                        <div className="text-xs text-[color:var(--charcoal)]/60">{qty} × ₹{p.price}</div>
                      </div>
                      <button onClick={() => remove(p.id)} className="text-[color:var(--charcoal)]/50 hover:text-[color:var(--orange-deep)]"><Trash2 className="size-4" /></button>
                    </li>
                  ))}
                </ul>
                <div className="space-y-1 border-t border-[color:var(--charcoal)]/15 pt-3 text-sm">
                  <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span className="opacity-70">You save</span><span className="font-semibold text-[color:var(--forest)]">₹{savings.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span className="opacity-70">Delivery</span><span className="font-semibold">{subtotal >= 2000 ? "FREE" : "₹80"}</span></div>
                </div>
                <button
                  onClick={() => { toast.success("Order placed", { description: `Delivery in 3-5 days. Pay ₹${(subtotal + (subtotal >= 2000 ? 0 : 80)).toLocaleString("en-IN")} on delivery.` }); setCart({}); }}
                  className="mt-4 w-full rounded-full bg-[color:var(--forest)] py-3 text-sm font-bold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)]">
                  Checkout · ₹{(subtotal + (subtotal >= 2000 ? 0 : 80)).toLocaleString("en-IN")}
                </button>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[color:var(--charcoal)]/60">
                  <Truck className="size-3.5" /> Cash on delivery available
                </div>
              </>
            )}
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
