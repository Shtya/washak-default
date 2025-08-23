import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../config/Api";

export function useStoreCategories() {
    const query = useQuery({
      queryKey: ['get-store-categories'],
      queryFn: () => BaseFetch('/get-store-categories'),
    });
  
    return {
      data: query.data,
      loading: query.isLoading,
      error: query.error,
      refetch: query.refetch
    };
  }
  