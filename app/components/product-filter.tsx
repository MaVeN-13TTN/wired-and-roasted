'use client'

import { useState } from 'react'
import { Filter, ChevronDown, X } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/ui/collapsible'
import { Slider } from '@/app/components/ui/slider'
import { 
  Product, 
  ProductCategory, 
  ProductTag 
} from '@/app/types/product'
import { Badge } from '@/app/components/ui/badge'

interface ProductFilterProps {
  products: Product[]
  onFilterChange: (filteredProducts: Product[]) => void
  className?: string
}

export function ProductFilter({ products, onFilterChange, className }: ProductFilterProps) {
  // All available categories, tags and price range from products
  const allCategories: ProductCategory[] = Array.from(
    new Set(products.map((product) => product.category))
  ) as ProductCategory[]

  const allTags: ProductTag[] = Array.from(
    new Set(products.filter(p => p.tag).map((product) => product.tag as ProductTag))
  )

  const maxPrice = Math.max(...products.map(p => p.numericPrice))
  const minPrice = Math.min(...products.map(p => p.numericPrice))

  // State for filter values
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([])
  const [selectedTags, setSelectedTags] = useState<ProductTag[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice])
  const [selectedIntensity, setSelectedIntensity] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Apply filters
  const applyFilters = () => {
    let filteredProducts = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.category)
      )
    }

    // Filter by tag
    if (selectedTags.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.tag && selectedTags.includes(product.tag)
      )
    }

    // Filter by price range
    filteredProducts = filteredProducts.filter(product => 
      product.numericPrice >= priceRange[0] && product.numericPrice <= priceRange[1]
    )

    // Filter by intensity
    if (selectedIntensity.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.intensity && selectedIntensity.includes(product.intensity)
      )
    }

    onFilterChange(filteredProducts)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setPriceRange([minPrice, maxPrice])
    setSelectedIntensity([])
    onFilterChange(products)
  }

  // Handle category selection toggle
  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    )
  }

  // Handle tag selection toggle
  const toggleTag = (tag: ProductTag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  // Handle intensity selection toggle
  const toggleIntensity = (intensity: number) => {
    setSelectedIntensity(prev => 
      prev.includes(intensity) 
        ? prev.filter(i => i !== intensity) 
        : [...prev, intensity]
    )
  }

  // Count active filters
  const activeFilterCount = selectedCategories.length + 
    selectedTags.length + 
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0) + 
    selectedIntensity.length

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-zinc-700 text-zinc-300"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-zinc-400 hover:text-zinc-300"
            onClick={resetFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CollapsibleContent className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden mb-6">
          <div className="p-4">
            {/* Categories filter */}
            <div className="mb-6">
              <div className="font-medium mb-2 flex items-center justify-between">
                <span>Categories</span>
                {selectedCategories.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-zinc-400 text-xs"
                    onClick={() => setSelectedCategories([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Badge 
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategories.includes(category) 
                        ? "bg-red-500 hover:bg-red-600 border-red-500" 
                        : "bg-transparent text-zinc-400 hover:text-zinc-300 border-zinc-700"
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    {selectedCategories.includes(category) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags filter */}
            <div className="mb-6">
              <div className="font-medium mb-2 flex items-center justify-between">
                <span>Tags</span>
                {selectedTags.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-zinc-400 text-xs"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) 
                        ? "bg-amber-500 hover:bg-amber-600 border-amber-500" 
                        : "bg-transparent text-zinc-400 hover:text-zinc-300 border-zinc-700"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price range filter */}
            <div className="mb-6">
              <div className="font-medium mb-2">
                <span>Price Range</span>
              </div>
              <div className="px-2">
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <span>${priceRange[0].toFixed(2)}</span>
                  <span>${priceRange[1].toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Intensity filter (if applicable) */}
            <div className="mb-6">
              <div className="font-medium mb-2 flex items-center justify-between">
                <span>Intensity</span>
                {selectedIntensity.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-zinc-400 text-xs"
                    onClick={() => setSelectedIntensity([])}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <Badge 
                    key={level}
                    variant={selectedIntensity.includes(level) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedIntensity.includes(level) 
                        ? "bg-zinc-800 hover:bg-zinc-900 border-zinc-700" 
                        : "bg-transparent text-zinc-400 hover:text-zinc-300 border-zinc-700"
                    }`}
                    onClick={() => toggleIntensity(level)}
                  >
                    {Array(level).fill('★').join('')}
                    {selectedIntensity.includes(level) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="bg-red-500 hover:bg-red-600 flex-1"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
              <Button 
                variant="outline" 
                className="border-zinc-700 text-zinc-300"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
