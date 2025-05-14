'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Science Behind High-Caffeine Coffee',
    excerpt: 'Discover the roasting techniques and bean selection that maximize caffeine content without sacrificing flavor.',
    date: 'May 15, 2023',
    author: 'Dr. Elena Rodriguez',
    category: 'BREWING',
    image: '/images/neural-overload.png',
    slug: 'science-behind-high-caffeine-coffee'
  },
  {
    id: '2',
    title: 'From Bean to Circuit: Our Sourcing Journey',
    excerpt: 'Follow our team as we travel to Ethiopia and Colombia to find the perfect beans for our signature blends.',
    date: 'April 22, 2023',
    author: 'Marcus Chen',
    category: 'SOURCING',
    image: '/images/chaos-theory.png',
    slug: 'bean-to-circuit-sourcing-journey'
  },
  {
    id: '3',
    title: 'Brewing Methods for Maximum Voltage',
    excerpt: 'Learn how different brewing methods can enhance or diminish the caffeine content and flavor profile of your coffee.',
    date: 'March 10, 2023',
    author: 'Sophia Williams',
    category: 'BREWING',
    image: '/images/voltage-void.png',
    slug: 'brewing-methods-maximum-voltage'
  }
]

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.07]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 md:gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              COFFEE <span className="text-red-500">CULTURE</span>
            </h2>
            <p className="text-medium-contrast mt-3 md:mt-4 max-w-xl">
              Insights, stories, and guides from our team of coffee obsessives.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="link" className="text-amber-500 font-bold group flex items-center gap-2 self-start md:self-auto">
              VIEW ALL ARTICLES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                  {post.category}
                </div>
              </div>
              
              <div className="p-5">
                <div className="text-zinc-500 text-sm mb-2">
                  {post.date} • {post.author}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-medium-contrast text-sm">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
