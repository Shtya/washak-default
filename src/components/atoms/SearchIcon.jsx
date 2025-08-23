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
    <div className='relative inline-block' ref={searchRef}>
      <div className={`flex items-center gap-2 bg-gray-100 p-2 rounded-full transition-all duration-300 ${open ? 'w-64' : 'w-[55px]'} overflow-hidden`}>
        <div className={`flex-none flex items-center justify-center ${!open ? ' bg-gray-200/70 ' : 'text-white bg-red-500 '}  w-[40px] h-[40px] rounded-full  cursor-pointer`} onClick={handleClick}>
          {!open ? <i className='fa-solid fa-magnifying-glass text-2xl '></i> : <X size={24} />}
        </div>
        {open && <input type='text' className='bg-transparent focus:outline-none w-full' placeholder='بحث...' value={query} onChange={e => setQuery(e.target.value)} autoFocus />}
      </div>

      {open && (
        <ul className='absolute left-0 mt-2 w-64 bg-gray-100 text-[#333]/70 rounded-md shadow-lg z-10 max-h-[300px] overflow-auto'>
          {loading ? (
            <li className='px-4 py-2'>جاري التحميل...</li>
          ) : products.length ? (
            products.map(item => (
              <Link to={`/product/${item.slug}`} key={item.id} className='px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2 block' onClick={handleItemClick}>
                {/* Use the first media image if available */}
                {item.medias?.length ? <Img src={baseImage + item.medias[0].url} alt={item.title} className='w-10 h-10 rounded object-cover' /> : <div className='w-10 h-10 rounded bg-gray-300'></div>}
                <span className='text-xs truncate'>{item.title}</span>
              </Link>
            ))
          ) : (
            <li className='px-4 py-2'>{query ? 'لا يوجد نتائج' : 'اكتب للبحث عن منتجات'}</li>
          )}
        </ul>
      )}
    </div>
  );
}



