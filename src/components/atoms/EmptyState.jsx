import Lottie from 'lottie-react';
import emptyAnimation from '../../lottie/no result found.json';
import boxAnimation from '../../lottie/Empty box.json';
import { Link } from 'react-router-dom';

export default function EmptyState({ href = '', name_href = '', type_animation = "empty", message = 'لا توجد بيانات لعرضها', subtext = 'حاول تعديل الفلاتر أو تصفح قسم آخر', className = '', loop = true }) {
  return (
    <div className={`w-full text-center py-16 flex flex-col items-center justify-center text-gray-500 space-y-4 ${className}`}>
      <div className='w-[400px] h-fit '>
        <Lottie animationData={type_animation == "empty" ? emptyAnimation : boxAnimation} loop={loop} />
      </div>
      <p className='text-lg font-semibold text-[var(--black-2)]'>{message}</p>
      <p className='text-sm text-gray-400'>{subtext}</p>

      {href && (
        <Link to={href} className='bg-[var(--second)] text-white px-6 py-2 rounded-md hover:opacity-90 duration-300 transition-all'>
          {name_href}
        </Link>
      )}
    </div>
  );
}
