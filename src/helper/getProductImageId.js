export function getProductImageId({
    productMainImage,
    productId,
    isHovered,
    hasImages,
    uniqueValue,
  }){
    if (hasImages) {
        return isHovered && productMainImage
          ? `hoverImage-${productId}-${uniqueValue}`
          : `mainImage-${productId}-${uniqueValue}`;
      } else {
        return `notfoundImage-${productId}-${uniqueValue}`;
      }
  }