import { useQuery } from '@tanstack/react-query';
import { BaseFetch } from '../../config/Api';

export function useRelatedProducts(id) {


  const query = useQuery({
    queryKey: ['relatedProducts', id],
    queryFn: () => BaseFetch(`/get-related-products/${id}`),
    enabled: !!id, // avoid running until id is truthy
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}
