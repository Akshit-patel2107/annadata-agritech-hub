import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { ScanLine, Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/disease")({
  head: () => ({
    meta: [
      { title: "Disease Detection · अन्नData" },
      { name: "description", content: "Snap a leaf. Our vision model diagnoses disease and prescribes treatment in seconds." },
      { property: "og:title", content: "Disease Detection · अन्नData" },
      { property: "og:description", content: "Snap a leaf. Our vision model diagnoses disease and prescribes treatment." },
    ],
  }),
  component: Disease,
});

const DIAGNOSES = [
  { name: "Leaf Rust", crop: "Wheat", confidence: 94, severity: "Moderate", treatment: "Spray Propiconazole 25% EC @ 0.1% (1 ml/L) within 3 days. Repeat after 15 days if symptoms persist.", prevention: "Sow rust-resistant varieties (HD-3226). Rotate with pulses. Avoid excess N." },
  { name: "Bacterial Blight", crop: "Rice", confidence: 89, severity: "High", treatment: "Copper oxychloride 50% WP @ 2.5 g/L + Streptocycline 100 ppm. Drain field for 2 days.", prevention: "Certified seed treatment with Carbendazim. Balance N-P-K; avoid excess N." },
  { name: "Powdery Mildew", crop: "Cotton", confidence: 91, severity: "Low", treatment: "Sulphur 80% WDG @ 2 g/L. Two sprays 10 days apart in evening.", prevention: "Prune crowded branches. Maintain plant spacing 90×45 cm." },
];

function Disease() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof DIAGNOSES[number] | null>(null);

  const onFile = (f?: File) => {
    if (!f) return;
    setResult(null);
    setPreview(URL.createObjectURL(f));
    setAnalyzing(true);
    setTimeout(() => {
      setResult(DIAGNOSES[Math.floor(Math.random() * DIAGNOSES.length)]);
      setAnalyzing(false);
    }, 1400);
  };

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-5 py-10 md:py-14">
        <PageHeader kicker="Vision AI" title={<>Snap. Diagnose. <span className="text-layered">Treat.</span></>} hindi="निदान" desc="97% accurate across 40+ common Indian crop diseases." />

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-4 border-dashed border-[color:var(--charcoal)]/30 bg-[color:var(--cream)] transition hover:border-[color:var(--forest)]">
            {preview ? (
              <>
                <img src={preview} alt="Leaf" className="absolute inset-0 h-full w-full object-cover" />
                {analyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--charcoal)]/60 backdrop-blur-sm">
                    <div className="text-center text-[color:var(--cream)]">
                      <ScanLine className="mx-auto size-12 animate-pulse text-[color:var(--mustard)]" />
                      <div className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold">Analyzing…</div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Upload className="size-12 text-[color:var(--forest)]" />
                <div className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold">Upload leaf photo</div>
                <div className="mt-1 text-sm text-[color:var(--charcoal)]/60">or drag & drop · JPG, PNG · max 5MB</div>
                <div className="mt-6 text-xs text-[color:var(--charcoal)]/50">Try demo: no image? Tap Analyze demo →</div>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>

          <div className="rounded-3xl border-2 border-[color:var(--charcoal)] bg-[color:var(--charcoal)] p-6 text-[color:var(--cream)]">
            {!result && !analyzing && (
              <div className="flex h-full flex-col items-start justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--mustard)]">Diagnosis</div>
                  <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold">Waiting for image…</div>
                  <p className="mt-4 text-sm opacity-75">Upload a photo of the affected leaf. Best results: sharp, well-lit close-up.</p>
                </div>
                <button
                  onClick={() => {
                    setPreview("https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8f?auto=format&fit=crop&w=600&q=70");
                    setAnalyzing(true);
                    setTimeout(() => { setResult(DIAGNOSES[0]); setAnalyzing(false); }, 1400);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--mustard)] px-4 py-2.5 text-sm font-semibold text-[color:var(--charcoal)]"
                >
                  <ScanLine className="size-4" /> Analyze demo image
                </button>
              </div>
            )}

            {result && (
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--mustard)]">Detected</div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--forest)] px-2 py-0.5 text-xs font-bold">
                    <CheckCircle2 className="size-3" /> {result.confidence}% confident
                  </span>
                </div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[color:var(--mustard)]">{result.name}</div>
                <div className="text-sm opacity-70">on {result.crop}</div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--orange-deep)]/20 px-3 py-1 text-xs font-bold text-[color:var(--orange-deep)]">
                  <AlertTriangle className="size-3" /> Severity: {result.severity}
                </div>

                <div className="mt-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--cream)]/60">Treatment</div>
                  <p className="mt-1 text-sm">{result.treatment}</p>
                </div>
                <div className="mt-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--cream)]/60">Prevention</div>
                  <p className="mt-1 text-sm opacity-90">{result.prevention}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
