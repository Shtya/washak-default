import { Link } from 'react-router-dom';
import { useState, useMemo, useCallback, memo } from 'react';
import { AlertTriangleIcon, Star } from 'lucide-react';
import { ProductInfoSkeleton, ProductImageSkeleton } from '../components/skeleton/ProductSkeleton';
import Breadcrumb from '../components/atoms/Breadcrumb';
import PriceCurrency from '../components/atoms/PriceCurrency';
import MetaTags from '../components/atoms/MetaTags';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
import { FrequentlyBoughtTogether } from '../components/pages/product/FrequentlyBoughtTogether';

import { baseImage, BaseUrl } from '../config/Api';
import { ProductImageGallery } from '../components/pages/product/ProductImageGallery';
import { CountdownTimer } from '../components/pages/product/CountdownTimer';
import { VariantSelector } from '../components/pages/product/VariantSelector';
import { StockInfo } from '../components/pages/product/StockInfo';
// import { CheckoutForm } from '../components/atoms/CheckoutForm';
import { CheckoutForm } from '../components/pages/product/CheckoutForm';

import { BuyNowSection } from '../components/pages/product/BuyNowSection';
import { useProduct } from '../hooks/Product/useProduct';
import { getFullPath } from '../helper/getFullPath';

// Memoized components to prevent unnecessary re-renders
const MemoizedProductTitle = memo(({ title }) => (
  <h2 className='text-2xl max-md:text-xl font-bold text-[#3B2D35]' data-aos='fade-up' style={{ color: 'var(--product_title_color, #3B2D35)' }}>
    {title}
  </h2>
));

const MemoizedCategories = memo(({ categories }) => {
  if (!categories?.length) return null;

  return (
    <div className='flex flex-wrap gap-2 items-center' data-aos='fade-up'>
      {categories.map(category => (
        <Link to={getFullPath('category/', category.slug)} key={category.id} className='bg-[var(--second)] text-white text-xs px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition'>
          {category.name}
        </Link>
      ))}
    </div>
  );
});

const MemoizedPriceDisplay = memo(({ price }) => {
  const hasRegularPrice = price?.regular_price;
  const savings = hasRegularPrice ? price.regular_price - price.special_price : 0;

  return (
    <div className='flex items-center gap-2 flex-wrap' data-aos='fade-up'>
      <span className='text-[#123770]'>
        <PriceCurrency currency={'ج.م'} price={price?.special_price} style={{ color: 'var(--new_price_color, var(main))' }} />
      </span>
      {hasRegularPrice && (
        <>
          <span className='line-through text-base' style={{ color: 'var(--old_price_color, #A5A5A5)' }}>
            <PriceCurrency currency={'ج.م'} price={price?.regular_price} style={{ color: 'var(--old_price_color, #A5A5A5)' }} />
          </span>
          <span className='text-white border text-xs px-2 py-1 rounded-full flex items-center gap-[5px]' style={{ background: 'var(--price_bk_color, var(--second))', borderColor: 'var(--price_border_color, var(main))' }}>
            هتوفر <PriceCurrency currency={'ج.م'} price={savings} />
          </span>
        </>
      )}
    </div>
  );
});

const MemoizedLiveVariantPrice = memo(({ loading, price, comparePrice, productPrice, quantity = 1 }) => {
  const { totalPrice, totalCompare, savings } = useMemo(() => {
    const totalPrice = price ? price * quantity : productPrice?.special_price ? productPrice?.special_price * quantity : 0;
    const totalCompare = comparePrice != null ? comparePrice * quantity : productPrice?.regular_price ? productPrice?.regular_price * quantity : null;
    const savings = totalCompare && totalCompare > totalPrice ? totalCompare - totalPrice : productPrice?.regular_price ? productPrice?.regular_price - productPrice?.special_price : 0;

    return { totalPrice, totalCompare, savings };
  }, [price, comparePrice, productPrice, quantity]);

  if (loading) {
    return (
      <div aria-live='polite' className='mt-3 flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm'>
        <span className='animate-spin border-2 border-amber-400 border-t-transparent rounded-full w-4 h-4' />
        <span>جارٍ تحديث السعر...</span>
      </div>
    );
  }

  return (
    <div aria-live='polite' className='mt-3 flex flex-wrap items-center gap-3 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg text-sm font-semibold shadow-sm animate-fadeIn'>
      <span>🎯 السعر حسب اختيارك:</span>
      <span className='text-base font-bold text-[#0a2a5c] transition-all duration-700 ease-out transform scale-95'>
        <PriceCurrency currency={'ج.م'} price={totalPrice || productPrice?.special_price} />
      </span>
      {totalCompare && totalCompare > totalPrice && (
        <span className='line-through text-gray-500 text-xs transition-all duration-700 ease-out transform scale-95'>
          <PriceCurrency currency={'ج.م'} price={totalCompare} />
        </span>
      )}
      {savings > 0 && (
        <span className='flex gap-2 bg-[#0a2a5c] text-white text-[11px] px-2 py-0.5 rounded-full transition-all duration-700 ease-out transform scale-95'>
          <span>هتوفر</span> <PriceCurrency currency={'ج.م'} price={savings} />
        </span>
      )}
    </div>
  );
});

const MemoizedProductHeader = memo(({ isEnabled, text }) => (isEnabled ? <div data-aos='fade-up' dangerouslySetInnerHTML={{ __html: text }} /> : null));

const MemoizedHurryUpAlert = memo(({ text }) =>
  text ? (
    <div className='bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse shadow-sm' data-aos='fade-up'>
      <AlertTriangleIcon className='w-5 h-5 text-red-500' />
      <span className='text-sm font-medium'>{text}</span>
    </div>
  ) : null,
);

const MemoizedReviews = memo(({ reviewEnable, noOfReviews }) => {
  if (reviewEnable == 0) return null;

  return (
    <div className='flex items-center gap-[10px] text-sm text-[#666666]' data-aos='fade-up'>
      <span className='flex items-center text-[#FFC62A]'>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className='!fill-[#FFC62A] w-4 h-4' />
          ))}
      </span>
      ({noOfReviews}) تقييمات
    </div>
  );
});

const MemoizedDescription = memo(({ content, shortDescription, isShortEnabled, isDescriptionEnabled }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(prev => !prev), []);

  const hasShort = Boolean(shortDescription && isShortEnabled);
  const hasFull = Boolean(content && isDescriptionEnabled);

  if (!hasShort && !hasFull) return null;

 
  if (hasShort && hasFull) {
    return (
      <div data-aos='fade-up'>
        {!expanded ? <div className='text-[#959FBC] text-base leading-relaxed mb-2' dangerouslySetInnerHTML={{ __html: shortDescription }} /> : <div className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: content }} />}
        <button type='button' onClick={toggleExpanded} className='text-blue-600 hover:underline focus:outline-none mt-1'>
          {expanded ? 'عرض أقل' : 'عرض المزيد'}
        </button>
      </div>
    );
  }

  if (hasShort) {
    return <div data-aos='fade-up' className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: shortDescription }} />;
  }

  if (hasFull) {
    return <div data-aos='fade-up' className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return null;
});

// Skeleton component for loading state
const ProductSkeleton = () => (
  <div className='bg-[#f8fafb] min-h-[calc(100vh-300px)]' style={{ background: 'var(--product_page_color,  #f8fafb)' }}>
    <div className='container !pt-[30px]'>
      <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
    </div>
    <div className='!pb-[30px] container max-md:!px-[20px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6'>
      <ProductImageSkeleton />
      <ProductInfoSkeleton />
    </div>
    <div className='!pb-[30px] container max-md:!px-[20px] flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className='animate-pulse flex-none max-w-[365px] w-full shadow-sm border border-[#EEEEEE] bg-white rounded-lg p-3'>
            <div className='bg-gray-200 h-[230px] rounded mb-4' />
            <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
            <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
            <div className='flex justify-center gap-2 mb-4'>
              <div className='h-4 bg-gray-200 rounded w-1/4' />
              <div className='h-4 bg-gray-200 rounded w-1/6' />
            </div>
            <div className='h-8 bg-gray-200 rounded w-full' />
          </div>
        ))}
    </div>
  </div>
);

// Main Product Component
export default function Product() {
  const { breadcrumbRoutes, loadingUpsell, navigate, seo, product, loading, loadingLiveVariantPrice, loadingRelatedProducts, relatedProducts, productOptions, countdownData, hurryUpOptions, variant, product_variants, getValues, setValue, showValidation, setShowValidation, isQuickCheckout, checkoutFields, register, frequently_bought_products, frequentlyBoughtTotalPrice, isBuyNowLoading, errors, handleBuyNow, quantity, defaultVariantCombination, product_style_settings, productError, checkoutSettingsError, relatedProductsError } = useProduct();

  // Memoize expensive calculations
  const showCheckoutForm = useMemo(() => !checkoutSettingsError && isQuickCheckout, [checkoutSettingsError, isQuickCheckout]);

  const metaImage = useMemo(() => (product?.medias?.[0]?.url ? `${baseImage}${product.medias[0].url}` : undefined), [product?.medias]);

  const metaUrl = useMemo(() => (product?.slug ? `${BaseUrl}/product/${product.slug}` : undefined), [product?.slug]);

  // Memoized variant selection handler
  const handleVariantSelection = useCallback(
    (variantId, optionId) => {
      const selectedOptions = getValues('options') || [];
      const newOptions = selectedOptions.filter(opt => !opt.startsWith(`${variantId}_`));

      if (optionId !== null && optionId !== undefined && optionId !== '') {
        newOptions.push(`${variantId}_${optionId}`);
      }

      setValue('options', newOptions, { shouldValidate: false });
    },
    [getValues, setValue],
  );

  // Early return for loading state
  if (loading) {
    return <ProductSkeleton />;
  }

  // Early return for error state
  if (productError) {
    navigate('/not-found');
    return null;
  }

  return (
    <div className='product-detials-page' style={{ background: 'var(--product_page_color,  #f8fafb)' }}>
      <MetaTags title={seo?.meta_title} description={seo?.meta_description} image={metaImage} url={metaUrl} keywords={seo?.meta_keyword} />

      <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

      <div className='!pb-[30px] container max-md:!px-[20px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6 items-stretch'>
        <ProductImageGallery product={product} />

        <div className='flex flex-col !p-6 bg-white rounded-md flex-1 space-y-4 h-full'>
          <MemoizedCategories categories={product?.categories} />
          <MemoizedProductTitle title={product?.title} />
          <MemoizedProductHeader isEnabled={productOptions?.product_header != '0'} text={productOptions?.product_header_text} />
          <MemoizedPriceDisplay price={product?.price} />

          <MemoizedReviews reviewEnable={product?.review_enable} noOfReviews={product?.no_of_reviews} />
          <MemoizedDescription content={product?.product_content} shortDescription={product?.product_short_description} isShortEnabled={product_style_settings?.product_short_description_status !== 'no'} isDescriptionEnabled={productOptions?.description_switch} />

          <CountdownTimer countdownData={countdownData} text={productOptions?.text_above_counter} aosDelay='' />
          <MemoizedHurryUpAlert text={hurryUpOptions?.hurryUpText} />
          <MemoizedLiveVariantPrice loading={loadingLiveVariantPrice} price={variant?.price} productPrice={product?.price} comparePrice={variant?.compare_at_price} quantity={quantity} />
          <VariantSelector
            dataAos='fade-up'
            key={product.id}
            variants={product_variants}
            isVariantSelected={variant => {
              const selectedOptions = getValues('options');
              return selectedOptions.some(opt => opt.startsWith(`${variant.id}_`));
            }}
            setNewOption={handleVariantSelection}
            getValues={() => getValues('options') || []}
            showValidation={showValidation}
            setShowValidation={setShowValidation}
            defaultCvariantCombinations={defaultVariantCombination}
          />
          <StockInfo stock={product?.stock} options={productOptions} />

          {showCheckoutForm ? (
            <CheckoutForm checkoutFields={checkoutFields} register={register} errors={errors} className='!m-0 !mt-8 p-2' />
          ) : checkoutSettingsError ? (
            <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm'>
              <div className='mb-2 font-medium'>تعذّر تحميل نموذج الشراء</div>
              <div className='text-[#555] mb-3'>لا يمكن تحميل حقول الطلب الآن — سيتم إضافة المنتج للسلة بدلاً من الشراء السريع.</div>
            </div>
          ) : null}

          <BuyNowSection cnbtn={`details_buynow ${loadingUpsell && 'disabled'}`} showValidation={showValidation} isBuyNowLoading={isBuyNowLoading} handleBuyNow={handleBuyNow} getValues={getValues} setValue={setValue} isSticky={productOptions?.product_footer_buy_sticky != '0'} buttonText={productOptions?.buy_now_button_text} />
        </div>
      </div>

      <FrequentlyBoughtTogether frequently_bought_products={frequently_bought_products} product={product} frequentlyBoughtTotalPrice={frequentlyBoughtTotalPrice} isBuyNowLoading={isBuyNowLoading} errors={errors} checkoutFields={checkoutFields} getValues={getValues} handleBuyNow={handleBuyNow} />

      {!relatedProductsError && product_style_settings?.related_product_button_enable_custom === '1' && <ProductCarouselRelated title={product_style_settings?.related_prod_name_custom || 'منتجات ذات صلة'} subTitle={'تصفّح منتجات قد تعجبك أيضًا بناءً على هذا المنتج'} cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />}
    </div>
  );
}

// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { AlertTriangleIcon, Star } from 'lucide-react';
// import { ProductInfoSkeleton, ProductImageSkeleton } from '../components/skeleton/ProductSkeleton';
// import Breadcrumb from '../components/atoms/Breadcrumb';
// import PriceCurrency from '../components/atoms/PriceCurrency';
// import MetaTags from '../components/atoms/MetaTags';
// import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
// import { FrequentlyBoughtTogether } from '../components/pages/product/FrequentlyBoughtTogether';

// import { baseImage, BaseUrl } from '../config/Api';
// import { ProductImageGallery } from '../components/pages/product/ProductImageGallery';
// import { CountdownTimer } from '../components/pages/product/CountdownTimer';
// import { VariantSelector } from '../components/pages/product/VariantSelector';
// import { StockInfo } from '../components/pages/product/StockInfo';
// import { CheckoutForm } from '../components/pages/product/CheckoutForm';
// import { BuyNowSection } from '../components/pages/product/BuyNowSection';
// import { useProduct } from '../hooks/Product/useProduct';
// import { getFullPath } from '../helper/getFullPath';

// export default function Product() {
//   const { breadcrumbRoutes, loadingUpsell, navigate, seo, product, loading, loadingLiveVariantPrice, loadingRelatedProducts, relatedProducts, productOptions, countdownData, hurryUpOptions, variant, product_variants, getValues, setValue, showValidation, setShowValidation, isQuickCheckout, checkoutFields, register, frequently_bought_products, frequentlyBoughtTotalPrice, isBuyNowLoading, errors, handleBuyNow, quantity, defaultVariantCombination, product_style_settings, productError, checkoutSettingsError, relatedProductsError } = useProduct();

//   const showCheckoutForm = !checkoutSettingsError && isQuickCheckout;

//   if (loading) {
//     return (
//       <div className='bg-[#f8fafb] min-h-[calc(100vh-300px)] ' style={{ background: 'var(--product_page_color,  #f8fafb)' }}>
//         <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />
//         <div className='!pb-[30px] container max-md:!px-[20px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6'>
//           <ProductImageSkeleton />
//           <ProductInfoSkeleton />
//         </div>

//         <div className='!pb-[30px] container max-md:!px-[20px] flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
//           {Array(5)
//             .fill(0)
//             .map((_, i) => (
//               <div key={i} className='animate-pulse flex-none max-w-[365px] w-full shadow-sm border border-[#EEEEEE] bg-white rounded-lg p-3'>
//                 <div className='bg-gray-200 h-[230px] rounded mb-4' />
//                 <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
//                 <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
//                 <div className='flex justify-center gap-2 mb-4'>
//                   <div className='h-4 bg-gray-200 rounded w-1/4' />
//                   <div className='h-4 bg-gray-200 rounded w-1/6' />
//                 </div>
//                 <div className='h-8 bg-gray-200 rounded w-full' />
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   }

//   if (productError) {
//     navigate('/not-found');
//     return null;
//   }

//   return (
//     <div className='product-detials-page' style={{ background: 'var(--product_page_color,  #f8fafb)' }}>
//       <MetaTags title={seo?.meta_title} description={seo?.meta_description} image={`${baseImage}${product?.medias?.[0]?.url}`} url={`${BaseUrl}/product/${product?.slug}`} keywords={seo?.meta_keyword} />

//       <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

//       <div className='!pb-[30px] container max-md:!px-[20px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6 items-stretch'>
//         <ProductImageGallery product={product} />

//         <div className='flex flex-col !p-6 bg-white  rounded-md  flex-1 space-y-4 h-full'>
//           <Categories categories={product?.categories} />
//           <ProductTitle title={product?.title} />
//           <ProductHeader isEnabled={productOptions?.product_header != '0'} text={productOptions?.product_header_text} />
//           <PriceDisplay price={product?.price} />

//           <Reviews reviewEnable={product?.review_enable} noOfReviews={product?.no_of_reviews} />
//           <Description content={product?.product_content} shortDescription={product?.product_short_description} isShortEnabled={product_style_settings?.product_short_description_status !== 'no'} isDescriptionEnabled={productOptions?.description_switch} />

//           <CountdownTimer countdownData={countdownData} text={productOptions?.text_above_counter} aosDelay='' />
//           <HurryUpAlert text={hurryUpOptions?.hurryUpText} />
//           <LiveVariantPrice loading={loadingLiveVariantPrice} price={variant?.price} productPrice={product?.price} comparePrice={variant?.compare_at_price} quantity={quantity} />
//           <VariantSelector
//             dataAos='fade-up'
//             key={product.id}
//             variants={product_variants}
//             isVariantSelected={variant => {
//               const selectedOptions = getValues('options');
//               return selectedOptions.some(opt => opt.startsWith(`${variant.id}_`));
//             }}
//             setNewOption={(variantId, optionId) => {
//               const selectedOptions = getValues('options') || [];
//               // Remove any existing option for this variant
//               const newOptions = selectedOptions.filter(opt => !opt.startsWith(`${variantId}_`));

//               // Add the new one if valid
//               if (optionId !== null && optionId !== undefined && optionId !== '') {
//                 newOptions.push(`${variantId}_${optionId}`);
//               }

//               setValue('options', newOptions, { shouldValidate: false });
//             }}
//             getValues={() => {
//               return getValues('options') || [];
//             }}
//             showValidation={showValidation}
//             setShowValidation={setShowValidation}
//             defaultCvariantCombinations={defaultVariantCombination}
//           />
//           <StockInfo stock={product?.stock} options={productOptions} />
//           {showCheckoutForm ? (
//             <CheckoutForm checkoutFields={checkoutFields} register={register} errors={errors} className='!m-0 !mt-8 p-2' />
//           ) : checkoutSettingsError ? (
//             // show a small section-level error with retry
//             <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm'>
//               <div className='mb-2 font-medium'>تعذّر تحميل نموذج الشراء</div>
//               <div className='text-[#555] mb-3'>لا يمكن تحميل حقول الطلب الآن — سيتم إضافة المنتج للسلة بدلاً من الشراء السريع.</div>
//             </div>
//           ) : null}
//           <BuyNowSection cnbtn={`details_buynow ${loadingUpsell && 'disabled'}`} showValidation={showValidation} isBuyNowLoading={isBuyNowLoading} handleBuyNow={handleBuyNow} getValues={getValues} setValue={setValue} isSticky={productOptions?.product_footer_buy_sticky != '0'} buttonText={productOptions?.buy_now_button_text} />
//         </div>
//       </div>

//       <FrequentlyBoughtTogether frequently_bought_products={frequently_bought_products} product={product} frequentlyBoughtTotalPrice={frequentlyBoughtTotalPrice} isBuyNowLoading={isBuyNowLoading} errors={errors} checkoutFields={checkoutFields} getValues={getValues} handleBuyNow={handleBuyNow} />

//       {!relatedProductsError && product_style_settings?.related_product_button_enable_custom === '1' ? <ProductCarouselRelated title={product_style_settings?.related_prod_name_custom || 'منتجات ذات صلة'} subTitle={'تصفّح منتجات قد تعجبك أيضًا بناءً على هذا المنتج'} cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} /> : null}

//       {/* <FeatureList /> */}
//     </div>
//   );
// }

// /* ======================
//    Product Title
// ====================== */
// export const ProductTitle = ({ title }) => (
//   <h2 className='text-2xl max-md:text-xl font-bold text-[#3B2D35]' data-aos='fade-up' style={{ color: 'var(--product_title_color, #3B2D35)' }}>
//     {title}
//   </h2>
// );

// /* ======================
//    Product Categories
// ====================== */

// export const Categories = ({ categories }) =>
//   categories?.length > 0 && (
//     <div className='flex flex-wrap gap-2 items-center' data-aos='fade-up'>
//       {categories.map(category => (
//         <Link to={getFullPath('category/', category.slug)} key={category.id} className='bg-[var(--second)] text-white text-xs  px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition'>
//           {category.name}
//         </Link>
//       ))}
//     </div>
//   );

// /* ======================
//    Price Section
// ====================== */
// export const PriceDisplay = ({ price }) => (
//   <div className='flex items-center gap-2 flex-wrap' data-aos='fade-up'>
//     <span className='text-[#123770] '>
//       <PriceCurrency currency={'ج.م'} price={price?.special_price} style={{ color: 'var(--new_price_color, var(main))' }} />
//     </span>
//     {price?.regular_price && (
//       <>
//         <span className='line-through text-base' style={{ color: 'var(--old_price_color, #A5A5A5)' }}>
//           <PriceCurrency currency={'ج.م'} price={price?.regular_price} style={{ color: 'var(--old_price_color, #A5A5A5)' }} />
//         </span>
//         <span className='text-white border text-xs px-2 py-1 rounded-full flex items-center gap-[5px]' style={{ background: 'var(--price_bk_color, var(--second))', borderColor: 'var(--price_border_color, var(main))' }}>
//           هتوفر <PriceCurrency currency={'ج.م'} price={price?.regular_price - price?.special_price} />
//         </span>
//       </>
//     )}
//   </div>
// );

// /* ======================
//    Variant Collection Price
// ====================== */

// export const LiveVariantPrice = ({ loading, price, comparePrice, productPrice, quantity = 1 }) => {
//   // Calculate totals based on quantity
//   const totalPrice = price ? price * quantity : productPrice?.special_price ? productPrice?.special_price * quantity : 0;
//   const totalCompare = comparePrice != null ? comparePrice * quantity : productPrice?.regular_price ? productPrice?.regular_price * quantity : null;

//   // Savings is totalCompare - totalPrice
//   const savings = totalCompare && totalCompare > totalPrice ? totalCompare - totalPrice : productPrice?.regular_price ? productPrice?.regular_price - productPrice?.special_price : 0;

//   return (
//     <div data-aos='fade-up'>
//       {loading ? (
//         <div aria-live='polite' className='mt-3 flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm'>
//           <span className='animate-spin border-2 border-amber-400 border-t-transparent rounded-full w-4 h-4' />
//           <span>جارٍ تحديث السعر...</span>
//         </div>
//       ) : (
//         <div aria-live='polite' className='mt-3 flex flex-wrap items-center gap-3 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg text-sm font-semibold shadow-sm animate-fadeIn'>
//           <span>🎯 السعر حسب اختيارك:</span>

//           {/* السعر الحالي */}
//           <span className='text-base font-bold text-[#0a2a5c] transition-all duration-700 ease-out transform scale-95'>
//             <PriceCurrency currency={'ج.م'} price={totalPrice || productPrice?.special_price} />
//           </span>

//           {/* السعر قبل الخصم */}
//           {totalCompare && totalCompare > totalPrice && (
//             <span className='line-through text-gray-500 text-xs transition-all duration-700 ease-out transform scale-95'>
//               <PriceCurrency currency={'ج.م'} price={totalCompare} />
//             </span>
//           )}

//           {/* التوفير */}
//           {savings > 0 && (
//             <span className='flex gap-2 bg-[#0a2a5c] text-white text-[11px] px-2 py-0.5 rounded-full transition-all duration-700 ease-out transform scale-95'>
//               <span>هتوفر</span> <PriceCurrency currency={'ج.م'} price={savings} />
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ======================
//    Product Header
// ====================== */
// export const ProductHeader = ({ isEnabled, text }) => (isEnabled ? <div data-aos='fade-up' dangerouslySetInnerHTML={{ __html: text }} /> : null);

// /* ======================
//    Hurry Up Alert
// ====================== */

// export const HurryUpAlert = ({ text }) =>
//   text && (
//     <div className='bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse shadow-sm' data-aos='fade-up'>
//       <AlertTriangleIcon className='w-5 h-5 text-red-500' />
//       <span className='text-sm font-medium'>{text}</span>
//     </div>
//   );

// /* ======================
//  Product Reviews
// ====================== */
// export const Reviews = ({ reviewEnable, noOfReviews }) =>
//   reviewEnable != 0 && (
//     <div className='flex items-center gap-[10px] text-sm text-[#666666]' data-aos='fade-up'>
//       <span className='flex items-center text-[#FFC62A]'>
//         {Array(5)
//           .fill(0)
//           .map((_, i) => (
//             <Star key={i} className='!fill-[#FFC62A] w-4 h-4' />
//           ))}
//       </span>
//       ({noOfReviews}) تقييمات
//     </div>
//   );

// /* ======================
//  Product Description Controller
// ====================== */
// export const Description = ({ content, shortDescription, isShortEnabled, isDescriptionEnabled }) => {
//   const [expanded, setExpanded] = useState(false);

//   const hasShort = Boolean(shortDescription && isShortEnabled);
//   const hasFull = Boolean(content && isDescriptionEnabled);

//   // If nothing exists → render nothing
//   if (!hasShort && !hasFull) return null;

//   // Case 1: Both short + full exist
//   if (hasShort && hasFull) {
//     return (
//       <div data-aos='fade-up'>
//         {!expanded ? <div className='text-[#959FBC] text-base leading-relaxed mb-2' dangerouslySetInnerHTML={{ __html: shortDescription }} /> : <div className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: content }} />}

//         <button type='button' onClick={() => setExpanded(prev => !prev)} className='text-blue-600 hover:underline focus:outline-none mt-1'>
//           {expanded ? 'عرض أقل' : 'عرض المزيد'}
//         </button>
//       </div>
//     );
//   }

//   // Case 2: Only short exists
//   if (hasShort) {
//     return <div data-aos='fade-up' className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: shortDescription }} />;
//   }

//   // Case 3: Only full exists
//   if (hasFull) {
//     return <div data-aos='fade-up' className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: content }} />;
//   }

//   return null;
// };
