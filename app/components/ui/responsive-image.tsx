'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { useIsMobile } from '@/hooks/use-mobile'

// Create a default very small blurDataURL - a 1x1 pixel dark background
const DEFAULT_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

type ResponsiveImageProps = Omit<ImageProps, 'src'> & {
  mobileSrc?: string
  desktopSrc: string
  fallbackSrc?: string
  priority?: boolean
  quality?: number
  blurDataURL?: string
  loading?: 'eager' | 'lazy'
}

export function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  fallbackSrc,
  alt,
  priority = false,
  quality = 85, // Default to 85% quality - good balance between quality and file size
  loading,
  blurDataURL = DEFAULT_BLUR_DATA_URL, // Use our default blur for all images
  ...props
}: ResponsiveImageProps) {
  const isMobile = useIsMobile()
  const [src, setSrc] = useState<string>(desktopSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Set image source based on device type
    if (isMobile !== undefined) {
      setSrc(isMobile && mobileSrc ? mobileSrc : desktopSrc)
    }
  }, [isMobile, mobileSrc, desktopSrc])

  const handleError = () => {
    setError(true)
    if (fallbackSrc) {
      setSrc(fallbackSrc)
    }
  }

  // We want to use blur effect for better loading experience
  // We'll use it only when not in error state
  const useBlurPlaceholder = !error

  return (
    <div 
      className={`relative ${props.className || ''} ${isLoading ? 'bg-zinc-800 animate-pulse' : ''}`} 
      style={props.fill ? { width: '100%', height: '100%', position: 'relative' } : {}}
    >
      <Image 
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
        quality={quality}
        loading={!priority ? loading : undefined} // Don't set loading if priority is true
        placeholder={useBlurPlaceholder ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        {...props}
        className={`${props.className || ''} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      />
    </div>
  )
}
