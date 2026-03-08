import { useQuery } from "@tanstack/react-query";
import { fetchCropPrices, fetchFilteredPrices, type MarketResponse } from "@/services/agriApi";

export function useCropPrices(cropName: string) {
  return useQuery<MarketResponse>({
    queryKey: ["cropPrices", cropName],
    queryFn: () => fetchCropPrices(cropName),
    enabled: !!cropName,
    staleTime: 10 * 60 * 1000,
  });
}

export function useFilteredPrices(params: {
  commodity?: string;
  commodity_group?: string;
}) {
  const hasFilter = !!(params.commodity || params.commodity_group);
  return useQuery<MarketResponse>({
    queryKey: ["filteredPrices", params],
    queryFn: () => fetchFilteredPrices(params),
    enabled: hasFilter,
    staleTime: 10 * 60 * 1000,
  });
}

export function useAllPrices() {
  return useQuery<MarketResponse>({
    queryKey: ["allPrices"],
    queryFn: () => fetchFilteredPrices({ limit: 100 }),
    staleTime: 10 * 60 * 1000,
  });
}
