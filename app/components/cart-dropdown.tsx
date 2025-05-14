'use client'

import { useRef, useEffect } from 'react'
import { ShoppingBag, X, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { useCart } from '@/app/context/cart-context'
import { formatPrice } from '@/lib/utils'

export function CartDropdown() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsCartOpen])

  // Prevent dropdown from closing when clicking inside it
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (!isCartOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden"
      onClick={handleDropdownClick}
      role="dialog"
      aria-label="Shopping Cart"
      tabIndex={-1}
    >
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <h2 className="font-bold text-lg">Your Cart ({cart.itemCount})</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-zinc-700"
          onClick={() => setIsCartOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {cart.items.length > 0 ? (
        <>
          <div className="max-h-80 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.product.id} className="p-4 border-b border-zinc-700 flex gap-3">
                <div className="w-16 h-16 bg-zinc-900 rounded-md overflow-hidden relative flex-shrink-0">
                  {item.product.image && (
                    <Image 
                      src={item.product.image} 
                      alt={`${item.product.name} - ${item.quantity} in cart`}
                      fill 
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-sm">{item.product.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-zinc-700 -mr-2 focus-visible-ring"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </Button>
                  </div>
                  <p className="text-zinc-400 text-xs">{item.product.price}</p>
                  <div className="mt-2 flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 rounded-sm border-zinc-700 focus-visible-ring"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.product.name}`}
                    >
                      <Minus className="h-3 w-3" aria-hidden="true" />
                    </Button>
                    <span className="w-8 text-center text-sm" aria-live="polite" aria-atomic="true">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 rounded-sm border-zinc-700 focus-visible-ring"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.product.name}`}
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-zinc-900">
            <div className="flex justify-between mb-3">
              <span className="text-zinc-400">Subtotal</span>
              <span className="font-bold">{formatPrice(cart.total)}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full bg-red-500 hover:bg-red-600 font-bold focus-visible-ring">
                CHECKOUT
              </Button>
            </Link>
            <Button 
              variant="link" 
              className="w-full text-medium-contrast hover:text-zinc-300 mt-2 focus-visible-ring"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        </>
      ) : (
        <div className="p-8 flex flex-col items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-zinc-600 mb-3" aria-hidden="true" />
          <h3 className="font-bold text-lg mb-1">Your cart is empty</h3>
          <p className="text-medium-contrast text-center mb-4">Looks like you haven't added any products to your cart yet.</p>
          <Button 
            className="bg-red-500 hover:bg-red-600 font-bold focus-visible-ring"
            onClick={() => setIsCartOpen(false)}
          >
            START SHOPPING
          </Button>
        </div>
      )}
    </div>
  )
}
