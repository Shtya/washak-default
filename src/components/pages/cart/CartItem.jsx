import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { baseImage } from "../../../config/Api";
import { PriceBlock } from "../../atoms/PriceCurrency";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { VariantSelector } from "../product/VariantSelector";

export const CartItem = ({
    item,
    products,
    variantPrices,
    removeItem,
    handleVariantSelection,
    increaseQuantity,
    decreaseQuantity,
}) => {
    const [showVariantDetails, setShowVariantDetails] = useState(false);
    const product = products.find((p) => p.id === item.id);
    if (!product) return null;

    // Determine which price to use (variant or product)
    let price, regularPrice;
    if (variantPrices[product.id]) {
        price = variantPrices[product.id].price;
        regularPrice = variantPrices[product.id].compare_at_price || price;
    } else {
        price = product.price?.special_price || product.price?.price || 0;
        regularPrice = product.price?.regular_price || price;
    }

    const hasDiscount = regularPrice > price;
    const hasVariants = product.product_variants?.length > 0;

    return (
        <div
            key={item.id}
            className="relative flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg border border-[var(--border-bg)] bg-[#fafafa]"
        >
            <Link to={`/product/${product.slug}`} className="flex-none">
                <img
                    src={
                        product.medias?.[0]?.url
                            ? baseImage + product.medias[0].url
                            : baseImage
                    }
                    alt={product.title}
                    className="w-[100px] h-[80px] p-[2px] rounded-md object-cover bg-gray-100 border"
                />
            </Link>

            <div className="flex-1 self-stretch flex flex-col justify-between w-full gap-3">

                <div className="flex flex-col h-full md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-3 items-start">

                        <Link to={`/product/${product.slug}`}>
                            <p className="font-semibold text-[15px] text-[#333] hover:underline">
                                {product.title}
                            </p>
                        </Link>

                        <PriceBlock
                            salePrice={price}
                            originalPrice={hasDiscount ? regularPrice : undefined}
                            size="sm"
                        />
                    </div>

                    <div className="flex items-center justify-between md:justify-normal gap-14">

                        <div className="flex items-center gap-2 bg-[#F8F7F8] rounded-full p-[2px]">
                            <button
                                onClick={() => increaseQuantity({ id: item.id })}
                                className="rounded-full bg-[var(--main)] hover:bg-[var(--hover-main)] text-white w-[28px] h-[28px] flex items-center justify-center"
                                title="زيادة الكمية"
                            >
                                <Plus size={16} />
                            </button>
                            <span className="text-sm font-medium text-[#333] min-w-[20px] text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => decreaseQuantity({ id: item.id })}
                                className="rounded-full bg-gray-200 hover:bg-gray-300 text-black w-[28px] h-[28px] flex items-center justify-center"
                                title="نقص الكمية"
                                disabled={item.quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                        </div>

                        <button
                            onClick={() => removeItem({ id: item.id })}
                            className="text-red-500 hover:text-red-700 transition"
                            title="حذف المنتج"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                </div>

                <div className="space-y-2">

                    {hasVariants && (
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={() => setShowVariantDetails((p) => !p)}
                                className="text-sm text-primary flex items-center gap-1 mb-2"
                            >
                                <span className="text-black">{showVariantDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}</span>
                                <motion.span
                                    animate={{ rotate: showVariantDetails ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="-rotate-45 scale-[.6] mr-[-5px]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17 7 7 17" />
                                        <path d="M17 17H7V7" />
                                    </svg>
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <VariantSelector
                                        key={item.id}
                                        cn="!bg-transparent pb-0"
                                        innerCn="!grid-cols-[auto,1fr]"
                                        labelCn="min-w-[70px] w-full"
                                        variants={product.product_variants}
                                        isVariantSelected={(variant) => {
                                            const selectedOptions = item.selectedOptions || [];
                                            return selectedOptions.some(opt => opt.startsWith(`${variant.id}_`));
                                        }}
                                        setNewOption={(variantId, optionId) => {
                                            handleVariantSelection(product.id, variantId, optionId);
                                        }}
                                        getValues={() => {
                                            return item.selectedOptions || [];
                                        }}
                                        showValidation={false}
                                        setShowValidation={() => { }}
                                        defaultCvariantCombinations={
                                            product.product_default_variant_combination
                                                .join(",") // "1549,1552"
                                                .split(",") // ["1549","1552"]
                                                .map(v => Number(v.trim())) // [1549, 1552]
                                                .filter(n => !isNaN(n))
                                        }
                                        optionsKey={`options_${product?.id}`}
                                        showVariantDetails={showVariantDetails}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};