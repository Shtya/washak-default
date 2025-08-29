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

  return frequently_bought_products?.length > 0 ? (
    <div className="container max-md:px-4 mb-10 pb-12" data-aos="fade-up">
      <div className="bg-white rounded-md p-6 shadow-sm">


        {/* Bought Together Grid */}
        {/* <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 items-stretch mt-6 gap-6 xl:gap-10">
          <ProductCard product={product} />
          {frequently_bought_products.map((prod) => (
            <ProductCard key={prod.id ?? prod.slug} product={prod} />
          ))}
        </div> */}

        <div className="mt-12">
          <HeadTitle title="منتجات غالبًا ما يتم شراؤها مع هذا المنتج" />
          <Swiper {...config} className={`!py-[50px] items-stretch md:!px-[5px]`}>
            <SwiperSlide key={product.id}>
              <ProductCard key={product.id ?? product.slug} product={product} />
            </SwiperSlide>
            {frequently_bought_products?.map(prod => (
              <SwiperSlide key={prod.id}>
                <ProductCard key={prod.id ?? prod.slug} product={prod} />
              </SwiperSlide>
            ))}

            <div className='swiper-pagination !mt-6' />
          </Swiper>

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
        </div>



        {/* Cart / Price Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
          <div className="bg-gray-50 rounded-md px-5 py-3 text-lg font-medium text-[var(--main)] shadow-inner">
            إجمالي السعر:{" "}
            <span className="text-[var(--second)] font-bold">
              {frequentlyBoughtTotalPrice.toFixed(2)} ج.م
            </span>
          </div>
          <Button
            loading={isBuyNowLoading}
            cn="disabled !h-[50px] !px-8 text-base shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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

        {related_products.length > 0 && <div className="mt-12">
          <HeadTitle title="منتجات ذات صلة" />
          <Swiper {...config} className={`!py-[50px] items-stretch md:!px-[5px]`}>
            {related_products?.map(p => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}

            <div className='swiper-pagination !mt-6' />
          </Swiper>

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
        </div>}

      </div>
    </div>
  ) : null
}


function ProductCard({ product, className = "" }) {
  const special = Number(product?.price?.special_price || 0);
  const regular = Number(product?.price?.regular_price || 0);
  const saving = regular > special ? regular - special : 0;

  const discountPercentage =
    product?.price?.regular_price && product?.price?.special_price
      ? ((product.price.regular_price - product.price.special_price) / product.price.regular_price) * 100
      : 0;

  return (
    <div
      aria-label={product.title}
      className={
        [
          // layout
          "group w-full h-full min-w-0 p-4 sm:p-5 flex flex-col items-stretch text-center gap-3",
          // visuals
          "bg-white rounded-xl border border-[var(--border-bg)] shadow-sm hover:shadow-md",
          // motion
          "transition-transform hover:-translate-y-1",
          className
        ].join(" ")
      }
      data-aos="fade-up"
    >
      {/* image + discount badge */}
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100">
        <Link
          to={`/product/${product.slug}`}
        >
          {product.medias?.[0] ? (
            <Img
              src={baseImage + product.medias[0].url}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <NotFoundImage productId={product?.id} unique={Math.random()} />
          )}

          {discountPercentage && discountPercentage.toFixed(0) > 0 && (
            <div className="absolute top-3 left-3 bg-[--second] text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              خصم <span className="font-bold">{discountPercentage.toFixed(0)}%</span>
            </div>
          )}
        </Link>
      </div>


      {/* title */}
      <Link to={`/product/${product.slug}`}>
        <h4 className="w-full text-sm sm:text-base font-semibold text-[var(--black-1)] leading-tight line-clamp-2">
          {product.title}
        </h4>
      </Link>

      {/* price block */}
      <div className="flex items-end gap-3 justify-center flex-wrap">
        <div className="flex items-baseline gap-1">
          <span className="text-[var(--second)]  text-base sm:text-base">
            <PriceCurrency currency="ج.م" price={special} />
          </span>
          {regular > 0 && regular !== special && (
            <span className="text-xs text-gray-400 line-through">
              <PriceCurrency currency="ج.م" price={regular} />
            </span>
          )}
        </div>
      </div>

      {/* reviews */}
      {/* {product.review_enable != 0 && (
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <span className='flex items-center text-[#FFC62A]'>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className='!fill-[#FFC62A] w-4 h-4' />
              ))}
          </span>
          <span>({product.no_of_reviews}) تقييمات</span>
        </div>
      )} */}

      {/* small CTA */}
      <div className="w-full mt-auto">
        <div className="mt-1 flex items-center justify-center">
          <Link to={`/product/${product?.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
            شراء الان
            <img src="/icons/buy.png" alt='' width={20} height={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}


