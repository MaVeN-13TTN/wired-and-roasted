'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft, Calendar, User, Tag, Clock, Share, Facebook, Twitter, Linkedin } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
  slug: string
  content?: string
  readTime?: string
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
    slug: 'science-behind-high-caffeine-coffee',
    readTime: '5 min read',
    content: `
      <p>Coffee is more than just a beverage; it&apos;s a science. At Wired &amp; Roasted, we&apos;ve spent years perfecting the art of creating high-caffeine coffee that doesn&apos;t sacrifice flavor. But how exactly do we achieve this balance?</p>

      <h2>Bean Selection Matters</h2>

      <p>The journey to high-caffeine coffee begins with bean selection. Robusta beans naturally contain nearly twice the caffeine of Arabica beans (2.2% vs 1.2% caffeine content). However, Robusta is often associated with harsher, more bitter flavors.</p>

      <p>Our solution is a carefully calibrated blend. We use specific Robusta varieties from high-altitude regions in Vietnam and India, which offer cleaner flavor profiles than typical Robusta. These are then blended with specialty-grade Arabica beans from Ethiopia and Colombia to create a balanced flavor profile.</p>

      <h2>The Roasting Process</h2>

      <p>Contrary to popular belief, darker roasts actually contain slightly less caffeine than lighter roasts by weight (though the difference is minimal). This is because the roasting process breaks down some caffeine molecules.</p>

      <p>Our proprietary &quot;Voltage Roasting&quot; method involves a precise temperature curve that preserves caffeine while developing complex flavors. We use a modified drum roaster that allows for extremely precise temperature control, with variations as small as 1°F throughout the roasting process.</p>

      <h2>Grind Size and Extraction</h2>

      <p>The final piece of the puzzle is optimizing for extraction. Caffeine is water-soluble and extracts relatively early in the brewing process. Our recommended grind sizes and brewing methods are specifically designed to maximize caffeine extraction.</p>

      <p>For our Neural Overload blend, we recommend a slightly finer grind than you might typically use, combined with water at 200°F (just below boiling). This combination optimizes caffeine extraction while preventing over-extraction of bitter compounds.</p>

      <h2>The Results</h2>

      <p>Through this combination of bean selection, roasting techniques, and extraction optimization, our high-voltage blends contain approximately 1.5-2x the caffeine of typical coffee. Neural Overload, our most potent blend, delivers approximately 180mg of caffeine per 8oz cup, compared to about 95mg in a standard cup of coffee.</p>

      <p>But numbers only tell part of the story. The real test is in the cup - a clean, complex flavor profile with notes of dark chocolate, caramel, and a distinctive electric finish that lets you know this isn&apos;t your average cup of coffee.</p>
    `
  },
  {
    id: '2',
    title: 'From Bean to Circuit: Our Sourcing Journey',
    excerpt: 'Follow our team as we travel to Ethiopia and Colombia to find the perfect beans for our signature blends.',
    date: 'April 22, 2023',
    author: 'Marcus Chen',
    category: 'SOURCING',
    image: '/images/chaos-theory.png',
    slug: 'bean-to-circuit-sourcing-journey',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Brewing Methods for Maximum Voltage',
    excerpt: 'Learn how different brewing methods can enhance or diminish the caffeine content and flavor profile of your coffee.',
    date: 'March 10, 2023',
    author: 'Sophia Williams',
    category: 'BREWING',
    image: '/images/voltage-void.png',
    slug: 'brewing-methods-maximum-voltage',
    readTime: '6 min read'
  }
]

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Article not found</p>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen pt-8 pb-16">
      <div id="main-content" className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title, current: true }
          ]}
          className="mb-8"
        />

        <Link href="/blog">
          <Button variant="outline" size="sm" className="mb-8 border-zinc-700 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded inline-block mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-medium-contrast text-sm mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-medium-contrast">
                This is a placeholder for the full article content. In a real application, this would be a complete article.
              </p>
            )}
          </div>

          <div className="border-t border-zinc-800 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-2">Share this article</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full border-zinc-700 h-8 w-8">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-zinc-700 h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-zinc-700 h-8 w-8">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="border-zinc-700">
                  More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
