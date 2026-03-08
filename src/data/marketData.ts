export interface CommodityData {
  commodity_group: string;
  commodity: string;
  msp: number | null;
  prices: {
    date: string;
    price: number;
  }[];
  arrivals: {
    date: string;
    tonnes: number;
  }[];
}

export interface MarketRecord {
  commodity: string;
  commodity_group: string;
  state: string;
  district: string;
  market: string;
  variety: string;
  grade: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  arrival_date: string;
  msp: number | null;
  arrival_tonnes: number;
}

// Parsed from Marketwise Price & Arrival Report (06-03-2026)
const RAW_DATA: CommodityData[] = [
  {
    commodity_group: "Cereals",
    commodity: "Bajra(Pearl Millet/Cumbu)",
    msp: 2775,
    prices: [
      { date: "06-03-2026", price: 2016.34 },
      { date: "05-03-2026", price: 2230.44 },
      { date: "04-03-2026", price: 2317.50 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 1201.44 },
      { date: "05-03-2026", tonnes: 946.21 },
      { date: "04-03-2026", tonnes: 851.70 },
    ],
  },
  {
    commodity_group: "Cereals",
    commodity: "Barley(Jau)",
    msp: 1980,
    prices: [
      { date: "06-03-2026", price: 1862.90 },
      { date: "05-03-2026", price: 1967.17 },
      { date: "04-03-2026", price: 2015.14 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 493.76 },
      { date: "05-03-2026", tonnes: 178.14 },
      { date: "04-03-2026", tonnes: 3.58 },
    ],
  },
  {
    commodity_group: "Cereals",
    commodity: "Jowar(Sorghum)",
    msp: 3699,
    prices: [
      { date: "06-03-2026", price: 4955.64 },
      { date: "05-03-2026", price: 4717.26 },
      { date: "04-03-2026", price: 5960.06 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 220.52 },
      { date: "05-03-2026", tonnes: 332.85 },
      { date: "04-03-2026", tonnes: 70.10 },
    ],
  },
  {
    commodity_group: "Cereals",
    commodity: "Maize",
    msp: 2400,
    prices: [
      { date: "06-03-2026", price: 1603.02 },
      { date: "05-03-2026", price: 1606.94 },
      { date: "04-03-2026", price: 2035.15 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 11069.05 },
      { date: "05-03-2026", tonnes: 6947.38 },
      { date: "04-03-2026", tonnes: 424.26 },
    ],
  },
  {
    commodity_group: "Cereals",
    commodity: "Paddy(Common)",
    msp: 2369,
    prices: [
      { date: "06-03-2026", price: 3190.57 },
      { date: "05-03-2026", price: 3262.35 },
      { date: "04-03-2026", price: 2141.13 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 16677.43 },
      { date: "05-03-2026", tonnes: 12736.46 },
      { date: "04-03-2026", tonnes: 1506.65 },
    ],
  },
  {
    commodity_group: "Cereals",
    commodity: "Ragi(Finger Millet)",
    msp: 4886,
    prices: [
      { date: "06-03-2026", price: 5240.86 },
      { date: "05-03-2026", price: 5176.00 },
      { date: "04-03-2026", price: 5400.00 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 0.35 },
      { date: "05-03-2026", tonnes: 0.32 },
      { date: "04-03-2026", tonnes: 0.20 },
    ],
  },
  {
    commodity_group: "Cereals",
    commodity: "Wheat",
    msp: 2425,
    prices: [
      { date: "06-03-2026", price: 2322.44 },
      { date: "05-03-2026", price: 2344.39 },
      { date: "04-03-2026", price: 2825.14 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 36831.45 },
      { date: "05-03-2026", tonnes: 24439.18 },
      { date: "04-03-2026", tonnes: 4631.09 },
    ],
  },
  {
    commodity_group: "Fibre Crops",
    commodity: "Cotton",
    msp: 7710,
    prices: [
      { date: "06-03-2026", price: 7476.12 },
      { date: "05-03-2026", price: 7617.62 },
      { date: "04-03-2026", price: 7699.52 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 4170.43 },
      { date: "05-03-2026", tonnes: 3512.47 },
      { date: "04-03-2026", tonnes: 1260.70 },
    ],
  },
  {
    commodity_group: "Oil Seeds",
    commodity: "Copra",
    msp: 12100,
    prices: [
      { date: "06-03-2026", price: 20401.23 },
      { date: "05-03-2026", price: 18528.21 },
      { date: "04-03-2026", price: 17642.82 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 16.20 },
      { date: "05-03-2026", tonnes: 19.50 },
      { date: "04-03-2026", tonnes: 26.31 },
    ],
  },
  {
    commodity_group: "Oil Seeds",
    commodity: "Groundnut",
    msp: 7263,
    prices: [
      { date: "06-03-2026", price: 8453.68 },
      { date: "05-03-2026", price: 8444.10 },
      { date: "04-03-2026", price: 8904.79 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 4836.90 },
      { date: "05-03-2026", tonnes: 4424.37 },
      { date: "04-03-2026", tonnes: 3709.01 },
    ],
  },
  {
    commodity_group: "Oil Seeds",
    commodity: "Mustard",
    msp: 5950,
    prices: [
      { date: "06-03-2026", price: 5913.98 },
      { date: "05-03-2026", price: 5902.65 },
      { date: "04-03-2026", price: 5991.98 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 22177.74 },
      { date: "05-03-2026", tonnes: 16632.68 },
      { date: "04-03-2026", tonnes: 859.93 },
    ],
  },
  {
    commodity_group: "Oil Seeds",
    commodity: "Sesamum(Sesame,Gingelly,Til)",
    msp: 9846,
    prices: [
      { date: "06-03-2026", price: 9471.99 },
      { date: "05-03-2026", price: 9307.07 },
      { date: "04-03-2026", price: 10722.91 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 43.94 },
      { date: "05-03-2026", tonnes: 41.04 },
      { date: "04-03-2026", tonnes: 5.78 },
    ],
  },
  {
    commodity_group: "Oil Seeds",
    commodity: "Soyabean",
    msp: 5328,
    prices: [
      { date: "06-03-2026", price: 5227.36 },
      { date: "05-03-2026", price: 5254.53 },
      { date: "04-03-2026", price: 4861.00 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 6896.57 },
      { date: "05-03-2026", tonnes: 3669.34 },
      { date: "04-03-2026", tonnes: 171.87 },
    ],
  },
  {
    commodity_group: "Pulses",
    commodity: "Arhar(Tur/Red Gram)(Whole)",
    msp: 8000,
    prices: [
      { date: "06-03-2026", price: 7639.48 },
      { date: "05-03-2026", price: 7519.24 },
      { date: "04-03-2026", price: 7858.79 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 3274.08 },
      { date: "05-03-2026", tonnes: 1646.56 },
      { date: "04-03-2026", tonnes: 1330.16 },
    ],
  },
  {
    commodity_group: "Pulses",
    commodity: "Bengal Gram(Gram)(Whole)",
    msp: 5650,
    prices: [
      { date: "06-03-2026", price: 5382.98 },
      { date: "05-03-2026", price: 5322.89 },
      { date: "04-03-2026", price: 6018.54 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 4383.33 },
      { date: "05-03-2026", tonnes: 3486.11 },
      { date: "04-03-2026", tonnes: 663.67 },
    ],
  },
  {
    commodity_group: "Pulses",
    commodity: "Black Gram(Urd Beans)(Whole)",
    msp: 7800,
    prices: [
      { date: "06-03-2026", price: 8072.69 },
      { date: "05-03-2026", price: 8022.09 },
      { date: "04-03-2026", price: 10401.98 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 231.55 },
      { date: "05-03-2026", tonnes: 103.36 },
      { date: "04-03-2026", tonnes: 12.60 },
    ],
  },
  {
    commodity_group: "Pulses",
    commodity: "Green Gram(Moong)(Whole)",
    msp: 8768,
    prices: [
      { date: "06-03-2026", price: 7126.25 },
      { date: "05-03-2026", price: 7786.89 },
      { date: "04-03-2026", price: 10006.54 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 208.26 },
      { date: "05-03-2026", tonnes: 345.25 },
      { date: "04-03-2026", tonnes: 81.30 },
    ],
  },
  {
    commodity_group: "Pulses",
    commodity: "Lentil(Masur)(Whole)",
    msp: 6700,
    prices: [
      { date: "06-03-2026", price: 6529.86 },
      { date: "05-03-2026", price: 6817.26 },
      { date: "04-03-2026", price: 9091.62 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 2009.23 },
      { date: "05-03-2026", tonnes: 1149.29 },
      { date: "04-03-2026", tonnes: 220.17 },
    ],
  },
  {
    commodity_group: "Vegetables",
    commodity: "Onion",
    msp: null,
    prices: [
      { date: "06-03-2026", price: 1349.74 },
      { date: "05-03-2026", price: 1376.17 },
      { date: "04-03-2026", price: 1649.38 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 9621.31 },
      { date: "05-03-2026", tonnes: 7385.84 },
      { date: "04-03-2026", tonnes: 1969.91 },
    ],
  },
  {
    commodity_group: "Vegetables",
    commodity: "Potato",
    msp: null,
    prices: [
      { date: "06-03-2026", price: 758.84 },
      { date: "05-03-2026", price: 814.98 },
      { date: "04-03-2026", price: 728.56 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 9368.14 },
      { date: "05-03-2026", tonnes: 7226.07 },
      { date: "04-03-2026", tonnes: 4084.51 },
    ],
  },
  {
    commodity_group: "Vegetables",
    commodity: "Tomato",
    msp: null,
    prices: [
      { date: "06-03-2026", price: 1505.32 },
      { date: "05-03-2026", price: 1373.16 },
      { date: "04-03-2026", price: 1358.51 },
    ],
    arrivals: [
      { date: "06-03-2026", tonnes: 4101.17 },
      { date: "05-03-2026", tonnes: 3827.19 },
      { date: "04-03-2026", tonnes: 1189.42 },
    ],
  },
];

// Convert raw data to MarketRecord format for component compatibility
export function getAllRecords(): MarketRecord[] {
  const records: MarketRecord[] = [];
  for (const item of RAW_DATA) {
    // Use latest date's price as the primary record
    const latestPrice = item.prices[0];
    const latestArrival = item.arrivals[0];
    const prices = item.prices.map((p) => p.price);

    records.push({
      commodity: item.commodity,
      commodity_group: item.commodity_group,
      state: "All India",
      district: "",
      market: "National Average",
      variety: "",
      grade: "",
      min_price: Math.min(...prices),
      max_price: Math.max(...prices),
      modal_price: latestPrice.price,
      arrival_date: latestPrice.date,
      msp: item.msp,
      arrival_tonnes: latestArrival.tonnes,
    });
  }
  return records;
}

export function getCommodityNames(): string[] {
  return RAW_DATA.map((d) => d.commodity);
}

export function getCommodityGroups(): string[] {
  return [...new Set(RAW_DATA.map((d) => d.commodity_group))];
}

export function getCommodityData(commodity: string): CommodityData | undefined {
  return RAW_DATA.find(
    (d) => d.commodity.toLowerCase() === commodity.toLowerCase()
  );
}

export function searchCommodities(query: string): CommodityData[] {
  const q = query.toLowerCase();
  return RAW_DATA.filter(
    (d) =>
      d.commodity.toLowerCase().includes(q) ||
      d.commodity_group.toLowerCase().includes(q)
  );
}

export function getPriceHistory(commodity: string): { date: string; price: number }[] {
  const data = getCommodityData(commodity);
  if (!data) return [];
  return [...data.prices].reverse(); // chronological order
}

export function getArrivalHistory(commodity: string): { date: string; tonnes: number }[] {
  const data = getCommodityData(commodity);
  if (!data) return [];
  return [...data.arrivals].reverse();
}

export function getBestCommodity(): MarketRecord {
  const records = getAllRecords();
  return records.reduce((best, r) => (r.modal_price > best.modal_price ? r : best));
}

export { RAW_DATA };
