import { QueryClient } from "@tanstack/react-query";

export const mainQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      gcTime: 0,
      staleTime: 0
    },
  },
});
