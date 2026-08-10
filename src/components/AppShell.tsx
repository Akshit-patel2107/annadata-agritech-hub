import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Menu, X, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useProfile } from "@/lib/profile";

const nav = [
  { to: "/dashboard", label: "Dashboard", hindi: "डैशबोर्ड" },
  { to: "/marketplace", label: "Marketplace", hindi: "बाज़ार" },
  { to: "/prices", label: "Prices", hindi: "भाव" },
  { to: "/weather", label: "Weather", hindi: "मौसम" },
  { to: "/advisory", label: "AI Advisory", hindi: "सलाह" },
  { to: "/disease", label: "Disease Scan", hindi: "निदान" },
  { to: "/warehouse", label: "Warehouse", hindi: "गोदाम" },
  { to: "/sell-to-us", label: "Sell to Us", hindi: "हमें बेचें" },
  { to: "/export", label: "Export Desk", hindi: "निर्यात" },
  { to: "/supplies", label: "Seeds & Fertilizer", hindi: "बीज व खाद" },
  { to: "/loans", label: "Loans & Schemes", hindi: "ऋण" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile } = useProfile();
  const firstName = profile?.name?.split(" ")[0];

  return (
    <div className="min-h-screen bg-[color:var(--cream)] text-[color:var(--charcoal)]">
      <header className="sticky top-0 z-50">
        <div className="glass mx-3 mt-3 rounded-2xl px-4 py-3 md:mx-6 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="shrink-0">
              <Logo size="sm" />
            </Link>
            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((n) => {
                const active = pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      active
                        ? "bg-[color:var(--charcoal)] text-[color:var(--cream)]"
                        : "text-[color:var(--charcoal)]/80 hover:bg-[color:var(--charcoal)]/8"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              {profile ? (
                <Link to="/auth" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--charcoal)] px-3 py-1.5 text-sm font-semibold hover:bg-[color:var(--charcoal)] hover:text-[color:var(--cream)]">
                  <span className="grid size-5 place-items-center rounded-full bg-[color:var(--forest)] text-[10px] font-bold text-[color:var(--cream)]">
                    {firstName?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  {firstName}
                </Link>
              ) : (
                <Link to="/auth" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--charcoal)] px-3 py-1.5 text-sm font-semibold hover:bg-[color:var(--charcoal)] hover:text-[color:var(--cream)]">
                  <User className="size-4" /> Sign in
                </Link>
              )}
              <Link
                to="/sell"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[color:var(--forest)] px-4 py-2 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--charcoal)]"
              >
                + List Produce
              </Link>
              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--charcoal)]/20 lg:hidden"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
          {open && (
            <div className="mt-3 grid grid-cols-2 gap-1.5 lg:hidden">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-[color:var(--charcoal)]/5 px-3 py-2 text-sm font-semibold"
                >
                  <span className="font-[family-name:var(--font-devanagari)] text-[color:var(--forest)] mr-2">{n.hindi}</span>
                  {n.label}
                </Link>
              ))}
              <Link
                to="/sell"
                onClick={() => setOpen(false)}
                className="col-span-2 rounded-xl bg-[color:var(--forest)] px-3 py-2 text-center text-sm font-semibold text-[color:var(--cream)]"
              >
                + List Produce
              </Link>
            </div>
          )}
        </div>
      </header>
      {children}
      <footer className="mx-3 my-6 rounded-2xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)] md:mx-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm opacity-70">
            Demo build · <span className="font-[family-name:var(--font-devanagari)]">भारत</span> के किसानों के लिए
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  hindi,
  desc,
}: {
  kicker?: string;
  title: ReactNode;
  hindi?: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      {kicker && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-1 text-xs font-bold uppercase tracking-widest">
          {kicker}
        </div>
      )}
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
        {title}
        {hindi && (
          <span className="ml-3 font-[family-name:var(--font-devanagari)] text-[color:var(--forest)]">
            {hindi}
          </span>
        )}
      </h1>
      {desc && <p className="mt-3 max-w-2xl text-base text-[color:var(--charcoal)]/75 md:text-lg">{desc}</p>}
    </div>
  );
}
