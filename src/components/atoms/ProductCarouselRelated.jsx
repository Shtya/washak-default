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
import { CustomButtonsNavigate } from './CustomButtonsNavigate';

export default function ProductCarouselRelated({ btnName = 'شراء الان', order, btnIcon = '/icons/buy.png', loading, bg, cn, arrowTop, products, title, subTitle, delay = 5000 }) {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1400) setCount(5);
      else if (width >= 1280) setCount(5); // Fixed condition
      else if (width >= 1024) setCount(4);
      else if (width >= 475) setCount(3);
      else setCount(2);
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
      prevEl: '.iso-related-prev',
      nextEl: '.iso-related-next',
    },
    pagination: {
      el: '.related-products-pagination', clickable: true,
    },
    freeMode: true, autoplay: {
      delay: delay,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: { slidesPerView: 2 },     // phones
      475: { slidesPerView: 3 },   // small tablets
      1024: { slidesPerView: 4 },   // tablets
      1280: { slidesPerView: 5 },  // laptops
    },
  };

  const showArrows = products?.length > count;


  if (products?.length <= 0) return null;

  return (
    <div className={` ${!products && ' !hidden'} related-products relative `} style={{ order: order }}>
      <div className={`${cn} `}>
        <div className={`relative px-4 py-6 sm:px-[20px] sm:pt-[30px] md:px-[25px] md:pt-[35px] lg:px-[30px] lg:pt-[40px] bg-white rounded-[8px] md:rounded-[12px] lg:rounded-[15px]  ${bg} `}>
          <div className="flex items-center justify-between">
            <HeadTitle desc={subTitle} title={title} arrowTop={arrowTop} align="start" />

            {showArrows && (
              <div className="relative flex items-center flex-row-reverse gap-2">

                <CustomButtonsNavigate
                  swiperPrevClass="iso-related-prev !relative shink-0 !left-auto !top-auto"
                  swiperNextClass="iso-related-next !relative shink-0 !right-auto !top-auto"
                />
              </div>
            )}
          </div>

          {loading ? (
            <div className={`flex flex-nowrap overflow-x-hidden gap-4 lg:gap-5 !py-[15px] md:!py-[25px]`}>
              {Array(count)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : (
            <>
              <Swiper {...config} className={`!py-[15px] md:!py-[25px]  items-stretch ${arrowTop ? '!px-0' : ''}`}>
                {products?.map(p => (
                  <SwiperSlide key={p.id} className='!ml-3 md:!ml-4 lg:!ml-5'>
                    <RelatedProductCard product={p} btnName={btnName} baseImage={baseImage} />
                  </SwiperSlide>
                ))}

              </Swiper>
              <div className='related-products-pagination swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal' />
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
    return getProductImageId({
      hasImages,
      productHoverImage: hoverImage,
      productId: product?.id,
      isHovered,
      uniqueValue: uniqueRef.current
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        related-product-card product-card
        space-y-[7px] md:space-y-[9px]
        min-h-[224px] md:min-h-[385px]
        p-[10px] sm:p-[12px] md:p-[14px] lg:p-[16px] xl:p-[20px]
        group product-item border border-[#EEEEEE] relative bg-white text-black
        rounded-[5px] h-full flex flex-col w-full max-w-[400px] mx-auto
      "
    >
      {/* IMAGE */}
      <Link
        to={`/product/${product?.slug}`}
        className="img-switcher-2 relative h-[92px] md:h-[179px] mb-[10px] md:mb-[18px] block"
      >
        {discountPercentage > 0 && (
          <span
            className="
              absolute shadow-xl top-[11px] left-[7.5px] z-[10]
              text-[7px] md:text-[10px] bg-[var(--second)] text-white
              px-[5px] md:px-[10px] py-[5px] rounded-[5px]
            "
          >
            {discountPercentage.toFixed(0)}%
          </span>
        )}

        {fakeDate?.status == "1" && (
          <span
            className="
              absolute shadow-xl top-[11px] right-[7.5px] z-[10]
              text-[7px] md:text-[10px] bg-red-500 text-white
              px-[5px] md:px-[10px] py-[5px] rounded-[5px]
            "
          >
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

      {/* CATEGORY */}
      {product?.categories?.[0]?.name && (
        <span
          className="
            category bg-[#F8F8F9] text-[#A0A9BB] shadow-sm w-fit !mt-0
            text-[7px] md:text-[10px] rounded-[10px] block mx-auto
            px-[10px] md:px-[20px] py-[3px] md:py-[5px]
          "
        >
          {product?.categories?.[0]?.name}
        </span>
      )}

      {/* TITLE */}
      <Link to={`/product/${product?.slug}`}>
        <span
          className="
            title text-center w-full block text-[var(--black-1)]
            text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]
            overflow-hidden text-ellipsis whitespace-nowrap
          "
          title={product?.title}
        >
          {product?.title}
        </span>
      </Link>

      {/* PRICE */}
      <PriceBlock
        salePrice={product?.price.special_price}
        originalPrice={product?.price.regular_price}
      />

      {/* BUTTONS */}
      <div className="flex items-center justify-between gap-[10px] mt-auto pt-[10px] md:pt-[21px]">
        <div
          onClick={() => router(`/product/${product?.slug}`)}
          className="
            btn-blue text-white bg-[var(--main)] buy-btn flex-1 text-center text-nowrap flex items-center justify-center gap-1
            text-[8px] sm:text-[10px] md:text-[12px] lg:text-[15px]
            rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px]
            p-[5px] sm:p-[6px] md:p-[8px] lg:p-[10px]
            h-[20px] md:h-[30px] lg:h-[40px]
            cursor-pointer
          "
        >
          {btnName}
          <img src="/icons/buy.png" alt="" className="w-[12px] md:w-[15px] lg:w-[18px]" />
        </div>

        <button
          onClick={() => {
            const imageId = getImageId();
            handleAddToCart(product, imageId);
          }}
          className="
            h-[20px] md:h-[30px] lg:h-[40px] aspect-square flex items-center justify-center
            bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300
            text-white rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px]
            transition-all shadow-md
          "
          title="أضف إلى السلة"
        >
          <ShoppingCart className="w-[12px] md:w-[15px] lg:w-[18px] h-[12px] md:h-[15px] lg:h-[18px]" />
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
