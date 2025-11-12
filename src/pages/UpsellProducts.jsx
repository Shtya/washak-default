import { useNavigate, useParams } from "react-router-dom";
import { useUpsellProducts } from "../hooks/Product/useUpsellProducts";
import Img from "../components/atoms/Image";
import { baseImage } from "../config/Api";
import { NotFoundImage } from "../components/atoms/NotFoundImage";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import PriceCurrency from "../components/atoms/PriceCurrency";
import ErrorDisplay from "../components/atoms/ErrorDisplay";
import useIsVisible from "../hooks/useIsVisible";


export default function UpsellProducts() {
    const { id } = useParams();
    const mainRef = useRef(null);
    const { upsellData, error, loading } = useUpsellProducts(id);

    const { totalSpecialPrice, totalRegularPrice } = useMemo(() => {
        if (!upsellData?.upsell_items?.length) return { totalSpecialPrice: 0, totalRegularPrice: 0 };

        return upsellData.upsell_items.reduce(
            (acc, item) => {
                const special = item?.price?.special_price || 0;
                const regular = item?.price?.regular_price || 0;
                acc.totalSpecialPrice += special;
                acc.totalRegularPrice += regular;
                return acc;
            },
            { totalSpecialPrice: 0, totalRegularPrice: 0 }
        );
    }, [upsellData]);


    if (loading) {
        return (
            <UpsellSkelaton />
        )
    }

    if (error) {
        return (
            <ErrorDisplay
                error={error}
                onRetry={() => window.location.reload()}
                title="خطأ في تحميل الصفحة"
                message="عذراً، حدث خطأ أثناء تحميل محتوى هذه الصفحة. يرجى المحاولة مرة أخرى."
            />
        );
    }
    if (!upsellData) return <div>No upsell data</div>;

    const yesBtn = upsellData.upsell_actions.find(
        (b) => b.action_key === "yes_button_action"
    );
    const noBtn = upsellData.upsell_actions.find(
        (b) => b.action_key === "no_button_action"
    );

    return (
        <div className="bg-[#F8FAFB] py-3 md:py-6 px-4">


            <div ref={mainRef} className="container !py-3 md:!py-6 flex flex-col gap-2  bg-white rounded-[12px] md:rounded-[18px] lg:rounded-[25px]">
                {/* Header */}
                <div className="text-center mb-2">
                    <h4 className="text-lg font-medium">
                        {upsellData.upsell_title || "عرض خاص"}
                    </h4>
                    {upsellData.upsell_description && <p className="font-base text-gray-700">
                        <div dangerouslySetInnerHTML={{ __html: upsellData.upsell_description }} />
                    </p>}
                </div>

                {/* Scrollable product list */}
                <div className="flex-1 space-y-4">
                    {upsellData.upsell_items.map((p, i) => (
                        <div
                            key={p.id}
                            className="flex flex-col items-center rounded-lg"
                        >
                            <div className="overflow-hidden rounded-[4px] w-full max-w-[368px] aspect-[3/4] max-h-[80vh] flex items-center justify-center">

                                {p.medias?.length > 0 ? (
                                    <Img
                                        src={baseImage + p.medias[0].url}
                                        alt={p.title}
                                        placeholder={<NotFoundImage />}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <NotFoundImage
                                        productId={p.id}
                                        unique={Math.random()}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-base md:text-lg font-medium mt-4">{p.title}</p>
                        </div>

                    ))}
                </div>
                {upsellData.upsell_footer && (
                    <div className="text-center text-sm text-gray-600 px-4" dangerouslySetInnerHTML={{ __html: upsellData.upsell_footer }} />
                )}

                {/* Fixed buttons */}

                <div className="flex gap-2  justify-center">
                    <div className="text-[var(--second)] font-medium">
                        <PriceCurrency currency={'ج.م'} price={totalSpecialPrice} />
                    </div>
                    <div className="line-through text-[#B6B4B4] font-medium">
                        <PriceCurrency currency={'ج.م'} price={totalRegularPrice} />
                    </div>
                </div>
                <UpsellFooter noBtn={noBtn} yesBtn={yesBtn} />


            </div>
        </div>
    );
}



function UpsellFooter({ yesBtn, noBtn }) {
    const buyBtnWrapperRef = useRef(null)
    const targetParagraphVisible = useIsVisible(buyBtnWrapperRef);



    return (
        <div
            ref={buyBtnWrapperRef}
            className={`w-full flex gap-4 flex-col justify-center transition-all duration-300 ease-in-out relative`}
            style={{ zIndex: 50 }}
        >

            <FooterBtn noBtn={noBtn} yesBtn={yesBtn} />

            <div className={`transition-all  ${targetParagraphVisible ? 'opacity-0' : 'opacity-100'} fixed bottom-[12px] left-0 translate-y-0 flex justify-center w-full`}>
                <FooterBtn noBtn={noBtn} yesBtn={yesBtn} />
            </div>
        </div>
    );
}


function FooterBtn({ yesBtn, noBtn }) {
    // Parse button styles
    const parseValues = (values) => {
        try {
            return JSON.parse(values);
        } catch {
            return {};
        }
    };

    const yesVals = yesBtn ? parseValues(yesBtn.action_values) : {};
    const noVals = noBtn ? parseValues(noBtn.action_values) : {};


    const navigate = useNavigate();
    function handelYes() {
        navigate('/thank-you-page');
    }

    function handelNo() {
        navigate('/thank-you-page');
    }

    return (
        <div className="flex gap-4 justify-center">
            {yesBtn && (
                <button
                    className={`rounded-lg ${getFontSize(yesVals.yes_font_size)} ${getButtonSize(
                        yesVals.yes_button_size
                    )}`}
                    onClick={handelYes}
                    style={{
                        backgroundColor: yesVals.yes_bg_color,
                        color: yesVals.yes_font_color,
                    }}
                >
                    {yesVals.yes_button_title || "نعم"}
                </button>
            )}
            {noBtn && (
                <button
                    className={`rounded-lg ${getFontSize(noVals.no_font_size)} ${getButtonSize(
                        noVals.no_button_size
                    )}`}
                    onClick={handelNo}
                    style={{
                        backgroundColor: noVals.no_bg_color,
                        color: noVals.no_font_color,
                    }}
                >
                    {noVals.no_button_title || "لا"}
                </button>
            )}
        </div>
    )
}


function UpsellSkelaton() {
    return (
        <div className="bg-[#F8FAFB] py-3 md:py-6 px-4">
            <div className="flex flex-col gap-2 container  !py-3 md:!py-6 animate-pulse bg-white rounded-[12px]">
                {/* Header skeleton */}
                <div className="text-center space-y-2">
                    <div className="h-6 w-40 mx-auto bg-gray-200 rounded" />
                    <div className="h-4 w-64 mx-auto bg-gray-200 rounded" />
                </div>

                {/* Product skeleton */}
                <div className="flex flex-col items-center space-y-4 mt-6">
                    <div className="w-full max-w-[368px] aspect-[3/4] max-h-[80vh]  bg-gray-200 rounded-md" />
                    <div className="h-5 w-48 bg-gray-200 rounded" />
                </div>

                {/* Footer skeleton */}
                <div className="w-full">
                    <div className="flex flex-col gap-3 items-center">
                        <div className="flex gap-2 justify-center">
                            <div className="h-5 w-24 bg-gray-200 rounded" />
                            <div className="h-5 w-24 bg-gray-200 rounded" />
                        </div>
                        <div className="flex gap-4 justify-center w-full ">
                            <div className="w-[220px] h-[44px] bg-gray-200 rounded-lg" />
                            <div className="w-[220px] h-[44px] bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// helper to map sizes
function getFontSize(size) {
    switch (size) {
        case "large":
            return "text-lg md:text-xl"; // responsive bump
        case "medium":
            return "text-base md:text-lg";
        case "small":
            return "text-sm md:text-base";
        default:
            return "text-base";
    }
};

function getButtonSize(size) {
    switch (size) {
        case "large":
            return "w-[290px] h-[54px] md:w-[340px] md:h-[64px]";
        case "medium":
            return "w-[220px] h-[44px] md:w-[260px] md:h-[50px]";
        case "small":
            return "w-[160px] h-[38px] md:w-[180px] md:h-[42px]";
        default:
            return "w-[220px] h-[44px]";
    }
};
