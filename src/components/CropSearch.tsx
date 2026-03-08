import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCropPrices } from "@/hooks/useMarketData";
import { getCommodityNames, getCommodityGroups } from "@/data/marketData";
import type { MarketRecord } from "@/services/agriApi";

const COMMODITY_NAMES = getCommodityNames();
const GROUPS = getCommodityGroups();

export function CropSearch({ onCropSelect }: { onCropSelect: (crop: string) => void }) {
  const [query, setQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");

  const { data, isLoading, isError } = useCropPrices(selectedCrop || (query.length >= 2 ? query : ""));

  const records = data?.records || [];

  const selectCrop = (crop: string) => {
    setSelectedCrop(crop);
    setQuery(crop);
    onCropSelect(crop);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length === 0) setSelectedCrop("");
  };

  const handleSearchSubmit = () => {
    if (query.length >= 2) {
      setSelectedCrop(query);
      onCropSelect(query);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search crops... (e.g., Wheat, Tomato, Cotton)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="pl-11 h-12 text-base bg-card border-border"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {COMMODITY_NAMES.map((crop) => (
          <Badge
            key={crop}
            variant={selectedCrop === crop ? "default" : "secondary"}
            className="cursor-pointer text-sm px-3 py-1.5 transition-all hover:scale-105"
            onClick={() => selectCrop(crop)}
          >
            {crop}
          </Badge>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading market data...
        </div>
      )}

      {isError && (
        <div className="text-center py-6 text-destructive text-sm">
          Failed to load market data. Please try again.
        </div>
      )}

      {!isLoading && !isError && records.length === 0 && selectedCrop && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No market data available for "{selectedCrop}".
        </div>
      )}

      {records.length > 0 && (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="text-xs text-muted-foreground px-3 py-1.5 bg-secondary/50">
            {data?.total} results from AGMARKNET report (06-03-2026)
          </div>
          <div className="overflow-auto max-h-[400px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary sticky top-0">
                  <th className="text-left p-3 font-semibold text-secondary-foreground">Commodity</th>
                  <th className="text-left p-3 font-semibold text-secondary-foreground">Group</th>
                  <th className="text-right p-3 font-semibold text-secondary-foreground">MSP ₹</th>
                  <th className="text-right p-3 font-semibold text-secondary-foreground">Min ₹</th>
                  <th className="text-right p-3 font-semibold text-secondary-foreground">Max ₹</th>
                  <th className="text-right p-3 font-semibold text-secondary-foreground">Modal ₹</th>
                  <th className="text-right p-3 font-semibold text-secondary-foreground">Arrival (MT)</th>
                  <th className="text-right p-3 font-semibold text-secondary-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r: MarketRecord, i: number) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-3 font-medium">{r.commodity}</td>
                    <td className="p-3 text-muted-foreground">{r.commodity_group}</td>
                    <td className="p-3 text-right">{r.msp ? `₹${r.msp}` : "—"}</td>
                    <td className="p-3 text-right">₹{r.min_price.toFixed(2)}</td>
                    <td className="p-3 text-right font-semibold text-primary">₹{r.max_price.toFixed(2)}</td>
                    <td className="p-3 text-right">₹{r.modal_price.toFixed(2)}</td>
                    <td className="p-3 text-right">{r.arrival_tonnes.toFixed(2)}</td>
                    <td className="p-3 text-right text-muted-foreground">{r.arrival_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
