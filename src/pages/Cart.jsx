/**
 * here i thing there is an issue in the variant to get his price it also give me the first product that have the variant 
    but i have items and for the first time get the price of the variant if exist for teh default valeus
 * and check form my code if have any probelm solve it 
 */
import { Helmet } from 'react-helmet';
import Breadcrumb from '../components/atoms/Breadcrumb';
import Title from '../components/atoms/Title';
import FeatureList from '../components/molecules/FeatureList';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
import EmptyState from '../components/atoms/EmptyState';
import { useCart } from '../hooks/cart/useCart';
import CartTotalSummary from '../components/pages/cart/CartTotalSummary';
import { CartItem } from '../components/pages/cart/CartItem';
import { ShoppingBag } from 'lucide-react';
import Button from '../components/atoms/Button';
import { useForm } from 'react-hook-form';
import { CheckoutForm } from '../components/pages/product/CheckoutForm';
import ErrorDisplay from '../components/atoms/ErrorDisplay';
import { color } from 'framer-motion';


export default function Cart() {
  const {
    // data
    cartItems,
    products,
    productsLoading,
    checkoutLoading,
    loadingRelatedProducts,
    loadingVariantPrices,
    totals,
    variantPrices,
    relatedProducts,
    submitError,
    checkoutFields,
    isBuyNowLoading,
    errors,
    productsError,
    checkout_page_title,

    // actions
    removeItem,
    handleVariantSelection,
    handleCheckout,
    register,
    increaseQuantity,
    decreaseQuantity,

  } = useCart();


  const { subtotal, discount, shipping, tax, total, oldSubtotal } = totals;
  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'عربة التسوق' }];

  if (productsError) {
    return (
      <ErrorDisplay
        error={productsError}
        onRetry={() => window.location.reload()}
        title="خطأ في تحميل عربة التسوق"
        message="عذراً، حدث خطأ أثناء تحميل المنتجات في عربة التسوق. يرجى المحاولة مرة أخرى."
      />
    );
  }


  return (
    <>
      <Helmet>
        <title>عربة التسوق</title>
      </Helmet>
      <div className='cart-page'
        style={{ backgroundColor: "var(--category_page_color, #f8fafb)" }}
      >
        <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

        <div className='!mb-[30px] container max-lg:grid-cols-1 grid grid-cols-2 gap-[20px]'>
          <div className={`${cartItems.length === 0 && 'col-span-2'} p-4 rounded-md border `}
            style={{ background: "var(--main_checkout_bk_color, white)", borderColor: "var(--main_checkout_border_color, var(--border-bg))" }}
          >
            <Title cn='!mb-[30px]' title1='بيانات' title2='المنتجات'
              styleTitle={{ color: "var(--main_checkout_title, var(--main)" }}
              styleTitle2={{ color: "var(--main_checkout_title, var(--second)" }}
            />

            {productsLoading ? (
              <div className='space-y-4'>
                {[1, 2, 3].map(i => (
                  <div key={i} className='flex gap-4 p-4 rounded-lg border border-[var(--border-bg)] bg-[#fafafa] animate-pulse'>
                    <div className='w-[100px] h-[80px] bg-gray-200 rounded-md'></div>
                    <div className='flex-1 space-y-3'>
                      <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                      <div className='flex gap-2'>
                        <div className='h-8 w-8 bg-gray-200 rounded'></div>
                        <div className='h-8 w-8 bg-gray-200 rounded'></div>
                        <div className='h-8 w-8 bg-gray-200 rounded'></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems.length > 0 && products.length > 0 ? (
              <div className='grid gap-2'>
                {cartItems.map(item => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      products={products}
                      variantPrices={variantPrices}
                      removeItem={removeItem}
                      handleVariantSelection={handleVariantSelection}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity} />
                  );
                })}
              </div>
            ) : (
              <EmptyState href='/products' name_href='تصفح المنتجات' type_animation='box' message='🛒 سلتك فارغة حاليًا' subtext='ابدأ بالتسوق الآن وأضف منتجاتك المفضلة!' loop={false} />
            )}
          </div>

          {cartItems.length > 0 && (
            <div className=''

            >
              {checkoutLoading ? (
                <div className='bg-white rounded-lg p-4 space-y-5 border'
                  style={{ background: "var(--main_checkout_bk_color, white", borderColor: "var(--main_checkout_border_color, var(--border-bg))" }}>
                  <div className='h-6 w-[220px] bg-gray-200 rounded-md animate-pulse'></div>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className='space-y-2'>
                      <div className='h-5 w-[160px] bg-gray-200 rounded-md animate-pulse'></div>
                      <div className='h-[50px] w-full bg-gray-200 rounded-lg animate-pulse'></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='bg-white rounded-lg overflow-hidden border flex flex-col gap-4'
                  style={{ background: "var(--main_checkout_bk_color, white)", borderColor: "var(--main_checkout_border_color, var(--border-bg))" }}>
                  {submitError && <div className='bg-red-50 border border-red-200 text-red-600 p-3 rounded-md'>{submitError}</div>}

                  <CheckoutForm checkoutFields={checkoutFields} register={register} errors={errors} title={checkout_page_title?.value} />

                  <CartTotalSummary
                    subtotal={subtotal}
                    oldSubtotal={oldSubtotal}
                    discount={discount}
                    tax={tax}
                    shipping={shipping}
                    total={total}
                    loadingVariantPrices={loadingVariantPrices}
                    productsLoading={productsLoading}
                  />


                  <Button onclick={handleCheckout} type='submit' loading={isBuyNowLoading} cn='m-4 !mb-4  cart-buy-btn w-full !mt-8 flex-row-reverse h-[50px] rounded-md text-white  transition border' name='إتمام الطلب' icon={<ShoppingBag size={20} className='mr-2' />}
                    style={{
                      background: "var(--main_checkout_buybtn_bk, var(--main))", color: "var(--main_checkout_buybtn_font, white)",
                      borderColor: "var(--main_checkout_buybtn_border, transparent)",
                      width: 'auto'
                    }} />
                </div>
              )}
            </div>
          )}
        </div>

        {cartItems.length > 0 && <ProductCarouselRelated title='منتجات مشابهة' subTitle='تصفّح منتجات قد تعجبك أيضًا' cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />}

        <FeatureList />
      </div>
    </>
  );
}
