import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface ImageWithFadeProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  minimalFallback?: boolean;
  placeholderAspect?: string;
}

export const ImageWithFade: React.FC<ImageWithFadeProps> = ({
  src,
  alt,
  className = '',
  style,
  loading = 'lazy',
  minimalFallback = false,
  placeholderAspect,
  onLoad,
  onError,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const triedUrls = useRef<Set<string>>(new Set());

  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === 'undefined' || shouldReduceMotion || loading === 'eager') return true;
    return false;
  });

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    triedUrls.current.clear();
  }, [src]);

  useEffect(() => {
    if (shouldReduceMotion || loading === 'eager') {
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
  }, [currentSrc, shouldReduceMotion, loading]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    triedUrls.current.add(currentSrc);

    // Try alternate naming conventions (e.g. soko-glam vs sokoglam)
    const alternatives: string[] = [];
    if (currentSrc.includes('sokoglam-')) {
      alternatives.push(currentSrc.replace('sokoglam-', 'soko-glam-'));
    } else if (currentSrc.includes('soko-glam-')) {
      alternatives.push(currentSrc.replace('soko-glam-', 'sokoglam-'));
    }

    // Try common image extensions
    const extMatch = currentSrc.match(/\.(jpg|jpeg|png|webp)$/i);
    if (extMatch) {
      const base = currentSrc.slice(0, -extMatch[0].length);
      const exts = ['.jpg', '.png', '.webp', '.jpeg'];
      for (const ext of exts) {
        if (!currentSrc.toLowerCase().endsWith(ext)) {
          alternatives.push(base + ext);
        }
      }
    }

    const nextSrc = alternatives.find((candidate) => !triedUrls.current.has(candidate));
    if (nextSrc) {
      setCurrentSrc(nextSrc);
      return;
    }

    setHasError(true);
    setIsLoaded(true);
    if (onError) onError(e);
  };

  if (hasError) {
    if (minimalFallback) {
      return (
        <div
          className={`w-full ${placeholderAspect || 'aspect-[4/5]'} bg-black/[0.02] ${className}`}
          style={style}
          aria-label={alt}
        />
      );
    }
    return (
      <div
        className={`w-full aspect-[4/3] bg-black/[0.03] border border-black/5 flex items-center justify-center text-black/35 font-sans text-[12px] tracking-wide ${className}`}
        style={style}
      >
        <span>{alt || 'Image'}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
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
