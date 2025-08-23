import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectSlide } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import HeadTitle from './HeadTitle';
import Img from './Image';
import { ShoppingCart } from 'lucide-react';
import { useAddToCart } from '../../hooks/cart/useAddToCart';

export default function ProductCarousel({ btnName = 'شراء الان', order, btnIcon = '/icons/buy.png', loading, bg, cn, arrowTop, products, delay = 5000 }) {
  const [count, setCount] = useState(4);
  const { handleAddToCart } = useAddToCart();
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width >= 1400) setCount(4);
      else if (width >= 950) setCount(3);
      else if (width >= 650) setCount(2);
      else setCount(1);
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const config = {
    spaceBetween: 10,
    loop: true,
    speed: 1000,
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

  const SkeletonCard = () => (
    <div className=' animate-pulse flex-1 group shadow-sm border border-[#EEEEEE] bg-white rounded-lg p-3'>
      <div className='bg-gray-200 h-[230px] rounded mb-4' />
      <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
      <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
      <div className='flex justify-center gap-2 mb-4'>
        <div className='h-4 bg-gray-200 rounded w-1/4' />
        <div className='h-4 bg-gray-200 rounded w-1/6' />
      </div>
      <div className='h-8 bg-gray-200 rounded w-full' />
    </div>
  );

  const showArrows = products?.products?.length > count;

  return (
    <div className={`relative max-sm:!px-[20px]   `} style={{ order: order }}>
      <div className={`container ${cn} `}>
        <div className={`relative ${bg} `}>
          <HeadTitle desc={products?.section_info?.sub_titile} title={products?.section_info?.title} arrowTop={arrowTop} />


          {loading ? (
            <div className=' flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
              {Array(count)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : (
            <>
              <Swiper {...config} className={`!py-[50px] ${arrowTop ? '!px-0' : 'md:!px-[5px]'}`}>
                {products?.products?.map(p => (
                  <SwiperSlide key={p.id}>
                    <div className='group product-item shadow-sm border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3'>
                      <div className='img-switcher-2 relative'>
                        {p.discount_percentage && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>خصم {p.discount_percentage}%</span>}
                        <Img src={p.images?.[0]?.cdn_url} alt={p.title} className='base' />
                        <img id={`mainImage-${p.id}`} src={p.images?.[1]?.cdn_url} alt={p.title} className='overlay' />
                      </div>

                      <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[15px] block mx-auto'>{p.category}</span>

                      <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap' title={p.title}>
                        {p.title}
                      </span>

                      <div className='flex items-center justify-center gap-[10px]'>
                        <span className='text-[var(--second)] text-[15px]'>{p?.price?.current}</span>
                        <span className='text-[var(--black-4)] text-[12px] line-through decoration-1'>{p?.price?.regular}</span>
                      </div>

                      <div className=' flex items-center justify-between mt-[20px] gap-2'>
                        <Link to={`/product/${p.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
                          {btnName}
                          <img src={btnIcon} alt='' width={20} height={20} />
                        </Link>

                        <button onClick={() => handleAddToCart(p, `mainImage-${p.id}`)} className=' h-[40px] w-[40px] flex items-center justify-center  bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md' title='أضف إلى السلة'>
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className='swiper-pagination !mt-6' />
              </Swiper>

              {showArrows && (
                <>
                  <button className={` ${arrowTop ? 'absolute !top-[55px] !left-[20px] ' : ''} max-sm:hidden  bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1]  custom-prev w-[35px] h-[35px] rounded-full flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors  `}>
                    <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M4.71592 0.920471L1.13637 4.50002M1.13637 4.50002L4.71592 8.07956M1.13637 4.50002H13.8636' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </button>
                  <button className={`  ${arrowTop ? 'absolute !top-[55px]  !right-[calc(100%-95px)] ' : ''}  max-sm:hidden  bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1]  custom-next w-[35px] h-[35px] rounded-full flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors`}>
                    <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M10.284 0.920471L13.8635 4.50002M13.8635 4.50002L10.284 8.07956M13.8635 4.50002H1.13623' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
