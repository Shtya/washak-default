export const NotFoundImage = ({ productId, unique }) => {
    return <div id={`notfoundImage-${productId}-${unique}`} className="w-full h-full flex items-center justify-center text-xs md:text-sm text-gray-400 bg-gray-100">
        صورة غير متاحة
    </div>
} 