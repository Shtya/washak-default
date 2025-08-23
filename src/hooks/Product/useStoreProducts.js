import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useStoreProducts(page = 1) {
    const query = useQuery({
        queryKey: ["get-store-products", { page }],
        queryFn: () => BaseFetch(`/get-store-products?page=${page}`),
    });
  
    return {
      data: query.data,
      loading: query.isLoading,
      error: query.error,
      refetch: query.refetch
    };
  }
  