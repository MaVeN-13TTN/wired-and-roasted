'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Cart, CartItem } from '@/app/types/product';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('wiredRoastedCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wiredRoastedCart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.product.numericPrice * item.quantity), 0);
  };

  const calculateItemCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product.id === product.id
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        // Product already exists in cart, update quantity
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new product to cart
        newItems = [...prevCart.items, { product, quantity }];
      }

      const newTotal = calculateTotal(newItems);
      const newItemCount = calculateItemCount(newItems);

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    });

    // Open cart when adding items
    setIsCartOpen(true);
    
    // Auto-close cart after 3 seconds
    setTimeout(() => {
      setIsCartOpen(false);
    }, 3000);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.product.id === productId 
        ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
        : item
      );
      
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 });
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
