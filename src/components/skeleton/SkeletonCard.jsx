export default function SkeletonCard() {
    return < div className='animate-pulse flex-1 group shadow-sm border border-[#EEEEEE] bg-white rounded-lg px-3' >
        <div className='bg-gray-200 h-[230px] rounded mb-4' />
        <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
        <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
        <div className='flex justify-center gap-2 mb-4'>
            <div className='h-4 bg-gray-200 rounded w-1/4' />
            <div className='h-4 bg-gray-200 rounded w-1/6' />
        </div>
        <div className='h-8 bg-gray-200 rounded w-full' />
    </div >
}