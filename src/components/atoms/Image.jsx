import { useState, useEffect } from 'react';

const Img = ({ src, alt, className, placeholder = null, id }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => console.error(`Error loading image: ${src}`);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <>
      {!isLoaded && placeholder && (
        <div className={className}>{placeholder}</div>
      )}
      <img
        src={src}
        alt={alt}
        id={id}
        className={`${className} ${!isLoaded ? 'hidden' : ''}`}
        style={!isLoaded ? { display: 'none' } : {}}
      />
    </>
  );
};

export default Img;