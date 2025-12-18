import SkeletonCard from "./SkeletonCard";

// General Skeleton Component
export function HomeSkeleton() {


    return (
        <div className="container space-y-[35px] md:space-y-[40px] lg:space-y-[45px]  max-sm:!pt-[15px] pt-[30px] flex flex-col min-h-screen !pb-4 lg:!pb-6"
            style={{ background: "var(--homepage_bk_color,  white)" }}>
            {/* Hero/Banner Skeleton */}
            <div className=" ">
                <div className="">
                    <div className="w-full !h-[125px] xs:!h-[180px] sm:!h-[250px] lg:!h-[330px] xl:!h-[411px] skeleton rounded-[20px]" />
                </div>
            </div>

            {/* Product Section Skeleton */}
            <div className="">
                <div className=" rounded-[8px]">
                    <div className="text-center mb-8">
                        <div className="skeleton w-48 h-8 mx-auto mb-4 rounded-md" />
                        <div className="skeleton w-64 h-4 mx-auto rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-x-hidden gap-x-2.5 gap-y-4 md:gap-x-5 sm:gap-y-5 md:gap-5 xl:gap-6 ">
                        {Array(5).fill(0).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Section Skeleton */}
            <div className="  ">
                <div className="bg-white rounded-[8px]">
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
            <div className="  ">
                <div className="p-8 bg-[#f9fafb] rounded-[8px]">
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
            <div className="  ">
                <div className="bg-white rounded-[8px] space-y-4">
                    <div className="skeleton h-[200px] rounded-xl" />
                    <div className="skeleton h-[200px] rounded-xl" />
                    <div className="skeleton h-[200px] rounded-xl" />
                </div>
            </div>
        </div>
    );
}
