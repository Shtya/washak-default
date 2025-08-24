import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useSearchProducts(searchQuery) {
    
  const query = useQuery({
    queryKey: ['searchProducts', searchQuery],
    queryFn: () => BaseFetch(`/search-store-products?search=${encodeURIComponent(searchQuery)}`),
    enabled: !!searchQuery,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}