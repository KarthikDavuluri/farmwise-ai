import { useMemo, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { useCropPrices } from "@/hooks/useMarketData";

export function PriceTrendChart({ crop }: { crop: string }) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const { data, isLoading, isError } = useCropPrices(crop);

  const chartData = useMemo(() => {
    if (!data?.records) return [];
    // Group by arrival_date and average the modal prices
    const dateMap = new Map<string, { total: number; count: number }>();
    data.records.forEach((r) => {
      const d = r.arrival_date;
      const existing = dateMap.get(d) || { total: 0, count: 0 };
      existing.total += r.modal_price;
      existing.count += 1;
      dateMap.set(d, existing);
    });
    return Array.from(dateMap.entries())
      .map(([date, { total, count }]) => ({
        date,
        price: Math.round(total / count),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  if (!crop) return <p className="text-muted-foreground text-center py-8">Select a crop to view price trends</p>;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading trends...
      </div>
    );
  }

  if (isError || chartData.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No trend data available for {crop}.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">{crop} Price Trend (Live)</h3>
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
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`₹${v}`, "Avg Modal Price"]} />
            <Line type="monotone" dataKey="price" stroke="hsl(145 45% 28%)" strokeWidth={2} dot={false} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`₹${v}`, "Avg Modal Price"]} />
            <Bar dataKey="price" fill="hsl(42 85% 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground text-center">Live data from AGMARKNET / data.gov.in</p>
    </div>
  );
}
