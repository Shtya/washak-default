export default function SkeletonCard() {
    return (
        <div className='animate-pulse product-card space-y-[7px] md:space-y-[9px] min-h-[224px] md:min-h-[385px] 
            p-[10px] sm:p-[12px] md:p-[14px] lg:p-[16px] xl:p-[20px]
            border border-[#EEEEEE] bg-white rounded-[5px] h-full flex flex-col'>

            {/* Image Placeholder */}
            <div className='bg-gray-200 h-[92px] md:h-[179px] mb-[10px] md:mb-[18px] rounded-[5px]' />

            {/* Category Placeholder */}
            <div className='h-3 md:h-4 bg-gray-100 rounded-[10px] w-1/3 mx-auto !mt-0' />

            {/* Title Placeholder */}
            <div className='h-4 md:h-5 bg-gray-200 rounded w-3/4 mx-auto' />

            {/* Price Placeholder */}
            <div className='flex justify-center gap-2'>
                <div className='h-4 bg-gray-200 rounded w-1/4' />
                <div className='h-4 bg-gray-100 rounded w-1/6' />
            </div>

            {/* Buttons Row Placeholder */}
            <div className='flex items-center justify-between gap-[10px] mt-auto pt-[10px] md:pt-[21px]'>
                {/* Main Button (Buy Now) */}
                <div className='h-[20px] md:h-[30px] lg:h-[40px] bg-gray-200 rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px] flex-1' />

                {/* Square Button (Cart) */}
                <div className='h-[20px] md:h-[30px] lg:h-[40px] aspect-square bg-gray-200 rounded-[2px] md:rounded-[3.5px] lg:rounded-[5px]' />
            </div>
        </div>
    );
}