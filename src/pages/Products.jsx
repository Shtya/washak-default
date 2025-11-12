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
        <div className=" max-sm:!px-[20px] pt-[30px] flex flex-col">
          <div className='container'>


            <div className="py-6 space-y-4">
              <div data-aos="fade-up" className="flex flex-wrap gap-3">
                {categoriesLoading
                  ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={`cat-skeleton-${index}`}
                        className="h-[45px] w-24 bg-gray-200 rounded-full animate-pulse"
                      />
                    ))

                  : categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.slug || "all")}
                      className={`category-btn border px-4 py-2 min-h-[45px] rounded-full text-sm font-medium transition-all duration-300 
                      ${(cat.slug || "all") === currentCategory
                          ? "active scale-[1.1]"
                          : "hoverable hover:border-transparent  hover:scale-[1.05]"
                        }
                      
                       `}

                    >
                      {cat.label}
                    </button>
                  ))}
              </div>

              <Breadcrumb cn={"!pt-[30px]"} routes={breadcrumbRoutes} />
            </div>

            <div className="bg-white shadow-sm p-4 lg:p-8 rounded-md grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsLoading
                ? Array(12)
                  .fill(0)
                  .map((_, i) => <ProductSkeleton key={i} />)
                : products?.map((p, index) => (
                  <PaginatedProductCard key={p.id} index={index} product={p} />
                ))}

              {products?.length === 0 && !productsLoading && <EmptyState className='mx-auto col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4' />}
            </div>

            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setPage}
            />
          </div>
          <div className='mt-auto '>

            <FeatureList />
          </div>
        </div>
      </div>
    </>
  );
}

const PaginatedProductCard = ({ product, index }) => {
  const { handleAddToCart } = useAddToCart();
  const [isHovered, setIsHovered] = useState(false);
  // stable random suffix for unique IDs
  const uniqueRef = useRef(Math.random().toString(36).substring(2, 9));

  const hasImages = product?.image || product?.secondImage;
  const getImageId = () => {

    return getProductImageId({ hasImages, productHoverImage: product?.secondImage, productId: product?.id, isHovered, uniqueValue: uniqueRef.current })
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos={`${index % 2 == 0 ? 'fade-up' : 'fade-down'}`} className='paginated-product block w-full max-w-[400px] group product-item  border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 mx-auto'>
      <Link to={`/product/${product?.slug}`} className=' block img-switcher-2 relative'>
        {product?.discountLabel && <span className='discount-percentage absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>{product?.discountLabel}</span>}
        {product?.fakeStock?.status && <span className='absolute shadow-xl top-[5px] right-[5px] z-[10] text-[10px] bg-red-500 text-white px-[10px] py-[5px] rounded-[6px]'>متبقي {product?.fakeStock.left} فقط</span>}
        <ProductImageSwitcher
          mainImage={product?.image}
          hoverImage={product?.secondImage}
          title={product?.title}
          productId={product?.id}
          unique={uniqueRef.current}
        />
      </Link>
      <span className='category bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[5px] shadow-sm w-fit text-[10px] rounded-[10px] my-[10px] block mx-auto'>{product?.cta}</span>
      <span className='title text-center w-full block  text-base my-[10px]'>{product?.title}</span>

      <PriceBlock ar salePrice={product?.salePrice} originalPrice={product?.originalPrice} />

      <div className=' flex items-center justify-between mt-[20px] gap-2'>
        <Link to={`/product/${product?.slug}`} className='buy-btn btn-blue flex-1 text-center py-2 rounded-md'>
          شراء الان
          <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
          </svg>
        </Link>

        <button
          onClick={() => {
            const imageId = getImageId();
            handleAddToCart(product, imageId);
          }}
          className=' h-[40px] w-[40px] flex items-center justify-center  bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md' title='أضف إلى السلة'>
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>)
} 