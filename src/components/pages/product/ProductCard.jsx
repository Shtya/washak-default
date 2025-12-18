import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PriceBlock } from "../../atoms/PriceCurrency";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "../../../hooks/cart/useAddToCart";
import { getProductImageId } from "../../../helper/getProductImageId";
import ProductImageSwitcher from "../../atoms/ProductImageSwitcher";


export default function ProductCard({ product, buyText = 'شراء الان' }) {
    const { handleAddToCart } = useAddToCart();
    const [isHovered, setIsHovered] = useState(false);
    // ✅ stable random suffix for unique IDs
    const uniqueRef = useRef(Math.random().toString(36).substring(2, 9));

    const getImageId = () => {
        const hasImages = product?.images?.length > 0;
        return getProductImageId({ hasImages, productHoverImage: product?.images?.[1]?.cdn_url, productId: product?.id, isHovered, uniqueValue: uniqueRef.current })
    };


    return (
        <div
            className='product-card space-y-[7px] md:space-y-[9px] min-h-[224px] md:min-h-[385px] 
  p-[10px] sm:p-[12px] md:p-[14px] lg:p-[16px] xl:p-[20px]
  group product-item border border-[#EEEEEE] relative bg-white text-black 
  rounded-[5px] h-full flex flex-col'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                to={`/product/${product?.slug}`}
                className='img-switcher-2 relative h-[92px] md:h-[179px] mb-[10px] md:mb-[18px] block'
            >
                {product?.discount_percentage && (
                    <span className='discount-percentage absolute shadow-xl top-[11px] left-[7.5px] z-[10] 
      text-[7px] md:text-[10px] bg-[var(--second)] text-white 
      px-[5px] md:px-[10px] py-[5px] rounded-[5px]'>
                        خصم {product?.discount_percentage}%
                    </span>
                )}

                <ProductImageSwitcher
                    mainImage={product?.images?.[0]?.cdn_url}
                    hoverImage={product?.images?.[1]?.cdn_url}
                    title={product?.title}
                    productId={product?.id}
                    unique={uniqueRef.current}
                />
            </Link>

            <span className='category bg-[#F8F8F9] text-[#A0A9BB] :p-2 lg:p-2.5 shadow-sm w-fit  !mt-0
  text-[7px] md:text-[10px] rounded-[10px] block mx-auto'>
                {product?.category}
            </span>

            <Link
                to={`/product/${product?.slug}`}
                className='title text-center w-full block text-[var(--black-1)] 
    text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]
    overflow-hidden text-ellipsis whitespace-nowrap'
                title={product?.title}
            >
                {product?.title}
            </Link>

            <PriceBlock
                originalPrice={product?.price?.regular}
                salePrice={product?.price?.current}
                ar
            />

            <div className='flex items-center justify-between gap-[10px] mt-auto pt-[10px] md:pt-[21px]'>
                <Link
                    to={`/product/${product?.slug}`}
                    className='btn-blue buy-btn 
      text-[8px] sm:text-[10px] md:text-[12px] lg:text-[15px]
      rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px] p-[5px] sm:p-[6px] md:p-[8px] lg:p-[10px]
      h-[20px] md:h-[30px] lg:h-[40px]
      flex-1 text-center text-nowrap flex items-center justify-center gap-1'
                >
                    {buyText}

                    <svg
                        className="w-[12px] md:w-[15px] lg:w-[18px] h-[12px] md:h-[15px] lg:h-[18px]"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
          1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 
          0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 
          7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 
          10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 
          .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 
          0 0 1 .75 0Z"
                        />
                    </svg>
                </Link>

                <button
                    onClick={() => {
                        const imageId = getImageId()
                        handleAddToCart(product, imageId)
                    }}
                    className=' h-[20px] md:h-[30px] lg:h-[40px] aspect-square flex items-center justify-center 
      bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 
      text-white  rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px]  transition-all shadow-md'
                    title='أضف إلى السلة'
                >
                    <ShoppingCart className="w-[12px] md:w-[15px] lg:w-[18px] h-[12px] md:h-[15px] lg:h-[18px]" />
                </button>
            </div>
        </div>

    )
}