import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useSearchProducts(searchQuery) {
    
  const query = useQuery({
    queryKey: ['searchProducts', searchQuery],
    queryFn: () => BaseFetch(`/search-store-products?search=${encodeURIComponent(searchQuery)}`),
    enabled: !!searchQuery,
    cacheTime: process.env.REACT_APP_SEARCH_CASHE || 10 * 60 * 1000, // Keep cache for 10 minute only
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}