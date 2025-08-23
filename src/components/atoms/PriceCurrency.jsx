
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';


export default function PriceCurrency({ cn = '', price }) {
  const { storeOptions } = useAppContext();
  const currencyValue = storeOptions?.currency?.value;

  if (price == null) return null;

  const formattedPrice = Number(price).toFixed(2);

  return (
    <div className={`flex items-center text-nowrap ${cn}`}>
      {currencyValue?.currency_position === 'left' ? (
        <>
          {currencyValue?.currency_icon} {formattedPrice}
        </>
      ) : (
        <>
          {formattedPrice} {currencyValue?.currency_icon}
        </>
      )}
    </div>
  );
}


export function PriceBlock({ ar = true, salePrice, originalPrice, className = '', size = 'md' }) {
  const { storeOptions } = useAppContext();
  const currencyValue = storeOptions?.currency?.value;

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return { current: 'text-sm', original: 'text-xs' };
      case 'lg':
        return { current: 'text-lg', original: 'text-base' };
      default:
        return { current: 'text-[15px]', original: 'text-[12px]' };
    }
  };

  const fontSize = getFontSize();

  const extractNumber = (price) => {
    if (!price) return 0;
    const number = typeof price == "string" ? price?.replace(/[^0-9.-]+/g, '') : price;
    return parseFloat(number);
  };


  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className={`text-[var(--second)] font-medium ${fontSize.current}`}>
        {currencyValue?.currency_position === 'left'
          ? `${ar ? currencyValue?.currency_icon : currencyValue?.currency_name} ${extractNumber(salePrice)}`
          : `${extractNumber(salePrice)} ${ar ? currencyValue?.currency_icon : currencyValue?.currency_name}`}
      </span>

      {/* السعر الأصلي إذا مختلف */}
      {originalPrice !== undefined && originalPrice !== salePrice && (
        <span className={`text-[var(--black-4)] line-through ${fontSize.original}`}>
          {currencyValue?.currency_position === 'left'
            ? `${ar ? currencyValue?.currency_icon : currencyValue?.currency_name} ${extractNumber(originalPrice)}`
            : `${extractNumber(originalPrice)} ${ar ? currencyValue?.currency_icon : currencyValue?.currency_name}`}
        </span>
      )}
    </div>
  );
}
