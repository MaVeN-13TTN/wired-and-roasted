'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Product, products } from '@/app/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Filter products based on search query
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      (product.category && product.category.toLowerCase().includes(lowercaseQuery))
    )
    setResults(filtered)
  }, [query])

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpen])

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className="relative z-10">
      <Button 
        variant="outline"
        size="icon"
        className="border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-500"
        onClick={toggleSearch}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-80 md:w-96 rounded-md bg-zinc-800 border border-zinc-700 shadow-xl overflow-hidden"
          role="dialog"
          aria-label="Search products"
        >
          <div className="p-3 border-b border-zinc-700">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-zinc-900 border-zinc-700 focus-visible:ring-red-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search product catalog"
                aria-expanded={query.trim() !== ''}
                aria-controls="search-results"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-zinc-400 hover:text-white"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {query.trim() !== '' && (
            <div className="max-h-80 overflow-y-auto" id="search-results" role="listbox">
              {results.length > 0 ? (
                <div>
                  {results.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`}
                      onClick={() => setIsOpen(false)}
                      className="focus-visible-ring"
                      role="option"
                      aria-selected="false"
                    >
                      <div className="flex items-center gap-3 p-3 hover:bg-zinc-700 transition-colors">
                        <div className="w-12 h-12 bg-zinc-900 rounded-md overflow-hidden relative flex-shrink-0">
                          {product.image && (
                            <Image 
                              src={product.image} 
                              alt={`${product.name} - ${product.description.substring(0, 40)}...`}
                              fill 
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
                          <p className="text-zinc-400 text-xs line-clamp-1">{product.description}</p>
                          <p className="text-amber-500 text-xs mt-1">{product.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-zinc-400">
                  No products found matching "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
