import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useUpsellProducts(productId) {
  const query = useQuery({
    queryKey: ['upsell', productId],
    queryFn: () => BaseFetch(`/get-upsell-products`,
      {
        method: 'POST',
        body: JSON.stringify({ product_id: productId }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
    enabled: !!productId, // avoids firing if id is undefined
  });
  const upsellData =
    Array.isArray(query.data?.data) && query.data?.data?.length > 0 ? query.data?.data[0] : null;
  return {
    data: query.data,
    upsellData,
    loading: query.isLoading,
    error: query.error,
  };
}
