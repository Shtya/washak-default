// hooks/useAddToCart.js
import { useCallback } from "react";
import { useCartContext } from "../../contexts/cartContext";

export const useAddToCart = () => {
  const { addItem } = useCartContext();

  const handleAddToCart = useCallback((product, imageId, quantity = 1) => {

    const mainImage = document.getElementById(imageId);
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon) return;


    if (!mainImage) {
      // fallback: no image found, just shake and add to cart
      cartIcon.classList.add("animate-shake");
      setTimeout(() => cartIcon.classList.remove("animate-shake"), 500);

      addItem({
        id: product.id,
        quantity: quantity,
        selectedOptions: product.selectedOptions || [],
      });
      return;
    }

    // 1) clone and style
    const rectImg = mainImage.getBoundingClientRect();
    const rectCart = cartIcon.getBoundingClientRect();
    const clone = mainImage.cloneNode(true);

    clone.classList.add("clone-image");
    Object.assign(clone.style, {
      position: "fixed",
      top: `${rectImg.top + rectImg.height / 2}px`,
      left: `${rectImg.left + rectImg.width / 2}px`,
      transform: "translate(-50%, -50%)",
      width: `${rectImg.width}px`,
      height: `${rectImg.height}px`,
      zIndex: 1000,
      pointerEvents: "none",
      opacity: 1,
      transition: "all 1s ease-in-out",
    });
    document.body.appendChild(clone);

    // force style recalc
    void clone.offsetHeight;

    // 2) animate to cart
    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        top: `${rectCart.top + rectCart.height / 2}px`,
        left: `${rectCart.left + rectCart.width / 2}px`,
        width: "64px",
        height: "64px",
        opacity: 0.6,
      });
    });

    // 3) after the 1s transition, clean up & dispatch addItem
    setTimeout(() => {
      clone.remove();

      // shake the cart icon
      cartIcon.classList.add("animate-shake");
      setTimeout(() => cartIcon.classList.remove("animate-shake"), 500);

      // finally, add to cart
      addItem({
        id: product.id,
        quantity: quantity,
        selectedOptions: product.selectedOptions || [],
      });
    }, 1000);
  }, [addItem]);

  return { handleAddToCart };
};
