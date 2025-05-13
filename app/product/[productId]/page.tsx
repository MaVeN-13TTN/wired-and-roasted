'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { products } from '@/app/types/product'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import { ProductCard } from '@/app/components/product-card'
import Image from 'next/image'
import { Heart, Minus, Plus, Share, ShoppingBag, Star } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useCart } from '@/app/context/cart-context'
import { Badge } from '@/app/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'

export default function ProductPage() {
  const { productId } = useParams()
  const product = products.find(p => p.id === productId)
  const relatedProducts = products.filter(p => p.id !== productId && p.category === product?.category).slice(0, 3)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Product not found</p>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Products', href: '/products' },
            { label: product.category, href: `/products?category=${product.category}` },
            { label: product.name, current: true }
          ]}
          className="mb-8"
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-zinc-800 rounded-xl overflow-hidden relative aspect-square">
            {product.image && (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
            )}
            
            {/* Product Tag */}
            {product.tag && (
              <Badge className={`absolute top-4 left-4 ${product.tagColor || 'bg-zinc-700'}`}>
                {product.tag}
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < (product.intensity || 4) ? 'text-amber-500 fill-amber-500' : 'text-zinc-700'}`}
                  />
                ))}
              </div>
              <span className="text-zinc-400 text-sm">42 reviews</span>
            </div>

            <div className="text-2xl font-bold text-amber-500 mb-4">
              {product.price}
            </div>

            <p className="text-zinc-400 mb-6">
              {product.description}
            </p>

            <div className="space-y-4 mb-6">
              {product.origin && (
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Origin</span>
                  <span className="font-medium">{product.origin}</span>
                </div>
              )}
              
              {product.roastLevel && (
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Roast Level</span>
                  <span className="font-medium capitalize">{product.roastLevel}</span>
                </div>
              )}

              {product.intensity && (
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Intensity</span>
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
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex border border-zinc-700 rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none border-r border-zinc-700"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 flex items-center justify-center text-sm">
                  {quantity}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none border-l border-zinc-700"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                className="bg-red-500 hover:bg-red-600 flex-1 font-medium h-10"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-zinc-700 h-10 w-10"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Share className="h-4 w-4" />
              <span>Share this product</span>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12 md:mt-20">
          <Tabs defaultValue="description">
            <TabsList className="bg-zinc-800 border-b border-zinc-700 w-full justify-start rounded-none p-0 h-auto">
              {['description', 'details', 'reviews'].map(tab => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 capitalize font-medium"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="description" className="p-6">
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">About {product.name}</h3>
                <p className="text-zinc-400 mb-4">
                  {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                  ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget
                  ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
                </p>
                <p className="text-zinc-400">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="p-6">
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-zinc-400">Weight</span>
                    <span>12 oz (340g)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-zinc-400">Roast Date</span>
                    <span>Ships within 24 hours of roasting</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-zinc-400">Origin</span>
                    <span>{product.origin || 'Various'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-zinc-400">Tasting Notes</span>
                    <span>Chocolate, Caramel, Electric Finish</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-zinc-400">Brewing Method</span>
                    <span>Perfect for Espresso, Pour Over, French Press</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <p className="text-zinc-400">
                  This is a demonstration. In a real application, customer reviews would be loaded here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-8">
            You Might Also Like
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
