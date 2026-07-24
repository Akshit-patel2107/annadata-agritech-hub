import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useState } from "react";
import { toast } from "sonner";
import { saveProfile, type Role, useProfile, clearProfile } from "@/lib/profile";
import { User, Phone, MapPin, ShieldCheck, LogOut } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · अन्नData" },
      { name: "description", content: "Create your अन्नData account — get personalised farm advisory, price alerts and payouts in your name." },
      { property: "og:title", content: "Sign in · अन्नData" },
      { property: "og:description", content: "Create your अन्नData account for personalised advisory and payouts." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    state: "MP",
    role: "Farmer" as Role,
  });
  const [otp, setOtp] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (profile) {
    return (
      <AppShell>
        <main className="mx-auto max-w-2xl px-5 py-10 md:py-14">
          <PageHeader kicker="Your account" title={<>Namaste, <span className="text-layered">{profile.name.split(" ")[0]}.</span></>} hindi="स्वागत" />
          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 md:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="Name" value={profile.name} />
              <Info label="Phone" value={profile.phone} />
              <Info label="Village / City" value={profile.village || "—"} />
              <Info label="State" value={profile.state} />
              <Info label="Role" value={profile.role} />
              <Info label="Member since" value={new Date(profile.createdAt).toLocaleDateString("en-IN")} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/dashboard" className="rounded-full bg-[color:var(--forest)] px-5 py-2.5 text-sm font-semibold text-[color:var(--cream)]">
                Go to dashboard
              </Link>
              <button
                onClick={() => { clearProfile(); toast("Signed out"); navigate({ to: "/" }); }}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[color:var(--charcoal)] px-5 py-2.5 text-sm font-semibold hover:bg-[color:var(--charcoal)] hover:text-[color:var(--cream)]"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </div>
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-5 py-10 md:py-14">
        <PageHeader
          kicker="Sign in / Sign up"
          title={<>Your <span className="text-layered">personal</span> अन्नData.</>}
          hindi="खाता बनाएं"
          desc="Create your account so advisory, prices and payouts are personalised for you. No password — just OTP on your phone."
        />

        <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--cream)] p-6 md:p-8">
          {step === "details" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[6-9]\d{9}$/.test(form.phone)) {
                  toast.error("Enter a valid 10-digit Indian mobile number");
                  return;
                }
                setStep("otp");
                toast("OTP sent", { description: `Demo OTP: 1234 sent to +91 ${form.phone}` });
              }}
              className="grid gap-4"
            >
              <div className="grid gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">I am a</span>
                <div className="flex gap-2">
                  {(["Farmer", "Buyer", "Business"] as const).map((r) => (
                    <button type="button" key={r} onClick={() => set("role", r)}
                      className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-bold ${form.role === r ? "border-[color:var(--forest)] bg-[color:var(--forest)] text-[color:var(--cream)]" : "border-[color:var(--charcoal)]/20"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Full name" icon={User}>
                <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Ramesh Patel" className="w-full bg-transparent outline-none" />
              </Field>
              <Field label="Mobile number" icon={Phone}>
                <span className="pr-2 text-sm font-semibold text-[color:var(--charcoal)]/60">+91</span>
                <input required inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))} placeholder="10-digit mobile" className="w-full bg-transparent outline-none" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Village / City" icon={MapPin}>
                  <input value={form.village} onChange={(e) => set("village", e.target.value)} placeholder="e.g. Sehore" className="w-full bg-transparent outline-none" />
                </Field>
                <div className="grid gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">State</span>
                  <select value={form.state} onChange={(e) => set("state", e.target.value)} className="rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5 font-semibold">
                    {["MP","MH","GJ","RJ","HR","PB","UP","TG","AP","KA","TN","WB","BR","OD"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="mt-2 rounded-full bg-[color:var(--charcoal)] px-6 py-3 text-sm font-bold text-[color:var(--cream)] hover:bg-[color:var(--forest)]">
                Send OTP
              </button>
              <p className="text-xs text-[color:var(--charcoal)]/60">
                By continuing you agree to अन्नData's Terms and Privacy. This demo stores your profile locally on this device only.
              </p>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (otp !== "1234") {
                  toast.error("Wrong OTP", { description: "Use the demo OTP: 1234" });
                  return;
                }
                saveProfile({ ...form, createdAt: new Date().toISOString() });
                toast.success(`Welcome, ${form.name.split(" ")[0]}!`);
                navigate({ to: "/dashboard" });
              }}
              className="grid gap-4"
            >
              <div className="rounded-2xl bg-[color:var(--forest)]/10 p-4 text-sm">
                <ShieldCheck className="mb-1 size-5 text-[color:var(--forest)]" />
                OTP sent to <b>+91 {form.phone}</b>. Use demo OTP <b>1234</b> to continue.
              </div>
              <Field label="Enter 4-digit OTP" icon={ShieldCheck}>
                <input required inputMode="numeric" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="1234" className="w-full bg-transparent text-lg tracking-[0.5em] outline-none" />
              </Field>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep("details")} className="rounded-full border-2 border-[color:var(--charcoal)] px-5 py-2.5 text-sm font-semibold">Back</button>
                <button type="submit" className="flex-1 rounded-full bg-[color:var(--forest)] px-5 py-2.5 text-sm font-bold text-[color:var(--cream)] hover:bg-[color:var(--charcoal)]">
                  Verify & continue
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </AppShell>
  );
}

function Field({ label, icon: Ic, children }: { label: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-[color:var(--charcoal)]/20 bg-[color:var(--cream)] px-3 py-2.5">
        <Ic className="size-4 text-[color:var(--charcoal)]/50" />
        {children}
      </div>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--charcoal)]/5 p-3">
      <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--charcoal)]/60">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
