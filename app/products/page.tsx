'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import { ProductCard } from '@/app/components/product-card'
import { ProductFilter } from '@/app/components/product-filter'
import { products, Product } from '@/app/types/product'

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen pt-8 pb-16">
      <div id="main-content" className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Products', current: true }
          ]}
          className="mb-8"
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <ProductFilter
                products={products}
                onFilterChange={setFilteredProducts}
                className="mb-6"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
                All Products <span className="text-zinc-500 text-lg font-normal ml-2">({filteredProducts.length})</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-medium-contrast text-sm">Sort by:</span>
                <select className="bg-zinc-800 border border-zinc-700 rounded text-sm p-1 focus-visible-ring" aria-label="Sort products by">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-800 rounded-lg">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-medium-contrast mb-4">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
