'use client';
import FeatureList from '../components/molecules/FeatureList';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import { useState, useRef } from 'react';
import Breadcrumb from '../components/atoms/Breadcrumb';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import EmptyState from '../components/atoms/EmptyState';
import { PriceBlock } from '../components/atoms/PriceCurrency';
import { Pagination } from '../components/molecules/Pagination';
import { useAddToCart } from '../hooks/cart/useAddToCart';
import { useProductsWithCategories } from '../hooks/Product/useProducts';
import ErrorDisplay from '../components/atoms/ErrorDisplay';
import { getProductImageId } from '../helper/getProductImageId';
import ProductImageSwitcher from '../components/atoms/ProductImageSwitcher';
import { Helmet } from 'react-helmet';
import SkeletonCard from '../components/skeleton/SkeletonCard';

export default function Products() {
  const {
    breadcrumbRoutes,
    currentPage,
    currentCategory,
    categories,
    productsError,
    refetchProducts,
    products,
    pageCount,
    productsLoading,
    categoriesLoading,
    categoriesError,
    setPage,
    setCategory,
  } = useProductsWithCategories();

  const PproductsStatusCode = productsError?.statusCode;
  const currentCategoryLabel = categories.find(cat => cat.slug === currentCategory)?.label;

  if ((productsError && PproductsStatusCode != 404) || categoriesError) {
    return <ErrorDisplay
      error={productsError}
      onRetry={refetchProducts}
      title="حدث خطأ أثناء تحميل المنتجات"
      message="تعذّر تحميل المنتجات الآن. يرجى المحاولة مرة أخرى."
      className='mx-auto col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4'
    />
  }


  return (
    <>
      <Helmet>
        <title>
          {currentCategoryLabel
            ? `${currentCategoryLabel}`
            : `كل المنتجات`}
        </title>
      </Helmet>
      <div className="products "
        style={{ background: "var(--category_page_color,  #f8fafb)" }}
      >
        <div className=" flex flex-col">
          <div className='container max-md:!px-2.5 !py-3 md:!py-4 lg:!py-6'>


            <div
              data-aos="fade-up"
              className="
    flex flex-wrap
    gap-[8px] sm:gap-[10px] md:gap-[14px] lg:gap-[20px]
  "
            >
              {categoriesLoading
                ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`cat-skeleton-${index}`}
                      className="
              bg-gray-200 rounded-full animate-pulse
              h-[28px] sm:h-[34px] md:h-[40px] lg:h-[45px]
              w-[70px] sm:w-[85px] md:w-[100px] lg:w-[120px]
            "
                    />
                  ))
                : categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.slug || 'all')}
                    className={`
            category-btn border rounded-full font-medium transition-all duration-300
            px-[10px] sm:px-[12px] md:px-[14px] lg:px-[18px]
            py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px]
            min-h-[28px] sm:min-h-[34px] md:min-h-[40px] lg:min-h-[45px]
            text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px]
            ${(cat.slug || 'all') === currentCategory
                        ? 'active scale-[1.1]'
                        : 'hoverable hover:border-transparent hover:scale-[1.05]'}`}
                  >
                    {cat.label}
                  </button>
                ))}
            </div>

            <Breadcrumb cn={"!mb-[25px]"} routes={breadcrumbRoutes} />

            <div className="bg-white  p-2 md:p-4 lg:p-6 2xl:p-8 rounded-[8px] md:rounded-[12px] lg:rounded-[15px] grid grid-cols-2  xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5  md:gap-4 lg:gap-5">
              {productsLoading
                ? Array(12)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
                : products?.map((p, index) => (
                  <PaginatedProductCard key={p.id} index={index} product={p} />
                ))}

              {products?.length === 0 && !productsLoading && <EmptyState className='mx-auto col-span-2 xs:col-span-3 lg:col-span-4 xl:col-span-5' />}
            </div>

            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setPage}
            />
          </div>
          {/* <div className='mt-auto '>
            <FeatureList />
          </div> */}
        </div>
      </div>
    </>
  );
}

const PaginatedProductCard = ({ product, index }) => {
  const { handleAddToCart } = useAddToCart();
  const [isHovered, setIsHovered] = useState(false);

  const uniqueRef = useRef(Math.random().toString(36).substring(2, 9));

  const hasImages = product?.image || product?.secondImage;
  const getImageId = () => {
    return getProductImageId({
      hasImages,
      productHoverImage: product?.secondImage,
      productId: product?.id,
      isHovered,
      uniqueValue: uniqueRef.current
    });
  };

  return (
    <div
      data-aos={`${index % 2 === 0 ? "fade-up" : "fade-down"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        product-card space-y-[7px] md:space-y-[9px] 
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
        {product?.discountLabel && (
          <span
            className="
              discount-percentage absolute shadow-xl top-[11px] left-[7.5px] z-[10]
              text-[7px] md:text-[10px] bg-[var(--second)] text-white
              px-[5px] md:px-[10px] py-[5px] rounded-[5px]
            "
          >
            {product?.discountLabel}
          </span>
        )}

        {product?.fakeStock?.status && (
          <span
            className="
              absolute shadow-xl top-[11px] right-[7.5px] z-[10]
              text-[7px] md:text-[10px] bg-red-500 text-white
              px-[5px] md:px-[10px] py-[5px] rounded-[5px]
            "
          >
            متبقي {product?.fakeStock.left} فقط
          </span>
        )}

        <ProductImageSwitcher
          mainImage={product?.image}
          hoverImage={product?.secondImage}
          title={product?.title}
          productId={product?.id}
          unique={uniqueRef.current}
        />
      </Link>

      {/* CATEGORY */}
      <span
        className="
          category bg-[#F8F8F9] text-[#A0A9BB] shadow-sm w-fit !mt-0
          text-[7px] md:text-[10px] rounded-[10px] block mx-auto
          px-[10px] md:px-[20px] py-[3px] md:py-[5px]
        "
      >
        {product?.cta}
      </span>

      {/* TITLE */}
      <span
        className="
          title text-center w-full block text-[var(--black-1)]
          text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]
          overflow-hidden text-ellipsis whitespace-nowrap
        "
      >
        {product?.title}
      </span>

      {/* PRICE */}
      <PriceBlock
        ar
        salePrice={product?.salePrice}
        originalPrice={product?.originalPrice}
      />

      {/* BUTTONS */}
      <div className="flex items-center justify-between gap-[10px] mt-auto pt-[10px] md:pt-[21px]">
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
};
