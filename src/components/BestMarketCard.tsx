import { Trophy, MapPin, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCropPrices } from "@/hooks/useMarketData";
import { getBestMarketFromRecords } from "@/services/agriApi";

export function BestMarketCard({ crop }: { crop: string }) {
  const { data, isLoading, isError } = useCropPrices(crop);

  if (!crop) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to see the best market recommendation
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Finding best market...
        </CardContent>
      </Card>
    );
  }

  if (isError || !data?.records?.length) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          No market data available for {crop}.
        </CardContent>
      </Card>
    );
  }

  const best = getBestMarketFromRecords(data.records);
  if (!best) return null;

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
        <p className="text-sm text-muted-foreground">{best.district}, {best.state}</p>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-lg font-semibold">Max Price: ₹{best.max_price}/quintal</span>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Min: ₹{best.min_price}</span>
          <span>Modal: ₹{best.modal_price}</span>
          <span>Max: ₹{best.max_price}</span>
        </div>
        <p className="text-xs text-muted-foreground">Data: {best.arrival_date} — AGMARKNET</p>
      </CardContent>
    </Card>
  );
}
