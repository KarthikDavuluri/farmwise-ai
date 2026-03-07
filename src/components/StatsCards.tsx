import { BarChart3, MapPin, Wheat, TrendingUp } from "lucide-react";
import { cropPrices, cropNames } from "@/data/cropData";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Crops Tracked", value: cropNames.length, icon: Wheat, color: "text-primary" },
  { label: "Markets", value: new Set(cropPrices.map(c => c.market)).size, icon: MapPin, color: "text-accent" },
  { label: "States", value: new Set(cropPrices.map(c => c.state)).size, icon: BarChart3, color: "text-success" },
  { label: "Price Updates", value: cropPrices.length, icon: TrendingUp, color: "text-warning" },
];

export function StatsCards() {
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
