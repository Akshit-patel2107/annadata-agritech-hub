import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

import heroFarm from "@/assets/hero-farm.jpg";
import farmerPortrait from "@/assets/farmer-portrait.jpg";
import commodities from "@/assets/commodities.jpg";
import warehouse from "@/assets/warehouse.jpg";
import {
  Sprout,
  ShoppingBasket,
  Building2,
  TrendingUp,
  Handshake,
  ArrowUpRight,
  Cloud,
  Brain,
  Truck,
  Warehouse,
  Wallet,
  Languages,
  ScanLine,
  LineChart,
  ShieldCheck,
  Leaf,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "अन्नData — Organizing India's Agricultural Future" },
      {
        name: "description",
        content:
          "India's premium agritech platform. Farm to Future, powered by data. Early access open for farmers, buyers, warehouses, transporters and partners.",
      },
      { property: "og:title", content: "अन्नData — Organizing India's Agricultural Future" },
      {
        property: "og:description",
        content: "India's premium agritech platform. Farm to Future, powered by data. Early access open for farmers, buyers, warehouses, transporters and partners.",
      },
    ],
  }),
  component: Landing,
});

const roles = [
  { label: "Farmers", hindi: "किसान", icon: Sprout, tint: "var(--emerald)" },
  { label: "Buyers", hindi: "खरीदार", icon: ShoppingBasket, tint: "var(--orange-deep)" },
  { label: "Businesses", hindi: "व्यापार", icon: Building2, tint: "var(--mustard)" },
  { label: "Investors", hindi: "निवेशक", icon: TrendingUp, tint: "var(--turquoise)" },
  { label: "Partners", hindi: "साझेदार", icon: Handshake, tint: "var(--magenta)" },
];

const features = [
  { icon: Brain, title: "AI Crop Advisory", desc: "Sowing, fertiliser and pest guidance calibrated to your plot, soil and season.", hindi: "सलाह" },
  { icon: ScanLine, title: "Disease Detection", desc: "Snap a leaf. Our vision model flags disease and prescribes treatment in seconds.", hindi: "निदान" },
  { icon: LineChart, title: "Live Mandi Prices", desc: "Track commodity trends across mandis with AI demand forecasting.", hindi: "भाव" },
  { icon: Cloud, title: "Hyperlocal Weather", desc: "Village-level forecasts and alerts tuned for the cropping calendar.", hindi: "मौसम" },
  { icon: Warehouse, title: "Warehouse Booking", desc: "Discover, book and manage capacity across our storage partner network.", hindi: "गोदाम" },
  { icon: Truck, title: "Logistics on Tap", desc: "Book transport, track shipments, verify quality on delivery.", hindi: "परिवहन" },
  { icon: Wallet, title: "Payments & Credit", desc: "Instant digital settlement. Working capital, insurance and loans in one place.", hindi: "वित्त" },
  { icon: Languages, title: "Speaks Your Language", desc: "English, हिंदी, ગુજરાતી — with more Indian languages rolling out.", hindi: "भाषा" },
];

const commoditiesList = [
  { name: "Wheat", hindi: "गेहूं" },
  { name: "Rice", hindi: "चावल" },
  { name: "Cotton", hindi: "कपास" },
  { name: "Pulses", hindi: "दाल" },
  { name: "Oilseeds", hindi: "तिलहन" },
  { name: "Tobacco", hindi: "तंबाकू" },
  { name: "Chicory", hindi: "चिकोरी" },
  { name: "Vegetables", hindi: "सब्जियां" },
  { name: "Fruits", hindi: "फल" },
];

function Landing() {
  return (
    <main className="min-h-screen bg-[color:var(--cream)] text-[color:var(--charcoal)] overflow-x-hidden">
      <Nav />
      <Hero />
      <Ticker />
      <RolesSection />
      <FeaturesSection />
      <MarketplaceSection />
      <ManifestoSection />
      <StatusSection />
      <CTASection />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 grain">
      <div className="glass mx-3 mt-3 rounded-2xl px-4 py-3 md:mx-6 md:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <Logo size="sm" />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link to="/dashboard" className="hover:text-[color:var(--forest)] transition">Dashboard</Link>
            <Link to="/marketplace" className="hover:text-[color:var(--forest)] transition">Marketplace</Link>
            <Link to="/prices" className="hover:text-[color:var(--forest)] transition">Prices</Link>
            <Link to="/weather" className="hover:text-[color:var(--forest)] transition">Weather</Link>
            <Link to="/advisory" className="hover:text-[color:var(--forest)] transition">AI Advisory</Link>
          </nav>
          <Link
            to="/dashboard"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[color:var(--charcoal)] px-4 py-2 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--forest)]"
          >
            Enter Demo <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}


function Hero() {
  return (
    <section id="top" className="relative isolate grain">
      {/* Backdrop image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroFarm}
          alt="Aerial view of Indian farmland at golden hour"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--cream)]/40 via-[color:var(--cream)]/20 to-[color:var(--cream)]" />
      </div>

      {/* Oversized Devanagari watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-0 flex select-none justify-center opacity-[0.07]"
      >
        <span
          className="font-[family-name:var(--font-devanagari)] text-[28vw] leading-none text-[color:var(--soil)]"
        >
          भारत
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <span className="size-1.5 rounded-full bg-[color:var(--orange-deep)] animate-pulse" />
            Early Access · Launching Soon
          </div>
        </div>

        <h1 className="mt-6 max-w-5xl font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-[7.5rem]">
          <span className="animate-rise block">Organizing India's</span>
          <span className="animate-rise block" style={{ animationDelay: "0.1s" }}>
            <span className="text-layered">Agricultural</span>
          </span>
          <span
            className="animate-rise mt-1 block font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]"
            style={{ animationDelay: "0.2s" }}
          >
            भविष्य <span className="font-[family-name:var(--font-display)] text-[color:var(--charcoal)]">Future.</span>
          </span>
        </h1>

        <p className="animate-rise mt-8 max-w-xl text-lg text-[color:var(--charcoal)]/80 md:text-xl" style={{ animationDelay: "0.3s" }}>
          From <em className="not-italic font-semibold text-[color:var(--forest)]">Farm</em> to{" "}
          <em className="not-italic font-semibold text-[color:var(--orange-deep)]">Future</em>, powered by data. One platform for farmers,
          buyers, warehouses, transporters and financial partners across भारत.
        </p>

        <div className="animate-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--forest)] px-6 py-3.5 text-base font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)]"
          >
            Enter the Demo <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
          </Link>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--charcoal)] bg-transparent px-6 py-3.5 text-base font-semibold text-[color:var(--charcoal)] transition hover:bg-[color:var(--charcoal)] hover:text-[color:var(--cream)]"
          >
            Browse Marketplace
          </Link>
        </div>


        {/* Floating farmer card */}
        <div className="animate-float pointer-events-none absolute right-4 top-24 hidden w-56 rotate-3 overflow-hidden rounded-2xl border-4 border-[color:var(--charcoal)] shadow-2xl md:block lg:right-16 lg:w-72">
          <img src={farmerPortrait} alt="Indian farmer" className="w-full" width={512} height={640} loading="lazy" />
          <div className="absolute bottom-0 left-0 right-0 bg-[color:var(--charcoal)] p-2 text-center font-[family-name:var(--font-devanagari)] text-lg text-[color:var(--mustard)]">
            किसान first
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const words = ["किसान", "FARMERS", "अन्न", "GRAIN", "मंडी", "MANDI", "भारत", "BHARAT", "खेत", "FIELD", "विकास", "GROWTH"];
  return (
    <section className="border-y-4 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] py-5 overflow-hidden">
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className={`font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase ${
              i % 2 === 0 ? "text-[color:var(--mustard)]" : "text-[color:var(--cream)]"
            } ${/[अ-ह]/.test(w) ? "font-[family-name:var(--font-devanagari)]" : ""}`}
          >
            {w} <span className="text-[color:var(--orange-deep)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeader kicker="For everyone in the chain" title="Built for every hand that feeds India" hindi="सबके लिए" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
        {roles.map((r) => (
          <Link
            key={r.label}
            to="/dashboard"
            className="group relative overflow-hidden rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-5 transition hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--charcoal)]"
          >
            <div
              className="mb-4 inline-flex size-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: r.tint, color: "var(--cream)" }}
            >
              <r.icon className="size-6" />
            </div>
            <div className="font-[family-name:var(--font-devanagari)] text-2xl text-[color:var(--soil)]">
              {r.hindi}
            </div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold">
              {r.label}
            </div>
            <ArrowUpRight className="absolute right-4 top-4 size-5 opacity-40 transition group-hover:opacity-100 group-hover:rotate-12" />
          </Link>
        ))}

      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="platform" className="relative bg-[color:var(--charcoal)] text-[color:var(--cream)] py-24 md:py-32 overflow-hidden grain">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 select-none font-[family-name:var(--font-devanagari)] text-[22vw] leading-none text-[color:var(--forest)]/25"
      >
        खेत
      </div>
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          dark
          kicker="The Platform"
          title={<>One stack. <span className="text-layered-green">Every workflow.</span></>}
          hindi="मंच"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--cream)]/15 bg-[color:var(--charcoal)] p-6 transition hover:border-[color:var(--mustard)] hover:bg-[color:var(--soil)]/40"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              <div className="mb-6 flex items-center justify-between">
                <f.icon className="size-7 text-[color:var(--mustard)]" />
                <span className="font-[family-name:var(--font-devanagari)] text-2xl text-[color:var(--orange-deep)] opacity-70">
                  {f.hindi}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold">{f.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--cream)]/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketplaceSection() {
  return (
    <section id="market" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader kicker="Commodity Marketplace" title={<>Every crop. Every grade. <span className="text-layered">One market.</span></>} hindi="बाज़ार" align="left" />
          <p className="mt-6 max-w-lg text-lg text-[color:var(--charcoal)]/75">
            Discover verified buyers and quality-graded lots across nine commodity categories. Track pricing trends,
            forecast demand, and settle digitally — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {commoditiesList.map((c) => (
              <span
                key={c.name}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] px-4 py-2 text-sm font-semibold transition hover:bg-[color:var(--mustard)]"
              >
                <span className="font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]">{c.hindi}</span>
                <span>{c.name}</span>
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <StatPlaceholder label="Farmers onboarded" hindi="किसान" />
            <StatPlaceholder label="Buyer network" hindi="खरीदार" />
            <StatPlaceholder label="Mandis covered" hindi="मंडियां" />
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border-4 border-[color:var(--charcoal)] shadow-[12px_12px_0_0_var(--charcoal)]">
            <img src={commodities} alt="Indian commodities mandala" width={1280} height={1024} loading="lazy" className="w-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 rotate-[-4deg] rounded-2xl bg-[color:var(--mustard)] px-5 py-3 font-[family-name:var(--font-display)] text-xl font-extrabold text-[color:var(--charcoal)] shadow-xl">
            AI Demand Forecasting →
          </div>
          <div className="absolute -right-4 -top-4 rotate-[6deg] rounded-full bg-[color:var(--orange-deep)] px-5 py-3 font-[family-name:var(--font-devanagari)] text-xl text-[color:var(--cream)] shadow-xl">
            गुणवत्ता first
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-[color:var(--forest)] text-[color:var(--cream)] py-24 md:py-32 grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10"
      >
        <span className="font-[family-name:var(--font-devanagari)] text-[40vw] leading-none">अन्न</span>
      </div>
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <div className="inline-block rounded-full bg-[color:var(--mustard)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]">
          Our Manifesto
        </div>
        <p className="mt-8 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
          India feeds the world. It's time <span className="font-[family-name:var(--font-devanagari)] text-[color:var(--mustard)]">भारत</span> got the tools that match.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--cream)]/80">
          अन्नData is a bet on the farmer, on transparent markets, on quality over shortcut. We're building the
          rails — you bring the harvest.
        </p>
      </div>
    </section>
  );
}

function StatusSection() {
  const items = [
    { icon: Leaf, label: "Pilots underway", status: "Coming Soon", hindi: "पायलट" },
    { icon: ShieldCheck, label: "Partner network", status: "Building", hindi: "साझेदारी" },
    { icon: Building2, label: "Warehouse coverage", status: "Launching Soon", hindi: "गोदाम" },
    { icon: TrendingUp, label: "Farmer waitlist", status: "Early Access Open", hindi: "प्रतीक्षा" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="relative overflow-hidden rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6">
            <it.icon className="size-6 text-[color:var(--forest)]" />
            <div className="mt-8 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[color:var(--charcoal)]">
              {it.status}
            </div>
            <div className="mt-1 text-sm text-[color:var(--charcoal)]/70">{it.label}</div>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-4 -right-2 select-none font-[family-name:var(--font-devanagari)] text-6xl text-[color:var(--mustard)]/40"
            >
              {it.hindi}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="access" className="relative mx-auto max-w-7xl px-5 pb-24 md:pb-32">
      <div className="relative overflow-hidden rounded-3xl border-4 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-10 md:p-16 grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 select-none font-[family-name:var(--font-devanagari)] text-[20vw] leading-none text-[color:var(--forest)]/30"
        >
          चलो
        </div>
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-[color:var(--cream)] md:text-6xl">
              Try the <span className="text-layered">whole platform.</span>
              <br />
              No sign-up needed.
            </h2>
            <p className="mt-4 max-w-md text-[color:var(--cream)]/70">
              Explore the farmer dashboard, browse the marketplace, book warehouses and transport, scan a leaf, ask the AI advisor — every workflow live in demo mode.
            </p>
          </div>
          <div className="glass-dark rounded-2xl p-5 space-y-3">
            <Link to="/dashboard" className="block w-full rounded-xl bg-[color:var(--mustard)] px-4 py-4 text-center font-[family-name:var(--font-display)] text-lg font-extrabold text-[color:var(--charcoal)] transition hover:bg-[color:var(--orange-deep)] hover:text-[color:var(--cream)]">
              Open Farmer Dashboard →
            </Link>
            <Link to="/marketplace" className="block w-full rounded-xl border-2 border-[color:var(--cream)]/30 px-4 py-3 text-center font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--cream)]/10">
              Browse Marketplace
            </Link>
            <Link to="/disease" className="block w-full rounded-xl border-2 border-[color:var(--cream)]/30 px-4 py-3 text-center font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--cream)]/10">
              Scan a Leaf (AI)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t-4 border-[color:var(--charcoal)] bg-[color:var(--cream)] py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Logo size="md" />
            <p className="mt-3 max-w-xs text-sm text-[color:var(--charcoal)]/70">
              From Farm to Future, Powered by Data. Made with माटी and code in भारत.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
            {[
              { h: "Platform", l: ["Marketplace", "Advisory", "Logistics", "Warehousing"] },
              { h: "Company", l: ["Manifesto", "Careers", "Investors", "Press"] },
              { h: "Learn", l: ["Blog", "Knowledge Center", "FAQs", "Support"] },
              { h: "Contact", l: ["Sales", "Partnerships", "Media", "hello@annadata.in"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-widest text-[color:var(--forest)]">
                  {c.h}
                </div>
                <ul className="mt-3 space-y-1.5 text-[color:var(--charcoal)]/70">
                  {c.l.map((x) => <li key={x}><a href="#" className="hover:text-[color:var(--forest)]">{x}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--charcoal)]/10 pt-6 text-xs text-[color:var(--charcoal)]/60">
          <span>© {new Date().getFullYear()} अन्नData Technologies. All rights reserved.</span>
          <span className="font-[family-name:var(--font-devanagari)] text-base text-[color:var(--forest)]">जय किसान · जय विज्ञान</span>
        </div>
      </div>
      {/* Warehouse strip preload for visual richness */}
      <img src={warehouse} alt="" className="sr-only" aria-hidden />
    </footer>
  );
}

function SectionHeader({
  kicker,
  title,
  hindi,
  dark,
  align = "center",
}: {
  kicker: string;
  title: React.ReactNode;
  hindi: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${
          dark ? "bg-[color:var(--mustard)] text-[color:var(--charcoal)]" : "bg-[color:var(--charcoal)] text-[color:var(--cream)]"
        }`}
      >
        <span className="font-[family-name:var(--font-devanagari)] normal-case tracking-normal">{hindi}</span>
        <span>·</span>
        <span>{kicker}</span>
      </div>
      <h2 className={`mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl ${dark ? "text-[color:var(--cream)]" : "text-[color:var(--charcoal)]"}`}>
        {title}
      </h2>
    </div>
  );
}

function StatPlaceholder({ label, hindi }: { label: string; hindi: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-[color:var(--charcoal)]/30 p-4">
      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[color:var(--forest)]">
        0<span className="text-[color:var(--orange-deep)]">+</span>
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--charcoal)]/60">{label}</div>
      <div className="font-[family-name:var(--font-devanagari)] text-sm text-[color:var(--soil)]">{hindi} · Coming Soon</div>
    </div>
  );
}
