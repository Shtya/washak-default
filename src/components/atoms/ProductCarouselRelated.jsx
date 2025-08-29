import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useNavigate } from 'react-router-dom';
import HeadTitle from './HeadTitle';
import { baseImage } from '../../config/Api';
import Img from './Image';
import { PriceBlock } from './PriceCurrency';
import { ShoppingCart } from 'lucide-react';
import { useAddToCart } from '../../hooks/cart/useAddToCart';
import { NotFoundImage } from './NotFoundImage';
import { getProductImageId } from '../../helper/getProductImageId';
import ProductImageSwitcher from './ProductImageSwitcher';

export default function ProductCarouselRelated({ btnName = 'شراء الان', order, btnIcon = '/icons/buy.png', loading, bg, cn, arrowTop, products, title, subTitle, delay = 5000 }) {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1400) setCount(5);
      else if (width >= 1200) setCount(4); // Fixed condition
      else if (width >= 950) setCount(3);
      else if (width >= 650) setCount(2);
      else setCount(1);
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const config = {
    spaceBetween: 10,
    loop: true,
    speed: process.env.REACT_APP_RELATED_SWIPER_SPEED || 2000,
    slideToClickedSlide: false,
    modules: [Navigation, Autoplay, Pagination],
    navigation: {
      prevEl: '.custom-prev',
      nextEl: '.custom-next',
    },
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
    },
    breakpoints: {
      1400: { slidesPerView: 4 },
      950: { slidesPerView: 3 },
      650: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
  };

  const showArrows = products?.length > count;


  if (products?.length <= 0) return null;

  return (
    <div className={` ${!products && ' !hidden'} relative max-sm:!px-[20px]   `} style={{ order: order }}>
      <div className={`container ${cn} `}>
        <div className={`relative ${bg} `}>
          <HeadTitle desc={subTitle} title={title} arrowTop={arrowTop} />

          {loading ? (
            <div className=' flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
              {Array(count)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : (
            <>
              <Swiper {...config} className={`!py-[50px] items-stretch ${arrowTop ? '!px-0' : 'md:!px-[5px]'}`}>
                {products?.map(p => (
                  <SwiperSlide key={p.id}>
                    <RelatedProductCard product={p} btnName={btnName} baseImage={baseImage} />
                  </SwiperSlide>
                ))}

                <div className='swiper-pagination !mt-6' />
              </Swiper>

              {showArrows && (
                <>
                  <button className='max-sm:hidden bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1] custom-prev w-[35px] h-[35px] rounded-full flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors'>
                    <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M4.71592 0.920471L1.13637 4.50002M1.13637 4.50002L4.71592 8.07956M1.13637 4.50002H13.8636' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </button>
                  <button className='max-sm:hidden bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1] custom-next w-[35px] h-[35px] rounded-full flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors'>
                    <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M10.284 0.920471L13.8635 4.50002M13.8635 4.50002L10.284 8.07956M13.8635 4.50002H1.13623' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function RelatedProductCard({ product, btnName = "شراء الان", baseImage }) {
  const { handleAddToCart } = useAddToCart();
  const [isHovered, setIsHovered] = useState(false);
  const uniqueRef = useRef(Math.random().toString(36).substring(2, 9));
  const router = useNavigate();

  const discountPercentage =
    product?.price?.regular_price && product?.price?.special_price
      ? ((product?.price.regular_price - product?.price.special_price) / product?.price.regular_price) * 100
      : 0;

  const fakeDate =
    typeof product?.price?.fake_product_stock === "string"
      ? JSON.parse(product?.price?.fake_product_stock)
      : product?.price?.fake_product_stock;

  const mainImage = product?.medias?.[0]?.url ? baseImage + product?.medias?.[0]?.url : null;
  const hoverImage = product?.medias?.[1]?.url ? baseImage + product?.medias?.[1]?.url : null;
  const getImageId = () => {
    const hasImages = product?.medias?.length > 0;
    return getProductImageId({ hasImages, productHoverImage: hoverImage, productId: product?.id, isHovered, uniqueValue: uniqueRef.current })
  };

  return (
    <div
      className="min-h-[537px] group product-item shadow-sm border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product?.slug}`} className="block img-switcher-2 relative">
        {discountPercentage && discountPercentage?.toFixed(0) > 0 && (
          <span className="absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]">
            {discountPercentage.toFixed(0)}%
          </span>
        )}

        {fakeDate?.status === "1" && (
          <span className="absolute shadow-xl top-[5px] right-[5px] z-[10] text-[10px] bg-red-500 text-white px-[10px] py-[5px] rounded-[6px]">
            متبقي {fakeDate?.left} فقط
          </span>
        )}

        <ProductImageSwitcher
          mainImage={mainImage}
          hoverImage={hoverImage}
          title={product?.title}
          productId={product?.id}
          unique={uniqueRef.current}
        />
      </Link>

      {/* middle content */}
      <div className="flex-1 flex flex-col items-center justify-start text-center mt-3">
        {product?.categories?.[0]?.name && (
          <span className="bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[6px] block">
            {product?.categories?.[0]?.name}
          </span>
        )}

        <Link to={`/product/${product?.slug}`} >
          <span
            className="w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap px-2"
            title={product?.title}
          >
            {product?.title}
          </span>
        </Link>
        <div className="mt-2 w-full">
          <PriceBlock salePrice={product?.price.special_price} originalPrice={product?.price.regular_price} />
        </div>
      </div>

      {/* button row stays at the bottom */}
      <div className="flex items-center justify-between gap-2 mt-[10px]">
        <div
          onClick={() => router(`/product/${product?.slug}`)}
          className="btn-blue flex-1 text-center py-2 rounded-md cursor-pointer"
        >
          {btnName}
          <img src="/icons/buy.png" alt="" width={20} height={20} />
        </div>

        <button
          onClick={() => {
            const imageId = getImageId();
            handleAddToCart(product, imageId);
          }}
          className="h-[40px] w-[40px] flex items-center justify-center bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md"
          title="أضف إلى السلة"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}

const SkeletonCard = () => (
  <div className=' animate-pulse flex-1 group shadow-sm border border-[#EEEEEE] bg-white rounded-lg p-3'>
    <div className='bg-gray-200 h-[230px] rounded mb-4' />
    <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
    <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
    <div className='flex justify-center gap-2 mb-4'>
      <div className='h-4 bg-gray-200 rounded w-1/4' />
      <div className='h-4 bg-gray-200 rounded w-1/6' />
    </div>
    <div className='h-8 bg-gray-200 rounded w-full' />
  </div>
);
