import { useQuery } from "@tanstack/react-query";
import { fetchCropPrices, fetchFilteredPrices, type MarketResponse } from "@/services/agriApi";

export function useCropPrices(cropName: string) {
  return useQuery<MarketResponse>({
    queryKey: ["cropPrices", cropName],
    queryFn: () => fetchCropPrices(cropName),
    enabled: !!cropName,
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 2,
  });
}

export function useFilteredPrices(params: {
  commodity?: string;
  state?: string;
  market?: string;
  district?: string;
}) {
  const hasFilter = !!(params.commodity || params.state || params.market || params.district);
  return useQuery<MarketResponse>({
    queryKey: ["filteredPrices", params],
    queryFn: () => fetchFilteredPrices(params),
    enabled: hasFilter,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useAllPrices() {
  return useQuery<MarketResponse>({
    queryKey: ["allPrices"],
    queryFn: () => fetchFilteredPrices({ limit: 100 }),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
