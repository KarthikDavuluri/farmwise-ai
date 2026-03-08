import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DATA_GOV_BASE = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("DATA_GOV_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "DATA_GOV_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const commodity = url.searchParams.get("commodity") || "";
    const state = url.searchParams.get("state") || "";
    const market = url.searchParams.get("market") || "";
    const district = url.searchParams.get("district") || "";
    const limit = url.searchParams.get("limit") || "50";
    const offset = url.searchParams.get("offset") || "0";

    const params = new URLSearchParams({
      "api-key": apiKey,
      format: "json",
      limit,
      offset,
    });

    if (commodity) params.append("filters[commodity]", commodity);
    if (state) params.append("filters[state]", state);
    if (market) params.append("filters[market]", market);
    if (district) params.append("filters[district]", district);

    const apiUrl = `${DATA_GOV_BASE}?${params.toString()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`data.gov.in API error [${response.status}]: ${text}`);
    }

    const data = await response.json();

    // Normalize the response
    const records = (data.records || []).map((r: any) => ({
      commodity: r.commodity || r.Commodity || "",
      state: r.state || r.State || "",
      district: r.district || r.District || "",
      market: r.market || r.Market || "",
      variety: r.variety || r.Variety || "",
      grade: r.grade || r.Grade || "",
      min_price: Number(r.min_price || r.Min_x0020_Price || 0),
      max_price: Number(r.max_price || r.Max_x0020_Price || 0),
      modal_price: Number(r.modal_price || r.Modal_x0020_Price || 0),
      arrival_date: r.arrival_date || r.Arrival_Date || "",
    }));

    return new Response(
      JSON.stringify({
        total: data.total || records.length,
        count: data.count || records.length,
        records,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("agri-market-data error:", msg);
    return new Response(JSON.stringify({ error: msg, records: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
