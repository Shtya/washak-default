import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useVariantCombinations(
    productId,
    variantIds = []
  ) {

    const enabled =
    !!productId &&
    Array.isArray(variantIds) &&
    variantIds?.length > 0;

    const query =  useQuery({
      queryKey: ['variantCombinations', productId, variantIds],
      queryFn: () => BaseFetch('/get-variant-combinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product_id: productId, variant_ids: variantIds}),
      }),
      enabled
    });

    return {
        data: query.data,
        loading: query.isLoading,
        error: query.error,
      };
  }