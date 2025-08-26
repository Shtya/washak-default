import SkeletonCard from "./SkeletonCard";

// General Skeleton Component
export function HomeSkeleton() {


    return (
        <div className="pt-[30px] max-sm:!pt-[10px] flex flex-col min-h-screen ">
            {/* Hero/Banner Skeleton */}
            <div className="py-8 md:py-16 ">
                <div className="container max-sm:!px-[10px]">
                    <div className="w-full max-md:!h-[230px] !h-[400px] skeleton rounded-[20px]" />
                </div>
            </div>

            {/* Product Section Skeleton */}
            <div className="py-8 md:py-16 bg-[#f9fafb]">
                <div className="container max-sm:!px-[20px]">
                    <div className="text-center mb-8">
                        <div className="skeleton w-48 h-8 mx-auto mb-4 rounded-md" />
                        <div className="skeleton w-64 h-4 mx-auto rounded-md" />
                    </div>
                    <div className="flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]">
                        {Array(5).fill(0).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Section Skeleton */}
            <div className="py-8 md:py-16 bg-white">
                <div className="container">
                    <div className="text-center mb-8">
                        <div className="skeleton w-48 h-8 mx-auto mb-4 rounded-md" />
                        <div className="skeleton w-64 h-4 mx-auto rounded-md" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="w-[160px] flex flex-col items-center gap-3">
                                <div className="skeleton w-full h-[110px] rounded-lg" />
                                <div className="skeleton w-[100px] h-4 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature Section Skeleton */}
            <div className="py-8 md:py-16 bg-[#f9fafb]">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-4">
                                <div className="skeleton w-[50px] h-[50px] rounded-full mb-4" />
                                <div className="skeleton w-24 h-4 rounded mb-2" />
                                <div className="skeleton w-32 h-3 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="py-8 md:py-16 bg-white">
                <div className="container">
                    <div className="skeleton h-[200px] rounded-xl" />
                </div>
            </div>
        </div>
    );
}
