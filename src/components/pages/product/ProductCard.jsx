import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Img from "../../atoms/Image";
import { PriceBlock } from "../../atoms/PriceCurrency";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "../../../hooks/cart/useAddToCart";
import { NotFoundImage } from "../../atoms/NotFoundImage";
import { getProductImageId } from "../../../helper/getProductImageId";
import ProductImageSwitcher from "../../atoms/ProductImageSwitcher";


export default function ProductCard({ product, buyText = 'شراء الان' }) {
    const { handleAddToCart } = useAddToCart();
    const [isHovered, setIsHovered] = useState(false);
    // ✅ stable random suffix for unique IDs
    const uniqueRef = useRef(Math.random().toString(36).substring(2, 9));

    const getImageId = () => {
        const hasImages = product?.images?.length > 0;
        return getProductImageId({ hasImages, productMainImage: product?.images?.[1]?.cdn_url, productId: product?.id, isHovered, uniqueValue: uniqueRef.current })
    };


    return <div className='min-h-[487.5px] group product-item shadow-sm border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 h-full flex flex-col' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link to={`/product/${product?.slug}`} className='img-switcher-2 relative  block'>
            {product?.discount_percentage && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>خصم {product?.discount_percentage}%</span>}
            <ProductImageSwitcher
                mainImage={product?.images?.[0]?.cdn_url}
                hoverImage={product?.images?.[1]?.cdn_url}
                title={product?.title}
                productId={product?.id}
                unique={uniqueRef.current}
            />
        </Link>

        <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[15px] block mx-auto'>{product?.category}</span>

        <Link to={`/product/${product?.slug}`} className='text-center w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap' title={product?.title}>
            {product?.title}
        </Link>

        <PriceBlock originalPrice={product?.price?.regular} salePrice={product?.price?.current} ar />

        <div className='flex items-center justify-between gap-2 mt-auto'>
            <Link to={`/product/${product?.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
                {buyText}
                <img src='/icons/buy.png' alt='' width={20} height={20} />
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