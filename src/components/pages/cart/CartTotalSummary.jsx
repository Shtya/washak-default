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
        <div className="p-4 text-xs md:text-sm lg:text-base space-y-4 pt-4">
            <div className="flex justify-between  text-[#838BA1]">
                <span>المجموع الفرعي</span>
                {isloading ? (
                    <Skeleton />
                ) : (
                    <span className="text-[var(--main)]">{oldSubtotal.toFixed(2)} ر.س</span>
                )}
            </div>

            {discount > 0 && (
                <div className="flex justify-between  text-[#838BA1]">
                    <span>الخصم</span>
                    {isloading ? (
                        <Skeleton />
                    ) : (
                        <span className="text-green-500">-{discount.toFixed(2)} ر.س</span>
                    )}
                </div>
            )}

            <div className="flex justify-between  text-[#838BA1]">
                <span>الضريبة</span>
                {isloading ? (
                    <Skeleton />
                ) : (
                    <span className="text-[var(--main)]">{tax.toFixed(2)} ر.س</span>
                )}
            </div>

            <div className="flex justify-between  text-[#838BA1]">
                <span>تكلفة الشحن</span>
                {isloading ? (
                    <Skeleton />
                ) : (
                    <span className="text-[var(--main)]">{shipping.toFixed(2)} ر.س</span>
                )}
            </div>

            <div className="flex justify-between  text-[var(--second)] font-semibold">
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
