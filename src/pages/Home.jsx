'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/atoms/Image.jsx';
import HeadTitle from '../components/atoms/HeadTitle.jsx';
import Button from '../components/atoms/Button.jsx';
import SkeletonCard from '../components/skeleton/SkeletonCard.jsx';
import ProductCard from '../components/pages/product/ProductCard.jsx';
import { getFullPath } from '../helper/getFullPath.js';
import { useStoreHomeSections } from '../hooks/useStoreHomeSections.js';
import { HomeSkeleton } from '../components/skeleton/HomeSkeleton.jsx';
import ErrorDisplay from '../components/atoms/ErrorDisplay.jsx';
import { useAppContext } from '../contexts/AppContext.js';


export default function Home() {
  const { loading, data, error } = useStoreHomeSections();
  const { storeOptions } = useAppContext();
  const { homepage_style_status } = storeOptions ?? {};
  const sortedSections = data?.data?.sections?.sort((a, b) => a.sort_order - b.sort_order) || [];

  // Show general skeleton when main data is loading
  if (loading) {
    return <HomeSkeleton />;
  }

  // Show error when there's an error
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => window.location.reload()}
        title="خطأ في تحميل الصفحة الرئيسية"
        message="عذراً، حدث خطأ أثناء تحميل محتوى الصفحة الرئيسية. يرجى المحاولة مرة أخرى."
      />
    );
  }


  return (
    <div className="pt-[30px] max-sm:!pt-[10px] flex flex-col min-h-screen">
      {sortedSections.map((section) => {
        switch (section.section) {
          case 'Slider_Section':
            return (
              <SectionWrapper key={section.id} order={section.sort_order} className="!py-0 !pb-8 md:!pb-12">
                <BannerSlider order={section.sort_order} loading={loading} data={section.data} />
              </SectionWrapper>
            );

          case 'Banners_Section':
            return (
              <SectionWrapper key={section.id} order={section.sort_order}>
                <BannerSection order={section.sort_order} loading={loading} data={section.data} />
              </SectionWrapper>
            );

          case 'Dynamic_Products':
          case 'Product_List':
            return (
              <SectionWrapper key={section.id} order={section.sort_order}>
                <ProductSection sectionData={section} loading={loading} buyText={homepage_style_status?.status == 1 ? homepage_style_status?.value?.home_page_buybtn_text : undefined} />
              </SectionWrapper>
            );

          case 'Categories':
            return (
              <SectionWrapper key={section.id} order={section.sort_order}>
                <CategoryList order={section.sort_order} data={section.data} loading={loading} />
              </SectionWrapper>
            );

          case 'Content_With_Icon':
            return (
              <SectionWrapper key={section.id} order={section.sort_order}>
                <FeatureList order={section.sort_order} data={section.data} loading={loading} />
              </SectionWrapper>
            );

          case 'Map_Section':
            return (
              <SectionWrapper key={section.id} order={section.sort_order}>
                <MapSection order={section.sort_order} data={section.data} loading={loading} />
              </SectionWrapper>
            );

          case 'Html_Content':
            return (
              <SectionWrapper key={section.id} order={section.sort_order}>
                <HtmlContentSection order={section.sort_order} data={section.data} loading={loading} />
              </SectionWrapper>
            );

          default:
            return null;
        }
      })}
    </div>
  );

}

// MainSlider Wrapper
const SectionWrapper = ({
  order,
  children,
  className = ''
}) => {
  return (
    <div
      className={`py-8 md:py-16 ${className}`}
      style={{
        background: order % 2 === 0 ? '#fff' : '#f9fafb',
        order
      }}
    >
      {children}
    </div>
  );
};

// Banner Slider Component
function BannerSlider({ data, order, loading = false }) {
  const SkeletonBanner = () => <div className='w-full max-md:!h-[230px] !h-[400px] skeleton' />;
  // small debug helpers to watch what's happening

  const scrollType = data?.section_info?.scroll_type || "Auto";

  const sliderConfig = useMemo(() => ({
    loop: true,
    slidesPerView: 1,
    speed: process.env.REACT_APP_BANNER_SLIDER_SWIPER_SPEED || 1000,
    slideToClickedSlide: false,
    modules: [Navigation, Autoplay, Pagination, EffectFade],
    effect: 'fade',
    pagination: {
      clickable: true,
    },
    autoplay:
      scrollType === "Auto"
        ? {
          delay: process.env.REACT_APP_BANNER_SLIDEER_SWIPER_DELAY || 4000,
          disableOnInteraction: false,
        }
        : false,
  }), [scrollType]);


  return (
    <div className={`container max-sm:!px-[10px]`} style={{ order }}>
      {loading ? (
        <SkeletonBanner />
      ) : data?.images?.length > 0 ? (
        <Swiper
          {...sliderConfig}
          className='w-full h-[400px] max-md:h-[240px]'>
          {data?.images.map((src, i) => (
            <SwiperSlide key={i}>
              <Img className='bg-gray-200 rounded-[20px] w-full h-full object-cover' src={src?.image} alt={`Banner ${i + 1}`} width={1500} height={500} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}

// Banner Section Component (for Banners_Section)
function BannerSection({ data, order, loading = false }) {
  const SkeletonBanner = () => <div className='h-[400px] rounded-lg skeleton' />;

  const scrollType = data?.section_info?.scroll_type || "Auto";

  const sliderConfig = useMemo(() => ({
    loop: true,
    speed: process.env.REACT_APP_BANNER_SECTION_SWIPER_SPEED || 2000,
    slidesPerView: 1,
    slidesPerView: 1,
    modules: [Autoplay, Pagination],
    pagination: {
      clickable: true,
    },
    autoplay:
      scrollType === "Auto"
        ? {
          delay: process.env.REACT_APP_BANNER_SECTION_SWIPER_DELAY || 4000,
          disableOnInteraction: false,
        }
        : false,
  }), [scrollType]);

  return (
    <div className='container max-sm:!px-[10px]' style={{ order }}>
      {loading ? (
        <SkeletonBanner />
      ) : data?.images?.length > 0 ? (
        <Swiper
          {...sliderConfig}
          className='w-full h-[400px] rounded-lg overflow-hidden'>
          {data.images.map((banner, i) => (
            <SwiperSlide key={i}>
              <Img src={banner.image} alt={`Banner ${i}`} className='w-full h-full object-cover rounded-lg' width={600} height={200} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null
      }
    </div >
  );
}

// Product Section Component (handles both Dynamic_Products and Product_List)
function ProductSection({ sectionData, loading = false, buyText }) {
  const { section_info, products } = sectionData.data || {};
  const isSlider = section_info?.view_type === 'Slider';
  const scrollType = section_info?.scroll_type || "Auto";

  const [slidesPerView, setSlidesPerView] = useState(5);
  const [visibleCount, setVisibleCount] = useState(5); // عرض 4 منتجات في البداية
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };


  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1400) setSlidesPerView(5);
      else if (width >= 1200) setSlidesPerView(4); // Fixed condition
      else if (width >= 950) setSlidesPerView(3);
      else if (width >= 650) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const sliderConfig = useMemo(() => ({
    spaceBetween: 10,
    loop: true,
    speed: process.env.REACT_APP_PRODUCTS_SWIPER_SPEED || 2000,
    slideToClickedSlide: false,
    slidesPerView,
    modules: [Navigation, Autoplay, Pagination],
    navigation: {
      prevEl: '.custom-prev',
      nextEl: '.custom-next',
    },
    pagination: {
      clickable: true,
    },
    autoplay:
      scrollType === "Auto"
        ? {
          delay: process.env.REACT_APP_PRODUCTS_SWIPER_DELAY || 4000,
          disableOnInteraction: false,
        }
        : false,
    breakpoints: {
      0: { slidesPerView: 1 },     // phones
      650: { slidesPerView: 2 },   // small tablets
      950: { slidesPerView: 3 },   // tablets
      1200: { slidesPerView: 4 },  // laptops
      1400: { slidesPerView: 5 },  // desktops
    },
  }), [slidesPerView, scrollType]);




  return (
    <div className='relative max-sm:!px-[20px]' style={{ order: sectionData.sort_order }}>
      <div className='container'>
        <div className='relative'>
          <HeadTitle desc={section_info?.sub_titile} title={section_info?.title} loading={loading} />

          {loading ? (
            <div className='flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
              {Array(isSlider ? slidesPerView : 4)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : products?.length > 0 ? (
            <>
              {isSlider ? (
                <div className='relative'>
                  <Swiper {...sliderConfig} className='!py-[50px] md:!px-[5px]'>
                    {products.map(product => (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} buyText={buyText} />
                      </SwiperSlide>
                    ))}
                    <div className='swiper-pagination !mt-6' />
                  </Swiper>

                  {products.length > slidesPerView && (
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
                </div>
              ) :
                (
                  <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-[50px]'>
                      {products.slice(0, visibleCount).map(product => (
                        <ProductCard key={product.id} product={product} buyText={buyText} />
                      ))}
                    </div>
                    {visibleCount < products.length && (
                      <div className='flex justify-center py-4'>
                        <Button name='عرض المزيد' onclick={loadMore} cn='!px-8' />
                      </div>
                    )}
                  </>
                )}
            </>
          ) : (
            <div className='py-12 text-center text-gray-500'>لا توجد منتجات متاحة حالياً</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Category List Component
const CategoryList = ({ data, order, loading = false }) => {
  const scrollType = data?.section_info?.scroll_type || 'Auto';
  const slidesCount = data?.categories?.length ?? 0;


  // Swiper config — slidesPerView: 'auto' keeps the original fixed w-[160px] cards
  const sliderConfig = useMemo(() => ({
    modules: [Autoplay, Pagination],
    spaceBetween: 16, // small gap similar to your original gap-4 / gap-6
    speed: process.env.REACT_APP_CATEGORIES_SWIPER_SPEED || 2000,
    breakpoints: {
      320: { slidesPerView: "auto" },  // tiny phones
      480: { slidesPerView: 2 },  // small phones
      640: { slidesPerView: 3 },  // larger phones
      768: { slidesPerView: 4 },  // tablet
      1024: { slidesPerView: 6 },  // small desktop
      1280: { slidesPerView: 8 },  // large desktop
    },
    centeredSlides: false,
    pagination: { el: '.category-pagination', clickable: true },
    autoplay: scrollType === 'Auto'
      ? {
        delay: process.env.REACT_APP_CATEGORIES_SWIPER_DELAY || 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        waitForTransition: false,
      }
      : false,
    observer: true,
    observeParents: true,
    // keep default behavior for swipe/drag so visual style is unchanged
  }), [scrollType]);

  // helper to decide if center is needed
  const checkCenter = useCallback(() => {
    const wrapper = document.querySelector(".categories-section > .swiper-wrapper");
    if (!wrapper) return;

    const width = window.innerWidth;
    let perView = 1;

    Object.entries(sliderConfig.breakpoints).forEach(([bp, val]) => {
      if (width >= +bp) {
        perView = val.slidesPerView === "auto" ? slidesCount : val.slidesPerView;
      }
    });

    if (slidesCount < perView) {
      wrapper.classList.add("justify-center");
    } else {
      wrapper.classList.remove("justify-center");
    }
  }, [slidesCount, sliderConfig]);

  useEffect(() => {
    checkCenter();
    window.addEventListener("resize", checkCenter);
    return () => window.removeEventListener("resize", checkCenter);
  }, [checkCenter]);

  return (
    <div className='container flex flex-col gap-12' style={{ order }}>
      {/* العنوان */}
      <HeadTitle title={data?.section_info?.title} desc={data?.section_info?.sub_titile} loading={loading} />

      {/* القائمة أو الـ Skeleton */}
      {loading ? (
        <div className='flex flex-wrap justify-center gap-6'>
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className='w-[160px] flex flex-col items-center gap-3'>
              <div className='overflow-hidden w-full h-[110px] shadow-inner p-2 rounded-lg border border-gray-200'>
                <div className='skeleton w-full h-full rounded-md' />
              </div>
              <div className='skeleton w-[100px] h-4 rounded-md mt-4' />
            </div>
          ))}
        </div>
      ) : data?.categories?.length > 0 ? (
        // Swiper preserves each item's classNames so style is unchanged
        <div className=''>
          <Swiper {...sliderConfig} className='py-2 items-center categories-section'  >
            {data.categories.map((category, i) => (
              <SwiperSlide
                key={category?.id ?? category?.slug ?? i}
                style={{ width: "160px" }}
              >
                <Link
                  to={getFullPath("category/", category.slug)}
                  className="w-[160px] flex flex-col items-center transition-transform duration-300 hover:scale-105 group mx-auto"
                >
                  <div className="overflow-hidden w-full h-[110px] shadow-inner p-2 rounded-lg border border-gray-200">
                    <Img
                      src={category.image_url}
                      alt={category.name}
                      width={160}
                      height={110}
                      className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-4 text-sm text-center text-gray-700 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="category-pagination flex justify-center mt-3"></div>
        </div>
      ) : (
        <div className='py-12 text-center text-gray-500'>لا توجد تصنيفات متاحة حالياً</div>
      )}
    </div>
  );
};

// Feature List Component
function FeatureList({ order, data, loading = false }) {
  const FeatureListSkeleton = () => (
    <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className='flex flex-col items-center text-center p-4'>
          <div className='!w-[50px] !h-[50px] mb-4 bg-gray-300 rounded-full skeleton'></div>
          <div className='!w-24 !h-4 bg-gray-300 rounded mb-2 skeleton'></div>
          <div className='!w-32 !h-3 bg-gray-200 rounded skeleton'></div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ order }}>
      {loading ? (
        <FeatureListSkeleton />
      ) : data?.icons?.length > 0 ? (
        <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data.icons.map((feature, idx) => (
            <div key={idx} className='flex flex-col items-center text-center p-4'>
              <i className={`fas ${feature.icon_name} text-4xl text-[var(--main)] mb-[20px]`}></i>
              <h3 className='text-lg font-semibold text-[#252A50] mb-1'>{feature.title}</h3>
              <p className='text-[#77839D] text-sm'>{feature.sub_title || 'وصف'}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Map Section Component
function MapSection({ order, data, loading = false }) {
  const [mapError, setMapError] = useState(false);

  return (
    <div>
      <div className='container '>
        {loading ? (
          <div className='skeleton h-[400px] rounded-xl' />
        ) : data ? (
          <div className='py-8 px-4 md:px-8 lg:px-20 rounded-xl'>
            <div className='max-w-6xl mx-auto text-center'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{data.title}</h2>
              <p className='text-gray-600 mb-8'>{data.sub_titile}</p>

              {/* حالة الخطأ */}
              {mapError ? (
                <div className='w-full h-[400px] flex items-center justify-center bg-red-50 border border-red-200 rounded-xl shadow'>
                  <p className='text-red-600 text-lg font-medium'>⚠️ لا يمكن عرض الخريطة حالياً. يرجى من مسؤول المتجر التأكد من صلاحية Google Maps API Key.</p>
                </div>
              ) : (
                <div className='w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200'>
                  {/* <iframe width='100%' height='100%' style={{ border: 0 }} loading='lazy' allowFullScreen referrerPolicy='no-referrer-when-downgrade' src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&zoom=14&q=${data.map_latitude},${data.map_longitude}`} onError={() => setMapError(true)}></iframe> */}

                  <iframe width='100%' height='100%' style={{ border: 0 }} className='w-full h-full rounded-lg border-0' src={`https://maps.google.com/maps?q=${data.map_latitude},${data.map_longitude}&z=15&output=embed`} onError={() => setMapError(true)} allowFullScreen loading='lazy' />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// HTML Content Section Component
function HtmlContentSection({ data, loading = false }) {
  let html = '';

  if (!loading && data?.description) {
    try {
      // فك ترميز HTML
      const decoded = decodeHtml(data.description);
      html = decoded;
    } catch (error) {
      console.error('فشل في فك تشفير HTML:', error);
    }
  }

  return <div className='container '>{loading ? <div className='skeleton !h-[200px] rounded-xl' /> : html ? <div className='prose max-w-none prose-img:rounded-xl prose-h2:text-2xl prose-p:text-gray-700' dangerouslySetInnerHTML={{ __html: html }} /> : null}</div>;
}

// الدالة المساعدة لفك ترميز HTML
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
