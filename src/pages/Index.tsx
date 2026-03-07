import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCards } from "@/components/StatsCards";
import { CropSearch } from "@/components/CropSearch";
import { PriceTrendChart } from "@/components/PriceTrendChart";
import { BestMarketCard } from "@/components/BestMarketCard";
import { PricePrediction } from "@/components/PricePrediction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart3, Trophy, Brain } from "lucide-react";

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards />

        {/* Crop Search */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Crop Price Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CropSearch onCropSelect={setSelectedCrop} />
          </CardContent>
        </Card>

        {/* Charts + Recommendations */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Price Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PriceTrendChart crop={selectedCrop} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <BestMarketCard crop={selectedCrop} />
            <PricePrediction crop={selectedCrop} />
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          FarmPrice AI © 2026 — Empowering farmers with data-driven decisions
        </div>
      </footer>
    </div>
  );
};

export default Index;
