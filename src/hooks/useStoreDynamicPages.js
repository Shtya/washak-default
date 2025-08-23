import { useQuery } from "@tanstack/react-query";
import { BaseFetch } from "../config/Api";


export function useStoreDynamicPages() {
    const query = useQuery({
        queryKey: ['storeDynamicPages'],
        queryFn: () => BaseFetch('/store-dynamic-pages'),
    });

    return {
        loading: query.isLoading,
        data: query.data,
        error: query.error,
    };
}
