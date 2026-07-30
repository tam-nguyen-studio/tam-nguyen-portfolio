import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface ImageWithFadeProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

export const ImageWithFade: React.FC<ImageWithFadeProps> = ({
  src,
  alt,
  className = '',
  style,
  loading = 'lazy',
  onLoad,
  onError,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) return true;
    return false;
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsLoaded(true);
      return;
    }

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);

    // Fallback timer: Ensure image is visible quickly even if onLoad event is missed
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [src, shouldReduceMotion]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onError) onError(e);
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      className={`transition-opacity duration-200 ease-out will-change-[opacity] ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={style}
      {...rest}
    />
  );
};

export default ImageWithFade;
