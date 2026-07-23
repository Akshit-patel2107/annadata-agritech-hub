export type Listing = {
  id: string;
  commodity: string;
  hindi: string;
  variety: string;
  grade: "A" | "B" | "C";
  quantityQuintals: number;
  pricePerQuintal: number;
  location: string;
  state: string;
  seller: string;
  sellerRating: number;
  harvestDate: string;
  organic: boolean;
  image: string;
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=70`;

export const listings: Listing[] = [
  { id: "l1", commodity: "Wheat", hindi: "गेहूं", variety: "Sharbati", grade: "A", quantityQuintals: 250, pricePerQuintal: 2680, location: "Sehore", state: "MP", seller: "Ramesh Patel", sellerRating: 4.8, harvestDate: "2026-04-12", organic: false, image: img("photo-1574323347407-f5e1ad6d020b") },
  { id: "l2", commodity: "Rice", hindi: "चावल", variety: "Basmati 1121", grade: "A", quantityQuintals: 500, pricePerQuintal: 4150, location: "Karnal", state: "HR", seller: "Harjeet Singh", sellerRating: 4.9, harvestDate: "2026-05-02", organic: true, image: img("photo-1586201375761-83865001e31c") },
  { id: "l3", commodity: "Cotton", hindi: "कपास", variety: "Shankar-6", grade: "B", quantityQuintals: 180, pricePerQuintal: 7200, location: "Rajkot", state: "GJ", seller: "Nileshbhai Desai", sellerRating: 4.6, harvestDate: "2026-03-20", organic: false, image: img("photo-1594492789922-1116d13a7c48") },
  { id: "l4", commodity: "Pulses", hindi: "दाल", variety: "Tur Dal", grade: "A", quantityQuintals: 90, pricePerQuintal: 9800, location: "Latur", state: "MH", seller: "Sunita Kale", sellerRating: 4.7, harvestDate: "2026-06-01", organic: true, image: img("photo-1596797038530-2c107229654b") },
  { id: "l5", commodity: "Oilseeds", hindi: "तिलहन", variety: "Mustard", grade: "A", quantityQuintals: 320, pricePerQuintal: 5400, location: "Bharatpur", state: "RJ", seller: "Kishore Meena", sellerRating: 4.5, harvestDate: "2026-04-28", organic: false, image: img("photo-1615485500704-8e990f9900f7") },
  { id: "l6", commodity: "Vegetables", hindi: "सब्जियां", variety: "Onion", grade: "A", quantityQuintals: 400, pricePerQuintal: 2100, location: "Nashik", state: "MH", seller: "Ganesh Shinde", sellerRating: 4.8, harvestDate: "2026-06-15", organic: false, image: img("photo-1587049352846-4a222e784d38") },
  { id: "l7", commodity: "Fruits", hindi: "फल", variety: "Alphonso Mango", grade: "A", quantityQuintals: 60, pricePerQuintal: 18500, location: "Ratnagiri", state: "MH", seller: "Deepak Sawant", sellerRating: 4.9, harvestDate: "2026-05-20", organic: true, image: img("photo-1553279768-865429fa0078") },
  { id: "l8", commodity: "Wheat", hindi: "गेहूं", variety: "Lokwan", grade: "B", quantityQuintals: 400, pricePerQuintal: 2450, location: "Ujjain", state: "MP", seller: "Prakash Yadav", sellerRating: 4.4, harvestDate: "2026-04-25", organic: false, image: img("photo-1535912574650-40b1e260d5df") },
  { id: "l9", commodity: "Tobacco", hindi: "तंबाकू", variety: "FCV", grade: "A", quantityQuintals: 120, pricePerQuintal: 12500, location: "Guntur", state: "AP", seller: "Sridhar Reddy", sellerRating: 4.6, harvestDate: "2026-03-05", organic: false, image: img("photo-1591086175462-32b76e435d76") },
  { id: "l10", commodity: "Chicory", hindi: "चिकोरी", variety: "Common", grade: "B", quantityQuintals: 45, pricePerQuintal: 8900, location: "Ahmedabad", state: "GJ", seller: "Mehulbhai Shah", sellerRating: 4.3, harvestDate: "2026-02-18", organic: true, image: img("photo-1615485290382-441e4d049cb5") },
  { id: "l11", commodity: "Pulses", hindi: "दाल", variety: "Chana", grade: "A", quantityQuintals: 220, pricePerQuintal: 5700, location: "Bikaner", state: "RJ", seller: "Mahendra Choudhary", sellerRating: 4.7, harvestDate: "2026-04-10", organic: false, image: img("photo-1515543904379-3d757afe72e4") },
  { id: "l12", commodity: "Rice", hindi: "चावल", variety: "Sona Masuri", grade: "B", quantityQuintals: 350, pricePerQuintal: 3100, location: "Warangal", state: "TG", seller: "Lakshmi Rao", sellerRating: 4.8, harvestDate: "2026-05-18", organic: false, image: img("photo-1568347355280-d33fdf77d42a") },
];

export const commodities = [
  "Wheat","Rice","Cotton","Pulses","Oilseeds","Tobacco","Chicory","Vegetables","Fruits",
];

export type PricePoint = { day: string; price: number; mandi: string };

export function getPriceHistory(commodity: string): PricePoint[] {
  const base: Record<string, number> = {
    Wheat: 2550, Rice: 3800, Cotton: 7100, Pulses: 7200, Oilseeds: 5300,
    Tobacco: 12200, Chicory: 8600, Vegetables: 2000, Fruits: 15200,
  };
  const b = base[commodity] ?? 3000;
  const days = 14;
  return Array.from({ length: days }).map((_, i) => {
    const seed = Math.sin((i + commodity.length) * 1.7) * 0.06;
    return {
      day: `D${i + 1}`,
      price: Math.round(b * (1 + seed + i * 0.004)),
      mandi: "Avg",
    };
  });
}

export const mandiSnapshot = [
  { mandi: "Azadpur, Delhi", commodity: "Onion", price: 2150, trend: "up" as const },
  { mandi: "Vashi, Mumbai", commodity: "Tomato", price: 1780, trend: "down" as const },
  { mandi: "Karnal, Haryana", commodity: "Basmati", price: 4150, trend: "up" as const },
  { mandi: "Indore, MP", commodity: "Soybean", price: 4620, trend: "up" as const },
  { mandi: "Guntur, AP", commodity: "Chilli", price: 21500, trend: "down" as const },
  { mandi: "Unjha, Gujarat", commodity: "Cumin", price: 42800, trend: "up" as const },
];

export const weather7Day = [
  { day: "Today", temp: 32, low: 24, cond: "Sunny", rain: 0, icon: "sun" },
  { day: "Tue", temp: 33, low: 25, cond: "Partly Cloudy", rain: 10, icon: "cloud" },
  { day: "Wed", temp: 30, low: 23, cond: "Thunderstorm", rain: 80, icon: "storm" },
  { day: "Thu", temp: 28, low: 22, cond: "Rain", rain: 90, icon: "rain" },
  { day: "Fri", temp: 29, low: 22, cond: "Showers", rain: 60, icon: "rain" },
  { day: "Sat", temp: 31, low: 23, cond: "Partly Cloudy", rain: 20, icon: "cloud" },
  { day: "Sun", temp: 33, low: 24, cond: "Sunny", rain: 0, icon: "sun" },
];

export const warehouses = [
  { id: "w1", name: "AgriStore Sehore", location: "Sehore, MP", capacityQtl: 12000, availableQtl: 3400, pricePerQtlMonth: 45, temperature: "Ambient", certified: true },
  { id: "w2", name: "ColdChain Nashik", location: "Nashik, MH", capacityQtl: 8000, availableQtl: 1200, pricePerQtlMonth: 120, temperature: "2–8°C", certified: true },
  { id: "w3", name: "GrainVault Karnal", location: "Karnal, HR", capacityQtl: 20000, availableQtl: 8600, pricePerQtlMonth: 55, temperature: "Ambient", certified: true },
  { id: "w4", name: "Rajkot AgriHub", location: "Rajkot, GJ", capacityQtl: 15000, availableQtl: 5400, pricePerQtlMonth: 50, temperature: "Ambient", certified: false },
  { id: "w5", name: "Guntur Cold Store", location: "Guntur, AP", capacityQtl: 6000, availableQtl: 900, pricePerQtlMonth: 135, temperature: "0–4°C", certified: true },
];

export const transporters = [
  { id: "t1", name: "Bharat Logistics", truck: "Tata 407 · 4T", rate: 22, rating: 4.7, eta: "Same day" },
  { id: "t2", name: "KisanExpress", truck: "Eicher · 9T", rate: 18, rating: 4.5, eta: "12 hrs" },
  { id: "t3", name: "GreenFleet", truck: "Refrigerated · 6T", rate: 34, rating: 4.9, eta: "Next day" },
  { id: "t4", name: "MandiMove", truck: "Ashok Leyland · 16T", rate: 15, rating: 4.6, eta: "24 hrs" },
];
