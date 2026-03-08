import { supabase } from "@/integrations/supabase/client";

export interface MarketRecord {
  commodity: string;
  state: string;
  district: string;
  market: string;
  variety: string;
  grade: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  arrival_date: string;
}

export interface MarketResponse {
  total: number;
  count: number;
  records: MarketRecord[];
}

interface FetchParams {
  commodity?: string;
  state?: string;
  market?: string;
  district?: string;
  limit?: number;
  offset?: number;
}

async function callEdgeFunction(params: FetchParams): Promise<MarketResponse> {
  const query = new URLSearchParams();
  if (params.commodity) query.set("commodity", params.commodity);
  if (params.state) query.set("state", params.state);
  if (params.market) query.set("market", params.market);
  if (params.district) query.set("district", params.district);
  query.set("limit", String(params.limit || 50));
  query.set("offset", String(params.offset || 0));

  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agri-market-data?${query.toString()}`;
  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
  });

  if (!resp.ok) {
    const errData = await resp.json().catch(() => ({}));
    throw new Error(errData.error || `API error: ${resp.status}`);
  }

  return resp.json();
}

export async function fetchCropPrices(cropName: string): Promise<MarketResponse> {
  return callEdgeFunction({ commodity: cropName, limit: 50 });
}

export async function fetchMarketPrices(marketName: string): Promise<MarketResponse> {
  return callEdgeFunction({ market: marketName, limit: 50 });
}

export async function fetchStatePrices(state: string): Promise<MarketResponse> {
  return callEdgeFunction({ state, limit: 50 });
}

export async function fetchFilteredPrices(params: FetchParams): Promise<MarketResponse> {
  return callEdgeFunction(params);
}

export function getBestMarketFromRecords(records: MarketRecord[]): MarketRecord | null {
  if (records.length === 0) return null;
  return records.reduce((best, r) => (r.max_price > best.max_price ? r : best));
}
