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
            className="relative flex items-start flex-col gap-3 lg:gap-4 px-2.5 py-2 sm:px-3.5 sm:py-2.5 lg:px-[18px] lg:py-3 rounded-lg border border-[var(--border-bg)] bg-white">
            <div className="flex-1 w-full flex items-start gap-3 lg:gap-4">
                <Link to={`/product/${product.slug}`} className="flex-none">
                    <img
                        src={
                            product.medias?.[0]?.url
                                ? baseImage + product.medias[0].url
                                : baseImage
                        }
                        alt={product.title}
                        className=" w-[70px] h-[60px] sm:w-[85px] sm:h-[70px] lg:w-[100px] lg:h-[82px] p-[2px] rounded-md object-cover "
                    />
                </Link>

                <div className="flex-1 grid grid-cols-4 gap-3 lg:gap-4">
                    <div className="col-span-4 md:col-span-2 flex items-center gap-3 lg:gap-4">

                        <div className="flex flex-col gap-3 items-start">

                            <Link to={`/product/${product.slug}`}>
                                <p className="font-semibold text-[10px] sm:text-[12px] md:text-[15px] lg:text-[14px] text-[#333] hover:underline">
                                    {product.title}
                                </p>
                            </Link>

                            <PriceBlock
                                salePrice={price}
                                originalPrice={hasDiscount ? regularPrice : undefined}
                                size="sm"
                            />
                        </div>
                    </div>

                    <div className="md:flex md:justify-start md:items-center max-md:col-span-2">
                        <div className="w-fit flex items-center gap-2 bg-[#F8F7F8] rounded-full p-[2px]">
                            <button
                                onClick={() => increaseQuantity({ id: item.id })}
                                className="rounded-full bg-[var(--main)] hover:bg-[var(--hover-main)] text-white    w-[20px] h-[20px] md:w-[24px] md:h-[24px]  lg:w-[26px] lg:h-[26px]  xl:w-[28px] xl:h-[28px]  flex items-center justify-center"
                                title="زيادة الكمية"
                            >
                                <Plus size={14} className="sm:size-[15px] md:size-[16px] lg:size-[16px]" />
                            </button>
                            <span className=" text-[9px] sm:text-[12px] lg:text-[14px] font-medium text-[#333] min-w-[20px] text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => decreaseQuantity({ id: item.id })}
                                className="rounded-full bg-gray-200 hover:bg-gray-300 text-black  w-[20px] h-[20px] md:w-[24px] md:h-[24px]  lg:w-[26px] lg:h-[26px]  flex items-center justify-center"
                                title="نقص الكمية"
                                disabled={item.quantity <= 1}
                            >
                                <Minus size={14} className="sm:size-[15px] md:size-[16px] lg:size-[16px]" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end max-md:col-span-2">

                        <button
                            onClick={() => removeItem({ id: item.id })}
                            className=" bg-[#FFF2F2] rounded-full text-red-500 hover:text-red-700 transition w-[24px] h-[24px]  sm:w-[28px] sm:h-[28px] lg:w-[35px] lg:h-[35px] flex items-center justify-center"
                            title="حذف المنتج"
                        >
                            <Trash2
                                size={14}                    /* mobile */
                                className="sm:size-[15px] lg:size-[17px]"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {hasVariants && <div className="space-y-2 ">


                <div className="mt-2">
                    <button
                        type="button"
                        onClick={() => setShowVariantDetails((p) => !p)}
                        className="flex items-center gap-1 mb-2 text-primary text-[12px] md:text-[13px] lg:text-[14px]
  "
                    >
                        <span className="text-black">
                            {showVariantDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                        </span>

                        <motion.span
                            animate={{ rotate: showVariantDetails ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg
                                className=" -rotate-45 scale-[0.5] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.7] mr-[-4px]
      "
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

            </div>}

        </div>
    );
};