import {
  getAllRecords,
  searchCommodities,
  getCommodityData,
  getPriceHistory,
  type MarketRecord,
  type CommodityData,
} from "@/data/marketData";

export type { MarketRecord, CommodityData };

export interface MarketResponse {
  total: number;
  count: number;
  records: MarketRecord[];
}

export async function fetchCropPrices(cropName: string): Promise<MarketResponse> {
  const results = searchCommodities(cropName);
  const records = results.length > 0
    ? results.map((item) => {
        const prices = item.prices.map((p) => p.price);
        return {
          commodity: item.commodity,
          commodity_group: item.commodity_group,
          state: "All India",
          district: "",
          market: "National Average",
          variety: "",
          grade: "",
          min_price: Math.min(...prices),
          max_price: Math.max(...prices),
          modal_price: item.prices[0].price,
          arrival_date: item.prices[0].date,
          msp: item.msp,
          arrival_tonnes: item.arrivals[0].tonnes,
        } as MarketRecord;
      })
    : [];
  return { total: records.length, count: records.length, records };
}

export async function fetchFilteredPrices(params: {
  commodity?: string;
  commodity_group?: string;
  limit?: number;
}): Promise<MarketResponse> {
  let records = getAllRecords();
  if (params.commodity) {
    const q = params.commodity.toLowerCase();
    records = records.filter(
      (r) =>
        r.commodity.toLowerCase().includes(q) ||
        r.commodity_group.toLowerCase().includes(q)
    );
  }
  if (params.commodity_group) {
    records = records.filter(
      (r) => r.commodity_group.toLowerCase() === params.commodity_group!.toLowerCase()
    );
  }
  const limited = records.slice(0, params.limit || 50);
  return { total: records.length, count: limited.length, records: limited };
}

export function getBestMarketFromRecords(records: MarketRecord[]): MarketRecord | null {
  if (records.length === 0) return null;
  return records.reduce((best, r) => (r.max_price > best.max_price ? r : best));
}
