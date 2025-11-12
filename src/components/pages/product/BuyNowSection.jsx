import Button from "../../atoms/Button";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const BuyNowSection = ({
  showValidation,
  isBuyNowLoading,
  handleBuyNow,
  getValues,
  setValue,
  cnbtn,
  buttonText = "شراء الان",
  isSticky = false,
  disabled = false
}) => {
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const buyBtnWrapperRef = useRef(null);

  useEffect(() => {
    // Only attach listeners when sticky behavior is enabled
    if (!isSticky) return;

    let rafId = null;

    const checkVisibility = () => {
      const el = buyBtnWrapperRef.current;
      if (!el) {
        setShowStickyBtn(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      // show sticky only when main buy button is scrolled *above* the viewport
      const isAbove = rect.bottom < 80;
      setShowStickyBtn(isAbove);
    };

    const onScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkVisibility);
    };

    // initial check
    checkVisibility();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isSticky]);

  return (
    <>
      <div
        className="w-full flex flex-col items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-0 !mt-auto"
        data-aos="fade-up"
      >
        {showValidation && (
          <div className="w-full p-2 sm:p-3 bg-red-100 text-red-700 rounded-md text-xs sm:text-sm text-center mt-2 sm:mt-3">
            يرجى تحديد جميع الخيارات المطلوبة قبل الشراء
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-center w-full gap-3 sm:gap-6 mt-2 sm:mt-3">
          {/* wrap the Button so we can reliably attach a ref even if Button doesn't forward refs */}
          <div ref={buyBtnWrapperRef} className="w-full">
            <Button
              disabled={disabled}
              id="buy-now-btn"
              loading={isBuyNowLoading}
              cn={`w-full flex-row-reverse h-[44px] sm:h-[50px] rounded-md text-white  transition text-sm sm:text-base ${cnbtn}`}
              onclick={handleBuyNow}
              icon={<svg width="18" height="18" stroke="currentColor" className=" sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.17132 1.66699L4.22461 4.69199" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.3652 1.66699L15.3119 4.69199" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M1.62891 6.54167C1.62891 5 2.43478 4.875 3.43601 4.875H16.102C17.1032 4.875 17.9091 5 17.9091 6.54167C17.9091 8.33333 17.1032 8.20833 16.102 8.20833H3.43601C2.43478 8.20833 1.62891 8.33333 1.62891 6.54167Z" strokeWidth="1.5" /><path d="M7.94531 11.667V14.6253" strokeWidth="1.5" strokeLinecap="round" /><path d="M11.6895 11.667V14.6253" strokeWidth="1.5" strokeLinecap="round" /><path d="M3.99609 15.533C4.25658 17.1497 4.88336 18.333 7.21143 18.333H12.1199C14.6515 18.333 15.0259 17.1997 15.319 15.633L16.6865 8.33301" strokeWidth="1.5" strokeLinecap="round" /><path d="M2.84961 8.33301L3.4357 11.983" strokeWidth="1.5" strokeLinecap="round" /></svg>}
              name={buttonText}
            />
          </div>

          <QuantityControl getValues={getValues} setValue={setValue} />
        </div>
      </div>

      {/* show the floating sticky button only when enabled and the main button is scrolled above */}
      <Button
        cn={`${isSticky && showStickyBtn ? "" : "!hidden"} sticky-buy-btn !fixed !bottom-4 sm:!bottom-5 !right-4 sm:!right-5 z-50 flex-row-reverse h-[44px] sm:h-[50px] px-3 sm:px-5 rounded-md text-white  transition shadow-lg text-sm sm:text-base`}
        icon={<svg width="18" height="18" className="sm:w-5 sm:h-5 transition-all duration-300" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M7.17132 1.66699L4.22461 4.69199" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.3652 1.66699L15.3119 4.69199" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M1.62891 6.54167C1.62891 5 2.43478 4.875 3.43601 4.875H16.102C17.1032 4.875 17.9091 5 17.9091 6.54167C17.9091 8.33333 17.1032 8.20833 16.102 8.20833H3.43601C2.43478 8.20833 1.62891 8.33333 1.62891 6.54167Z" stroke="white" strokeWidth="1.5" /><path d="M7.94531 11.667V14.6253" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><path d="M11.6895 11.667V14.6253" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><path d="M3.99609 15.533C4.25658 17.1497 4.88336 18.333 7.21143 18.333H12.1199C14.6515 18.333 15.0259 17.1997 15.319 15.633L16.6865 8.33301" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><path d="M2.84961 8.33301L3.4357 11.983" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>}
        onclick={handleBuyNow}
        name={buttonText}
      />

    </>
  );
};



export const QuantityControl = ({ getValues, setValue }) => {
  // Quantity handlers
  const increaseQuantity = () => {
    const currentQty = getValues('qty') || 1;
    setValue('qty', currentQty + 1, { shouldValidate: true });
  };

  const decreaseQuantity = () => {
    const currentQty = getValues('qty') || 1;
    setValue('qty', Math.max(1, currentQty - 1), { shouldValidate: true });
  };

  return (
    <div className='w-full sm:w-fit flex items-center justify-center sm:justify-start gap-2 sm:gap-3' data-aos='fade-up'
      style={{ color: 'var(--quantity_text_color, var(--main))' }}
    >
      <div className='text-sm sm:text-base  font-medium'>الكمية:</div>
      <div className='flex items-center justify-between gap-1 sm:gap-2 border rounded-md px-1 sm:px-2 py-1.5 sm:py-2'
        style={{ background: 'var(--quantity_bk_color, white)', borderColor: 'var(--quantity_border_color, #EEEEEE)' }}
      >
        <button
          onClick={increaseQuantity}
          className='rounded-md px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-200 transition'
          disabled={getValues('qty') >= 999}
          aria-label='زيادة الكمية'
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]"
            style={{ color: 'var(--quantity_signs_color, var(--main))' }}
          />
        </button>
        <span className='h-5 sm:h-6 w-[1px] bg-[#eee]'></span>
        <span className='w-8 sm:w-10 text-center font-bold  text-sm sm:text-base'>{getValues('qty') || 1}</span>
        <span className='h-5 sm:h-6 w-[1px] bg-[#eee]'></span>
        <button
          onClick={decreaseQuantity}
          className='rounded-md px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-200 transition'
          disabled={(getValues('qty') || 1) <= 1}
          aria-label='تقليل الكمية'
        >
          <Minus size={16} className="sm:w-[18px] sm:h-[18px]"
            style={{ color: 'var(--quantity_signs_color, var(--main))' }} />
        </button>
      </div>
    </div>
  )
}