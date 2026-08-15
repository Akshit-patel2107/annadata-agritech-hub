import wheatSeed from "@/assets/supplies/wheat-seed.jpg";
import paddySeed from "@/assets/supplies/paddy-seed.jpg";
import cottonSeed from "@/assets/supplies/cotton-seed.jpg";
import vegSeed from "@/assets/supplies/veg-seed.jpg";
import urea from "@/assets/supplies/urea.jpg";
import dap from "@/assets/supplies/dap.jpg";
import npk from "@/assets/supplies/npk.jpg";
import vermicompost from "@/assets/supplies/vermicompost.jpg";
import insecticide from "@/assets/supplies/insecticide.jpg";
import fungicide from "@/assets/supplies/fungicide.jpg";
import neemOil from "@/assets/supplies/neem-oil.jpg";
import sprayer from "@/assets/supplies/sprayer.jpg";

export type ProductCategory = "Seeds" | "Fertilizer" | "Pesticide" | "Tools";

export type Product = {
  id: string;
  name: string;
  hindi: string;
  category: ProductCategory;
  brand: string;
  variety?: string;
  unit: string;
  price: number;
  mrp: number;
  certified: boolean;
  image: string;
  /** Where it grows / works best */
  soil: string;
  /** Practical agronomy note written for the farmer */
  description: string;
  /** Recommended companion inputs (ids of other products) */
  pairFertilizer?: string;
  pairPesticide?: string;
  variants?: string[];
};

export const products: Product[] = [
  // ---------- SEEDS ----------
  {
    id: "s1",
    name: "Wheat HD-2967",
    variety: "HD-2967 (certified)",
    hindi: "गेहूं बीज",
    category: "Seeds",
    brand: "IARI Pusa · State Seed Corp",
    unit: "40 kg bag",
    price: 1450,
    mrp: 1650,
    certified: true,
    image: wheatSeed,
    soil: "Loam to clay-loam, pH 6.5–7.5, assured irrigation",
    description:
      "India's most widely sown irrigated-timely-sown wheat. Best on well-drained loamy soils of Punjab, Haryana, UP and MP with 4–5 irrigations. Sow 100 kg/ha in the first fortnight of November at 4–5 cm depth. Strong yellow-rust tolerance and lodging resistance; average 55–60 q/ha.",
    pairFertilizer: "f2",
    pairPesticide: "p2",
    variants: ["HD-2967", "HD-3086", "Sharbati (MP)", "Lokwan"],
  },
  {
    id: "s2",
    name: "Basmati Pusa 1121",
    variety: "Pusa Basmati 1121",
    hindi: "बासमती बीज",
    category: "Seeds",
    brand: "IARI Pusa · Nuziveedu",
    unit: "10 kg bag",
    price: 890,
    mrp: 1050,
    certified: true,
    image: paddySeed,
    soil: "Heavy clay / clay-loam that holds water, pH 6.0–7.5",
    description:
      "Extra-long-grain export basmati grown across Haryana, Punjab and western UP. Needs puddled, water-retentive soil; nursery in late May–June, transplant 25–30 day seedlings at 20×15 cm. Avoid excess nitrogen — it invites blast and lodging. Kernel elongates over 20 mm on cooking, so it fetches the highest export price.",
    pairFertilizer: "f3",
    pairPesticide: "p2",
    variants: ["Pusa 1121", "Pusa 1509 (short duration)", "Sona Masuri", "Pusa 1718"],
  },
  {
    id: "s3",
    name: "Rasi RCH-659 BG II Cotton",
    variety: "RCH-659 BG II hybrid",
    hindi: "कपास बीज",
    category: "Seeds",
    brand: "Rasi Seeds",
    unit: "475 g packet",
    price: 864,
    mrp: 950,
    certified: true,
    image: cottonSeed,
    soil: "Medium-to-deep black cotton soil (vertisol), pH 6.5–8.0, good drainage",
    description:
      "High-yielding Bt hybrid popular in Gujarat, Maharashtra and Telangana. Suits rainfed black soils as well as irrigated conditions; spacing 120×45 cm, one packet per acre. Big bolls with good ginning out-turn. Follow refuge-in-bag and rotate crops to slow pink bollworm.",
    pairFertilizer: "f3",
    pairPesticide: "p1",
    variants: ["Rasi RCH-659", "Mahyco MRC-7351", "Nuziveedu Bhakti", "Kaveri Jadoo"],
  },
  {
    id: "s4",
    name: "Syngenta Saaho Tomato & Chilli Pack",
    variety: "Saaho tomato + Syngenta chilli hybrid",
    hindi: "सब्जी बीज",
    category: "Seeds",
    brand: "Syngenta",
    unit: "10 g pack",
    price: 340,
    mrp: 395,
    certified: true,
    image: vegSeed,
    soil: "Sandy-loam to red loam, rich in organic matter, pH 6.0–7.0, never waterlogged",
    description:
      "Determinate hybrid tomato with firm, thick-skinned fruit that travels well to distant mandis, packed with a hot chilli hybrid for mixed vegetable plots. Raise in pro-trays, transplant at 25 days on raised beds with drip and mulch. Basal vermicompost plus a light NPK dose every 15 days keeps picking going for 3 months.",
    pairFertilizer: "f4",
    pairPesticide: "p3",
    variants: ["Tomato Saaho", "Tomato Abhinav", "Chilli Indam", "Okra Mahyco No.10"],
  },

  // ---------- FERTILIZER ----------
  {
    id: "f1",
    name: "IFFCO Urea 46% N",
    hindi: "यूरिया",
    category: "Fertilizer",
    brand: "IFFCO",
    unit: "45 kg bag",
    price: 266,
    mrp: 300,
    certified: true,
    image: urea,
    soil: "All soils — split-apply on light sandy soils to stop leaching",
    description:
      "Subsidised straight nitrogen for the vegetative stage of wheat, paddy, maize and cotton. Apply in 2–3 splits with irrigation, never on standing water in paddy. On sandy soils use neem-coated urea and mix into moist soil to cut ammonia loss.",
    pairPesticide: "p2",
  },
  {
    id: "f2",
    name: "IFFCO DAP 18:46:0",
    hindi: "डीएपी",
    category: "Fertilizer",
    brand: "IFFCO",
    unit: "50 kg bag",
    price: 1350,
    mrp: 1450,
    certified: true,
    image: dap,
    soil: "Best on neutral to slightly acidic soils; avoid surface-dressing on highly alkaline soil",
    description:
      "The standard basal phosphorus dose drilled at sowing for wheat, mustard, gram and paddy. Phosphorus does not move in soil, so place it 5 cm below the seed. Do not mix DAP with lime or apply along with seed in dry soil.",
    pairPesticide: "p2",
  },
  {
    id: "f3",
    name: "Coromandel Gromor NPK 10:26:26",
    hindi: "एनपीके",
    category: "Fertilizer",
    brand: "Coromandel Gromor",
    unit: "50 kg bag",
    price: 1470,
    mrp: 1600,
    certified: true,
    image: npk,
    soil: "Potassium-hungry black and red soils; ideal for cotton, chilli, banana, paddy",
    description:
      "Balanced complex giving phosphorus and potash together — potash builds boll, fruit and grain weight and improves drought tolerance. Use as basal at sowing/transplanting; top-dress nitrogen separately with urea later.",
    pairPesticide: "p1",
  },
  {
    id: "f4",
    name: "अन्नData Organic Vermicompost",
    hindi: "जैविक खाद",
    category: "Fertilizer",
    brand: "अन्नData Organics",
    unit: "50 kg bag",
    price: 480,
    mrp: 550,
    certified: true,
    image: vermicompost,
    soil: "Every soil — especially degraded, low-carbon and sandy fields",
    description:
      "Worm-worked compost that raises organic carbon, water holding and microbial life. Apply 2–2.5 tonnes/acre before sowing, or as a ring dose for vegetables and orchards. Essential base for organic certification and for cutting chemical fertiliser use by 20–25%.",
    pairPesticide: "p3",
  },

  // ---------- PESTICIDE ----------
  {
    id: "p1",
    name: "Bayer Confidor (Imidacloprid 17.8% SL)",
    hindi: "कीटनाशक",
    category: "Pesticide",
    brand: "Bayer",
    unit: "500 ml",
    price: 520,
    mrp: 610,
    certified: true,
    image: insecticide,
    soil: "Foliar spray — for sucking pests",
    description:
      "Systemic insecticide for jassid, aphid, thrips and whitefly on cotton, paddy, chilli and vegetables. Dose 100–125 ml/acre in 200 litres water. Spray in the evening, avoid flowering time to protect bees, and rotate with a different mode of action to avoid resistance.",
    variants: ["Bayer Confidor", "Dhanuka EM-1 (Emamectin)", "UPL Lancer Gold", "Rallis Takumi"],
  },
  {
    id: "p2",
    name: "UPL Saaf (Carbendazim 12% + Mancozeb 63% WP)",
    hindi: "फफूंदनाशक",
    category: "Pesticide",
    brand: "UPL",
    unit: "1 kg",
    price: 620,
    mrp: 720,
    certified: true,
    image: fungicide,
    soil: "Foliar + seed treatment fungicide",
    description:
      "Broad-spectrum contact-plus-systemic fungicide for rust, blight, leaf spot and downy mildew in wheat, potato, grape, chilli and paddy. Seed treatment at 2 g/kg seed; foliar at 400 g/acre. Start at first symptom — fungicides protect, they cannot undo damage.",
    variants: ["UPL Saaf", "Indofil M-45 (Mancozeb)", "Syngenta Amistar Top", "Dhanuka Sixer"],
  },
  {
    id: "p3",
    name: "Neem Oil 1500 PPM Azadirachtin",
    hindi: "नीम तेल",
    category: "Pesticide",
    brand: "Godrej Agrovet",
    unit: "1 litre",
    price: 430,
    mrp: 520,
    certified: true,
    image: neemOil,
    soil: "Organic-approved bio-pesticide",
    description:
      "Botanical repellent and growth disruptor for mites, whitefly, thrips and early caterpillar stages. Dose 2–3 ml/litre with a sticker, sprayed every 10–12 days in the evening. Safe near harvest and permitted under organic certification, so ideal for vegetables and fruit.",
    variants: ["1500 PPM", "10000 PPM concentrate", "Neem cake 50 kg"],
  },

  // ---------- TOOLS ----------
  {
    id: "t1",
    name: "Neptune Battery Knapsack Sprayer 16L",
    hindi: "स्प्रेयर",
    category: "Tools",
    brand: "Neptune",
    unit: "1 unit",
    price: 2390,
    mrp: 2900,
    certified: false,
    image: sprayer,
    soil: "Field equipment",
    description:
      "12V battery knapsack with 4 nozzles covering roughly 1 acre per charge. Uniform droplets mean less chemical wasted and better pest kill. Rinse the tank three times after each pesticide and always wear gloves and a mask.",
    variants: ["Battery 16L", "Manual 16L", "Double motor 18L"],
  },
];

export const inputCategories: ProductCategory[] = ["Seeds", "Fertilizer", "Pesticide", "Tools"];

export function productById(id?: string) {
  return products.find((p) => p.id === id);
}
