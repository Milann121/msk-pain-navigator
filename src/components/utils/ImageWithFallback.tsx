import React, { useCallback, useState } from 'react';

interface ImageWithFallbackProps {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
  sizes?: string;
  width?: number;
  height?: number;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  webpSrc,
  fallbackSrc,
  alt,
  className,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  width,
  height,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      if (imgSrc !== '/placeholder.svg') {
        setImgSrc('/placeholder.svg');
      } else {
        target.onerror = null; // prevent loops
      }
    },
    [imgSrc]
  );

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        onError={handleError}
        sizes={sizes}
        width={width}
        height={height}
      />
    </picture>
  );
};

export default ImageWithFallback;
