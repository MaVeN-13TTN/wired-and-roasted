'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { useIsMobile } from '@/hooks/use-mobile'

type ResponsiveImageProps = Omit<ImageProps, 'src'> & {
  mobileSrc?: string
  desktopSrc: string
  fallbackSrc?: string
  priority?: boolean
}

export function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  fallbackSrc,
  alt,
  priority = false,
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

  return (
    <div className={`relative ${props.className || ''} ${isLoading ? 'bg-zinc-800 animate-pulse' : ''}`} style={props.fill ? { width: '100%', height: '100%', position: 'relative' } : {}}>
      <Image 
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
        {...props}
        className={`${props.className || ''} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      />
    </div>
  )
}
