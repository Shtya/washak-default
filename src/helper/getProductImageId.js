export function getProductImageId({
    productHoverImage,
    productId,
    isHovered,
    hasImages,
    uniqueValue,
  }){
    if (hasImages) {
        return isHovered && productHoverImage
          ? `hoverImage-${productId}-${uniqueValue}`
          : `mainImage-${productId}-${uniqueValue}`;
      } else {
        return `notfoundImage-${productId}-${uniqueValue}`;
      }
  }