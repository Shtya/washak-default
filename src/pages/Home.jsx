'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Img from '../components/atoms/Image.jsx';
import HeadTitle from '../components/atoms/HeadTitle.jsx';
import Button from '../components/atoms/Button.jsx';
import SkeletonCard from '../components/skeleton/SkeletonCard.jsx';
import ProductCard from '../components/pages/product/ProductCard.jsx';
import { useStoreHomeSections } from '../hooks/useStoreHomeSections.js';
import { HomeSkeleton } from '../components/skeleton/HomeSkeleton.jsx';
import ErrorDisplay from '../components/atoms/ErrorDisplay.jsx';
import { useAppContext } from '../contexts/AppContext.js';
import { CustomButtonsNavigate } from '../components/atoms/CustomButtonsNavigate.jsx';
import CategoryCard from '../components/pages/product/CategoryCard.jsx';

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
    <div className="home pt-[33px] max-sm:!pt-[25px] flex flex-col min-h-screen space-y-[35px] md:space-y-[40px] lg:space-y-[45px]"
      style={{ background: "var(--homepage_bk_color,  white)" }}>
      {sortedSections.map((section) => {
        switch (section.section) {
          case 'Slider_Section':
            return (
              <SectionWrapper key={section.id} order={section.sort_order} className="">
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
              <SectionWrapper key={section.id} order={section.sort_order} className='home-feature-section '>
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
      className={`${className} home-section`}
      style={{
        // background: order % 2 === 0 ? '#fff' : '#f9fafb',
        background: "var(--homepage_bk_color,  white)",
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
    <div className={`container max-sm:!px-[20px]`} style={{ order }}>
      {loading ? (
        <SkeletonBanner />
      ) : data?.images?.length > 0 ? (
        <Swiper
          {...sliderConfig}
          className="w-full h-[125px] xs:h-[180px] sm:h-[250px] lg:h-[330px] xl:h-[411px]">
          {data?.images.map((src, i) => (
            <SwiperSlide key={i}>
              <Img className='bg-gray-200 rounded-[10px] md:rounded-[15px] lg:rounded-[20px]  w-full h-full object-cover' src={src?.image} alt={`Banner ${i + 1}`} width={1500} height={500} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}

// Banner Section Component (for Banners_Section)
function BannerSection({ data, order, loading = false }) {
  const SkeletonBanner = () => <div className='w-full max-md:!h-[230px] !h-[400px]  rounded-lg skeleton' />;

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
    <div className='container max-sm:!px-[20px]' style={{ order }}>
      {loading ? (
        <SkeletonBanner />
      ) : data?.images?.length > 0 ? (
        <Swiper
          {...sliderConfig}
          className='w-full h-[125px] xs:h-[180px] sm:h-[250px] lg:h-[330px] xl:h-[411px]'>
          {data.images.map((banner, i) => (
            <SwiperSlide key={i}>
              <Img src={banner.image} alt={`Banner ${i}`} className='bg-gray-200 rounded-[10px] md:rounded-[15px] lg:rounded-[20px]  w-full h-full object-cover' width={600} height={200} />
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

  const order = sectionData.sort_order;

  const sliderConfig = useMemo(() => ({
    spaceBetween: 10,
    loop: true,
    speed: process.env.REACT_APP_PRODUCTS_SWIPER_SPEED || 2000,
    slideToClickedSlide: false,
    modules: [Navigation, Autoplay, Pagination],
    navigation: {
      prevEl: `.prev-${order}`,
      nextEl: `.next-${order}`,
    },
    pagination: {
      clickable: true,
    },
    autoplay: false
      // autoplay: scrollType === "Auto"
      ? {
        delay: process.env.REACT_APP_PRODUCTS_SWIPER_DELAY || 4000,
        disableOnInteraction: false,
      }
      : false,
    breakpoints: {
      0: { slidesPerView: 2 },     // phones
      475: { slidesPerView: 3 },   // small tablets
      1024: { slidesPerView: 4 },   // tablets
      1280: { slidesPerView: 5 },  // laptops
    },
  }), [scrollType]);





  return (
    <div className='relative' style={{ order: sectionData.sort_order }}>
      <div className='container max-md:!px-2.5'>
        <div className='relative'>
          <HeadTitle desc={section_info?.sub_titile} title={section_info?.title} loading={loading} />

          {loading ? (
            <div className='flex flex-nowrap overflow-x-hidden gap-5 section-pad'>
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
                  <Swiper {...sliderConfig} className=' section-pad with-bottom'>
                    {products.map(product => (
                      <SwiperSlide key={product.id} className='!ml-0'>
                        <div>
                          <div className='!ml-2.5 md:!ml-5'>

                            <ProductCard product={product} buyText={buyText} />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                    <div className='swiper-pagination' />
                  </Swiper>


                  <CustomButtonsNavigate swiperPrevClass={`prev-${order}`} swiperNextClass={`next-${order}`} />

                </div>
              ) :
                (
                  <>
                    <div className='grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2.5 gap-y-4 md:gap-x-5 sm:gap-y-5 md:gap-5 xl:gap-6 section-pad with-bottom'>
                      {products.slice(0, visibleCount).map(product => (
                        <ProductCard key={product.id} product={product} buyText={buyText} />
                      ))}
                    </div>

                    {visibleCount < products.length && (
                      <div className='flex justify-center py-4'>
                        <Button name='عرض المزيد' onclick={loadMore} cn='text-white !h-auto bg-[var(--main)] text-[10px] md:text-[12px] lg:text-[15px] rounded-[5px]  p-[6px] md:p-[8px] lg:p-[10px]' />
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
    spaceBetween: 10, // small gap similar to your original gap-4 / gap-6
    speed: process.env.REACT_APP_CATEGORIES_SWIPER_SPEED || 2000,
    breakpoints: {
      0: { slidesPerView: 2 },     // phones
      400: { slidesPerView: 3 },   // small tablets
      1024: { slidesPerView: 4 },   // tablets
      1280: { slidesPerView: 6 },  // laptops
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


  const [isPaginationActive, setPaginationActive] = useState(false);

  const checkPagination = (swiper) => {
    // Check if pagination is configured in params
    const hasPaginationConfig =
      swiper.params.pagination && swiper.params.pagination !== false;
    const isLocked = swiper.isLocked;

    setPaginationActive(hasPaginationConfig && !isLocked);
  };

  return (
    <div className='container flex flex-col' style={{ order }}>
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
        <div className='relative '>
          <Swiper {...sliderConfig} onLock={checkPagination} onUnlock={checkPagination} className={`py-2 items-center categories-section section-pad ${isPaginationActive && 'with-bottom'}`}  >
            {data.categories.map((category, i) => (
              <SwiperSlide
                key={i ?? category?.id ?? category?.slug ?? i}
              >
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
            <div className="category-pagination swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>
          </Swiper>
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
    <div className='container grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 py-[35px] md:py-[40px] lg:py-[45px]'>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className='flex flex-col items-center text-center p-3'>
          <div className='!w-[25px] !h-[25px] sm:!w-[35px] sm:!h-[35px] lg:!w-[40px] lg:!h-[40px] mb-3 bg-gray-300 rounded-full skeleton'></div>
          <div className='!w-20 !h-3 bg-gray-300 rounded mb-1 skeleton'></div>
          <div className='!w-24 !h-2 bg-gray-200 rounded skeleton'></div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ order }}>
      {loading ? (
        <FeatureListSkeleton />
      ) : data?.icons?.length > 0 ? (
        <div className='py-[20px] lg:py-[15px]' style={{ backgroundColor: "var(--icon_section_title_bg_color, transparent)" }}>
          <div className='container  grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5' >
            {data.icons.map((feature, idx) => (
              <div
                key={idx}
                className='rounded-md flex flex-col items-center text-center'
              >
                {/* ICON — 25px mobile → 40px desktop */}
                <i
                  className={`fas ${feature.icon_name} 
                  text-[25px] sm:text-[32px] lg:text-[40px] 
                  mb-[15px]`}
                  style={{ color: "var(--icon_section_title_color, var(--main))" }}
                ></i>

                {/* TITLE — 10px mobile → 16px desktop */}
                <h3
                  className='
                  text-[10px] sm:text-[13px] lg:text-[16px]
                  font-semibold mb-[10px] sm:mb-[12px] lg:mb-[15px]
                '
                  style={{ color: "var(--icon_section_title_color, #252A50)" }}
                >
                  {feature.title}
                </h3>

                {/* SUBTITLE — 10px mobile → 13px desktop */}
                <p
                  className='
                  text-[7px] sm:text-[8px] md:text-[10px] lg:text-[13px]
                '
                  style={{ color: "var(--icon_section_subtitle_color, #77839D)" }}
                >
                  {feature.sub_title || "وصف"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}


// Map Section Component
function MapSection({ order, data, loading = false }) {
  const [mapError, setMapError] = useState(false);

  return (
    <div style={{ order }}>
      <div className="container">
        {loading ? (
          <div className="skeleton h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[400px] rounded-xl" />
        ) : data ? (
          <div className="

            rounded-xl
          ">
            <div className="max-w-6xl mx-auto text-center">

              {/* Title */}
              <h2
                className="
                  text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px]
                  font-bold text-gray-800 mb-[6px]
                "
              >
                {data.title}
              </h2>

              {/* Subtitle */}
              <p
                className="
                  text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px]
                  text-gray-600 mb-[20px] sm:mb-[25px] md:mb-[30px]
                "
              >
                {data.sub_titile}
              </p>

              {/* Error State */}
              {mapError ? (
                <div className="
                  w-full 
                  h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[400px]
                  flex items-center justify-center 
                  bg-red-50 border border-red-200 rounded-xl shadow
                ">
                  <p className="text-red-600 text-[12px] sm:text-[14px] md:text-[16px] font-medium">
                    ⚠️ لا يمكن عرض الخريطة حالياً. يرجى من مسؤول المتجر التأكد من صلاحية Google Maps API Key.
                  </p>
                </div>
              ) : (
                <div className="
                  w-full 
                  h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[400px]
                  rounded-xl overflow-hidden shadow-lg border border-gray-200
                ">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    className="w-full h-full rounded-lg border-0"
                    src={`https://maps.google.com/maps?q=${data.map_latitude},${data.map_longitude}&z=15&output=embed`}
                    onError={() => setMapError(true)}
                    allowFullScreen
                    loading="lazy"
                  />
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
