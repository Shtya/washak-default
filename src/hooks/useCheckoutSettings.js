import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../config/Api";

export function useCheckoutSettings() {
    const query = useQuery({
      queryKey: ['checkoutSettings'],
      queryFn: () => BaseFetch('/get-checkout-settings'),
    });
  
    return {
      data: query.data,
      loading: query.isLoading,
      error: query.error,
    };
  }
    