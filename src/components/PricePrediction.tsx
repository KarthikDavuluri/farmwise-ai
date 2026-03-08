import { Brain, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCropPrices } from "@/hooks/useMarketData";
import { getCommodityData } from "@/data/marketData";

export function PricePrediction({ crop }: { crop: string }) {
  const { data, isLoading } = useCropPrices(crop);

  if (!crop) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to see price insights
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Analyzing prices...
        </CardContent>
      </Card>
    );
  }

  const commodityData = getCommodityData(crop);
  if (!commodityData) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          No data available for {crop}.
        </CardContent>
      </Card>
    );
  }

  const prices = commodityData.prices;
  const arrivals = commodityData.arrivals;
  const latest = prices[0];
  const prev = prices[1];
  const dayChange = latest.price - prev.price;
  const dayChangePct = ((dayChange / prev.price) * 100);
  const msp = commodityData.msp;

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="h-5 w-5 text-primary" />
          Price Insights – {crop}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-3 rounded-lg bg-secondary">
          <p className="text-sm text-muted-foreground">Latest Price ({latest.date})</p>
          <p className="text-3xl font-bold">₹{latest.price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">per quintal</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary text-center">
            <p className="text-xs text-muted-foreground mb-1">Day Change</p>
            <div className={`flex items-center justify-center gap-1 text-lg font-bold ${dayChange >= 0 ? "text-primary" : "text-destructive"}`}>
              {dayChange >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              ₹{Math.abs(dayChange).toFixed(2)}
            </div>
            <p className={`text-sm font-medium ${dayChange >= 0 ? "text-primary" : "text-destructive"}`}>
              {dayChangePct >= 0 ? "+" : ""}{dayChangePct.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 rounded-lg bg-secondary text-center">
            <p className="text-xs text-muted-foreground mb-1">Arrival Today</p>
            <p className="text-lg font-bold">{arrivals[0].tonnes.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Metric Tonnes</p>
          </div>
        </div>
        {msp && (
          <div className={`text-center p-2 rounded-lg ${latest.price >= msp ? "bg-primary/10" : "bg-destructive/10"}`}>
            <p className="text-sm">
              MSP: <span className="font-bold">₹{msp}</span> — Price is{" "}
              <span className="font-bold">{latest.price >= msp ? "above" : "below"}</span> MSP by ₹{Math.abs(latest.price - msp).toFixed(2)}
            </p>
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">
          * Data from AGMARKNET Marketwise Report
        </p>
      </CardContent>
    </Card>
  );
}
