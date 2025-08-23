import { useMemo } from "react";
import { BaseFetch } from "../../config/Api";
import { useQuery } from "@tanstack/react-query";

export default function useProductsByIds(ids = [], { onSuccess } = {}) {
    const key = useMemo(() => ['productsByIds']);
  
    const query = useQuery({
      queryKey: key,
      queryFn: async ({ signal }) => {
        const data = await BaseFetch('/get-products-by-ids', {
            method: 'POST',
            body: JSON.stringify({ product_ids: ids }),
            signal,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return data?.data || [];
      },
      enabled: ids && ids.length > 0,
      keepPreviousData: true,
      onSuccess: items => {
        if (typeof onSuccess === 'function') onSuccess(items || []);
      },
      onError: err => {
        console.error('useProductsByIds query error', err);
      },
    });
  
    return {
      data: query.data || [],
      isLoading: query.isLoading,
      error: query.error,
      refetch: query.refetch,
    };
  }
  