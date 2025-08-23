import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundaryFallback } from "../../components/molecules/ErrorBoundaryFallback";
import { mainQueryClient } from "../mainQueryClient";
import { AppProvider } from "../../contexts/AppContext";
import { CartProvider } from "../../contexts/cartContext";
import { AppRoutes } from "./RouterProvider";

export function AppProviders({ children }) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => window.location.reload()}
        >
            <QueryClientProvider client={mainQueryClient}>
                <AppProvider>
                    <CartProvider>
                        <AppRoutes />
                        {children}
                        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
                    </CartProvider>
                </AppProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}
