import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useCartContext } from "../../contexts/cartContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api, useApiGet } from "../../config/Api";
import { useCheckoutSettings } from "../useCheckoutSettings";
import useProductsByIds from "./useProductsByIds";
import useVariantQueries from "./useVariantQueries";
import { useForm } from "react-hook-form";
import { Notification } from "../../config/Notification";
import { useRelatedProducts } from "../Product/useRelatedProducts";

export const useCart = () => {
  const navigate = useNavigate();
  const { storeOptions } = useAppContext();
  const {
    cart_max_item_value = {},
    cart_max_total_items = {},
    checkout_page_title = {},
  } = storeOptions ?? {};
  // Cart context should be the single source of truth (provides items and mutation methods)
  const {
    cartItems: contextCartItems = [],
    setSpecificOption,
    removeItem: removeItemFromContext,
    decreaseQty,
    increaseQty,
    clearCart
  } = useCartContext();
  // collect product ids from cart
  const productIdsKey = useMemo(
    () => contextCartItems.map(i => i.id).filter(Boolean),
    [contextCartItems]
  );
  //form
  const {
    register,
    formState: { errors },
    trigger,
    getValues
  } = useForm();
  // use the hook
  const { data: products, isLoading: productsLoading, refetch, error: productsError } = useProductsByIds(productIdsKey);
  // force refetch when ids change
  useEffect(() => {

    if (productIdsKey.length > 0) refetch();
  }, [productIdsKey?.join(",")]);

  //clear cart wehn no products founds with status code 200 to mintain ux
  useEffect(() => {
    if (contextCartItems.length > 0 && !productsLoading && products?.length === 0) {
      clearCart();
    }
  }, [contextCartItems.length, products, productsLoading, clearCart]);

  // local UI state kept here
  const [submitError, setSubmitError] = useState(null);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  // checkout settings 
  const { data: checkoutSettings, loading: checkoutLoading } = useCheckoutSettings();
  const checkoutFields = useMemo(() => checkoutSettings?.data || [], [checkoutSettings]);

  // related products hook 
  const { data: relatedProducts, loading: loadingRelatedProducts } = useRelatedProducts(contextCartItems[0]?.slug);
  // Cache to avoid re-requesting the same variant combos
  const variantFetchCache = useRef(new Map());

  /*
  Build a list of variant requests and run them with useQueries.
  Each query key is ['variantPrice', productId, joinedVariantIds] so react-query caches per combo.
*/

  const variantRequests = useMemo(() => {
    if (!products?.length || !contextCartItems?.length) return [];

    const result = products
      .map(product => {
        const cartItem = contextCartItems.find(c => c.id === product.id);
        if (!cartItem || !product.product_variants?.length) return null;

        const variantIds = cartItem.selectedOptions
          ? cartItem.selectedOptions.map(o => o.split('_')[1])
          : product.product_variants.map(v => v.options?.[0]?.id).filter(Boolean);

        if (!variantIds.length) return null;

        return { productId: product.id, variantIds: variantIds?.sort() };
      })
      .filter(Boolean); // remove nulls

    return result;
  }, [products, contextCartItems]);



  // 👇 use the hook to get prices
  const { data: variantData, isLoading: loadingVariantPrices } = useVariantQueries(variantRequests);

  // 👇 normalize results into an object keyed by productId
  const variantPrices = useMemo(() => {
    const prices = {};
    variantRequests?.forEach((req, idx) => {
      const result = variantData[idx];
      if (result) {
        prices[req.productId] = {
          price: result.price,
          compare_at_price: result.compare_at_price,
          inventory: result.inventory,
        };
      }
    });
    return prices;
  }, [variantRequests, variantData]);

  const taxConfig = storeOptions?.tax;
  // Totals are memoized to avoid unnecessary recomputations in render
  const totals = useMemo(() => {
    let oldSubtotal = 0;
    let subtotal = 0;
    let discount = 0;
    let shipping = 0; // still exposed to caller to set if needed
    // Use tax only if status !== 1
    const tax = taxConfig?.status === 1 ? 0 : Number(taxConfig?.value || 0);

    contextCartItems.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;

      // let price = product.price?.special_price ?? product.price?.price ?? 0;
      // let regularPrice = product.price?.regular_price ?? price;

      let price = 0;
      let regularPrice = 0;

      if (variantPrices[item.id]) {
        price = variantPrices[item.id].price ?? 0;
        regularPrice = variantPrices[item.id].compare_at_price ?? price;
      } else {
        price = product.price?.special_price ?? product.price?.price ?? 0;
        regularPrice = product.price?.regular_price ?? price;
      }

      oldSubtotal += regularPrice * (item.quantity || 1);
      subtotal += price * (item.quantity || 1);
      if (regularPrice > price) discount += (regularPrice - price) * (item.quantity || 1);
    });

    const total = subtotal + shipping + tax;
    return { subtotal, discount, shipping, tax, total, oldSubtotal };
  }, [contextCartItems, products, variantPrices, taxConfig]);


  // Cart mutation helpers — these update the CartContext so the hook and rest of app stay in sync
  const removeItem = useCallback(id => {
    removeItemFromContext(id);
  }, [removeItemFromContext]);

  const handleVariantSelection = useCallback((productId, variantId, optionId) => {
    // Update selection in cart context
    setSpecificOption({ id: productId, variantId, optionId });
  }, [setSpecificOption, products]);

  // validate required variants before checkout
  const validateVariants = useCallback(() => {
    for (const item of contextCartItems) {
      const product = products.find(p => p.id === item.id);
      if (product?.product_variants?.length > 0) {
        const required = product.product_variants.filter(v => v.is_required);
        for (const v of required) {
          const has = item.selectedOptions?.some(opt => opt.startsWith(`${v.id}_`));
          if (!has) {
            return false; // ❌ invalid → return immediately
          }
        }
      }
    }
    return true; // ✅ all valid
  }, [contextCartItems, products]);


  // handleCheckout: returns the API response (caller can navigate or handle success)


  const handleCheckout = useCallback(async ({ skipVariantValidation = false } = {}) => {
    setSubmitError(null);

    const isValid = await trigger();
    if (!isValid) return;

    // basic validation
    if (!skipVariantValidation && !validateVariants()) {
      setSubmitError('الرجاء اختيار جميع الخيارات المطلوبة للمنتجات');
      return;
    }

    // 🚨 New validation for cart_max_item_value and cart_max_total_items
    if (cart_max_item_value?.status == 1) {
      const invalidItem = contextCartItems.find(
        item => (item.quantity || 1) > Number(cart_max_item_value.value || 0)
      );
      const product = products.find(p => p.id === invalidItem?.id);
      if (invalidItem) {
        const msg = `المنتج "${product?.title}" يحتوي على كمية ${invalidItem?.quantity}، بينما الحد الأقصى المسموح هو ${cart_max_item_value.value}`;
        Notification(msg);
        setSubmitError(msg);
        return;
      }
    }

    if (cart_max_total_items?.status == 1) {
      const totalItems = contextCartItems?.length;
      if (totalItems > Number(cart_max_total_items.value || 0)) {
        const msg = `عدد المنتجات في السلة هو ${totalItems}، بينما الحد الأقصى المسموح هو ${cart_max_total_items.value}`;
        Notification(msg);
        setSubmitError(msg);
        return;
      }
    }

    // manually collect all form values
    const data = getValues();

    setIsBuyNowLoading(true);
    try {
      const checkoutItems = contextCartItems.map(item => {
        const product = products.find(p => p.id === item.id) || {};

        // let price = product.price?.special_price ?? product.price?.price ?? 0;;//always get price from product because variant Prices endpoint return it with value that submit-checkout endpoint refuse.
        // let regularPrice = product.price?.regular_price ?? price;//always get regular price (old price) from product because variant Prices endpoint return it with value that submit-checkout endpoint refuse.
        let price = 0;
        let regularPrice = 0;

        if (variantPrices[item.id]) {
          price = variantPrices[item.id].price ?? 0;
          regularPrice = variantPrices[item.id].compare_at_price ?? price;
        } else {
          price = product.price?.special_price ?? product.price?.price ?? 0;
          regularPrice = product.price?.regular_price ?? price;
        }

        return {
          product_id: item.id,
          quantity: item.quantity || 1,
          regular_price: regularPrice,
          special_price: price,
          total_price: price * (item.quantity || 1),
          options: item.selectedOptions ? item.selectedOptions.map(o => o.split('_')[1]) : [],
          variations: [],
          upsell_option: 1,
        };
      });

      const checkoutData = {
        cart_items: checkoutItems,
        cart_totals: {
          subtotal: totals.subtotal,
          tax: totals.tax,
          shipping: totals.shipping,
          discount: 0,
          total: totals.total,
          weight: 0,
        },
        customer_info: {
          ...data
        },
        payment_method: data.payment_method || process.env.DEFAULT_PAYMENT_METHOD_ID || 2,
        currency_name: storeOptions?.currency.value.currency_name,
        user_ip: data.user_ip || '127.0.0.1',
      };

      const response = await api.post('/submit-checkout', checkoutData);
      // store checkout payload for other pages (keep parity with previous behavior)
      try {
        sessionStorage.setItem('checkout_data', JSON.stringify({ currency: checkoutData.currency_name, cart: { ...totals, details: checkoutItems, products }, orderSummary: "", res: "", productData: "" }));
      } catch (e) {
        // ignore storage errors
      }

      if (response?.data?.status_code === 200) {
        clearCart()
        navigate('/thank-you-page');
        return response?.data;
      }

      setSubmitError(response?.data?.message || 'حدث خطأ أثناء إتمام الطلب');
      return response?.data;
    } catch (err) {
      console.error('Checkout error', err);
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'حدث خطأ أثناء إتمام الطلب. الرجاء المحاولة مرة أخرى';
      Notification(errorMessage)
      setSubmitError(errorMessage);
    } finally {
      setIsBuyNowLoading(false);
    }
  }, [contextCartItems, products, variantPrices, totals, validateVariants, storeOptions]);



  // expose everything the component previously used, but now wired to CartContext and optimized
  return {
    // data
    cartItems: contextCartItems,
    products,
    productsLoading,
    checkoutLoading,
    loadingRelatedProducts,
    loadingVariantPrices,
    totals,
    variantPrices,
    relatedProducts,
    submitError,
    isBuyNowLoading,
    checkoutFields,
    errors,
    productsError,
    checkout_page_title,

    // actions
    removeItem,
    register,
    // clearCart,
    decreaseQuantity: decreaseQty,
    increaseQuantity: increaseQty,
    // decreaseQuantity,
    handleVariantSelection,
    handleCheckout,

  };
};