import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../../config/Api";


const DEFAULT_PER_PAGE = Number(process.env.REACT_APP_PRODUCTS_PER_PAGE || 12);

export function useStoreProducts(page = 1, category_id = '', per_page = DEFAULT_PER_PAGE) {
  const queryString = `/get-products-by-store?page=${page}&per_page=${per_page}` +
    (category_id ? `&category_id=${category_id}` : '');

  const query = useQuery({
    queryKey: ['get-products-by-store', { page, category_id }],
    queryFn: () => BaseFetch(queryString),
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
