import React , {useState} from 'react'


export default function Input({ required , delay , place , dataAos , error , cnInput , cn , label , type , icon , KEY , register , cnLabel}) {
  const [inputType, setInputType] = useState(type);

  const toggleInputType = () => {
	type == "password" &&
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };


	return (
	<div data-aos={dataAos} data-aos-delay={delay} className={`${cn} flex flex-col  gap-[10px] relative `} >
		{label && <label htmlFor={KEY} className={`${cnLabel} text-[#333333] text-lg  font-normal `} > {label} <span className='text-[#ff4b55]' > {required && "*"} </span> </label> }
		
		<div  className={`h-[50px]  relative overflow-hidden rounded-[8px] text-base border border-[#EEEEEE] w-full ${cnInput} `} >
			<input className={`placeholder:text-[#A5A5A5] text-[#222]  font-normal  w-full ${icon ? "ltr:pr-[40px] rtl:pl-[40px]" : "" } px-[10px] h-full outline-none `} {...register} id={KEY} placeholder={place} type={inputType} />
			{icon && <img onClick={toggleInputType} className='absolute hover:opacity-50 duration-300 ltr:right-[10px] cursor-pointer rtl:left-[10px] top-[50%] translate-y-[-50%] '  src={ icon } alt="" width={20} height={20} /> }
		</div>

		{error && <div className='error text-[#ff4b55] mt-[-10px]  text-sm  ' > {error?.message} </div>}
	</div>
  )
}
