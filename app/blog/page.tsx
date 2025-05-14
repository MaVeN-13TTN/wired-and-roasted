'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

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
  },
  {
    id: '4',
    title: 'The Perfect Coffee Setup for Programmers',
    excerpt: 'How to create the ultimate coffee station for long coding sessions. Equipment recommendations and brewing tips.',
    date: 'February 28, 2023',
    author: 'Alex Morgan',
    category: 'GEAR',
    image: '/images/binary-blast.png',
    slug: 'perfect-coffee-setup-programmers'
  },
  {
    id: '5',
    title: 'Coffee and Productivity: The Science',
    excerpt: 'Research-backed insights on how caffeine affects your brain and how to optimize your coffee consumption for peak performance.',
    date: 'January 15, 2023',
    author: 'Dr. Elena Rodriguez',
    category: 'SCIENCE',
    image: '/images/midnight-circuit.png',
    slug: 'coffee-productivity-science'
  },
  {
    id: '6',
    title: 'The History of Coffee in Tech Culture',
    excerpt: 'From the first tech startups to modern coding culture, how coffee became the fuel of innovation.',
    date: 'December 5, 2022',
    author: 'Marcus Chen',
    category: 'CULTURE',
    image: '/images/dark-syntax.png',
    slug: 'history-coffee-tech-culture'
  }
]

const categories = ['ALL', 'BREWING', 'SOURCING', 'GEAR', 'SCIENCE', 'CULTURE']

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen pt-8 pb-16">
      <div id="main-content" className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Blog', current: true }
          ]}
          className="mb-8"
        />

        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            COFFEE <span className="text-red-500">CULTURE</span>
          </h1>
          <p className="text-medium-contrast max-w-2xl">
            Insights, stories, and guides from our team of coffee obsessives. Dive into the world of specialty coffee and discover what makes Wired &amp; Roasted different.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category
                  ? "bg-red-500 hover:bg-red-600"
                  : "border-zinc-700 text-zinc-300 hover:text-zinc-100"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors"
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
        ) : (
          <div className="text-center py-12 bg-zinc-800 rounded-lg">
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-medium-contrast mb-4">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
