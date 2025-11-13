import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/Api";
import { Notification } from "../../config/Notification";

export function useUpsellOrder({ orderId, upsellData }) {
  const [isOrdering, setIsOrdering] = useState();
  const navigate = useNavigate();

  const onOrder = async () => {
    try {
      setIsOrdering(true);

      const body = {
        upsell_id: upsellData?.upsell_id,
        order_id: orderId,
      };

      const res = await api.post('/order-upsell-offer', body);
      const data = res.data.data;
      // Get existing session data
      const sessionRaw = sessionStorage.getItem('checkout_data');
      const sessionParsed = sessionRaw ? JSON.parse(sessionRaw) : {};

      const existingUpsells = sessionParsed.upsellItems || [];

      // Prepare new upsell items with qty = 1 and total = qty * special_price
      const newUpsells = (upsellData?.upsell_items || []).map(item => ({
        ...item,
        qty: 1,
        total: item?.price?.special_price || 0,
      }));

      // Merge upsells and update qty/total if item exists
      const updatedUpsells = [...existingUpsells];
      newUpsells.forEach(newItem => {
        const existingIndex = updatedUpsells.findIndex(item => item.id === newItem.id);
        if (existingIndex !== -1) {
          const existingItem = updatedUpsells[existingIndex];
          existingItem.qty += 1;
          existingItem.total = existingItem.qty * (existingItem?.price?.special_price || 0);
        } else {
          updatedUpsells.push(newItem);
        }
      });

      // Calculate total qty: productData.qty + sum of upsell qtys
      const baseQty = sessionParsed.productData?.data?.product?.qty || 0;
      const upsellQty = updatedUpsells.reduce((sum, item) => sum + item.qty, 0);
      const totalQty = baseQty + upsellQty;

      // Update session
      sessionStorage.setItem(
        'checkout_data',
        JSON.stringify({
          ...sessionParsed,
          res: {
            ...sessionParsed.res,
            total: data?.total || sessionParsed.res?.total,
          },
          orderSummary: {
            ...sessionParsed.orderSummary,
            qty: totalQty,
          },
          upsellItems: updatedUpsells,
        })
      );

      // Notification('تم إضافة العرض بنجاح إلى طلبك', 'success');
      navigate('/thank-you-page');
    } catch (error) {
      console.error(error);
      Notification('حدث خطأ أثناء إضافة العرض. حاول مرة أخرى.', 'error');
    } finally {
      setIsOrdering(false);
    }
  }

  return { onOrder, isOrdering };
}