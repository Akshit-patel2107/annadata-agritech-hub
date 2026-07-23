import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { commodities } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "List Produce · अन्नData" },
      { name: "description", content: "Create a new commodity listing — reach verified buyers across India." },
      { property: "og:title", content: "List Produce · अन्नData" },
      { property: "og:description", content: "Create a new commodity listing — reach verified buyers across India." },
    ],
  }),
  component: Sell,
});

function Sell() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    commodity: "Wheat",
    variety: "",
    grade: "A",
    qty: 100,
    price: 2500,
    location: "",
    organic: false,
    notes: "",
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="New listing"
          title={<>List your <span className="text-layered">produce.</span></>}
          hindi="फसल दर्ज करें"
          desc="AI grading will suggest quality and pricing after you upload photos."
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Listing published", { description: `${form.qty} qtl of ${form.variety || form.commodity} live for buyers.` });
            setTimeout(() => navigate({ to: "/marketplace" }), 700);
          }}
          className="grid gap-6 rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 md:p-8"
        >
          <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[color:var(--charcoal)]/30 p-10 text-center cursor-pointer hover:border-[color:var(--forest)] hover:bg-[color:var(--forest)]/5 transition">
            <Upload className="size-8 text-[color:var(--forest)]" />
            <div className="font-[family-name:var(--font-display)] text-lg font-extrabold">Upload photos</div>
            <div className="text-xs text-[color:var(--charcoal)]/60">Our AI will inspect grain quality & suggest grade</div>
            <input type="file" accept="image/*" multiple className="hidden" onChange={() => toast("Photo analyzed · Grade A suggested")} />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Commodity">
              <select value={form.commodity} onChange={(e) => set("commodity", e.target.value)} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-semibold">
                {commodities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Variety">
              <input required value={form.variety} onChange={(e) => set("variety", e.target.value)} placeholder="e.g. Sharbati, Basmati 1121" className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
            </Field>
            <Field label="Grade">
              <div className="flex gap-2">
                {(["A", "B", "C"] as const).map((g) => (
                  <button type="button" key={g} onClick={() => set("grade", g)}
                    className={`flex-1 rounded-xl border-2 py-2 font-bold ${form.grade === g ? "border-[color:var(--forest)] bg-[color:var(--forest)] text-[color:var(--cream)]" : "border-[color:var(--charcoal)]/20"}`}>
                    Grade {g}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Quantity (quintals)">
              <input type="number" min={1} value={form.qty} onChange={(e) => set("qty", Number(e.target.value))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
            </Field>
            <Field label="Price per quintal">
              <div className="relative">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-50" />
                <input type="number" min={1} value={form.price} onChange={(e) => set("price", Number(e.target.value))} className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] py-2.5 pl-9 pr-3" />
              </div>
              <div className="mt-1 text-xs text-[color:var(--charcoal)]/60">Mandi avg: ₹{(form.price * 0.96).toFixed(0)} · AI suggests: ₹{(form.price * 1.04).toFixed(0)}</div>
            </Field>
            <Field label="Location">
              <input required value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Sehore, MP" className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
            </Field>
          </div>

          <label className="inline-flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.organic} onChange={(e) => set("organic", e.target.checked)} />
            This lot is <span className="text-[color:var(--forest)]">organic certified</span>
          </label>

          <Field label="Notes">
            <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} placeholder="Cropping notes, storage, moisture content…" className="w-full rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5" />
          </Field>

          <div className="flex items-center justify-between rounded-2xl bg-[color:var(--charcoal)]/5 p-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">Est. revenue</div>
              <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[color:var(--forest)]">₹{(form.qty * form.price).toLocaleString("en-IN")}</div>
            </div>
            <button type="submit" className="rounded-full bg-[color:var(--charcoal)] px-6 py-3 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--forest)]">
              Publish listing
            </button>
          </div>
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
