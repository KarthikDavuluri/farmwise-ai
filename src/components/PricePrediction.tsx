import { Brain, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCropPrices } from "@/hooks/useMarketData";

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

  const records = data?.records || [];
  if (records.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          No data available for {crop}.
        </CardContent>
      </Card>
    );
  }

  const avgModal = Math.round(records.reduce((s, r) => s + r.modal_price, 0) / records.length);
  const minPrice = Math.min(...records.map((r) => r.min_price));
  const maxPrice = Math.max(...records.map((r) => r.max_price));
  const priceSpread = maxPrice - minPrice;
  const spreadPct = ((priceSpread / avgModal) * 100).toFixed(1);

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
          <p className="text-sm text-muted-foreground">Average Modal Price</p>
          <p className="text-3xl font-bold">₹{avgModal}</p>
          <p className="text-xs text-muted-foreground">per quintal ({records.length} markets)</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary text-center">
            <p className="text-xs text-muted-foreground mb-1">Lowest Price</p>
            <p className="text-xl font-bold">₹{minPrice}</p>
            <div className="flex items-center justify-center gap-1 text-sm font-medium text-destructive">
              <ArrowDownRight className="h-4 w-4" />
              Min across markets
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary text-center">
            <p className="text-xs text-muted-foreground mb-1">Highest Price</p>
            <p className="text-xl font-bold">₹{maxPrice}</p>
            <div className="flex items-center justify-center gap-1 text-sm font-medium text-primary">
              <ArrowUpRight className="h-4 w-4" />
              Max across markets
            </div>
          </div>
        </div>
        <div className="text-center p-2 rounded-lg bg-accent/10">
          <p className="text-sm">
            Price spread: <span className="font-bold">₹{priceSpread}</span> ({spreadPct}% variation)
          </p>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          * Based on live AGMARKNET market data
        </p>
      </CardContent>
    </Card>
  );
}
