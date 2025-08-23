// src/hooks/useMenuSettings.ts
import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";

export function useMenuSettings() {
  const query = useQuery({
    queryKey: ["menuSettings"],
    queryFn: () => BaseFetch("/get-store-menu-settings"),
  });

  return {
    data:    query.data,
    loading: query.isLoading,
    error:   query.error,
  };
}
