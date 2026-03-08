import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCards } from "@/components/StatsCards";
import { CropSearch } from "@/components/CropSearch";
import { PriceTrendChart } from "@/components/PriceTrendChart";
import { BestMarketCard } from "@/components/BestMarketCard";
import { PricePrediction } from "@/components/PricePrediction";
import { VoiceSearch } from "@/components/VoiceSearch";
import { CropImageDetector } from "@/components/CropImageDetector";
import { MarketComparison } from "@/components/MarketComparison";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BarChart3, Camera, ArrowUpDown } from "lucide-react";

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards />

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-secondary p-1">
            <TabsTrigger value="search" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="h-4 w-4" /> Price Search
            </TabsTrigger>
            <TabsTrigger value="detect" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Camera className="h-4 w-4" /> Image Detect
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ArrowUpDown className="h-4 w-4" /> Compare
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4" /> Trends & AI
            </TabsTrigger>
          </TabsList>

          {/* Price Search Tab */}
          <TabsContent value="search" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Crop Price Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <VoiceSearch onCropSelect={setSelectedCrop} />
                <CropSearch onCropSelect={setSelectedCrop} />
              </CardContent>
            </Card>
            <BestMarketCard crop={selectedCrop} />
          </TabsContent>

          {/* Image Detection Tab */}
          <TabsContent value="detect" className="space-y-4">
            <CropImageDetector onCropDetected={setSelectedCrop} />
            {selectedCrop && <BestMarketCard crop={selectedCrop} />}
          </TabsContent>

          {/* Market Comparison Tab */}
          <TabsContent value="compare">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {["Rice", "Tomato", "Onion", "Wheat", "Cotton", "Maize", "Potato"].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedCrop === crop ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
              <MarketComparison crop={selectedCrop} />
            </div>
          </TabsContent>

          {/* Trends & AI Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {["Rice", "Tomato", "Onion", "Wheat", "Cotton", "Maize", "Potato"].map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedCrop === crop ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  {crop}
                </button>
              ))}
            </div>
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
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin">
            <AdminPanel />
          </TabsContent>
        </Tabs>
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
