import { generatePagination } from "../../helper/Pagination";

export function Pagination({ currentPage, pageCount, setCurrentPage }) {


    if (pageCount <= 1) return null;

    return <div className=' bg-white flex items-center justify-center pt-6 pb-6 gap-2'>
        <svg onClick={() => setCurrentPage(Number(1))} className={`${currentPage == 1 && "disabled"} bg-white border text-gray-700 cursor-pointer px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 group hover:bg-[var(--main)] hover:fill-white  rounded-full`} width='17' height='16' viewBox='0 0 17 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z' className='group-hover:!fill-white fill-gray-700' fill='' />
            <path d='M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z' className='group-hover:!fill-white fill-gray-700' />
        </svg>

        <svg onClick={() => setCurrentPage(currentPage > 1 ? --currentPage : 1)} className={`${currentPage == 1 && "disabled"} bg-white border text-gray-700 cursor-pointer px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 group hover:bg-[var(--main)] hover:fill-white  rounded-full`} width='17' height='16' viewBox='0 0 17 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z' className='group-hover:!fill-white fill-gray-700' fill='' />
        </svg>

        <div className='flex justify-center  gap-2'>
            {generatePagination(currentPage, pageCount).map((item, idx) =>
                item === '...' ? (
                    <span key={idx} className='px-3 py-2 text-gray-500'>
                        ...
                    </span>
                ) : (
                    <button key={idx} onClick={() => setCurrentPage(Number(item))} className={`px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 hover:bg-[var(--main)] hover:text-white rounded-full ${currentPage === item ? 'bg-[var(--main)] text-white' : 'bg-white border text-gray-700'}`}>
                        {item}
                    </button>
                ),
            )}
        </div>

        <svg onClick={() => setCurrentPage(currentPage < pageCount ? ++currentPage : pageCount)} className={`${currentPage == pageCount && "disabled"} rotate-[-180deg] bg-white border text-gray-700 cursor-pointer px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 group hover:bg-[var(--main)] hover:fill-white  rounded-full`} width='17' height='16' viewBox='0 0 17 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z' className='group-hover:!fill-white fill-gray-700' />
        </svg>

        <svg onClick={() => setCurrentPage(Number(pageCount))} className={`${currentPage == pageCount && "disabled"} rotate-[-180deg] bg-white border text-gray-700 cursor-pointer px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 group hover:bg-[var(--main)] hover:fill-white  rounded-full`} width='17' height='16' viewBox='0 0 17 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z' className='group-hover:!fill-white fill-gray-700' fill='' />
            <path d='M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z' className='group-hover:!fill-white fill-gray-700' />
        </svg>
    </div>
}