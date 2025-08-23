
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Img from "../../atoms/Image";
import { createPortal } from 'react-dom';
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useRef } from "react";

export const ImageModal = ({ isModalOpen, setIsModalOpen, selectedImage, product }) => {
  const modalRoot = document.getElementById('root');
  const modalContentRef = useRef(null);
  useOutsideClick(modalContentRef, () => setIsModalOpen(false));

  if (!modalRoot) return null;

  return createPortal(<AnimatePresence>
    {isModalOpen && (
      <motion.div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div ref={modalContentRef} className='relative w-[90vw] max-w-4xl' initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
          <motion.button
            onClick={() => setIsModalOpen(false)}
            aria-label="إغلاق"
            className="absolute top-4 right-4 flex items-center justify-center
             w-10 h-10 md:w-11 md:h-11 rounded-full
             bg-gray-100 hover:bg-gray-200
             border border-gray-300 shadow-sm
             cursor-pointer transition-all duration-100 "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-800" strokeWidth={2.5} />
          </motion.button>

          <Img src={selectedImage} alt={product?.title} className='w-full h-auto rounded-lg shadow-lg' />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>, modalRoot)
};