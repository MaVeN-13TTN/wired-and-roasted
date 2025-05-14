'use client'

import Image from "next/image"
import Link from "next/link"
import { Coffee, Zap, Flame, ShoppingBag, Menu, ChevronRight, Star } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/app/components/ui/button"
import { MobileNav } from "@/app/components/mobile-nav"
import { ResponsiveImage } from "@/app/components/ui/responsive-image"
import { useIsMobile } from "@/app/hooks/use-mobile"
import { CartDropdown } from "@/app/components/cart-dropdown"
import { SearchBar } from "@/app/components/search-bar"
import { useCart } from "@/app/context/cart-context"
import { Product, products } from "@/app/types/product"
import { ProductCard } from "@/app/components/product-card"
import { ProductFilter } from "@/app/components/product-filter"

export default function Home() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const { cart, isCartOpen, setIsCartOpen } = useCart()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  
  // Featured products are those marked as featured in the data
  const featuredProducts = products.filter(p => p.featured)

  useEffect(() => {
    // Mark page as loaded after initial render
    setIsPageLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 overflow-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>

      {/* Loading indicator - only shown before hydration */}
      {!isPageLoaded && (
        <div className="fixed inset-0 bg-zinc-900 z-50 flex items-center justify-center">
          <div className="relative">
            <Zap className="h-10 w-10 text-red-500 absolute -left-1 -top-1 opacity-70 animate-pulse" />
            <Coffee className="h-10 w-10 text-zinc-100 relative z-10" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group focus-visible-ring" aria-label="Wired & Roasted Home">
            <div className="relative">
              <Zap className="h-6 w-6 text-red-500 absolute -left-1 -top-1 opacity-70 group-hover:opacity-100 transition-all duration-300 animate-pulse" aria-hidden="true" />
              <Coffee className="h-6 w-6 text-zinc-100 relative z-10" aria-hidden="true" />
            </div>
            <span className="font-black text-xl tracking-tighter">
              <span className="text-red-500">WIRED</span> & <span className="text-amber-500">ROASTED</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {["CAFFEINE", "BEANS", "GEAR", "CULTURE"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-bold tracking-wider hover:text-red-500 transition-colors relative group px-2 py-2 mobile-touch-target focus-visible-ring"
                role="menuitem"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <SearchBar />
            
            {/* Cart Button with Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="border-zinc-700 text-medium-contrast hover:text-red-500 hover:border-red-500 focus-visible-ring"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label={`Shopping cart with ${cart.itemCount} items`}
                aria-expanded={isCartOpen}
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.itemCount > 9 ? '9+' : cart.itemCount}
                  </span>
                )}
              </Button>
              <CartDropdown />
            </div>
            
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold md:inline-flex hidden focus-visible-ring">FUEL UP</Button>
            <MobileNav>
              <Button variant="ghost" size="icon" className="md:hidden text-medium-contrast focus-visible-ring" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </MobileNav>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.15),transparent_50%)]"></div>
          <div className="absolute top-20 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-5 md:space-y-6 max-w-xl order-2 md:order-1">
              <div className="inline-block px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold text-red-500 tracking-wider mb-2">
                NOT YOUR AVERAGE CAFFEINE FIX
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none">
                COFFEE THAT <span className="text-red-500 inline-block transform -rotate-2">ELECTRIFIES</span> YOUR
                SYSTEM
              </h1>
              <p className="text-medium-contrast text-base md:text-lg">
                Meticulously sourced, chaotically roasted. For those who demand intensity in every cup. No compromises.
                No weak brews.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-6 md:px-6 w-full sm:w-auto group relative overflow-hidden">
                  <span className="relative z-10">SHOP STRONGEST BLENDS</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-500 font-bold text-sm px-5 py-6 md:px-6 w-full sm:w-auto"
                >
                  OUR PROCESS
                </Button>
              </div>

              <div className="flex items-center gap-3 md:gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 overflow-hidden">
                      <Image
                        src={`/placeholder-user.jpg`}
                        alt={`Happy Wired & Roasted customer ${i}`}
                        width={32}
                        height={32}
                        className="object-cover"
                        quality={80}
                        priority={i === 1} // Only prioritize the first avatar
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-medium-contrast text-xs md:text-sm">
                    From <span className="text-zinc-300">2,400+</span> caffeinated reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="relative order-1 md:order-2 mb-8 md:mb-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="absolute inset-0 bg-noise opacity-20"></div>
                <ResponsiveImage
                  desktopSrc="/images/voltage-void.png"
                  mobileSrc="/images/voltage-void.png" 
                  fallbackSrc="/placeholder.jpg"
                  alt="Voltage Void coffee blend - our signature high-caffeine dark roast"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover mix-blend-luminosity"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 bg-red-500 w-20 h-20 rounded-full blur-2xl opacity-30 hardware-accelerated reduce-animation animate-pulse"></div>
                <div
                  className="absolute bottom-1/3 right-1/4 bg-amber-500 w-16 h-16 rounded-full blur-2xl opacity-30 hardware-accelerated reduce-animation animate-pulse"
                  style={{ animationDelay: "1s", animationDuration: "3s" }}
                ></div>

                {/* Product tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg border border-zinc-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-zinc-100">VOLTAGE ESPRESSO</h3>
                      <p className="text-xs text-medium-contrast">Our signature high-caffeine blend</p>
                    </div>
                    <div className="text-amber-500 font-bold">$21.99</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full rotate-12">
                HIGH VOLTAGE
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Scrolling text */}
          <div className="relative mt-20 border-t border-b border-zinc-800 py-4 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              {Array(10)
                .fill("INTENSELY ROASTED • METICULOUSLY SOURCED • CHAOTICALLY PERFECT • ")
                .map((text, i) => (
                  <span key={i} className="text-2xl font-black tracking-tighter mx-4 text-zinc-800">
                    {text}
                  </span>
                ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-20 relative">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter">
                  FUEL YOUR <span className="text-red-500">OBSESSION</span>
                </h2>
                <p className="text-medium-contrast mt-3 md:mt-4 max-w-xl">
                  Our most potent blends, crafted for those who demand more from their coffee. Not for the
                  faint-hearted.
                </p>
              </div>
              <Link href="/products">
                <Button variant="link" className="text-amber-500 font-bold group flex items-center gap-2 self-start md:self-auto mt-2 md:mt-0">
                  VIEW ALL PRODUCTS
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Add Product Filter */}
            <ProductFilter 
              products={products} 
              onFilterChange={setFilteredProducts} 
              className="mb-6"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-zinc-950 relative">
          <div className="absolute inset-0 bg-noise opacity-[0.07]"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                WHY WE'RE <span className="text-red-500">DIFFERENT</span>
              </h2>
              <p className="text-medium-contrast">
                We don't just make coffee. We create an experience that pushes boundaries. Our process is chaotic by
                design, accurate by obsession.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Flame className="h-10 w-10 text-red-500" />,
                  title: "EXTREME ROASTING",
                  description:
                    "We push our beans to the edge, creating complex flavor profiles that standard roasters are afraid to attempt.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-amber-500" />,
                  title: "HIGHER CAFFEINE",
                  description:
                    "Our specialized process preserves and enhances caffeine content. Feel the difference with every sip.",
                },
                {
                  icon: <Coffee className="h-10 w-10 text-zinc-400" />,
                  title: "ETHICAL CHAOS",
                  description:
                    "We're chaotic in our methods, but precise in our ethics. All beans are sustainably sourced from small farms.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl relative group hover:border-red-500/50 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="bg-zinc-800 p-4 rounded-xl w-fit mb-6 group-hover:bg-zinc-800/80 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-4">{feature.title}</h3>
                    <p className="text-medium-contrast">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15),transparent_70%)]"></div>

          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.07]"></div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-center mb-3 md:mb-4">
                  JOIN THE <span className="text-red-500">VOLTAGE</span> CLUB
                </h2>
                <p className="text-medium-contrast text-center max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
                  Get exclusive access to limited roasts, experimental blends, and discounts that will shock your
                  system.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    className="flex-1 px-4 py-3 md:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    aria-label="Email address for newsletter subscription"
                    required
                  />
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-bold whitespace-nowrap py-6 sm:py-3 focus-visible-ring">
                    GET WIRED
                  </Button>
                </form>

                <p className="text-zinc-500 text-xs text-center mt-4">
                  By subscribing, you agree to receive marketing emails. We promise they'll be as intense as our coffee.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1 mb-2 md:mb-0">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="relative">
                  <Zap className="h-5 w-5 text-red-500 absolute -left-1 -top-1 opacity-70" />
                  <Coffee className="h-5 w-5 text-zinc-100 relative z-10" />
                </div>
                <span className="font-black text-lg tracking-tighter">
                  <span className="text-red-500">WIRED</span> & <span className="text-amber-500">ROASTED</span>
                </span>
              </div>
              <p className="text-zinc-500 text-sm">
                Pushing the boundaries of coffee since 2018. Chaotic methods. Accurate results.
              </p>
            </div>

            {[
              {
                title: "SHOP",
                links: ["All Products", "Subscriptions", "Merchandise", "Gift Cards"],
              },
              {
                title: "COMPANY",
                links: ["Our Story", "Roasting Process", "Sustainability", "Wholesale"],
              },
              {
                title: "CONNECT",
                links: ["Instagram", "Twitter", "Facebook", "Contact Us"],
              },
            ].map((column, index) => (
              <div key={index}>              <h3 className="font-bold text-zinc-300 mb-3 md:mb-4">{column.title}</h3>
              <ul className="space-y-1.5 md:space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="text-zinc-500 hover:text-red-500 text-sm transition-colors block py-1.5 px-1 mobile-touch-target focus-visible-ring">
                      {link}
                    </Link>
                  </li>
                ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 mt-10 pt-6 md:mt-12 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-xs md:text-sm text-center md:text-left">© 2025 Wired & Roasted. All rights reserved. Consume responsibly.</p>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs py-2 px-3 mobile-touch-target focus-visible-ring inline-block">
                Privacy Policy
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs py-2 px-3 mobile-touch-target focus-visible-ring inline-block">
                Terms of Service
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs py-2 px-3 mobile-touch-target focus-visible-ring inline-block">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
