'use client';

import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Button({
  delay,
  onclick,
  style,
  dataAos,
  name,
  icon,
  cn,
  href,
  loading = false,
}) {
  const router = useNavigate();

  const handleOnClick = () => {
    if (loading) return; // Prevent click during loading
    onclick?.();
    if (href) {
      router(href);
    }
  };

  return (
    <div
      data-aos={dataAos}
      data-aos-delay={delay}
      onClick={handleOnClick}
      style={style}
      className={`
        ${cn}
        btn-blue
        !h-[50px]
        flex items-center justify-center gap-2 px-4
        transition-all duration-300
        ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-5 h-5 text-white" />
          <span className="text-white">جاري الإرسال...</span>
        </>
      ) : (
        <>
          <div className="text-nowrap">{name}</div>
          {icon && <span>{icon}</span>}
        </>
      )}
    </div>
  );
}
