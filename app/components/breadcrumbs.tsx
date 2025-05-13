'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center space-x-1">
        <li>
          <Link 
            href="/"
            className="text-zinc-400 hover:text-zinc-200 flex items-center"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-zinc-600 mx-1" />
              {item.href && !item.current ? (
                <Link
                  href={item.href}
                  className="text-zinc-400 hover:text-zinc-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className="text-zinc-200 font-medium" 
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}
