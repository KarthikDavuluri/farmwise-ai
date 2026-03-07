export interface CropPrice {
  crop_name: string;
  market: string;
  state: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  date: string;
}

export interface PriceHistory {
  date: string;
  price: number;
}

export const cropPrices: CropPrice[] = [
  { crop_name: "Rice", market: "Vijayawada", state: "Andhra Pradesh", min_price: 1800, max_price: 2200, avg_price: 2000, date: "2026-03-07" },
  { crop_name: "Rice", market: "Guntur", state: "Andhra Pradesh", min_price: 1750, max_price: 2100, avg_price: 1920, date: "2026-03-07" },
  { crop_name: "Rice", market: "Warangal", state: "Telangana", min_price: 1900, max_price: 2300, avg_price: 2100, date: "2026-03-07" },
  { crop_name: "Tomato", market: "Vijayawada", state: "Andhra Pradesh", min_price: 800, max_price: 1500, avg_price: 1150, date: "2026-03-07" },
  { crop_name: "Tomato", market: "Madanapalle", state: "Andhra Pradesh", min_price: 900, max_price: 1600, avg_price: 1250, date: "2026-03-07" },
  { crop_name: "Tomato", market: "Kurnool", state: "Andhra Pradesh", min_price: 750, max_price: 1400, avg_price: 1075, date: "2026-03-07" },
  { crop_name: "Onion", market: "Nashik", state: "Maharashtra", min_price: 1200, max_price: 1800, avg_price: 1500, date: "2026-03-07" },
  { crop_name: "Onion", market: "Lasalgaon", state: "Maharashtra", min_price: 1300, max_price: 1900, avg_price: 1600, date: "2026-03-07" },
  { crop_name: "Onion", market: "Pune", state: "Maharashtra", min_price: 1100, max_price: 1700, avg_price: 1400, date: "2026-03-07" },
  { crop_name: "Wheat", market: "Indore", state: "Madhya Pradesh", min_price: 2100, max_price: 2500, avg_price: 2300, date: "2026-03-07" },
  { crop_name: "Wheat", market: "Bhopal", state: "Madhya Pradesh", min_price: 2000, max_price: 2400, avg_price: 2200, date: "2026-03-07" },
  { crop_name: "Cotton", market: "Rajkot", state: "Gujarat", min_price: 5500, max_price: 6200, avg_price: 5850, date: "2026-03-07" },
  { crop_name: "Cotton", market: "Guntur", state: "Andhra Pradesh", min_price: 5400, max_price: 6100, avg_price: 5750, date: "2026-03-07" },
  { crop_name: "Maize", market: "Davangere", state: "Karnataka", min_price: 1400, max_price: 1800, avg_price: 1600, date: "2026-03-07" },
  { crop_name: "Maize", market: "Nizamabad", state: "Telangana", min_price: 1500, max_price: 1900, avg_price: 1700, date: "2026-03-07" },
  { crop_name: "Potato", market: "Agra", state: "Uttar Pradesh", min_price: 600, max_price: 1000, avg_price: 800, date: "2026-03-07" },
  { crop_name: "Potato", market: "Farrukhabad", state: "Uttar Pradesh", min_price: 550, max_price: 950, avg_price: 750, date: "2026-03-07" },
];

export const cropNames = [...new Set(cropPrices.map(c => c.crop_name))];

export function generatePriceHistory(crop: string, days: number = 30): PriceHistory[] {
  const base = cropPrices.find(c => c.crop_name === crop)?.avg_price || 1500;
  const history: PriceHistory[] = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * base * 0.15;
    history.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(base + variation),
    });
  }
  return history;
}

export function getBestMarket(crop: string) {
  const markets = cropPrices.filter(c => c.crop_name === crop);
  if (markets.length === 0) return null;
  return markets.reduce((best, m) => m.max_price > best.max_price ? m : best);
}

export function getPricePrediction(crop: string) {
  const base = cropPrices.find(c => c.crop_name === crop)?.avg_price || 1500;
  return {
    current: base,
    week: Math.round(base * (1 + (Math.random() * 0.1 - 0.02))),
    month: Math.round(base * (1 + (Math.random() * 0.2 - 0.05))),
  };
}
