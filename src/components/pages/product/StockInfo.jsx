import { CheckCircle, Tag, XCircle, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

export const StockInfo = ({ stock, options }) => {
  const isHurryEnabled = String(options?.hurry_option_status) === "1";

  // Normalize "left" to a number if available
  const leftCount = useMemo(() => {
    const raw = options?.fake_product_stock?.left;
    const n = Number(raw);

    return Number.isFinite(n) ? n : undefined;
  }, [options]);

  // Prefer admin-provided hurry text; otherwise use a sensible fallback
  const hurryText = useMemo(() => {
    if (options?.hurry_option && String(options.hurry_option).trim()) {
      return String(options.hurry_option).trim();
    }
    if (leftCount !== undefined) {
      return `متبقي ${toArabicDigits(leftCount)} قطع فقط في المخزن`;
    }
    // Generic fallback if neither text nor numeric left is present
    return "كمية محدودة — أسرع بالشراء قبل نفاد المخزون";
  }, [options, leftCount]);

  if (!stock) return null;

  return (
    <div
      className="text-sm text-gray-800 space-y-4 transition-all duration-300"
      data-aos="fade-up"
    >
      {stock?.sku && (
        <div className="grid grid-cols-[135px,1fr] gap-2">
          <span className="font-[600] text-sm flex items-center gap-2 text-gray-800">
            <Tag size={18} className="text-[var(--main)]" />
            رمز المنتج (SKU)
          </span>
          <span className="text-[var(--main)] font-semibold tracking-wide">
            {stock.sku}
          </span>
        </div>
      )}

      {isHurryEnabled ? (
        // Fake/urgency view
        <div className="grid grid-cols-[135px,1fr]">
          <span className="font-[600] text-sm text-gray-800">حالة المخزون</span>
          <span
            className="font-semibold flex items-center gap-2 text-[var(--second)]"
            aria-live="polite"
          >
            <AlertTriangle size={18} className="text-[var(--second)]" />
            <span>{hurryText}</span>
          </span>
        </div>
      ) : (
        // Real stock view
        <>
          {stock?.stock_manage != 0 && stock.stock_status == 1 && (
            <div className="grid grid-cols-[135px,1fr]">
              <span className="font-[600] text-sm text-gray-800">الكمية في المخزون</span>
              <span
                className={`font-bold ${stock.stock_qty > 0 ? "text-[var(--second)]" : "text-red-600"
                  }`}
              >
                {toArabicDigits(stock.stock_qty)}
              </span>
            </div>
          )}

          <div className="grid grid-cols-[135px,1fr]">
            <span className="font-[600] text-sm text-gray-800">حالة المخزون</span>
            <span className="font-semibold flex items-center gap-2">
              {stock.stock_status == 1 ? (
                <>
                  <CheckCircle size={18} className="text-[var(--second)]" />
                  <span className="text-[var(--second)]">متوفر</span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-red-600" />
                  <span className="text-red-600">غير متوفر</span>
                </>
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

// Helper: convert Western digits to Arabic-Indic for consistency with Arabic UI
function toArabicDigits(value) {
  const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(value).replace(/\d/g, d => map[Number(d)]);
}
