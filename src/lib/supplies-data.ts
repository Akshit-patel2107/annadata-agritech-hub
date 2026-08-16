import seedsImg from "@/assets/supplies/seeds.jpg";
import fertilizerImg from "@/assets/supplies/fertilizer.jpg";
import pesticideImg from "@/assets/supplies/pesticide.jpg";
import toolsImg from "@/assets/supplies/tools.jpg";

export type SupplyCategory = "Seeds" | "Fertilizer" | "Pesticide" | "Tools";

export type Supply = {
  id: string;
  name: string;
  hindi: string;
  category: SupplyCategory;
  brand: string;
  company: string;
  unit: string;
  price: number;
  mrp: number;
  certified: boolean;
  crop: string;
  /** Agronomy notes */
  soil: string;
  season: string;
  duration: string;
  description: string;
  /** ids of recommended companion products */
  pairs: string[];
};

export const categoryImages: Record<SupplyCategory, string> = {
  Seeds: seedsImg,
  Fertilizer: fertilizerImg,
  Pesticide: pesticideImg,
  Tools: toolsImg,
};

export const supplies: Supply[] = [
  // ---------- SEEDS ----------
  {
    id: "s-hd2967", name: "HD-2967 Wheat Seed", hindi: "गेहूं बीज एचडी-2967", category: "Seeds",
    brand: "HD-2967", company: "IARI / National Seeds Corporation", unit: "40 kg bag", price: 1480, mrp: 1680, certified: true,
    crop: "Wheat", soil: "Well-drained loam to clay-loam, pH 6.5–7.5, irrigated North-West & North-East plains",
    season: "Rabi — sow 5–25 November", duration: "140–145 days · ~50–55 q/ha",
    description: "India's most widely grown irrigated bread-wheat variety. Yellow and brown rust tolerant with strong straw that resists lodging under high nitrogen. Seed rate 100 kg/acre; treat with Vitavax Power before sowing.",
    pairs: ["f-iffco-dap", "f-iffco-urea", "p-bayer-nativo"],
  },
  {
    id: "s-pusa1121", name: "Pusa Basmati 1121 Paddy Seed", hindi: "बासमती 1121 धान बीज", category: "Seeds",
    brand: "Pusa Basmati 1121", company: "IARI / Nuziveedu Seeds", unit: "10 kg bag", price: 920, mrp: 1100, certified: true,
    crop: "Rice (Basmati)", soil: "Heavy clay or silty-clay loam that holds water, pH 6.0–7.5, Punjab–Haryana–Western UP belt",
    season: "Kharif — nursery mid-May, transplant late June", duration: "140–145 days · extra-long grain, export grade",
    description: "The export benchmark basmati with the longest cooked kernel. Needs puddled fields and controlled nitrogen — excess urea causes lodging and chalky grain. Ideal for अन्नData export contracts.",
    pairs: ["f-coromandel-gromor", "f-iffco-urea", "p-upl-saaf"],
  },
  {
    id: "s-rasi659", name: "RCH-659 BG II Cotton Hybrid", hindi: "कपास संकर बीज", category: "Seeds",
    brand: "RCH-659 BG II", company: "Rasi Seeds", unit: "475 g packet", price: 864, mrp: 864, certified: true,
    crop: "Cotton", soil: "Medium to deep black cotton soil (vertisol), pH 6.5–8.0, Gujarat–Maharashtra–Telangana",
    season: "Kharif — sow with the first monsoon showers", duration: "160–170 days · good boll retention",
    description: "High-yielding Bollgard II hybrid with in-built bollworm protection and tolerance to moisture stress. Government-notified MRP. Maintain a non-Bt refuge row as printed on the pack.",
    pairs: ["f-iffco-dap", "f-coromandel-potash", "p-bayer-solomon"],
  },
  {
    id: "s-mahyco-tomato", name: "Abhinav Hybrid Tomato Seed", hindi: "टमाटर संकर बीज", category: "Seeds",
    brand: "Abhinav", company: "Mahyco", unit: "10 g tin", price: 340, mrp: 400, certified: true,
    crop: "Tomato", soil: "Sandy-loam to red loam, well-drained, pH 6.0–7.0; avoid waterlogged patches",
    season: "Kharif & Rabi — transplant 25 days after nursery", duration: "First pick in 65–70 days · firm, transport-hardy fruit",
    description: "Determinate hybrid with thick-skinned fruit that survives long mandi hauls. Stake the crop and keep drip irrigation steady to prevent fruit cracking.",
    pairs: ["f-coromandel-gromor", "t-jain-drip", "p-syngenta-amistar"],
  },
  {
    id: "s-pioneer-maize", name: "P-3396 Maize Hybrid Seed", hindi: "मक्का संकर बीज", category: "Seeds",
    brand: "Pioneer P-3396", company: "Corteva Agriscience", unit: "4 kg bag", price: 1560, mrp: 1750, certified: true,
    crop: "Maize", soil: "Sandy-loam to loam with good drainage, pH 5.8–7.2; sensitive to waterlogging",
    season: "Kharif & Rabi", duration: "110–120 days · high grain-to-cob ratio",
    description: "Widely planted single-cross hybrid known for uniform cobs and standability. Responds strongly to split nitrogen at knee-high and tasselling stages.",
    pairs: ["f-iffco-urea", "f-iffco-dap", "p-syngenta-ampligo"],
  },
  {
    id: "s-mustard-pusa", name: "Pusa Mustard-25 Seed", hindi: "सरसों बीज", category: "Seeds",
    brand: "Pusa Mustard-25", company: "IARI / National Seeds Corporation", unit: "2 kg pack", price: 330, mrp: 390, certified: true,
    crop: "Mustard (Oilseed)", soil: "Light sandy-loam to loam, tolerant of mild alkalinity, pH 6.5–8.0; Rajasthan–MP–Haryana",
    season: "Rabi — sow 10–25 October", duration: "125–130 days · ~38% oil content",
    description: "Early-maturing, low-water mustard suited to rainfed Rabi. Fits well before a summer moong crop. Apply sulphur — it directly lifts oil percentage and mandi price.",
    pairs: ["f-iffco-dap", "f-coromandel-sulphur", "p-upl-saaf"],
  },

  // ---------- FERTILIZERS ----------
  {
    id: "f-iffco-urea", name: "IFFCO Urea 46% N", hindi: "यूरिया", category: "Fertilizer",
    brand: "IFFCO Urea (neem-coated)", company: "IFFCO", unit: "45 kg bag", price: 266, mrp: 300, certified: true,
    crop: "All crops", soil: "Every soil type; on sandy soils split into 3 doses to cut leaching losses",
    season: "Top-dressing at tillering / knee-high stage", duration: "Statutory MRP — neem coating slows nitrogen release",
    description: "The primary nitrogen source for cereal crops. Broadcast on moist soil and irrigate lightly within 24 hours; surface application on dry soil loses up to 30% nitrogen as ammonia.",
    pairs: ["s-hd2967", "s-pusa1121", "t-neptune-sprayer"],
  },
  {
    id: "f-iffco-dap", name: "IFFCO DAP 18:46:0", hindi: "डीएपी", category: "Fertilizer",
    brand: "IFFCO DAP", company: "IFFCO", unit: "50 kg bag", price: 1350, mrp: 1350, certified: true,
    crop: "All crops", soil: "Best on neutral to slightly acidic soils; in highly alkaline soil use SSP instead for better phosphorus availability",
    season: "Basal dose at sowing", duration: "Subsidised statutory MRP",
    description: "Supplies starter phosphorus for root establishment plus 18% nitrogen. Place in the seed furrow 2–3 cm below and beside the seed — direct contact can burn germinating seed.",
    pairs: ["s-hd2967", "s-rasi659", "f-iffco-urea"],
  },
  {
    id: "f-coromandel-gromor", name: "Gromor NPK 10:26:26", hindi: "एनपीके 10:26:26", category: "Fertilizer",
    brand: "Gromor", company: "Coromandel International", unit: "50 kg bag", price: 1470, mrp: 1600, certified: true,
    crop: "Cotton, vegetables, pulses, paddy", soil: "Potassium-deficient red and light soils; excellent for horticulture beds",
    season: "Basal + first top dressing", duration: "Balanced P and K in one bag",
    description: "Complex fertilizer that gives phosphorus and potassium together — potassium improves fruit firmness, fibre strength and disease tolerance. Reduces the need for separate MOP application.",
    pairs: ["s-mahyco-tomato", "s-pusa1121", "t-jain-drip"],
  },
  {
    id: "f-coromandel-potash", name: "Muriate of Potash (MOP) 60% K", hindi: "पोटाश", category: "Fertilizer",
    brand: "MOP", company: "Indian Potash Limited (IPL)", unit: "50 kg bag", price: 1700, mrp: 1800, certified: true,
    crop: "Cotton, banana, potato, sugarcane", soil: "Light and sandy soils that leach potassium; avoid on saline-chloride soils",
    season: "Split — half basal, half at flowering", duration: "Improves boll and tuber filling",
    description: "Highest-analysis potassium source. Directly improves cotton boll weight and fibre strength, and helps crops withstand drought and sucking-pest damage.",
    pairs: ["s-rasi659", "f-iffco-dap"],
  },
  {
    id: "f-coromandel-sulphur", name: "Bentonite Sulphur 90%", hindi: "गंधक", category: "Fertilizer",
    brand: "Sulphur 90% WDG", company: "Coromandel International", unit: "25 kg bag", price: 1250, mrp: 1400, certified: true,
    crop: "Mustard, groundnut, soybean, onion", soil: "Sulphur-deficient light soils — very common across Rajasthan, MP and Gujarat",
    season: "Basal, mixed with the first dose", duration: "Raises oil content in oilseeds",
    description: "Oilseed yields stall without sulphur. This granular bentonite form disperses in soil moisture and releases plant-available sulphate steadily through the season.",
    pairs: ["s-mustard-pusa", "f-iffco-dap"],
  },
  {
    id: "f-vermicompost", name: "Vermicompost (Organic Manure)", hindi: "जैविक वर्मी खाद", category: "Fertilizer",
    brand: "अन्नData Organics", company: "Verified FPO producers", unit: "50 kg bag", price: 480, mrp: 550, certified: true,
    crop: "All crops", soil: "Every soil — best on degraded, low-organic-carbon fields",
    season: "Field preparation, 15 days before sowing", duration: "Builds soil carbon over 2–3 seasons",
    description: "Improves water-holding capacity and microbial life, and is mandatory input evidence for organic certification. Apply 2–2.5 tonnes/acre with the last ploughing.",
    pairs: ["s-mahyco-tomato", "t-jain-drip"],
  },

  // ---------- PESTICIDES ----------
  {
    id: "p-bayer-nativo", name: "Nativo 75 WG Fungicide", hindi: "फफूंदनाशक नेटिवो", category: "Pesticide",
    brand: "Nativo 75 WG", company: "Bayer CropScience", unit: "100 g pack", price: 690, mrp: 760, certified: true,
    crop: "Wheat, paddy, chilli, grapes", soil: "—", season: "At first disease appearance; repeat after 12–15 days",
    duration: "Tebuconazole 50% + Trifloxystrobin 25%",
    description: "Broad-spectrum systemic + contact fungicide for rust, blast, sheath blight and powdery mildew. Dose 120 g/acre in 200 litres water. Observe the label pre-harvest interval before selling produce.",
    pairs: ["s-hd2967", "t-neptune-sprayer"],
  },
  {
    id: "p-bayer-solomon", name: "Solomon Insecticide", hindi: "कीटनाशक सोलोमन", category: "Pesticide",
    brand: "Solomon", company: "Bayer CropScience", unit: "500 ml", price: 1180, mrp: 1290, certified: true,
    crop: "Cotton, okra, chilli, pulses", soil: "—", season: "On sucking-pest and bollworm threshold",
    duration: "Beta-cyfluthrin 8.49% + Imidacloprid 19.81% OD",
    description: "Controls jassids, aphids, thrips and early bollworm in a single spray. Rotate with a different mode of action every second spray to avoid resistance build-up.",
    pairs: ["s-rasi659", "t-neptune-sprayer"],
  },
  {
    id: "p-upl-saaf", name: "Saaf Fungicide", hindi: "साफ फफूंदनाशक", category: "Pesticide",
    brand: "Saaf", company: "UPL", unit: "1 kg", price: 640, mrp: 720, certified: true,
    crop: "Vegetables, mustard, pulses, paddy", soil: "—", season: "Preventive spray + seed treatment",
    duration: "Carbendazim 12% + Mancozeb 63% WP",
    description: "Economical systemic-plus-contact combination for blight, leaf spot and damping off. Also usable as a seed treatment at 2 g/kg seed — the cheapest insurance against early crop loss.",
    pairs: ["s-mustard-pusa", "s-pusa1121", "t-neptune-sprayer"],
  },
  {
    id: "p-syngenta-amistar", name: "Amistar Top Fungicide", hindi: "अमिस्टार टॉप", category: "Pesticide",
    brand: "Amistar Top", company: "Syngenta", unit: "250 ml", price: 780, mrp: 860, certified: true,
    crop: "Tomato, potato, onion, grapes", soil: "—", season: "Preventive, from early fruiting",
    duration: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
    description: "Keeps foliage green longer, which raises fruit size and grade. Dose 200 ml/acre. Strong on early blight and purple blotch in onion.",
    pairs: ["s-mahyco-tomato", "t-neptune-sprayer"],
  },
  {
    id: "p-syngenta-ampligo", name: "Ampligo Insecticide", hindi: "एम्प्लिगो कीटनाशक", category: "Pesticide",
    brand: "Ampligo", company: "Syngenta", unit: "200 ml", price: 1150, mrp: 1250, certified: true,
    crop: "Maize, cotton, pulses, vegetables", soil: "—", season: "At fall armyworm / borer detection",
    duration: "Chlorantraniliprole 10% + Lambda-cyhalothrin 5% ZC",
    description: "The standard recommendation for fall armyworm in maize. Spray into the whorl in the evening for best contact with feeding larvae.",
    pairs: ["s-pioneer-maize", "t-neptune-sprayer"],
  },
  {
    id: "p-neem", name: "Neem Oil 1500 PPM (Azadirachtin)", hindi: "नीम तेल", category: "Pesticide",
    brand: "Neem Oil 1500 PPM", company: "EID Parry / verified organic suppliers", unit: "1 litre", price: 420, mrp: 480, certified: true,
    crop: "All crops (organic approved)", soil: "—", season: "Every 10–12 days as a preventive",
    duration: "Botanical, zero residue",
    description: "Organic-certification friendly repellent and growth disruptor for sucking pests. Spray in the evening — sunlight degrades azadirachtin. Required input for organic export lots.",
    pairs: ["f-vermicompost", "t-neptune-sprayer"],
  },

  // ---------- TOOLS ----------
  {
    id: "t-neptune-sprayer", name: "Knapsack Sprayer 16 L", hindi: "स्प्रेयर", category: "Tools",
    brand: "Pad Corp / Neptune", company: "Padgilwar Corporation", unit: "1 unit", price: 1990, mrp: 2400, certified: false,
    crop: "All crops", soil: "—", season: "Year-round", duration: "Brass nozzle set included",
    description: "Manual lever-operated sprayer with adjustable cone and flat-fan nozzles. Calibrate before every spray — wrong nozzle pressure wastes up to 30% of costly chemical.",
    pairs: ["p-bayer-nativo", "p-upl-saaf"],
  },
  {
    id: "t-jain-drip", name: "Drip Irrigation Kit (1 acre)", hindi: "ड्रिप सिंचाई किट", category: "Tools",
    brand: "Jain Drip", company: "Jain Irrigation Systems", unit: "1 acre kit", price: 8900, mrp: 10500, certified: true,
    crop: "Vegetables, cotton, fruit orchards", soil: "All soils; highest saving on sandy and undulating land",
    season: "Install before sowing", duration: "Eligible for PMKSY subsidy (up to 55%)",
    description: "Inline laterals, filter and venturi for fertigation. Cuts water use 40–60% and lets you deliver soluble fertilizer directly to the root zone.",
    pairs: ["f-coromandel-gromor", "s-mahyco-tomato"],
  },
  {
    id: "t-moisture", name: "Digital Grain Moisture Meter", hindi: "नमी मापक यंत्र", category: "Tools",
    brand: "Grain Pro Digital", company: "Verified instrument suppliers", unit: "1 unit", price: 2650, mrp: 3200, certified: false,
    crop: "Wheat, paddy, maize, pulses", soil: "—", season: "At harvest and before mandi sale", duration: "±0.5% accuracy",
    description: "Know your moisture before the trader tells you. Every 1% excess moisture typically costs ₹20–40 per quintal in deductions at the mandi.",
    pairs: ["t-neptune-sprayer"],
  },
];

export const supplyById = (id: string) => supplies.find((s) => s.id === id);
