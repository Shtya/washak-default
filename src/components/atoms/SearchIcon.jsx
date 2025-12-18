import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import Img from './Image';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSearchProducts } from '../../hooks/Product/useSearchProducts';
import { baseImage } from '../../config/Api';

export default function SearchIcon() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);

  // Use the new search hook
  const { data, loading } = useSearchProducts(debouncedQuery);

  const products = data?.data?.data || [];

  const handleClick = () => setOpen(prev => !prev);

  // Use the custom useOutsideClick hook
  useOutsideClick(searchRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  // Close dropdown when an item is clicked
  const handleItemClick = () => {
    setOpen(false);
    setQuery(''); // Optional: clear the search query
  };

  return (
    <div className='relative ' ref={searchRef}>
      <div className={`flex items-center gap-2  rounded-full transition-all duration-300 ${open ? 'w-[170px] sm:w-[210px] md:w-[240px] lg:w-[270px] p-1 md:p-1.5 lg:p-2' : 'w-[20px] md:w-[25px] lg:w-[30px]'} overflow-hidden`}
        style={{
          backgroundColor: open ? 'var(--search_bg_color,  var(--gray-200))' : undefined, // fallback to gray-200
        }}>
        <div className={`flex-none flex items-center justify-center rounded-full  cursor-pointer`} onClick={handleClick}
          style={open ? { backgroundColor: 'var(--search_icon_bg_color, #ef4444)' } : undefined}>
          {!open ? <svg className='w-[20px] md:w-[25px] lg:w-[30px] h-[20px] md:h-[25px] lg:h-[30px]' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.75 23.75C19.2728 23.75 23.75 19.2728 23.75 13.75C23.75 8.22715 19.2728 3.75 13.75 3.75C8.22715 3.75 3.75 8.22715 3.75 13.75C3.75 19.2728 8.22715 23.75 13.75 23.75Z" stroke="var(--icon_border, var(--black-2))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.25 26.25L20.8125 20.8125" stroke="var(--icon_border, var(--black-2))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg> : <X className='w-[20px] md:w-[20px] lg:w-[25px] h-[20px] md:h-[20px] lg:h-[25px]' />}
        </div>
        {open && <input type='text'
          style={{
            color: 'var(--search_text_color, inhirit)',
          }}
          className=' text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-transparent focus:outline-none w-full' placeholder='بحث...' value={query} onChange={e => setQuery(e.target.value)} autoFocus />}
      </div>

      {open && (
        <ul className='absolute left-0 mt-2  w-[170px] sm:w-[210px] md:w-[240px] lg:w-[270px] bg-gray-100 text-[#333]/70 rounded-md shadow-lg z-10  max-h-[300px] overflow-auto'
        >
          {loading ? (
            <li className='px-3 py-2 text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px]'>جاري التحميل...</li>
          ) : products.length ? (
            products.map(item => (
              <Link
                to={`/product/${item.slug}`}
                key={item.id}
                style={{ color: 'var(--search_text_color, inherit)' }}
                onClick={handleItemClick}
                className='search-hover px-3 md:px-4 py-2 md:py-3 cursor-pointer flex items-center gap-2 md:gap-3'
              >
                {item.medias?.length ? (
                  <Img
                    src={baseImage + item.medias[0].url}
                    alt={item.title}
                    className=' w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] rounded object-cover
              '
                  />
                ) : (
                  <div className=' w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] rounded bg-gray-300
            '></div>
                )}

                <span className=' text-[10px] sm:text-[11px] md:text-[13px] lg:text-[14px] truncate
          '>
                  {item.title}
                </span>
              </Link>
            ))
          ) : (
            <li
              style={{ color: 'var(--search_text_color, inherit)' }}
              className='px-3 py-2 text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px]'
            >
              {query ? 'لا يوجد نتائج' : 'اكتب للبحث عن منتجات'}
            </li>
          )}
        </ul>
      )}

    </div>
  );
}



