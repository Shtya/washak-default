'use client';
import { baseImage, useApiGet } from '../config/Api';
import FeatureList from '../components/molecules/FeatureList';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import { useEffect, useState, useMemo, useRef } from 'react';
import Breadcrumb from '../components/atoms/Breadcrumb';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Img from '../components/atoms/Image';
import { ShoppingCart } from 'lucide-react';
import EmptyState from '../components/atoms/EmptyState';
import { PriceBlock } from '../components/atoms/PriceCurrency';
import { useStoreCategories } from '../hooks/useStoreCategories';
import { useStoreProducts } from '../hooks/Product/useStoreProducts';
import { Pagination } from '../components/molecules/Pagination';
import { useAddToCart } from '../hooks/cart/useAddToCart';
import { NotFoundImage } from '../components/atoms/NotFoundImage';
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
    products,
    productsError,
    refetchProducts,
    filteredData,
    pageCount,
    productsLoading,
    categoriesLoading,
    categoriesError,
    refetchCategories,
    setPage,
    setCategory,
  } = useProductsWithCategories();
  const currentCategoryLabel = categories.find(cat => cat.slug === currentCategory)?.label;
  if (productsError || categoriesError) {
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
      <div className="bg-[#f8fafb]" >
        <div className="container max-sm:!px-[20px] py-[30px]">
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
                    className={`px-4 py-2 min-h-[45px] rounded-full text-sm font-medium transition-all duration-300 
                      ${(cat.slug || "all") === currentCategory
                        ? "bg-[var(--main)] text-white scale-[1.1]"
                        : "bg-white text-[#58749A] border border-[#EEF0F7] hover:bg-[var(--main)] hover:border-transparent hover:text-white hover:scale-[1.05]"
                      }`}
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
              : filteredData.map((p, index) => (
                <PaginatedProductCard key={p.id} index={index} product={p} />
              ))}

            {filteredData.length === 0 && !productsLoading && !productsError && <EmptyState className='mx-auto col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4' />}
          </div>

          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setPage}
          />

          <FeatureList />
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

  const hasImages = product?.image && product?.secondImage;
  const getImageId = () => {
    return getProductImageId({ hasImages, productMainImage: product?.image, productId: product?.id, isHovered, uniqueValue: uniqueRef.current })
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos={`${index % 2 == 0 ? 'fade-up' : 'fade-down'}`} className=' block w-full max-w-[400px] group product-item  border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 mx-auto'>
      <Link to={`/product/${product?.slug}`} className=' block img-switcher-2 relative'>
        {product?.discountLabel && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>{product?.discountLabel}</span>}
        {product?.fakeStock?.status && <span className='absolute shadow-xl top-[5px] right-[5px] z-[10] text-[10px] bg-red-500 text-white px-[10px] py-[5px] rounded-[6px]'>متبقي {product?.fakeStock.left} فقط</span>}
        <ProductImageSwitcher
          mainImage={product?.image}
          hoverImage={product?.secondImage}
          title={product?.title}
          productId={product?.id}
          unique={uniqueRef.current}
        />
      </Link>
      <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[5px] shadow-sm w-fit text-[10px] rounded-[10px] my-[10px] block mx-auto'>{product?.cta}</span>
      <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px]'>{product?.title}</span>

      <PriceBlock ar salePrice={product?.salePrice} originalPrice={product?.originalPrice} />

      <div className=' flex items-center justify-between mt-[20px] gap-2'>
        <Link to={`/product/${product?.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
          شراء الان
          <img src="/icons/buy.png" alt='' width={20} height={20} />
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