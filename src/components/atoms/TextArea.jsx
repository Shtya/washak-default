import React, { useState } from 'react';

export default function TextArea({ required, delay, place, dataAos, error, cnInput, cn, label, icon, KEY, register, cnLabel, rows = 4 }) {
  return (
    <div data-aos={dataAos} data-aos-delay={delay} className={`${cn} flex flex-col gap-[10px] relative`}>
      {label && (
        <label htmlFor={KEY} className={`${cnLabel} text-[#333333] text-lg font-normal`}>
          {label}
          <span className='text-[#ff4b55]'>{required && '*'}</span>
        </label>
      )}

      <div className={`relative overflow-hidden rounded-[8px] text-base border border-[#EEEEEE] w-full ${cnInput}`}>
        <textarea
          className={`
            placeholder:text-[#A5A5A5] 
            text-[#222] 
            font-normal 
            w-full 
            ${icon ? 'ltr:pr-[40px] rtl:pl-[40px]' : ''}
            px-[10px] 
            py-[12px]
            outline-none
            resize-none
          `}
          {...register}
          id={KEY}
          placeholder={place}
          rows={rows}
        />

        {icon && (
          <img
            className='
              absolute 
              hover:opacity-50 
              duration-300 
              ltr:right-[10px] 
              rtl:left-[10px] 
              top-[12px]
              cursor-pointer
            '
            src={icon}
            alt=''
            width={20}
            height={20}
          />
        )}
      </div>

      {error && <div className='error text-[#ff4b55] mt-[-10px] text-sm'>{error?.message}</div>}
    </div>
  );
}
