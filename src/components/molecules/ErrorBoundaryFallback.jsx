'use client';

import { AlertTriangle, RefreshCw, ArrowLeft, Home } from 'lucide-react';
import Button from '../atoms/Button';

export function ErrorBoundaryFallback({ error, resetErrorBoundary }) {

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
        <p className="text-lg text-gray-600">Application Error</p>

        {/* Messages */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-500">
            We encountered an unexpected error. Our team has been notified and is working to resolve the issue.
          </p>
          <p className="text-sm text-gray-400">Please try refreshing the page or go back.</p>
        </div>

        {/* Developer error output (optional) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-4 bg-gray-100 rounded-lg p-3 text-left">
            <p className="text-xs font-semibold text-gray-600">Error:</p>
            <pre className="text-xs text-gray-500 whitespace-pre-wrap break-words">{error.message}</pre>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs cursor-pointer text-gray-500 hover:text-gray-700">Stack Trace</summary>
                <pre className="text-xs text-gray-500 mt-1 whitespace-pre-wrap break-words">{error.stack}</pre>
              </details>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full h-[50px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleGoBack}
              className="flex-1 h-[50px] flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 h-[50px] flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-4 border-t pt-3">
          <p className="text-xs text-gray-400">Client Error</p>
          <p className="text-xs text-gray-400 mt-1">
            If this problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
