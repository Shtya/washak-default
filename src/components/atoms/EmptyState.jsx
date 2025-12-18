import Lottie from 'lottie-react';
import emptyAnimation from '../../lottie/no result found.json';
import boxAnimation from '../../lottie/Empty box.json';
import { Link } from 'react-router-dom';

export default function EmptyState({ href = '', name_href = '', type_animation = "empty", message = 'لا توجد بيانات لعرضها', subtext = 'حاول تعديل الفلاتر أو تصفح قسم آخر', className = '', loop = true }) {
  return (
    <div className={`w-full text-center px-[16px] py-[18px] sm:p-[24px] md:p-[32px] lg:p-[40px] xl:p-[50px]
     flex flex-col items-center justify-center text-gray-500 space-y-4 ${className}`}>
      <div className='max-w-[80%] w-[200px] sm:w-[300px] lg:w-[400px]h-fit '>
        <Lottie animationData={type_animation == "empty" ? emptyAnimation : boxAnimation} loop={loop} />
      </div>
      <p className='text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-[var(--black-2)]'>{message}</p>
      <p className='text-[13px] md:text-sm lg:text-[16px] text-gray-400'>{subtext}</p>

      {href && (
        <Link
          to={href}
          className="
            bg-[var(--second)] text-white
            rounded-md transition duration-300 hover:opacity-90

            text-[12px] md:text-[14px] lg:text-[16px]
            h-[30px] sm:h-[32px] md:h-[36px] lg:h-[40px]
            px-[14px] sm:px-[16px] md:px-[18px] lg:px-[20px]

            flex items-center justify-center
          "
        >
          {name_href}
        </Link>
      )}
    </div>
  );
}
