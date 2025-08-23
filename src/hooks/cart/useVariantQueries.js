import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { BaseFetch } from "../../config/Api";

export default function useVariantQueries(variantRequests = []) {

    const queries = useMemo(() => {
      return (variantRequests || []).map(req => ({
        queryKey: ['variantPrice', req.productId, (req.variantIds || []).join(',')],

        queryFn: async ({ signal }) => {
          if (!req.productId || !(req.variantIds || []).length) return null;
          const data = await BaseFetch('/get-variant-combinations', {
            method: 'POST',
            body: JSON.stringify({ product_id: req.productId, variant_ids: req.variantIds }),
            headers: { 'Content-Type': 'application/json' },
            signal,
          });
          return data?.data?.[0] || null;
        },
        enabled: !!req.productId && (req.variantIds || []).length > 0
      }));
    }, [variantRequests]);
  
    const results = useQueries({ queries });
    // flatten results into a simple object
    const data = results.map(r => r.data || null);
    const isLoading = results.some(r => r.isLoading);
    const error = results.find(r => r.error)?.error || null;
  
    return { data, isLoading, error, results };
  }
  