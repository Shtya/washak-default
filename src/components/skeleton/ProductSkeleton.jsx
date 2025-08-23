import React from 'react';

export default function ProductSkeleton() {
    return (
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
}


export const FormSkeleton = () => (
  <div className='space-y-4 p-4 bg-white rounded-lg'>
    {[...Array(3)].map((_, i) => (
      <div key={i} className='flex flex-col gap-2'>
        <div className='h-4 bg-gray-200 rounded w-1/3'></div>
        <div className='h-10 bg-gray-200 rounded'></div>
      </div>
    ))}
  </div>
);

export const ProductInfoSkeleton = () => (
  
  <div className='!p-6 bg-white rounded-md h-fit flex-1 space-y-4  '>
    <div className='h-8 bg-gray-200 rounded w-3/4'></div>
    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
    <div className='h-6 bg-gray-200 rounded w-1/4'></div>
    <div className='space-y-2 !mt-8 '>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='h-4 !mt-4 bg-gray-200 rounded'></div>
      ))}
    </div>
    <div className='grid grid-cols-1 gap-4 !mt-8'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='space-y-1 items-center grid grid-cols-[120px,1fr] '>
          <div className='h-3 bg-gray-200 rounded w-1/2'></div>
          <div className='h-6 bg-gray-200 rounded w-full'></div>
        </div>
      ))}
    </div>
    <div className='flex gap-4 pt-4'>
      <div className='h-10 bg-gray-200 rounded w-1/2'></div>
      <div className='h-10 bg-gray-200 rounded w-1/2'></div>
    </div>
  </div>
);

export const ProductImageSkeleton = () => (
  <div className='!p-4 bg-white rounded-md'>
    <div className='sticky top-[120px] h-fit grid grid-cols-1 md:grid-cols-[110px,1fr] gap-[10px]'>
      <div className='max-sm:order-[-1] relative border border-[#eee] rounded-md overflow-hidden max-xl:h-auto h-[550px] w-full bg-gray-200'></div>
      <div className='md:order-[-2] overflow-x-auto max-md:h-[70px] md:h-[550px] w-full'>
        <div className='flex flex-row md:flex-col items-center gap-3 h-full w-fit'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='md:w-[107px] max-md:w-[80px] md:h-[100px] h-full flex-shrink-0 bg-gray-200 rounded-md'></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
