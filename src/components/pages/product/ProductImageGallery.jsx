import { AnimatePresence, motion } from 'framer-motion';
import Img from '../../atoms/Image';
import { Maximize2 } from 'lucide-react';
import { ImageModal } from './ImageModal';
import { useState } from 'react';
import { baseImage } from '../../../config/Api';

export const ProductImageGallery = ({ product }) => {
  const images = product?.medias?.map(media => baseImage + media.url) || [];
  const [selectedImage, setSelectedImage] = useState(images?.[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  const thumbnailVariants = {
    unselected: {
      scale: 1,
      boxShadow: 'none',
      border: '1px solid #e5e7eb',
      // Adding explicit transition to make the change instant/fast
      transition: { duration: 0.15, ease: 'easeOut' }
    },
    selected: {
      scale: 1,
      border: '1px solid var(--main)',
      boxShadow: '0 0 0 2px var(--main)',
      transition: { duration: 0.15, ease: 'easeOut' }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.15 } // Make hover even faster
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.15 }
    },
  };
  const hasImages = images.length > 0;

  return (
    <div className='p-4 bg-white rounded-[10px]' data-aos='fade-up'>
      <div className='product-images sticky top-[120px] h-fit flex max-xl:justify-center gap-3 md:gap-4  flex-row-reverse'>
        {/*h-[200px] xs:h-[250px] md:h-[550px] */}
        {/* Main Image Container */}
        <div className={`relative rounded-md overflow-hidden max-w-full w-[500px]  flex items-center justify-center bg-gray-50`}>
          {hasImages ? (
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedImage}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={imageVariants}
                className='w-full h-full'
              >
                <Img
                  src={selectedImage}
                  className='    object-fit: cover; bg-gray-50 h-auto w-full'
                  alt={product?.title}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className='text-gray-500 text-lg flex justify-center items-center'>الصورة غير متاحه</div>
          )}

          {hasImages && (
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-black/20 hover:bg-black/40 p-2 absolute left-3 bottom-3 cursor-pointer rounded-md backdrop-blur-sm transition-colors'
            >
              <Maximize2 className='text-white size-3 md:size-4 lg:size-5' />
            </button>
          )}
        </div>

        {/* Thumbnails Sidebar */}
        {hasImages && (
          <div
            dir='ltr'
            className='flex-shrink-0 w-fit p-1 product-scroll max-h-[500px] h-full overflow-y-auto overflow-x-hidden box-content'
          >
            <div className='flex flex-col items-center gap-3 pr-2'> {/* pr-2 adds space for scrollbar */}
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  variants={thumbnailVariants}
                  animate={selectedImage === img ? 'selected' : ''}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedImage(img)}
                  className={`
                    relative overflow-hidden rounded-md cursor-pointer border border-gray-200 flex-shrink-0
                    w-[60px] h-[55px] 
                    sm:w-[80px] sm:h-[70px]
                    lg:w-[120px] lg:h-[110px] 
                    transition-all duration-200
                  `}
                >
                  <Img
                    src={img}
                    className="h-full w-full object-cover"
                    alt={`${product?.title} - Image ${idx + 1}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasImages && (
        <ImageModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedImage={selectedImage}
          product={product}
        />
      )}
    </div>
  );
};