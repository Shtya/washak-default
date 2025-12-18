import { Link } from 'react-router-dom'; // أو 'next/link' في حال كنت تستخدم Next.js
import Button from '../components/atoms/Button';
import { Helmet } from 'react-helmet';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>الصفحة غير موجودة</title>
      </Helmet>
      <div className='h-screen absolute inset-0 top-0 z-[1000] flex items-center justify-center min-h-[calc(100vh-430px)] bg-[#f9f8f4] backdrop-blur-[10px] px-4 text-center'>
        <div className='max-w-sm w-[80%] md:w-full'>
          <img src='/not-found.png' alt='404 Not Found' className='w-fit h-fit mx-auto mb-8 animate-fade-in' />
          {/* TITLE */}
          <h1
            className="
              font-extrabold text-black mb-[10px]
              text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]
            "
          >
            الصفحة غير موجودة
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              text-black/80 leading-relaxed mb-[25px]
              text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]
            "
          >
            عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة.
          </p>
          <div className='flex justify-center'>
            <Button name='العودة إلى الصفحة الرئيسية' href='/' cn='!rounded-3xl px-6 py-3  main-btn btn  transition duration-300' />
          </div>
        </div>
      </div>
    </>
  );
}


