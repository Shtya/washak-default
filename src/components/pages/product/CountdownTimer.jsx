import { useState, useEffect, useRef } from "react"

export const CountdownTimer = ({ countdownData, text, productId }) => {
  const [timeLeft, setTimeLeft] = useState({ ...countdownData });
  const timerRef = useRef(null);

  useEffect(() => {
    if (!countdownData?.status) return;

    const storageKey = `countdownStart_${productId}`;
    let startDate = localStorage.getItem(storageKey);

    const countdownSeconds =
      parseInt(countdownData.day) * 86400 +
      parseInt(countdownData.hour) * 3600 +
      parseInt(countdownData.min) * 60 +
      parseInt(countdownData.sec);

    // If no start date in storage OR expired, set new one
    if (!startDate || Date.now() - Number(startDate) >= countdownSeconds * 1000) {
      startDate = Date.now();
      localStorage.setItem(storageKey, startDate);
    } else {
      startDate = Number(startDate);
    }

    const updateTimer = () => {
      const elapsedSeconds = Math.floor((Date.now() - startDate) / 1000);
      const remaining = countdownSeconds - elapsedSeconds;

      if (remaining <= 0) {
        localStorage.removeItem(storageKey); // Optional: clear so it restarts next time
        // ✅ Change style directly using ref
        if (timerRef.current) {
          timerRef.current.style.backgroundColor = "#ffcccc";
          timerRef.current.style.border = "2px solid red";
          timerRef.current.style.padding = "8px";
          timerRef.current.style.borderRadius = "6px";
        }
        return { day: '0', hour: '0', min: '0', sec: '0' };
      }

      const d = Math.floor(remaining / 86400);
      const h = Math.floor((remaining % 86400) / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;

      return {
        day: String(d),
        hour: String(h),
        min: String(m),
        sec: String(s),
      };
    };

    setTimeLeft(updateTimer()); // initialize immediately

    const interval = setInterval(() => {
      setTimeLeft(updateTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!countdownData?.status) return null;

  return (
    <div ref={timerRef} className='flex flex-col justify-start w-fit mt-6 mb-4' data-aos='fade-up' data-aos-delay='300'>
      <div className='text-lg font-medium text-[var(--main)]'>{text || 'الوقت المتبقي على نهاية العرض'} :</div>
      <div className='flex gap-2 rtl:flex-row-reverse rtl:justify-end mt-2'>
        <TimeBox value={String(timeLeft.day).padStart(2, '0')} label='يوم' />
        <TimeBox value={String(timeLeft.hour).padStart(2, '0')} label='ساعة' />
        <TimeBox value={String(timeLeft.min).padStart(2, '0')} label='دقيقة' />
        <TimeBox value={String(timeLeft.sec).padStart(2, '0')} label='ثانية' highlighted />
      </div>
    </div>
  );
};

const TimeBox = ({ value, label, highlighted = false }) => (
  <div className='flex flex-col items-center gap-1'>
    <div className={`w-[65px] h-[65px] flex items-center justify-center rounded-[6px] text-2xl shadow border ${highlighted ? 'bg-[#0a2a5c] text-white' : 'bg-[#f8fafb] border-[#f0f1f1] text-gray-700'}`} style={{ fontFamily: 'Numbers' }}>
      {value}
    </div>
    <div className='text-sm text-[#0a2a5c] font-bold'>{label}</div>
  </div>
);
