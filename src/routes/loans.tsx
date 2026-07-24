import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Landmark, IndianRupee, CheckCircle2, FileText, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Farmer Loans & Government Schemes · अन्नData" },
      { name: "description", content: "Compare KCC, PM-KISAN, subsidy-backed loans and low-interest schemes. Check eligibility and apply in minutes." },
      { property: "og:title", content: "Farmer Loans & Government Schemes · अन्नData" },
      { property: "og:description", content: "Compare KCC, PM-KISAN and low-interest agri schemes. Check eligibility instantly." },
    ],
  }),
  component: Loans,
});

type Scheme = {
  id: string; name: string; hindi: string; type: string;
  interest: string; maxAmount: string; subsidy: string; tenure: string;
  eligibility: string[]; benefits: string[]; docs: string[]; tag?: string;
};

const schemes: Scheme[] = [
  {
    id: "kcc", name: "Kisan Credit Card (KCC)", hindi: "किसान क्रेडिट कार्ड", type: "Short-term crop loan",
    interest: "4% effective", maxAmount: "₹3,00,000", subsidy: "3% prompt-repayment + 2% interest subvention", tenure: "12 months revolving",
    eligibility: ["All farmers with cultivable land (owned or leased)", "Tenant farmers & sharecroppers", "Age 18–75"],
    benefits: ["Working capital for seeds, fertilizer, labour", "Effective rate drops to 4% on timely repay", "Built-in accident insurance ₹50,000"],
    docs: ["Aadhaar", "Land records (7/12 / RoR)", "One passport photo"],
    tag: "Most popular",
  },
  {
    id: "pmkisan", name: "PM-KISAN Samman Nidhi", hindi: "पीएम-किसान", type: "Direct income support",
    interest: "Grant (no repayment)", maxAmount: "₹6,000 / year", subsidy: "100% central grant", tenure: "3 installments of ₹2,000",
    eligibility: ["Small & marginal landholder families", "Excludes institutional landholders & income-tax payers"],
    benefits: ["Direct DBT to Aadhaar-linked bank account", "No collateral, no paperwork after enrolment"],
    docs: ["Aadhaar", "Bank account (Aadhaar-linked)", "Land ownership record"],
  },
  {
    id: "mudra", name: "PM MUDRA — Agri Allied", hindi: "मुद्रा ऋण", type: "Allied activities (dairy, poultry, bee-keeping)",
    interest: "8.5% – 10%", maxAmount: "₹10,00,000", subsidy: "Collateral-free under CGTMSE", tenure: "Up to 5 years",
    eligibility: ["Farmers running / starting allied enterprise", "Dairy, poultry, fisheries, food processing"],
    benefits: ["No collateral up to ₹10 lakh", "Flexible EMI", "Working capital + term loan combo"],
    docs: ["Aadhaar & PAN", "Business plan", "Quotation / invoice for asset"],
  },
  {
    id: "agri-infra", name: "Agri Infrastructure Fund", hindi: "कृषि अवसंरचना कोष", type: "Post-harvest infra",
    interest: "3% (after 3% subvention on 9%)", maxAmount: "₹2,00,00,000", subsidy: "3% interest subvention up to 7 yrs + CGTMSE guarantee", tenure: "7 years + 2 year moratorium",
    eligibility: ["FPOs, farmers, PACS, agri-entrepreneurs", "Warehouse, cold storage, sorting, packaging units"],
    benefits: ["Effective interest just 3%", "Loan up to ₹2 Cr fully guaranteed", "Convergence with other subsidies"],
    docs: ["Project report", "Land / lease documents", "GST & PAN", "Bank statements"],
    tag: "Lowest interest",
  },
  {
    id: "nabard-dairy", name: "NABARD Dairy Entrepreneurship", hindi: "डेयरी योजना", type: "Dairy setup subsidy",
    interest: "7% – 9%", maxAmount: "₹7,00,000 per unit", subsidy: "25% capital subsidy (33% for SC/ST)", tenure: "Up to 7 years",
    eligibility: ["Individual farmers, SHGs, JLGs", "Minimum 2 milch animals"],
    benefits: ["1/4th of project cost as upfront subsidy", "Refinance from NABARD to bank"],
    docs: ["Aadhaar", "Project cost sheet", "Land document for shed"],
  },
];

function Loans() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="Credit & Subsidies"
          title={<>Loans that <span className="text-layered">respect farmers.</span></>}
          hindi="ऋण मार्गदर्शन"
          desc="Government-backed schemes with interest as low as 3%. Check eligibility, compare and apply — we handle the paperwork."
        />

        <Eligibility />

        <div className="mt-10 mb-4 flex items-center gap-2">
          <Landmark className="size-5 text-[color:var(--forest)]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Available schemes</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {schemes.map((s) => <SchemeCard key={s.id} s={s} />)}
        </div>

        <EMICalc />

        <div className="mt-10 rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)] md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-70">Need help?</div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Talk to an अन्नData loan expert — free.</div>
              <div className="mt-1 text-sm opacity-80">Our team files your KCC / MUDRA / AIF application end-to-end. Zero fee.</div>
            </div>
            <button onClick={() => toast.success("Callback scheduled", { description: "An expert will call within 2 working hours." })}
              className="rounded-full bg-[color:var(--mustard)] px-6 py-3 text-sm font-bold text-[color:var(--charcoal)] transition hover:bg-[color:var(--cream)]">
              Request free callback
            </button>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function Eligibility() {
  const [land, setLand] = useState(2);
  const [purpose, setPurpose] = useState("Crop cultivation");
  const matched = useMemo(() => {
    return schemes.filter((s) => {
      if (purpose === "Crop cultivation") return ["kcc", "pmkisan"].includes(s.id);
      if (purpose === "Dairy / Poultry") return ["mudra", "nabard-dairy"].includes(s.id);
      if (purpose === "Warehouse / Cold storage") return ["agri-infra", "mudra"].includes(s.id);
      return schemes.map((x) => x.id);
    });
  }, [purpose]);

  return (
    <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 md:p-8">
      <div className="flex items-center gap-2">
        <Sparkles className="size-5 text-[color:var(--forest)]" />
        <div className="font-[family-name:var(--font-display)] text-xl font-extrabold">Quick eligibility check</div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Land (acres)</span>
          <input type="number" min={0} value={land} onChange={(e) => setLand(Number(e.target.value))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Loan purpose</span>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-semibold">
            <option>Crop cultivation</option>
            <option>Dairy / Poultry</option>
            <option>Warehouse / Cold storage</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold">Best matches:</span>
        {matched.map((m) => (
          <a key={m.id} href={`#${m.id}`} className="inline-flex items-center gap-1 rounded-full bg-[color:var(--forest)]/10 px-3 py-1 font-semibold text-[color:var(--forest)] hover:bg-[color:var(--forest)] hover:text-[color:var(--cream)]">
            {m.name} <ArrowRight className="size-3" />
          </a>
        ))}
      </div>
    </div>
  );
}

function SchemeCard({ s }: { s: Scheme }) {
  return (
    <article id={s.id} className="flex flex-col rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{s.type}</div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold leading-tight">{s.name}</h3>
          <div className="font-[family-name:var(--font-devanagari)] text-sm text-[color:var(--forest)]">{s.hindi}</div>
        </div>
        {s.tag && <span className="rounded-full bg-[color:var(--mustard)] px-2.5 py-1 text-xs font-bold">{s.tag}</span>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info k="Interest" v={s.interest} highlight />
        <Info k="Max amount" v={s.maxAmount} />
        <Info k="Tenure" v={s.tenure} />
        <Info k="Support" v={s.subsidy} />
      </div>

      <details className="mt-4 group">
        <summary className="cursor-pointer text-sm font-bold text-[color:var(--forest)]">Eligibility, benefits & documents</summary>
        <div className="mt-3 space-y-3 text-sm">
          <Section title="Eligibility" items={s.eligibility} />
          <Section title="Benefits" items={s.benefits} />
          <Section title="Documents needed" items={s.docs} icon={FileText} />
        </div>
      </details>

      <button
        onClick={() => toast.success(`Applied for ${s.name}`, { description: "Our team will collect documents & submit to the bank." })}
        className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-[color:var(--charcoal)] px-4 py-2.5 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--forest)]">
        Apply with अन्नData help <ArrowRight className="size-4" />
      </button>
    </article>
  );
}

function Info({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl bg-[color:var(--charcoal)]/5 p-3">
      <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{k}</div>
      <div className={`font-semibold ${highlight ? "text-[color:var(--forest)]" : ""}`}>{v}</div>
    </div>
  );
}

function Section({ title, items, icon: Icon = CheckCircle2 }: { title: string; items: string[]; icon?: typeof CheckCircle2 }) {
  return (
    <div>
      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{title}</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2"><Icon className="mt-0.5 size-4 shrink-0 text-[color:var(--forest)]" /><span>{i}</span></li>
        ))}
      </ul>
    </div>
  );
}

function EMICalc() {
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const emi = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(e);
  }, [amount, rate, years]);
  const total = emi * years * 12;

  return (
    <div className="mt-10 grid gap-6 rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 md:grid-cols-[1fr_320px] md:p-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">EMI calculator</div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Plan your repayment</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Slider label="Amount" value={amount} min={10000} max={2000000} step={10000} onChange={setAmount} format={(v) => `₹${v.toLocaleString("en-IN")}`} />
          <Slider label="Interest %" value={rate} min={3} max={14} step={0.25} onChange={setRate} format={(v) => `${v}%`} />
          <Slider label="Tenure (years)" value={years} min={1} max={15} step={1} onChange={setYears} format={(v) => `${v} yrs`} />
        </div>
      </div>
      <aside className="rounded-2xl bg-[color:var(--forest)] p-5 text-[color:var(--cream)]">
        <div className="text-xs font-bold uppercase tracking-widest opacity-80">Monthly EMI</div>
        <div className="mt-1 flex items-baseline gap-1 font-[family-name:var(--font-display)] text-4xl font-extrabold">
          <IndianRupee className="size-6" />{emi.toLocaleString("en-IN")}
        </div>
        <div className="mt-3 text-sm opacity-80">Total payable: ₹{total.toLocaleString("en-IN")}</div>
        <div className="text-sm opacity-80">Total interest: ₹{(total - amount).toLocaleString("en-IN")}</div>
      </aside>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">
        <span>{label}</span><span className="text-[color:var(--forest)]">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[color:var(--forest)]" />
    </div>
  );
}
