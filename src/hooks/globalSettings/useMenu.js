
import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";


export function useMenu() {
  const query = useQuery({
    queryKey: ["menu"],
    queryFn: () => BaseFetch("/get-store-menu"),
  });

  return {
    data:    query.data,
    loading: query.isLoading,
    error:   query.error,
  };
}
