import { ShoppingBag, Star } from "lucide-react";
import HeadTitle from "../../atoms/HeadTitle";
import Button from "../../atoms/Button";
import PriceCurrency from "../../atoms/PriceCurrency";
import { Link } from "react-router-dom";
import Img from "../../atoms/Image";
import { baseImage } from "../../../config/Api";
import { NotFoundImage } from "../../atoms/NotFoundImage";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CustomButtonsNavigate } from "../../atoms/CustomButtonsNavigate";

export const FrequentlyBoughtTogether = ({
  frequently_bought_products,
  product,
  related_products = [],
  frequentlyBoughtTotalPrice,
  isBuyNowLoading,
  errors,
  checkoutFields,
  getValues,
  handleBuyNow,
  delay = 5000
}) => {

  const frequentlyBoughtConfig = {
    spaceBetween: 10,
    loop: true,
    speed: process.env.REACT_APP_RELATED_SWIPER_SPEED || 2000,
    slideToClickedSlide: false,
    modules: [Navigation, Autoplay, Pagination],
    navigation: {
      prevEl: '.bought-prev',
      nextEl: '.bought-next',
    },
    pagination: {
      el: '.freq-products-pagination', clickable: true,
    },
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 2 },     // phones
      475: { slidesPerView: 3 },   // small tablets
      1024: { slidesPerView: 4 },  // tablets
      1280: { slidesPerView: 5 },  // laptops
    },
  };

  const relatedProductsConfig = {
    spaceBetween: 10,
    loop: true,
    speed: process.env.REACT_APP_RELATED_SWIPER_SPEED || 2000,
    slideToClickedSlide: false,
    modules: [Navigation, Autoplay, Pagination],
    navigation: {
      prevEl: '.freq-related-prev',
      nextEl: '.freq-related-next',
    },
    pagination: {
      el: '.related-freq-products-pagination', clickable: true,
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

  return frequently_bought_products?.length > 0 ? (
    <div className="" data-aos="fade-up">
      <div className="relative bg-white rounded-[8px] md:rounded-[12px] lg:rounded-[15px] px-4 py-6 sm:px-[20px] sm:pt-[30px] md:px-[25px] md:pt-[35px] lg:px-[30px] lg:pt-[40px]">

        {/* Bought Together Section */}
        <div className="relative pb-4 md:pb-6 lg:pb-8 ">
          <div className="relative flex items-center justify-between">
            <HeadTitle title="منتجات غالبًا ما يتم شراؤها مع هذا المنتج" />
            {frequently_bought_products.length > 3 && (
              <div className="relative flex items-center flex-row-reverse gap-2">
                <CustomButtonsNavigate swiperPrevClass="bought-prev !relative shrink-0 !left-auto !top-auto text-white" swiperNextClass="bought-next !relative shrink-0 !right-auto !top-auto text-white" />
              </div>
            )}
          </div>

          <Swiper {...frequentlyBoughtConfig} className={`!py-[15px] md:!py-[25px] items-stretch`}>
            <SwiperSlide key={product.id} className="!ml-3 md:!ml-4 lg:!ml-5">
              <ProductCard key={product.id ?? product.slug} product={product} />
            </SwiperSlide>
            {frequently_bought_products?.map(prod => (
              <SwiperSlide key={prod.id} className="!ml-3 md:!ml-4 lg:!ml-5">
                <ProductCard key={prod.id ?? prod.slug} product={prod} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='freq-products-pagination swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal' />
        </div>

        {/* Cart / Price Section */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="bg-gray-50 rounded-md px-3 py-2 md:px-4 lg:px-5 md:py-3 lg:py-4 text-sm md:text-base  font-medium text-[var(--main)] shadow-inner">
            إجمالي السعر:{" "}
            <span className="text-[var(--second)] font-bold">
              {frequentlyBoughtTotalPrice.toFixed(2)} ج.م
            </span>
          </div>
          <Button
            loading={isBuyNowLoading}
            cn="disabled  btn main-btn !px-6 sm:!px-8 text-sm sm:text-base shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            name="اشترِ الآن"
            icon={<ShoppingBag />}
            disabled={
              Object.keys(errors).length > 0 ||
              checkoutFields.some(
                (field) =>
                  field.is_required &&
                  !getValues(field.backend_field_name)
              )
            }
            onclick={handleBuyNow}
          />
        </div>

        {/* Related Products Section */}
        {related_products.length > 0 && (
          <div className="relative mt-8 sm:mt-10 lg:mt-12">
            <div className="flex items-center justify-between">
              <HeadTitle title="منتجات ذات صلة" />
              {related_products.length > 4 && (
                <div className="relative flex items-center flex-row-reverse gap-2">
                  <CustomButtonsNavigate swiperPrevClass="freq-related-prev !relative shrink-0 !left-auto !top-auto" swiperNextClass="freq-related-next !relative shrink-0 !right-auto !top-auto" />
                </div>
              )}
            </div>

            <Swiper {...relatedProductsConfig} className={`!pt-[15px] md:!pt-[25px] items-stretch`}>
              {related_products?.map(p => (
                <SwiperSlide key={p.id} className="!ml-3 md:!ml-4 lg:!ml-5">
                  <ProductCard product={p} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='related-freq-products-pagination swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal' />
          </div>
        )}

      </div>
    </div>
  ) : null;
}

function ProductCard({ product, className = "" }) {
  const special = Number(product?.price?.special_price || 0);
  const regular = Number(product?.price?.regular_price || 0);

  const discountPercentage =
    product?.price?.regular_price && product?.price?.special_price
      ? ((product.price.regular_price - product.price.special_price) / product.price.regular_price) * 100
      : 0;

  return (
    <div
      aria-label={product.title}
      data-aos="fade-up" style={{ transition: 'box-shadow 0.3s ease' }}
      className={`
        product-card space-y-[7px] md:space-y-[9px]
        min-h-[224px] md:min-h-[385px]
        p-[10px] sm:p-[12px] md:p-[14px] lg:p-[16px] xl:p-[20px]
        group product-item border border-[#EEEEEE] relative bg-white text-black
        rounded-[5px] h-full flex flex-col w-full max-w-[400px] mx-auto
        transition-transform hover:-translate-y-1
        ${className}
      `}
    >

      {/* IMAGE */}
      <Link
        to={`/product/${product.slug}`}
        className="img-switcher-2 relative h-[92px] md:h-[179px] mb-[10px] md:mb-[18px] block"
      >
        {product.medias?.[0] ? (
          <Img
            src={baseImage + product.medias[0].url}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover rounded-[5px]"
          />
        ) : (
          <NotFoundImage productId={product?.id} unique={Math.random()} />
        )}

        {discountPercentage > 0 && (
          <span
            className="
              absolute shadow-xl top-[11px] left-[7.5px] z-[10]
              text-[7px] md:text-[10px] bg-[var(--second)] text-white
              px-[5px] md:px-[10px] py-[5px] rounded-[5px]
            "
          >
            خصم {discountPercentage.toFixed(0)}%
          </span>
        )}
      </Link>

      {/* TITLE */}
      <Link to={`/product/${product.slug}`}>
        <h4
          className="
            title text-center w-full block text-[var(--black-1)]
            text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]
            overflow-hidden text-ellipsis whitespace-nowrap leading-tight
          "
        >
          {product.title}
        </h4>
      </Link>

      {/* PRICE */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-[var(--second)] text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
          <PriceCurrency currency="ج.م" price={special} />
        </span>

        {regular > 0 && regular !== special && (
          <span className="text-[8px] sm:text-[10px] md:text-[11px] lg:text-[12px] text-gray-400 line-through">
            <PriceCurrency currency="ج.م" price={regular} />
          </span>
        )}
      </div>

      {/* CTA BUTTON */}
      <div className="w-full mt-auto pt-[10px] md:pt-[21px]">
        <Link
          to={`/product/${product?.slug}`}
          className="
            btn-blue text-white bg-[var(--main)] buy-btn flex-1 text-center text-nowrap flex items-center justify-center gap-1
            text-[8px] sm:text-[10px] md:text-[12px] lg:text-[15px]
            rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px]
            p-[5px] sm:p-[6px] md:p-[8px] lg:p-[10px]
            h-[20px] md:h-[30px] lg:h-[40px]
          "
        >
          شراء الان
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
      </div>
    </div>
  );
}

