'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Plus } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Product } from '@/app/types/product'
import { useCart } from '@/app/context/cart-context'
import { QuickViewButton } from '@/app/components/product-quick-view'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="group relative flex flex-col bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 h-full transition-all hover:border-zinc-600">
      {/* Product Image */}
      <div className="aspect-square bg-zinc-900 relative overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full focus-visible-ring" aria-label={`View ${product.name} details`}>
          {product.image ? (
            <Image 
              src={product.image} 
              alt={`${product.name} - ${product.roastLevel || ''} roast coffee${product.origin ? ` from ${product.origin}` : ''}`}
              fill 
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
              <ShoppingBag className="h-16 w-16 text-zinc-700" />
            </div>
          )}
        </Link>

        {/* Quick View Button */}
        <QuickViewButton product={product} />

        {/* Product Tag */}
        {product.tag && (
          <Badge className={`absolute top-2 left-2 ${product.tagColor || 'bg-zinc-700'}`}>
            {product.tag}
          </Badge>
        )}

        {/* Add to Cart Quick Button */}
        <div className="absolute -bottom-10 left-0 right-0 group-hover:bottom-3 transition-all duration-300 px-3">
          <Button 
            className="w-full bg-red-500 hover:bg-red-600 text-xs h-9 gap-1 font-medium mobile-touch-target focus-visible-ring"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/product/${product.id}`} className="block mb-1 focus-visible-ring">
          <h3 className="font-bold text-sm line-clamp-1 hover:text-red-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-medium-contrast text-xs line-clamp-2 mb-2 flex-1">
          {product.description}
        </p>

        {product.intensity && (
          <div className="flex mb-2">
            {Array(5).fill(0).map((_, i) => (
              <span 
                key={i} 
                className={`text-xs ${i < product.intensity! ? 'text-amber-500' : 'text-zinc-700'}`}
              >
                ★
              </span>
            ))}
          </div>
        )}

        <div className="text-amber-500 font-bold text-sm mt-auto">
          {product.price}
        </div>
      </div>
    </div>
  )
}
