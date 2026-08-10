export type ExportMarket = {
  country: string;
  flag: string;
  /** Landed wholesale price in INR per quintal in that market */
  pricePerQuintal: number;
  demand: "High" | "Medium" | "Low";
  note: string;
};

/** Indian benchmark mandi price (INR / quintal) used for comparison. */
export const indianBenchmark: Record<string, number> = {
  Wheat: 2550,
  Rice: 3800,
  Cotton: 7100,
  Pulses: 7200,
  Oilseeds: 5300,
  Tobacco: 12200,
  Chicory: 8600,
  Vegetables: 2000,
  Fruits: 15200,
};

/** Offline baseline used before/if the AI comparison is unavailable. */
export const baselineMarkets: Record<string, ExportMarket[]> = {
  Wheat: [
    { country: "UAE", flag: "🇦🇪", pricePerQuintal: 3450, demand: "High", note: "Flour mills, short 6-day sea route from Mundra." },
    { country: "Bangladesh", flag: "🇧🇩", pricePerQuintal: 3150, demand: "High", note: "Land border trade, fastest turnaround." },
    { country: "Indonesia", flag: "🇮🇩", pricePerQuintal: 3320, demand: "Medium", note: "Large milling demand, bulk vessels only." },
    { country: "Egypt", flag: "🇪🇬", pricePerQuintal: 3600, demand: "Medium", note: "Tender-driven, needs phyto + fumigation." },
  ],
  Rice: [
    { country: "Saudi Arabia", flag: "🇸🇦", pricePerQuintal: 6900, demand: "High", note: "Premium basmati, brand-led retail packs." },
    { country: "Iran", flag: "🇮🇷", pricePerQuintal: 6400, demand: "High", note: "Long-grain aged basmati preferred." },
    { country: "USA", flag: "🇺🇸", pricePerQuintal: 7400, demand: "Medium", note: "Organic certification lifts realisation." },
    { country: "Benin", flag: "🇧🇯", pricePerQuintal: 3900, demand: "High", note: "Parboiled non-basmati, price sensitive." },
  ],
  Cotton: [
    { country: "Bangladesh", flag: "🇧🇩", pricePerQuintal: 8600, demand: "High", note: "Spinning mills buy year-round." },
    { country: "Vietnam", flag: "🇻🇳", pricePerQuintal: 8900, demand: "High", note: "Contamination-free bales get premium." },
    { country: "China", flag: "🇨🇳", pricePerQuintal: 8400, demand: "Medium", note: "Quota-linked, volumes vary." },
  ],
  Pulses: [
    { country: "UAE", flag: "🇦🇪", pricePerQuintal: 9200, demand: "High", note: "Re-export hub for Gulf retail." },
    { country: "UK", flag: "🇬🇧", pricePerQuintal: 10400, demand: "Medium", note: "Ethnic retail, strict pesticide MRLs." },
    { country: "Nepal", flag: "🇳🇵", pricePerQuintal: 8200, demand: "Medium", note: "Road freight, small batches viable." },
  ],
  Oilseeds: [
    { country: "Nepal", flag: "🇳🇵", pricePerQuintal: 6300, demand: "High", note: "Crushing units near border." },
    { country: "Bangladesh", flag: "🇧🇩", pricePerQuintal: 6100, demand: "Medium", note: "Mustard oil demand in winter." },
    { country: "Netherlands", flag: "🇳🇱", pricePerQuintal: 7600, demand: "Medium", note: "Organic + traceability required." },
  ],
  Tobacco: [
    { country: "Belgium", flag: "🇧🇪", pricePerQuintal: 16800, demand: "Medium", note: "FCV leaf via Antwerp, grade critical." },
    { country: "Indonesia", flag: "🇮🇩", pricePerQuintal: 15200, demand: "High", note: "Blending demand for kretek." },
    { country: "Egypt", flag: "🇪🇬", pricePerQuintal: 14600, demand: "Medium", note: "State tenders, long payment cycles." },
  ],
  Chicory: [
    { country: "Germany", flag: "🇩🇪", pricePerQuintal: 12400, demand: "Medium", note: "Coffee blending & inulin extraction." },
    { country: "France", flag: "🇫🇷", pricePerQuintal: 12900, demand: "Medium", note: "Roasted chicory retail market." },
    { country: "USA", flag: "🇺🇸", pricePerQuintal: 13600, demand: "High", note: "Caffeine-free beverage trend." },
  ],
  Vegetables: [
    { country: "UAE", flag: "🇦🇪", pricePerQuintal: 3600, demand: "High", note: "Onion & okra, air/sea mix, 48h cold chain." },
    { country: "Malaysia", flag: "🇲🇾", pricePerQuintal: 3300, demand: "High", note: "Onion demand steady all year." },
    { country: "Qatar", flag: "🇶🇦", pricePerQuintal: 3900, demand: "Medium", note: "Small high-value consignments." },
  ],
  Fruits: [
    { country: "UK", flag: "🇬🇧", pricePerQuintal: 26500, demand: "High", note: "Alphonso air freight, premium retail." },
    { country: "UAE", flag: "🇦🇪", pricePerQuintal: 21800, demand: "High", note: "Bulk mango & banana, sea reefer." },
    { country: "Japan", flag: "🇯🇵", pricePerQuintal: 31000, demand: "Medium", note: "Vapour heat treatment mandatory." },
  ],
};

export type FeeQuote = {
  model: "commission" | "consultation";
  ratePct: number;
  fee: number;
  cargoValue: number;
  label: string;
  reason: string;
};

/** अन्नData export desk pricing: 0.5%–1.5% commission, or a flat consultation fee for small batches. */
export function quoteExportFee(cargoValue: number): FeeQuote {
  if (cargoValue < 200000) {
    return {
      model: "consultation",
      ratePct: 0,
      fee: 2500,
      cargoValue,
      label: "Flat consultation fee",
      reason: "Batch value below ₹2,00,000 — we charge a one-time flat fee instead of commission.",
    };
  }
  const ratePct = cargoValue >= 5000000 ? 0.5 : cargoValue >= 1000000 ? 1.0 : 1.5;
  return {
    model: "commission",
    ratePct,
    fee: Math.round((cargoValue * ratePct) / 100),
    cargoValue,
    label: `${ratePct}% export commission`,
    reason:
      ratePct === 0.5
        ? "Cargo above ₹50 lakh qualifies for our lowest slab."
        : ratePct === 1.0
          ? "Cargo between ₹10–50 lakh sits in the mid slab."
          : "Cargo between ₹2–10 lakh sits in the entry slab.",
  };
}

export const feeSlabs = [
  { range: "Below ₹2,00,000", charge: "₹2,500 flat consultation", note: "Docs, buyer intro & pricing advice" },
  { range: "₹2L – ₹10L", charge: "1.5% commission", note: "Full export desk handling" },
  { range: "₹10L – ₹50L", charge: "1.0% commission", note: "Dedicated trade manager" },
  { range: "Above ₹50L", charge: "0.5% commission", note: "Priority freight & credit cover" },
];
