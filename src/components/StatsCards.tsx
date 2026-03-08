import { BarChart3, MapPin, Wheat, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAllPrices } from "@/hooks/useMarketData";

export function StatsCards() {
  const { data, isLoading } = useAllPrices();
  const records = data?.records || [];

  const stats = [
    {
      label: "Commodities",
      value: isLoading ? "…" : new Set(records.map((r) => r.commodity)).size,
      icon: Wheat,
      color: "text-primary",
    },
    {
      label: "Markets",
      value: isLoading ? "…" : new Set(records.map((r) => r.market)).size,
      icon: MapPin,
      color: "text-accent",
    },
    {
      label: "States",
      value: isLoading ? "…" : new Set(records.map((r) => r.state)).size,
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "Price Records",
      value: isLoading ? "…" : data?.total || records.length,
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <s.icon className={`h-8 w-8 ${s.color}`} />
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
