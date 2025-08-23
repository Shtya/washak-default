import { BaseFetch } from "../config/Api";
import { useQuery } from '@tanstack/react-query';

export function useStoreHomeSections() {
    const query = useQuery({
        queryKey: ['storeHomeSections'],
        queryFn: () => BaseFetch("/get-store-home-sections")
    });


    return {
        loading: query.isLoading,
        data: query.data,
        error: query.error,
    }
}