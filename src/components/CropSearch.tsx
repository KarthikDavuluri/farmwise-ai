import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cropPrices, cropNames, type CropPrice } from "@/data/cropData";
import { Badge } from "@/components/ui/badge";

export function CropSearch({ onCropSelect }: { onCropSelect: (crop: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CropPrice[]>([]);
  const [selectedCrop, setSelectedCrop] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setResults(cropPrices.filter(c => c.crop_name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setResults([]);
    }
  };

  const selectCrop = (crop: string) => {
    setSelectedCrop(crop);
    setQuery(crop);
    setResults(cropPrices.filter(c => c.crop_name === crop));
    onCropSelect(crop);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search crops... (e.g., Rice, Tomato, Wheat)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-11 h-12 text-base bg-card border-border"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {cropNames.map((crop) => (
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

      {results.length > 0 && (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left p-3 font-semibold text-secondary-foreground">Crop</th>
                <th className="text-left p-3 font-semibold text-secondary-foreground">Market</th>
                <th className="text-left p-3 font-semibold text-secondary-foreground">State</th>
                <th className="text-right p-3 font-semibold text-secondary-foreground">Min ₹</th>
                <th className="text-right p-3 font-semibold text-secondary-foreground">Max ₹</th>
                <th className="text-right p-3 font-semibold text-secondary-foreground">Avg ₹</th>
                <th className="text-right p-3 font-semibold text-secondary-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-secondary/50 transition-colors">
                  <td className="p-3 font-medium">{r.crop_name}</td>
                  <td className="p-3">{r.market}</td>
                  <td className="p-3 text-muted-foreground">{r.state}</td>
                  <td className="p-3 text-right">₹{r.min_price}</td>
                  <td className="p-3 text-right font-semibold text-primary">₹{r.max_price}</td>
                  <td className="p-3 text-right">₹{r.avg_price}</td>
                  <td className="p-3 text-right text-muted-foreground">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
