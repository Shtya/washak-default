import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useProductBySlug(id) {
    const query = useQuery({
      queryKey: ['productBySlug', id],
      queryFn: () => BaseFetch(`/get-product-by-slug/${id}`),
      enabled: !!id, // avoids firing if id is undefined
    });
  
    return {
      data: query.data,
      loading: query.isLoading,
      error: query.error,
    };
  }
  