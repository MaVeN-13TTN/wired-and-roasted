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
          className="border-zinc-700 bg-zinc-800/60 backdrop-blur-sm hover:bg-zinc-700 absolute top-2 right-2 z-10 rounded-full"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-zinc-900 border-zinc-800 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 relative aspect-square bg-zinc-800 flex items-center justify-center">
            {product.image ? (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            ) : (
              <ShoppingBag className="h-16 w-16 text-zinc-700" />
            )}

            {/* Product Tag */}
            {product.tag && (
              <Badge className={`absolute top-3 left-3 ${product.tagColor || 'bg-zinc-700'}`}>
                {product.tag}
              </Badge>
            )}

            {/* Close button */}
            <DialogClose className="absolute top-3 right-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-5 flex flex-col">
            <DialogTitle className="text-xl font-black tracking-tight">
              {product.name}
            </DialogTitle>
            
            <div className="text-amber-500 font-bold my-2">
              {product.price}
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              {product.description}
            </p>

            {product.intensity && (
              <div className="mb-4">
                <div className="text-sm text-zinc-400 mb-1">Intensity</div>
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
                <div className="text-sm text-zinc-400 mb-1">Origin</div>
                <div className="font-medium">{product.origin}</div>
              </div>
            )}

            {product.roastLevel && (
              <div className="mb-4">
                <div className="text-sm text-zinc-400 mb-1">Roast Level</div>
                <div className="font-medium capitalize">{product.roastLevel}</div>
              </div>
            )}

            <div className="mt-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex border border-zinc-700 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none border-r border-zinc-700"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="w-10 flex items-center justify-center text-sm">
                    {quantity}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none border-l border-zinc-700"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button 
                  className="bg-red-500 hover:bg-red-600 flex-1 font-medium"
                  onClick={handleAddToCart}
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
