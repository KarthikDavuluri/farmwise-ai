import { useMemo, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Loader2 } from "lucide-react";
import { getPriceHistory, getCommodityData } from "@/data/marketData";

export function PriceTrendChart({ crop }: { crop: string }) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const chartData = useMemo(() => getPriceHistory(crop), [crop]);
  const commodityData = useMemo(() => getCommodityData(crop), [crop]);
  const msp = commodityData?.msp;

  if (!crop) return <p className="text-muted-foreground text-center py-8">Select a crop to view price trends</p>;

  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No trend data available for {crop}.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">{crop} — 3-Day Price Trend</h3>
        <button
          onClick={() => setChartType(chartType === "line" ? "bar" : "line")}
          className="px-3 py-1 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          {chartType === "line" ? "Bar" : "Line"}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`₹${Number(v).toFixed(2)}`, "Price"]} />
            {msp && <ReferenceLine y={msp} stroke="hsl(0 72% 51%)" strokeDasharray="5 5" label={{ value: `MSP ₹${msp}`, position: "right", fontSize: 11 }} />}
            <Line type="monotone" dataKey="price" stroke="hsl(145 45% 28%)" strokeWidth={2} dot={{ r: 5 }} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`₹${Number(v).toFixed(2)}`, "Price"]} />
            {msp && <ReferenceLine y={msp} stroke="hsl(0 72% 51%)" strokeDasharray="5 5" label={{ value: `MSP ₹${msp}`, position: "right", fontSize: 11 }} />}
            <Bar dataKey="price" fill="hsl(42 85% 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground text-center">
        Source: AGMARKNET Marketwise Report (06-03-2026) {msp && `• Red dashed line = MSP ₹${msp}`}
      </p>
    </div>
  );
}
