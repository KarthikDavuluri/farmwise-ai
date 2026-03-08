import { useMemo } from "react";
import { cropPrices, type CropPrice } from "@/data/cropData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function MarketComparison({ crop }: { crop: string }) {
  const markets = useMemo(() => {
    if (!crop) return [];
    return cropPrices
      .filter((c) => c.crop_name === crop)
      .sort((a, b) => b.avg_price - a.avg_price);
  }, [crop]);

  if (!crop) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to compare market prices
        </CardContent>
      </Card>
    );
  }

  const chartData = markets.map((m) => ({
    market: m.market,
    min: m.min_price,
    avg: m.avg_price,
    max: m.max_price,
  }));

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ArrowUpDown className="h-5 w-5 text-accent" />
          Market Comparison – {crop}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="market" width={100} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => `₹${v}`} />
            <Legend />
            <Bar dataKey="min" fill="hsl(25 85% 55%)" name="Min Price" radius={[0, 2, 2, 0]} />
            <Bar dataKey="avg" fill="hsl(145 45% 35%)" name="Avg Price" radius={[0, 2, 2, 0]} />
            <Bar dataKey="max" fill="hsl(42 85% 55%)" name="Max Price" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="space-y-2">
          {markets.map((m, i) => (
            <div
              key={m.market}
              className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? "bg-secondary border-2 border-accent" : "bg-secondary/50"}`}
            >
              <div>
                <span className="font-semibold">{i === 0 && "🏆 "}{m.market}</span>
                <span className="text-sm text-muted-foreground ml-2">({m.state})</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary">₹{m.avg_price}</span>
                <span className="text-xs text-muted-foreground ml-1">avg/qtl</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
