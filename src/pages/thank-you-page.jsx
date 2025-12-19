import Breadcrumb from '../components/atoms/Breadcrumb';
import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import FeatureList from '../components/molecules/FeatureList';
import Lottie from 'lottie-react';
import thankyouAnimation from '../lottie/Success Check.json';
import { baseImage } from '../config/Api';
import { useCheckoutSession } from '../hooks/useCheckoutSession';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function ThankYouPage() {
  const {
    breadcrumbRoutes,
    product,
    upsellItems,
    variants,
    selectedOptions,
    getOptionName,
    totalCartQuantity,
    subTotal,
    shipping,
    tax,
    totals,
    currency,
    orderSummary,
    showAnimation,
    isCartPurchase,
    cart,
    res,
    cartLength,
    setShowAnimation,
    thankyou_content_status,
    thankyou_content_value,
    thankyou_css,
    thankyou_js,
    shouldInject
  } = useCheckoutSession()

  return (
    <>

      <Helmet>
        <title>شكراً لطلبك</title>
        <meta name="description" content="تم استلام طلبك بنجاح. يمكنك مراجعة تفاصيل الطلب وملخص الفاتورة هنا." />
        {thankyou_css && shouldInject && <style type="text/css">{thankyou_css}</style>}
        {thankyou_js && shouldInject && <script type="text/javascript">{thankyou_js}</script>}
      </Helmet>

      <div className='container max-sm:!px-0 !pt-[12px] sm:!pt-[16px] md:!pt-[20px] lg:!pt-[24px] '
        style={{ background: "var(--thankyou_page_color,  #f8fafb)" }}
      >
        <Breadcrumb cn='!mt-0 max-sm:!px-5' routes={breadcrumbRoutes} />

        {showAnimation && (
          <div className='bg-white   absolute inset-0 z-50 flex items-center justify-center'>
            <Lottie
              animationData={thankyouAnimation}
              loop={false}
              onComplete={() => setShowAnimation(false)}
              className='w-full h-full max-w-md'
            />
          </div>
        )}

        {!showAnimation && (
          <div className=''>
            <div className='text-right text-gray-800'>
              {thankyou_content_status == 1 ? (
                <div
                  className='space-y rounded-lg  text-sm md:text-base  text-center space-y-2 min-h-[30vh] flex items-center justify-center flex-col gap-[10px] mb-2.5 md:mb-4 lg:mb-5'
                  style={{ background: 'var(--thank_page_bk_color, #f8fafb)' }}
                  data-aos='fade-up'
                  data-aos-delay='100'
                >
                  {thankyou_content_value ? (
                    <div className='space-y-8 md:space-y-10 lg:space-y-13 p-4 md:p-5'>

                      <div dangerouslySetInnerHTML={{ __html: thankyou_content_value }} />
                      <Button
                        name='استكمال التسوق'
                        href='/products'
                        cn='!w-fit btn main-btn !px-[50px] md:!px-[70px] lg:!px-[100px] !mx-auto'
                        data-aos='fade-up'
                        data-aos-delay='300'
                      />
                    </div>
                  ) : (
                    <SuccessMessage />
                  )}

                </div>
              ) : null}



              <div className='grid md:grid-cols-3 gap-2.5 md:gap-4 lg:gap-5'>
                <div className='md:col-span-2 gap-2.5 md:gap-4 lg:gap-5 flex flex-col'>
                  <ProductDetails
                    isCartPurchase={isCartPurchase}
                    cart={cart}
                    product={product}
                    upsellItems={upsellItems}
                    variants={variants}
                    selectedOptions={selectedOptions}
                    currency={currency}
                    orderSummary={orderSummary}
                    res={res}
                    getOptionName={getOptionName}
                  />

                  <OrderSummary orderSummary={orderSummary} />
                </div>

                <ShippingSummary
                  isCartPurchase={isCartPurchase}
                  cartLength={cartLength}
                  totalCartQuantity={totalCartQuantity}
                  subTotal={subTotal}
                  tax={tax}
                  shipping={shipping}
                  totals={totals}
                  currency={currency}
                />
              </div>
            </div>
          </div>
        )}

        <FeatureList />
      </div>
    </>
  )
}



function SuccessMessage() {
  return (
    <>
      <h2 className=' text-base md:text-xl lg:text-[22px] font-semibold'
        style={{ color: 'var(--thank_page_text_color, #404145)' }}
      >
        تم إتمام طلبك <span className='text-[var(--second)]'>بنجاح !</span>
      </h2>
      <p
        className=' text-xs md:text-sm lg:text-base   max-w-[320px] w-full'
        style={{ color: 'var(--thank_page_text_color, #404145)' }}
        data-aos='fade-up'
        data-aos-delay='200'
      >
        تم استلام طلبك و سنتواصل معك في أقرب فرصة. يرجى الانتظار لحين تلقي مكالمتنا.
      </p>
      <Button
        name='استكمال التسوق'
        href='/products'
        cn='!w-fit btn main-btn !px-[50px] md:!px-[70px] lg:!px-[100px] !mx-auto'
        data-aos='fade-up'
        data-aos-delay='300'
      />
    </>
  )
}



function ProductDetails({
  isCartPurchase,
  cart,
  product,
  upsellItems,
  variants,
  selectedOptions,
  currency,
  orderSummary,
  res,
  getOptionName,
}) {
  return (
    <div
      className='p-4 md:p-5 rounded-lg'
      style={{ background: 'var(--thank_page_bk_color, #f8fafb)' }}
      data-aos='fade-right'
      data-aos-delay='200'
    >
      <Title
        cn='!mb-4 md:!mb-[20px] pb-2'
        title1='بيانات'
        title2='المنتجات'
      />

      {isCartPurchase
        ? cart?.details?.map((item, index) => {
          const cartProduct = cart?.products?.find(p => p.id === item.product_id)
          const productVariants = cartProduct?.product_variants || []

          return (
            <div
              key={index}
              className="flex items-center mt-4 max-md:gap-[10px] gap-[30px]"
              data-aos="fade-right"
              data-aos-delay={300 + index * 100}
            >
              <Link to={`/product/${cartProduct?.slug}`}>
                <img
                  src={baseImage + cartProduct?.medias?.[0]?.url || '/placeholder-product.jpg'}
                  alt={cartProduct?.title}
                  className="w-[88px] max-md:w-[60px] h-[61px] rounded-md object-cover"
                />
              </Link>

              <div className="flex-1 flex items-center justify-between">
                <div className="flex-1 space-y-2">
                  <Link to={`/product/${cartProduct?.slug}`}>
                    <p className="font-medium text-[#333333] text-[10px]">
                      {cartProduct?.title}
                    </p>
                  </Link>

                  <p className="text-[13px] text-[#BFC2D4]">
                    عدد القطع : {item?.quantity}
                  </p>

                  {item?.options?.map((opt, i) => (
                    <p key={i} className="text-[10px] inline-block mx-1 text-gray-500">
                      {getOptionName(productVariants, opt)}
                    </p>
                  ))}
                </div>

                <p className="text-[14px] text-[#123770] text-nowrap">
                  {item?.total_price.toFixed(2)} {currency}
                </p>
              </div>
            </div>

          )
        })
        : (
          <>
            <div
              className='flex items-center mt-4 max-md:gap-[10px] gap-[30px]'
              data-aos='fade-right'
              data-aos-delay='300'
            >
              <Link to={`/product/${product?.slug}`}>
                <img
                  src={baseImage + product?.medias?.[0]?.url || '/placeholder-product.jpg'}
                  alt={product?.title}
                  className='w-[88px] max-md:w-[60px] max-md:h-[45px] h-[60px] rounded-md object-cover'
                />
              </Link>
              <div className='flex-1 max-sm:flex-col max-sm:items-start flex items-center justify-between text-sm'>
                <div className='flex-1 space-y-2'>
                  <Link to={`/product/${product?.slug}`}>
                    <p className='font-medium text-[#333333]'>{product?.title}</p>
                  </Link>
                  <p className='text-base text-[#BFC2D4]'>عدد القطع : {product?.qty}</p>
                  {selectedOptions?.map((opt, i) => (
                    <p key={i} className='text-sm inline-block mx-1 text-gray-500'>
                      {getOptionName(variants, opt)}
                    </p>
                  ))}
                </div>
                <p className='text-base text-[#123770] text-nowrap'>
                  {product?.total?.toFixed(2)} {res?.currency}
                </p>
              </div>
            </div>
            {upsellItems?.map((item, i) => {
              return <div
                className='flex items-center mt-4 max-md:gap-[10px] gap-[30px]'
                data-aos='fade-right'
                data-aos-delay='300'
              >
                <Link to={`/product/${item?.slug}`}>
                  <img
                    src={baseImage + item?.medias?.[0]?.url || '/placeholder-product.jpg'}
                    alt={item?.title}
                    className='w-[88px] max-md:w-[60px] max-md:h-[45px] h-[60px] rounded-md object-cover'
                  />
                </Link>
                <div className='flex-1 max-sm:flex-col max-sm:items-start flex items-center justify-between text-sm'>
                  <div className='flex-1 space-y-2'>
                    <Link to={`/product/${item?.slug}`}>
                      <p className='font-medium text-[#333333]'>{item?.title}</p>
                    </Link>
                    <p className='text-base text-[#BFC2D4]'>عدد القطع : {item?.qty}</p>
                    {/* {selectedOptions?.map((opt, i) => (
                      <p key={i} className='text-sm inline-block mx-1 text-gray-500'>
                        {getOptionName(variants, opt)}
                      </p>
                    ))} */}
                  </div>
                  <p className='text-base text-[#123770] text-nowrap'>
                    {item?.total?.toFixed(2)} {res?.currency}
                  </p>
                </div>
              </div>
            })}

          </>
        )}
    </div>
  )
}


function OrderSummary({ orderSummary }) {
  if (!orderSummary) return null

  return (
    <div
      className='bg-white p-4 md:p-5 rounded-lg space-y-4'
      style={{ background: 'var(--thank_page_bk_color, #f8fafb)' }}
      data-aos='fade-right'
      data-aos-delay='400'
    >
      <Title
        cn='!mb-4  md:!mb-[20px] pb-2'
        title1='بيانات '
        title2='التوصيل'
      />

      {orderSummary?.name && (
        <div className='text-xs md:text-sm lg:text-base  text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='450'>
          <span>اسم العميل</span>
          <span className='text-[#A6AFB9] text-sm'>{orderSummary?.name}</span>
        </div>
      )}

      {orderSummary?.phone && (
        <div className='text-xs md:text-sm lg:text-base  text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='500'>
          <span>رقم الجوال</span>
          <span className='text-[#A6AFB9] text-sm'>{orderSummary?.phone}</span>
        </div>
      )}

      {orderSummary?.delivery_address && (
        <div className='text-xs md:text-sm lg:text-base  text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='550'>
          <span>العنوان</span>
          <span className='text-[#A6AFB9] text-sm'>{orderSummary?.delivery_address}</span>
        </div>
      )}

      {orderSummary?.zip_code && (
        <div className='text-xs md:text-sm lg:text-base  text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='600'>
          <span>الرمز البريدي</span>
          <span className='text-[#A6AFB9] text-sm'>{orderSummary?.zip_code}</span>
        </div>
      )}

      <div className='text-xs md:text-sm lg:text-base  text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='650'>
        <span>بيانات الدفع</span>
        <span className='text-[#A6AFB9] text-sm'>الدفع عند الاستلام</span>
      </div>
    </div>
  )
}



function ShippingSummary({
  isCartPurchase,
  cartLength,
  totalCartQuantity,
  subTotal,
  tax,
  shipping,
  totals,
  currency,
}) {
  return (
    <div
      className='p-4 md:p-5 rounded-lg space-y-4 md:space-y-5'
      style={{ background: 'var(--thank_page_bk_color, #f8fafb)' }}
      data-aos='fade-left'
      data-aos-delay='300'
    >
      <Title
        cn='!mb-4  md:!mb-[20px] pb-2'
        title1='ملخص'
        title2='الطلب'
      />

      <div className=' text-xs md:text-sm lg:text-base   text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='350'>
        <span>عدد المنتجات</span>
        <span className='text-[var(--second)] text-sm'>{cartLength} منتج</span>
      </div>

      <div className=' text-xs md:text-sm lg:text-base   text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='400'>
        <span>اجمالى المنتجات</span>
        <span className='text-[var(--main)] text-sm'>{totalCartQuantity} قطع</span>
      </div>

      {isCartPurchase && (
        <>
          <div className=' text-xs md:text-sm lg:text-base   text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='450'>
            <span>المبلغ المستحق</span>
            <span className='text-[var(--main)] text-sm'>{subTotal?.toFixed(2)} {currency}</span>
          </div>

          <div className=' text-xs md:text-sm lg:text-base   text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='500'>
            <span>الضريبة</span>
            <span className='text-[var(--second)] text-sm'>{tax?.toFixed(2)} {currency}</span>
          </div>

          <div className=' text-xs md:text-sm lg:text-base   text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='500'>
            <span>تكلفة الشحن</span>
            <span className='text-[var(--second)] text-sm'>{shipping?.toFixed(2)} {currency}</span>
          </div>
        </>
      )}

      <div className=' text-xs md:text-sm lg:text-base   text-[var(--second)] flex justify-between' data-aos='fade-left' data-aos-delay='500'>
        <span>المبلغ الاجمالى</span>
        <span className='text-[var(--second)] text-sm'>{totals?.toFixed(2)} {currency}</span>
      </div>
    </div>
  )
}