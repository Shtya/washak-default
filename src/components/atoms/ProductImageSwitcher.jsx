// components/ProductImageSwitcher.jsx
import React from "react";
import Img from "./Image";
import { NotFoundImage } from "./NotFoundImage";


/**
 * Props:
 * - mainImage: string | undefined
 * - hoverImage: string | undefined
 * - title: string
 * - hasImages: boolean (optional) - if omitted it's inferred from mainImage/hoverImage
 * - productId: string | number
 * - unique: string/number used to build unique IDs
 */
function ProductImageSwitcher({
    mainImage,
    hoverImage,
    title,
    hasImages,
    productId,
    unique
}) {

    const mainId = `mainImage-${productId}-${unique}`;
    const hoverId = `hoverImage-${productId}-${unique}`;

    const effectiveHasImages =
        typeof hasImages === "boolean" ? hasImages : Boolean(mainImage || hoverImage);

    return (
        <>
            {effectiveHasImages ? (
                <>
                    {mainImage && <Img
                        id={mainId}
                        src={mainImage}
                        alt={title}
                        className="base w-full h-full object-contain"
                    />}
                    {hoverImage && <Img
                        id={hoverId}
                        src={hoverImage}
                        alt={title}
                        className={`${mainImage ? "overlay" : "base"} w-full h-full object-contain`}
                    />}
                </>
            ) : (
                <NotFoundImage productId={productId} unique={unique} />
            )}
        </>
    );
}

export default React.memo(ProductImageSwitcher);
