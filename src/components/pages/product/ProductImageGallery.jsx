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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const thumbnailVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    selected: { scale: 1.05, border: '2px solid var(--main)', boxShadow: '0 0 10px rgba(0,0,0,0.1)' },
  };

  const zoomButtonVariants = {
    hover: { scale: 1.1, backgroundColor: 'rgba(0,0,0,0.2)', transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const hasImages = images.length > 0;

  return (
    <div className='!p-4 bg-white rounded-md' data-aos='fade-up'>
      <div className='product-images sticky top-[120px] h-fit productSwiper grid grid-cols-1 md:grid-cols-[110px,1fr] gap-[10px]'>
        {/* Main Image or Placeholder */}
        <div className={` max-sm:order-[-1] relative border border-[#eee] rounded-md overflow-hidden max-xl:h-auto h-[550px] w-full flex items-center justify-center bg-gray-50
          ${!hasImages && "col-span-2"}`}>
          {hasImages ? (
            <motion.div key={selectedImage} initial='hidden' animate='visible' exit='exit' variants={imageVariants} className='w-full h-full'>
              <Img id={`mainImage-${product.id}`} src={selectedImage} className='object-fill shadow-inner bg-gray-50 h-full w-full' alt={product?.title} />
            </motion.div>
          ) : (
            <div className='text-gray-500 text-lg h-[550px] flex justify-center items-center'>الصورة غير متاحه</div>
          )}

          {hasImages && (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className='border border-white p-2 absolute left-[10px] bottom-[10px] cursor-pointer rounded-md'
              aria-label='Zoom image'
              variants={zoomButtonVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Maximize2 className='text-white' />
            </motion.button>
          )}
        </div>

        {/* Thumbnails */}
        {hasImages && (
          <div dir='ltr' className='md:order-[-2] product-scroll max-md:overflow-x-auto max-md:h-[80px] md:h-[550px] overflow-auto w-full'>
            <div className='p-2 max-md:!px-0 md:!py-0 flex flex-row md:flex-col items-center gap-3 h-full w-fit'>
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`overflow-hidden rounded-md md:mt-1 w-[90px] h-[75px] md:w-full md:h-[81px] flex-shrink-0 cursor-pointer border border-gray-200`}
                  variants={thumbnailVariants}
                  onClick={() => setSelectedImage(img)}
                  animate={selectedImage === img ? 'selected' : ''}
                  whileHover='hover'
                  whileTap='tap'
                >
                  <Img src={img} className='h-full object-cover w-full' alt={`${product?.title} - Image ${idx + 1}`} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal only if images exist */}
      {hasImages && <ImageModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedImage={selectedImage} product={product} />}
    </div>
  );
};
