'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee, Zap, X, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet'
import { Button } from '@/app/components/ui/button'
import { useCart } from '@/app/context/cart-context'

const navItems = ["CAFFEINE", "BEANS", "GEAR", "CULTURE"]

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { cart, setIsCartOpen } = useCart()

  const handleCartClick = () => {
    setOpen(false) // Close mobile menu
    setIsCartOpen(true) // Open cart
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-zinc-900 border-zinc-800 p-0 overflow-y-auto"
        description="Wired & Roasted mobile navigation menu"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 border-b border-zinc-800">
            <SheetTitle className="flex items-center gap-2">
              <div className="relative">
                <Zap className="h-6 w-6 text-red-500 absolute -left-1 -top-1 opacity-70" />
                <Coffee className="h-6 w-6 text-zinc-100 relative z-10" />
              </div>
              <span className="font-black text-xl tracking-tighter text-left">
                <span className="text-red-500">WIRED</span> & <span className="text-amber-500">ROASTED</span>
              </span>
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto py-6">
            <nav className="flex flex-col px-6">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="py-4 border-b border-zinc-800 text-lg font-bold tracking-wider hover:text-red-500 transition-colors mobile-touch-target"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-6 border-t border-zinc-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 mobile-touch-target">
                FUEL UP
              </Button>
              <Button 
                variant="outline" 
                className="border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-500 font-bold py-6 mobile-touch-target"
                onClick={handleCartClick}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                CART {cart.itemCount > 0 && `(${cart.itemCount})`}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
