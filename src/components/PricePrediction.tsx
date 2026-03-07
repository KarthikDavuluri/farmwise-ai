import { Brain, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getPricePrediction } from "@/data/cropData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PricePrediction({ crop }: { crop: string }) {
  if (!crop) {
    return (
      <Card className="border-border">
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a crop to see AI price predictions
        </CardContent>
      </Card>
    );
  }

  const pred = getPricePrediction(crop);
  const weekChange = ((pred.week - pred.current) / pred.current) * 100;
  const monthChange = ((pred.month - pred.current) / pred.current) * 100;

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="h-5 w-5 text-primary" />
          AI Price Prediction – {crop}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-3 rounded-lg bg-secondary">
          <p className="text-sm text-muted-foreground">Current Price</p>
          <p className="text-3xl font-bold">₹{pred.current}</p>
          <p className="text-xs text-muted-foreground">per quintal</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary text-center">
            <p className="text-xs text-muted-foreground mb-1">Next 7 Days</p>
            <p className="text-xl font-bold">₹{pred.week}</p>
            <div className={`flex items-center justify-center gap-1 text-sm font-medium ${weekChange >= 0 ? "text-success" : "text-destructive"}`}>
              {weekChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {Math.abs(weekChange).toFixed(1)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary text-center">
            <p className="text-xs text-muted-foreground mb-1">Next 30 Days</p>
            <p className="text-xl font-bold">₹{pred.month}</p>
            <div className={`flex items-center justify-center gap-1 text-sm font-medium ${monthChange >= 0 ? "text-success" : "text-destructive"}`}>
              {monthChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {Math.abs(monthChange).toFixed(1)}%
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          * Predictions based on historical trends and seasonal patterns
        </p>
      </CardContent>
    </Card>
  );
}
