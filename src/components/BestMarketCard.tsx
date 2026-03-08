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
          Select a crop to see the best price recommendation
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Finding best price...
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

  const mspDiff = best.msp ? best.modal_price - best.msp : null;

  return (
    <Card className="border-2 border-accent bg-gradient-to-br from-card to-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="h-5 w-5 text-accent" />
          Price Summary – {best.commodity}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-lg font-semibold">Modal Price: ₹{best.modal_price.toFixed(2)}/quintal</span>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Min: ₹{best.min_price.toFixed(2)}</span>
          <span>Max: ₹{best.max_price.toFixed(2)}</span>
          {best.msp && <span>MSP: ₹{best.msp}</span>}
        </div>
        {mspDiff !== null && (
          <div className={`text-sm font-medium ${mspDiff >= 0 ? "text-primary" : "text-destructive"}`}>
            {mspDiff >= 0 ? "↑" : "↓"} ₹{Math.abs(mspDiff).toFixed(2)} {mspDiff >= 0 ? "above" : "below"} MSP
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          Arrival: {best.arrival_tonnes.toFixed(2)} MT
        </div>
        <p className="text-xs text-muted-foreground">Data: {best.arrival_date} — AGMARKNET Report</p>
      </CardContent>
    </Card>
  );
}
