import { useMemo, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { generatePriceHistory } from "@/data/cropData";

export function PriceTrendChart({ crop }: { crop: string }) {
  const [period, setPeriod] = useState<7 | 14 | 30>(30);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const data = useMemo(() => generatePriceHistory(crop, period), [crop, period]);

  if (!crop) return <p className="text-muted-foreground text-center py-8">Select a crop to view price trends</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">{crop} Price Trend</h3>
        <div className="flex gap-2">
          {([7, 14, 30] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${period === p ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              {p}D
            </button>
          ))}
          <button
            onClick={() => setChartType(chartType === "line" ? "bar" : "line")}
            className="px-3 py-1 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            {chartType === "line" ? "Bar" : "Line"}
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`₹${v}`, "Price"]} />
            <Line type="monotone" dataKey="price" stroke="hsl(145 45% 28%)" strokeWidth={2} dot={false} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`₹${v}`, "Price"]} />
            <Bar dataKey="price" fill="hsl(42 85% 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
