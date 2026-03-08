import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useCropPrices } from "@/hooks/useMarketData";

export function MarketComparison({ crop }: { crop: string }) {
  const { data, isLoading, isError } = useCropPrices(crop);

  const markets = useMemo(() => {
    if (!data?.records) return [];
    return data.records.sort((a, b) => b.modal_price - a.modal_price);
  }, [data]);

  if (!crop) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to compare market prices
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading market comparison...
        </CardContent>
      </Card>
    );
  }

  if (isError || markets.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          No market data available for {crop}.
        </CardContent>
      </Card>
    );
  }

  const chartData = markets.slice(0, 10).map((m) => ({
    market: m.market,
    min: m.min_price,
    modal: m.modal_price,
    max: m.max_price,
  }));

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ArrowUpDown className="h-5 w-5 text-accent" />
          Market Comparison – {crop}
          <span className="text-xs font-normal text-muted-foreground ml-auto">
            {markets.length} markets (live data)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={Math.min(250, chartData.length * 40 + 50)}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="market" width={120} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => `₹${v}`} />
            <Legend />
            <Bar dataKey="min" fill="hsl(25 85% 55%)" name="Min Price" radius={[0, 2, 2, 0]} />
            <Bar dataKey="modal" fill="hsl(145 45% 35%)" name="Modal Price" radius={[0, 2, 2, 0]} />
            <Bar dataKey="max" fill="hsl(42 85% 55%)" name="Max Price" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="space-y-2 max-h-[300px] overflow-auto">
          {markets.map((m, i) => (
            <div
              key={`${m.market}-${i}`}
              className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? "bg-secondary border-2 border-accent" : "bg-secondary/50"}`}
            >
              <div>
                <span className="font-semibold">{i === 0 && "🏆 "}{m.market}</span>
                <span className="text-sm text-muted-foreground ml-2">({m.district}, {m.state})</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary">₹{m.modal_price}</span>
                <span className="text-xs text-muted-foreground ml-1">modal/qtl</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
