// CartSummary.jsx
import React from "react";

const Skeleton = ({ width = "w-16", height = "h-4" }) => (
    <span className={`${width} ${height} bg-gray-200 rounded animate-pulse`} />
);

export default function CartTotalSummary({
    subtotal,
    oldSubtotal,
    discount,
    tax,
    shipping,
    total,
    loadingVariantPrices,
    productsLoading,
}) {
    const isloading = loadingVariantPrices || productsLoading;

    return (
        <div className="space-y-4 !mt-8 border-t pt-4">
            <div className="flex justify-between text-base text-[#838BA1]">
                <span>المجموع الفرعي</span>
                {isloading ? (
                    <Skeleton />
                ) : (
                    <span className="text-[var(--main)]">{oldSubtotal.toFixed(2)} ر.س</span>
                )}
            </div>

            {discount > 0 && (
                <div className="flex justify-between text-base text-[#838BA1]">
                    <span>الخصم</span>
                    {isloading ? (
                        <Skeleton />
                    ) : (
                        <span className="text-green-500">-{discount.toFixed(2)} ر.س</span>
                    )}
                </div>
            )}

            <div className="flex justify-between text-base text-[#838BA1]">
                <span>الضريبة</span>
                {isloading ? (
                    <Skeleton />
                ) : (
                    <span className="text-[var(--main)]">{tax.toFixed(2)} ر.س</span>
                )}
            </div>

            <div className="flex justify-between text-base text-[#838BA1]">
                <span>تكلفة الشحن</span>
                {isloading ? (
                    <Skeleton />
                ) : (
                    <span className="text-[var(--main)]">{shipping.toFixed(2)} ر.س</span>
                )}
            </div>

            <div className="flex justify-between text-base text-[var(--second)] font-semibold">
                <span>المبلغ الإجمالي</span>
                {loadingVariantPrices ? (
                    <Skeleton width="w-20" height="h-5" />
                ) : (
                    <span className="text-[var(--second)]">{total.toFixed(2)} ر.س</span>
                )}
            </div>
        </div>
    );
}
