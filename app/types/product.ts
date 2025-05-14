'use client'

export type ProductCategory = 'CAFFEINE' | 'BEANS' | 'GEAR' | 'CULTURE';

export type ProductTag = 'BESTSELLER' | 'NEW' | 'LIMITED' | 'SALE';

export interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice: number; // For sorting and calculations
  description: string;
  tag?: ProductTag;
  tagColor?: string;
  image: string;
  category: ProductCategory;
  intensity?: number; // 1-5 scale for coffee intensity
  roastLevel?: 'light' | 'medium' | 'dark' | 'extra-dark';
  origin?: string;
  featured?: boolean;
  isAvailable?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Mock products data
export const products: Product[] = [
  {
    id: 'neural-overload',
    name: 'NEURAL OVERLOAD',
    price: '$23.99',
    numericPrice: 23.99,
    description: 'Dark roast with notes of chocolate, caramel, and a jolt of intensity.',
    tag: 'BESTSELLER',
    tagColor: 'bg-red-500',
    image: '/images/neural-overload.png',
    category: 'CAFFEINE',
    intensity: 5,
    roastLevel: 'dark',
    origin: 'Ethiopia',
    featured: true,
    isAvailable: true
  },
  {
    id: 'midnight-circuit',
    name: 'MIDNIGHT CIRCUIT',
    price: '$19.99',
    numericPrice: 19.99,
    description: 'Medium-dark blend with berry undertones and a smooth, electric finish.',
    tag: 'NEW',
    tagColor: 'bg-amber-500',
    image: '/images/midnight-circuit.png',
    category: 'CAFFEINE',
    intensity: 4,
    roastLevel: 'medium',
    origin: 'Colombia',
    featured: true,
    isAvailable: true
  },
  {
    id: 'chaos-theory',
    name: 'CHAOS THEORY',
    price: '$25.99',
    numericPrice: 25.99,
    description: 'Our most unpredictable roast. Complex, bold, and different with every batch.',
    tag: 'LIMITED',
    tagColor: 'bg-zinc-600',
    image: '/images/chaos-theory.png',
    category: 'CAFFEINE',
    intensity: 5,
    roastLevel: 'extra-dark',
    origin: 'Mixed Regions',
    featured: true,
    isAvailable: true
  },
  {
    id: 'voltage-void',
    name: 'VOLTAGE VOID',
    price: '$21.99',
    numericPrice: 21.99,
    description: 'Our signature high-caffeine blend with a smooth finish.',
    tag: 'BESTSELLER',
    tagColor: 'bg-red-500',
    image: '/images/voltage-void.png',
    category: 'CAFFEINE',
    intensity: 5,
    roastLevel: 'dark',
    origin: 'Rwanda',
    featured: true,
    isAvailable: true
  },
  {
    id: 'binary-blast',
    name: 'BINARY BLAST',
    price: '$22.99',
    numericPrice: 22.99,
    description: 'A balanced medium roast with nutty undertones and bright acidity.',
    tag: 'NEW',
    tagColor: 'bg-amber-500',
    image: '/images/binary-blast.png',
    category: 'BEANS',
    intensity: 3,
    roastLevel: 'medium',
    origin: 'Brazil',
    featured: false,
    isAvailable: true
  },
  {
    id: 'cyberpunk-catalyst',
    name: 'CYBERPUNK CATALYST',
    price: '$26.99',
    numericPrice: 26.99,
    description: 'Awakening blend with citrus notes and a kick of caffeine.',
    tag: 'SALE',
    tagColor: 'bg-green-500',
    image: '/images/cyberpunk-catalyst.png',
    category: 'BEANS',
    intensity: 4,
    roastLevel: 'medium',
    origin: 'Costa Rica',
    featured: false,
    isAvailable: true
  },
  {
    id: 'cold-reboot',
    name: 'COLD REBOOT',
    price: '$18.99',
    numericPrice: 18.99,
    description: 'Refreshing cold brew blend designed to restart your system with a clean, smooth taste.',
    tag: 'NEW',
    tagColor: 'bg-amber-500',
    image: '/images/cold-reboot.png',
    category: 'CAFFEINE',
    intensity: 3,
    roastLevel: 'light',
    origin: 'Guatemala',
    featured: false,
    isAvailable: true
  },
  {
    id: 'core-code',
    name: 'CORE CODE',
    price: '$24.99',
    numericPrice: 24.99,
    description: 'The foundation of our lineup. A perfectly balanced medium roast with chocolate notes.',
    tag: 'BESTSELLER',
    tagColor: 'bg-red-500',
    image: '/images/core-code.png',
    category: 'BEANS',
    intensity: 3,
    roastLevel: 'medium',
    origin: 'Peru',
    featured: false,
    isAvailable: true
  },
  {
    id: 'dark-syntax',
    name: 'DARK SYNTAX',
    price: '$22.99',
    numericPrice: 22.99,
    description: 'Complex dark roast with deep, rich flavors and a hint of smokiness.',
    tag: 'LIMITED',
    tagColor: 'bg-zinc-600',
    image: '/images/dark-syntax.png',
    category: 'BEANS',
    intensity: 4,
    roastLevel: 'dark',
    origin: 'Sumatra',
    featured: false,
    isAvailable: true
  },
  {
    id: 'data-storm',
    name: 'DATA STORM',
    price: '$27.99',
    numericPrice: 27.99,
    description: 'A whirlwind of flavors with fruity notes and a surprising spicy finish.',
    tag: 'NEW',
    tagColor: 'bg-amber-500',
    image: '/images/data-storm.png',
    category: 'CAFFEINE',
    intensity: 4,
    roastLevel: 'medium',
    origin: 'Kenya',
    featured: false,
    isAvailable: true
  },
  {
    id: 'firewall-fuel',
    name: 'FIREWALL FUEL',
    price: '$25.99',
    numericPrice: 25.99,
    description: 'Protection against drowsiness with this high-caffeine blend with a spicy kick.',
    tag: 'BESTSELLER',
    tagColor: 'bg-red-500',
    image: '/images/firewall-fuel.png',
    category: 'CAFFEINE',
    intensity: 5,
    roastLevel: 'dark',
    origin: 'India',
    featured: false,
    isAvailable: true
  },
  {
    id: 'quantum-fade',
    name: 'QUANTUM FADE',
    price: '$29.99',
    numericPrice: 29.99,
    description: 'Our most mysterious blend. Flavors shift and change as the coffee cools.',
    tag: 'LIMITED',
    tagColor: 'bg-zinc-600',
    image: '/images/quantum-fade.png',
    category: 'BEANS',
    intensity: 4,
    roastLevel: 'medium-dark',
    origin: 'Ethiopia/Colombia Blend',
    featured: false,
    isAvailable: true
  }
];
