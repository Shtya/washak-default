// src/hooks/useCheckoutSession.ts
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

export function useCheckoutSession() {
  const navigate = useNavigate()
  const appContext = useAppContext();
  let storeOptions = appContext?.storeOptions ?? {};

  const { thankyou_content, addon_content: addon = {} } = storeOptions;
  const thankyou_content_value = thankyou_content?.value ?? '';
  const thankyou_content_status = thankyou_content?.status ?? 0;


  const { thankyou_css, thankyou_js } = addon?.value || {};
  const shouldInject = addon?.status === 1;


  // 1. Breadcrumbs never change

  const breadcrumbRoutes = useMemo(
    () => [
      { label: 'الرئيسية', href: '/' },
      { label: 'تم إكمال الطلب' },
    ],
    []
  )

  // 2. Read sessionStorage ONCE into a ref (not state)
  const [orderData] = useState(() => {
    const stored = sessionStorage.getItem('checkout_data')
    return stored ? JSON.parse(stored) : null
  })

  // 3. Redirect to home if there's no session data
  useEffect(() => {
    if (!orderData) {
      navigate('/')
    }
  }, [navigate])

  // 4. Animation toggle still needs state
  const [showAnimation, setShowAnimation] = useState(true)

  // 6. Destructure for convenience
  const {
    cart = null,
    orderSummary = null,
    res = null,
    productData = null,
    currency = ''
  } = orderData ?? {};


  const isCartPurchase = Boolean(cart)

  const product = productData?.data?.product
  const variants = productData?.data?.product_variants
  const selectedOptions = orderSummary?.options ?? []

  // 7. Helper to look up a variant’s display name
  const getOptionName = useCallback(
    (variantOptions, optionId) => {
      for (const variant of variantOptions || []) {
        const opt = variant?.options?.find((o) => o.id == optionId)
        if (opt) return opt?.variant_option_name
      }
      return ''
    },
    []
  )

  // 8. Quantity & length computations
  const totalCartQuantity = useMemo(
    () =>
      isCartPurchase
        ? cart?.details?.reduce((sum, i) => sum + i.quantity, 0)
        : orderSummary?.qty,
    [isCartPurchase, cart, orderSummary]
  )

  const cartLength = useMemo(
    () => (isCartPurchase ? cart?.details?.length : 1),
    [isCartPurchase, cart]
  )

  // 9. Totals
  const subTotal = cart?.subtotal
  const shipping = cart?.shipping
  const tax = cart?.tax
  const totals = isCartPurchase ? cart?.total : res?.total


  return {
    breadcrumbRoutes,
    orderData: orderData,
    isCartPurchase,
    product,
    variants,
    selectedOptions,
    getOptionName,
    totalCartQuantity,
    cartLength,
    subTotal,
    shipping,
    tax,
    totals,
    currency,
    showAnimation,
    orderSummary,
    isCartPurchase,
    cart,
    res,
    setShowAnimation,
    shouldInject,
    thankyou_css,
    thankyou_js,
    thankyou_content_status,
    thankyou_content_value
  }
}
