// src/hooks/useStoreOptions.ts
import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useStoreOptions() {
  const query = useQuery({
    queryKey: ["storeOptions"],
    queryFn: () => BaseFetch("/get-store-options"),
  });

  return {
    data:    query.data,
    loading: query.isLoading,
    error:   query.error,
  };
}
