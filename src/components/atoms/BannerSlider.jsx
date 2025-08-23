'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css/effect-creative'; // import fade effect CSS
import 'swiper/css';
import 'swiper/css/pagination';

import Img from './Image';

export default function BannerSlider({ data, order, loading }) {
    const SkeletonBanner = () => <div className='w-full max-md:!h-[230px] !h-[400px] skeleton' />;

    return (
        <div className={`container max-sm:!px-[10px] ]`} style={{ order: order && order }}>
            {loading ? (
                <SkeletonBanner />
            ) : (
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    effect='creative'
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-120%', 0, -500],
                        },
                        next: {
                            shadow: true,
                            translate: ['120%', 0, -500],
                        },
                    }}
                    speed={1000}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination, EffectCreative]}
                    className='w-full h-[400px] max-md:h-[240px] '>
                    {data?.images.map((src, i) => (
                        <SwiperSlide key={i}>
                            <Img className=' bg-gray-200 rounded-[20px] w-full h-full object-cover ' src={src?.image} alt={`Banner ${i + 1}`} width={1500} height={500} />
                            {/* <img className=' bg-gray-200 rounded-[20px] w-full h-full object-cover ' src={src?.image} alt={`Banner ${i + 1}`} width={1500} height={500} /> */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
