import { Trophy, MapPin, TrendingUp } from "lucide-react";
import { getBestMarket } from "@/data/cropData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BestMarketCard({ crop }: { crop: string }) {
  const best = getBestMarket(crop);

  if (!crop || !best) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to see the best market recommendation
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-accent bg-gradient-to-br from-card to-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="h-5 w-5 text-accent" />
          Best Market to Sell {crop} Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-2xl font-bold">{best.market}</span>
        </div>
        <p className="text-sm text-muted-foreground">{best.state}</p>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-success" />
          <span className="text-lg font-semibold">Expected Price: ₹{best.max_price}/quintal</span>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Min: ₹{best.min_price}</span>
          <span>Avg: ₹{best.avg_price}</span>
          <span>Max: ₹{best.max_price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
