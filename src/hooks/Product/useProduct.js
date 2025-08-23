import { useNavigate, useParams } from "react-router-dom";
import { useProductBySlug } from "./useProductBySlug";
import { useRelatedProducts } from "./useRelatedProducts";
import { useCheckoutSettings } from "../useCheckoutSettings";
import useJsonParser from "../useJsonParser";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useVariantCombinations } from "./useVariantCombinations";
import { api } from "../../config/Api";
import { useAppContext } from "../../contexts/AppContext";
import { useAddToCart } from "../cart/useAddToCart";
import { Notification } from "../../config/Notification";

export const useProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { storeOptions } = useAppContext();
    const { handleAddToCart } = useAddToCart();
    // Fetch 
    const { data: productData, loading: productLoading, error:productError } = useProductBySlug(id);
    const { data: relatedProducts, loading: loadingRelatedProducts, error: relatedProductsError } = useRelatedProducts(id);
    const { data: checkoutSettings, loading: checkoutLoading, error: checkoutSettingsError } = useCheckoutSettings();
    // Breadcrumb
    const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'كل المنتجات', href: '/products' }, { label: 'تفاصيل المنتج' }];
    //settings
    const { product, product_variants, frequently_bought_products, product_meta, product_style_settings, product_term_global_options, product_default_variant_combination } = !productLoading && productData?.data ? productData.data : {};
    //seo
    const seo = useJsonParser(product_meta?.seo, 'Error parsing seo data:')
    // Fetch checkout settings
    const checkoutFields = checkoutSettings?.data || [];
    //hurry Up Text
    const hurryUpOptions = useJsonParser(product_meta?.hurry_option);
    // Countdown timer data
    const countdownData = product?.price?.count_down_timer_end ? JSON.parse(product?.price?.count_down_timer_end) : null;
    const productOptions = product_term_global_options?.[0];
    const isQuickCheckout = productOptions?.enable_quick_checkout === '1'
    // Set product ID when data loads
  
    const {
      register,
      formState: { errors },
      setValue,
      getValues,
      trigger,
      watch
    } = useForm({ defaultValues: { qty: 1, options: [], product_id: '' } });
  
    useEffect(() => {
      if (product?.id) {
        setValue('product_id', product?.id);
      }
    }, [product?.id]);
    const quantity = watch('qty');
    const options = watch('options');
    console.log("watched options", options)
    const modifiedOptions = useMemo(
      () => options?.map(opt => opt.split('_')[1]) ?? [],
      [options]
    );

    console.log("watched modifiedOptions", modifiedOptions)
    const { data: variantData, loading:loadingLiveVariantPrice } = useVariantCombinations(product?.id, modifiedOptions)
    // Normalize the top match
    const variant = variantData?.data?.[0] ?? null;
  
  
    const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  
    const [showValidation, setShowValidation] = useState(false);
    const [frequentlyBoughtQty] = useState(1);
  
  
    // Price calculations
    const mainProductPrice = product?.price?.special_price || 0;
    const extrasTotal = frequently_bought_products?.reduce((acc, p) => acc + (p?.price?.special_price || 0), 0);
  
    // Total price for Frequently Bought Together (fixed quantity)
    const frequentlyBoughtTotalPrice = useMemo(() => {
      return (mainProductPrice + extrasTotal) * frequentlyBoughtQty;
    }, [mainProductPrice, extrasTotal, frequentlyBoughtQty]);
  
  
    // Handle buy now click
    const handleBuyNow = async () => {
      const isValid = await trigger();
      if (!isValid) return;
  
      const missingVariants = product_variants?.filter(variant => variant.is_required && !getValues('options')?.some(opt => opt.startsWith(`${variant.id}_`)));
      
      if (missingVariants?.length > 0) {
        setShowValidation(true);
        return;
      }
  
      if (!isQuickCheckout || checkoutSettingsError) {
        handleAddToCart(product, `mainImage-${product.id}`)
        return;
      }
  
      const data = getValues();
      setIsBuyNowLoading(true);
  
  
      const orderSummary = {
        ...data,
        currency_name: storeOptions?.currency.value.currency_name,
        zip_code: data.zip_code || '10001',
        ip_address: '127.0.0.1',
        options: data.options.map(opt => opt.split('_')[1]),
      };
  
      try {
  
        const res = await api.post(`/submit-quick-checkout`, orderSummary);
        sessionStorage.setItem('checkout_data', JSON.stringify({
           currency:storeOptions?.currency.value.currency_name,
           orderSummary, res: res.data.data, productData 
          }));
          
  
        navigate('/thank-you-page');
      } catch (err) { 
        console.error('Error submitting order:', err);
        const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'حدث خطأ أثناء إتمام الطلب. الرجاء المحاولة مرة أخرى';
        Notification(errorMessage)
      } finally {
        setIsBuyNowLoading(false);
      }
    };

    const defaultVariantCombination = useMemo(() => {
      if (!product_default_variant_combination) return [];
      
      return product_default_variant_combination
      .join(",") // "1549,1552"
      .split(",") // ["1549","1552"]
      .map(v => Number(v.trim())) // [1549, 1552]
      .filter(n => !isNaN(n));  // remove invalid values
    }, [product_default_variant_combination]);

    return{
        loading: productLoading || checkoutLoading,
        loadingLiveVariantPrice,
        breadcrumbRoutes,
        navigate,
        seo,
        product,
        productOptions,
        countdownData,
        hurryUpOptions,
        variant,
        product_variants,
        getValues,
        setValue,
        showValidation,
        setShowValidation,
        isQuickCheckout,
        checkoutFields,
        register,
        frequently_bought_products,
        frequentlyBoughtTotalPrice,
        defaultVariantCombination,
        isBuyNowLoading,
        errors,
        loadingRelatedProducts,
        relatedProducts,
        handleBuyNow,
        product_style_settings,
        quantity,
        productError,
        checkoutSettingsError,
        relatedProductsError
    }
}