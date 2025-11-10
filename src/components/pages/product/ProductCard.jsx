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


    return <div className='product-card min-h-[487.5px] group product-item shadow-sm border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 h-full flex flex-col' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link to={`/product/${product?.slug}`} className='img-switcher-2 relative  block'>
            {product?.discount_percentage && <span className='discount-percentage absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>خصم {product?.discount_percentage}%</span>}
            <ProductImageSwitcher
                mainImage={product?.images?.[0]?.cdn_url}
                hoverImage={product?.images?.[1]?.cdn_url}
                title={product?.title}
                productId={product?.id}
                unique={uniqueRef.current}
            />
        </Link>

        <span className='category bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[15px] block mx-auto'>{product?.category}</span>

        <Link to={`/product/${product?.slug}`} className='title text-center w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap' title={product?.title}>
            {product?.title}
        </Link>

        <PriceBlock originalPrice={product?.price?.regular} salePrice={product?.price?.current} ar />

        <div className='flex items-center justify-between gap-2 mt-auto'>
            <Link to={`/product/${product?.slug}`} className='btn-blue buy-btn flex-1 text-center py-2 rounded-md'>
                {buyText}
                {/* <img src='/icons/buy.png' alt='' width={20} height={20} /> */}
                <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                </svg>
            </Link>

            <button onClick={() => {
                const imageId = getImageId()
                handleAddToCart(product, imageId);
            }} className='h-[40px] w-[40px] flex items-center justify-center bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md' title='أضف إلى السلة'>
                <ShoppingCart size={18} />
            </button>
        </div>
    </div>
}