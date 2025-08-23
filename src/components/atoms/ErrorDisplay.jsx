import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorDisplay({
    error,
    onRetry,
    title = "حدث خطأ ما",
    message = "عذراً، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",
    showRetry = true,
    className = ""
}) {
    if (!error) return null;

    return (
        <div className={`min-h-[400px] flex items-center justify-center py-12 pt-[30px] max-sm:!pt-[10px] ${className}`}>
            <div className="text-center max-w-md mx-auto px-4">
                {/* Error Icon */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>

                {/* Error Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    {title}
                </h2>

                {/* Error Message */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {message}
                </p>

                {/* Error Details (for development) */}
                {process.env.NODE_ENV === 'development' && error?.message && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-3 text-left">
                        <p className="text-xs text-gray-500 mb-1">تفاصيل الخطأ (للمطور):</p>
                        <p className="text-xs text-red-600 font-mono break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Retry Button */}
                {showRetry && onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-10 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        <RefreshCw className="w-4 h-4" />
                        إعادة المحاولة
                    </button>
                )}

                {/* Alternative Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                    >
                        العودة للرئيسية
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                    >
                        تحديث الصفحة
                    </button>
                </div>
            </div>
        </div>
    );
}

// Specific error components for different scenarios
export function NetworkError({ onRetry, className = "" }) {
    return (
        <ErrorDisplay
            error={{ message: "Network Error" }}
            onRetry={onRetry}
            title="خطأ في الاتصال"
            message="لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى."
            className={className}
        />
    );
}

export function NotFoundError({ onRetry, className = "" }) {
    return (
        <ErrorDisplay
            error={{ message: "Not Found" }}
            onRetry={onRetry}
            title="الصفحة غير موجودة"
            message="عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            className={className}
        />
    );
}

export function ServerError({ onRetry, className = "" }) {
    return (
        <ErrorDisplay
            error={{ message: "Server Error" }}
            onRetry={onRetry}
            title="خطأ في الخادم"
            message="حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً."
            className={className}
        />
    );
}

export function LoadingError({ onRetry, className = "" }) {
    return (
        <ErrorDisplay
            error={{ message: "Loading Error" }}
            onRetry={onRetry}
            title="خطأ في التحميل"
            message="حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى."
            className={className}
        />
    );
}