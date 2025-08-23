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
        <div className='max-w-md w-full'>
          <img src='/not-found.png' alt='404 Not Found' className='w-fit h-fit mx-auto mb-8 animate-fade-in' />
          <h1 className='text-2xl sm:text-3xl font-extrabold text-black mb-4'>الصفحة غير موجودة</h1>
          <p className='text-lg text-black/80 mb-8 leading-relaxed'>عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة .</p>
          <div className='flex justify-center'>
            <Button name='العودة إلى الصفحة الرئيسية' href='/' cn='!rounded-3xl px-6 py-3    transition duration-300' />
          </div>
        </div>
      </div>
    </>
  );
}


