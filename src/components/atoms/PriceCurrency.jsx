
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';


export default function PriceCurrency({ cn = '', price, style }) {
  const { storeOptions } = useAppContext();
  const currencyValue = storeOptions?.currency?.value;

  if (price == null) return null;

  const formattedPrice = Number(price).toFixed(2);

  return (
    <div className={`flex items-center text-nowrap ${cn}`}
      style={style}>
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
export function PriceBlock({ ar = true, salePrice, originalPrice, className = '', size }) {
  const { storeOptions } = useAppContext();
  const currencyValue = storeOptions?.currency?.value;

  const extractNumber = (price) => {
    if (!price) return 0;
    const number = typeof price == "string" ? price?.replace(/[^0-9.-]+/g, '') : price;
    return parseFloat(number);
  };

  const newPriceSize =
    size === "sm"
      ? "text-[10px] md:text-[12px] lg:text-[14px]"
      : "text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]";

  const oldPriceSize =
    size === "sm"
      ? "text-[8px] sm:text-[10px] md:text-[11px] lg:text-[12px]"
      : "text-[8px] sm:text-[10px] md:text-[11px] lg:text-[12px]";

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className={`new-price ${newPriceSize} text-[var(--second)] font-medium`}>
        {currencyValue?.currency_position === 'left'
          ? `${ar ? currencyValue?.currency_icon : currencyValue?.currency_name} ${extractNumber(salePrice)}`
          : `${extractNumber(salePrice)} ${ar ? currencyValue?.currency_icon : currencyValue?.currency_name}`}
      </span>

      {originalPrice !== undefined && originalPrice !== salePrice && (
        <span className={`old-price ${oldPriceSize} text-[var(--black-4)] line-through`}>
          {currencyValue?.currency_position === 'left'
            ? `${ar ? currencyValue?.currency_icon : currencyValue?.currency_name} ${extractNumber(originalPrice)}`
            : `${extractNumber(originalPrice)} ${ar ? currencyValue?.currency_icon : currencyValue?.currency_name}`}
        </span>
      )}
    </div>
  );
}
