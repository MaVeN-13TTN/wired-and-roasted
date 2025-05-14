'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogClose
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { useCart } from '@/app/context/cart-context'
import { Product } from '@/app/types/product'
import { Badge } from '@/app/components/ui/badge'

interface QuickViewButtonProps {
  product: Product
}

export function QuickViewButton({ product }: QuickViewButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1) // Reset quantity after adding to cart
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="border-zinc-700 bg-zinc-800/60 backdrop-blur-sm hover:bg-zinc-700 absolute top-2 right-2 z-10 rounded-full focus-visible-ring"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-zinc-900 border-zinc-800 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 relative aspect-square bg-zinc-800 flex items-center justify-center">
            {product.image ? (
              <Image 
                src={product.image} 
                alt={`${product.name} - ${product.roastLevel || ''} roast coffee${product.origin ? ` from ${product.origin}` : ''} - ${product.description}`}
                fill 
                className="object-cover"
              />
            ) : (
              <ShoppingBag className="h-16 w-16 text-zinc-700" aria-hidden="true" />
            )}

            {/* Product Tag */}
            {product.tag && (
              <Badge className={`absolute top-3 left-3 ${product.tagColor || 'bg-zinc-700'}`}>
                {product.tag}
              </Badge>
            )}

            {/* Close button */}
            <div className="absolute top-3 right-3">
              <DialogClose asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 focus-visible-ring"
                  aria-label="Close quick view"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DialogClose>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-5 flex flex-col">
            <DialogTitle className="text-xl font-black tracking-tight">
              {product.name}
            </DialogTitle>
            
            <div className="text-amber-500 font-bold my-2">
              {product.price}
            </div>

            <p className="text-medium-contrast text-sm mb-4">
              {product.description}
            </p>

            {product.intensity && (
              <div className="mb-4">
                <div className="text-sm text-medium-contrast mb-1">Intensity</div>
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${i < product.intensity! ? 'text-amber-500' : 'text-zinc-700'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.origin && (
              <div className="mb-4">
                <div className="text-sm text-medium-contrast mb-1">Origin</div>
                <div className="font-medium">{product.origin}</div>
              </div>
            )}

            {product.roastLevel && (
              <div className="mb-4">
                <div className="text-sm text-medium-contrast mb-1">Roast Level</div>
                <div className="font-medium capitalize">{product.roastLevel}</div>
              </div>
            )}

            <div className="mt-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex border border-zinc-700 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none border-r border-zinc-700 focus-visible-ring"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" aria-hidden="true" />
                  </Button>
                  <div className="w-10 flex items-center justify-center text-sm" aria-live="polite" aria-label={`Quantity: ${quantity}`}>
                    {quantity}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none border-l border-zinc-700 focus-visible-ring"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" aria-hidden="true" />
                  </Button>
                </div>

                <Button 
                  className="bg-red-500 hover:bg-red-600 flex-1 font-medium focus-visible-ring"
                  onClick={handleAddToCart}
                  aria-label={`Add ${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.name} to cart`}
                >
                  Add to Cart
                </Button>
              </div>

              <Link href={`/product/${product.id}`}>
                <Button variant="link" className="w-full text-zinc-400 hover:text-zinc-300">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
