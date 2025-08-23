import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "../../components/molecules/ErrorBoundaryFallback";

export const ErrorBoundaryProvider = ({
  children,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};
