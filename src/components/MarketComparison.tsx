import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAllPrices } from "@/hooks/useMarketData";

export function MarketComparison({ crop }: { crop: string }) {
  const { data } = useAllPrices();

  const records = useMemo(() => {
    if (!data?.records || !crop) return [];
    return data.records
      .filter((r) => r.commodity.toLowerCase().includes(crop.toLowerCase()))
      .sort((a, b) => b.modal_price - a.modal_price);
  }, [data, crop]);

  if (!crop) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to compare prices
        </CardContent>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          No market data available for {crop}.
        </CardContent>
      </Card>
    );
  }

  const chartData = records.map((r) => ({
    commodity: r.commodity.length > 20 ? r.commodity.slice(0, 18) + "…" : r.commodity,
    min: r.min_price,
    modal: r.modal_price,
    max: r.max_price,
  }));

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ArrowUpDown className="h-5 w-5 text-accent" />
          Price Comparison – {crop}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={Math.min(300, chartData.length * 60 + 50)}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="commodity" width={150} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `₹${Number(v).toFixed(2)}`} />
              <Legend />
              <Bar dataKey="min" fill="hsl(25 85% 55%)" name="Min Price" radius={[0, 2, 2, 0]} />
              <Bar dataKey="modal" fill="hsl(145 45% 35%)" name="Modal Price" radius={[0, 2, 2, 0]} />
              <Bar dataKey="max" fill="hsl(42 85% 55%)" name="Max Price" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        <div className="space-y-2 max-h-[300px] overflow-auto">
          {records.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? "bg-secondary border-2 border-accent" : "bg-secondary/50"}`}
            >
              <div>
                <span className="font-semibold">{i === 0 && "🏆 "}{r.commodity}</span>
                <span className="text-sm text-muted-foreground ml-2">({r.commodity_group})</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary">₹{r.modal_price.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground ml-1">modal/qtl</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
