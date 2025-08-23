import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { mainQueryClient } from "../mainQueryClient";

export const QueryProvider = ({ children }) => (
    <QueryClientProvider client={mainQueryClient}>
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
);
