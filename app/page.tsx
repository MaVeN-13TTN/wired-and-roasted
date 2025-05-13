import Image from "next/image"
import Link from "next/link"
import { Coffee, Zap, Flame, ShoppingBag, Menu, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 overflow-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Zap className="h-6 w-6 text-red-500 absolute -left-1 -top-1 opacity-70 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              <Coffee className="h-6 w-6 text-zinc-100 relative z-10" />
            </div>
            <span className="font-black text-xl tracking-tighter">
              <span className="text-red-500">WIRED</span> & <span className="text-amber-500">ROASTED</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["CAFFEINE", "BEANS", "GEAR", "CULTURE"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-bold tracking-wider hover:text-red-500 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-500"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold">FUEL UP</Button>
            <Button variant="ghost" size="icon" className="md:hidden text-zinc-400">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.15),transparent_50%)]"></div>
          <div className="absolute top-20 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6 max-w-xl">
              <div className="inline-block px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold text-red-500 tracking-wider mb-2">
                NOT YOUR AVERAGE CAFFEINE FIX
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                COFFEE THAT <span className="text-red-500 inline-block transform -rotate-2">ELECTRIFIES</span> YOUR
                SYSTEM
              </h1>
              <p className="text-zinc-400 text-lg">
                Meticulously sourced, chaotically roasted. For those who demand intensity in every cup. No compromises.
                No weak brews.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-6 py-6 group relative overflow-hidden">
                  <span className="relative z-10">SHOP STRONGEST BLENDS</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-500 font-bold text-sm px-6 py-6"
                >
                  OUR PROCESS
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=50&width=50&text=${i}`}
                        alt="Customer"
                        width={32}
                        height={32}
                        className="object-cover"
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
                  <p className="text-zinc-400">
                    From <span className="text-zinc-300">2,400+</span> caffeinated reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="absolute inset-0 bg-noise opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Wired & Roasted Coffee"
                  fill
                  className="object-cover mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 bg-red-500 w-20 h-20 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div
                  className="absolute bottom-1/3 right-1/4 bg-amber-500 w-16 h-16 rounded-full blur-2xl opacity-30 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Product tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg border border-zinc-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-zinc-100">VOLTAGE ESPRESSO</h3>
                      <p className="text-xs text-zinc-400">Our signature high-caffeine blend</p>
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
        <section className="py-20 relative">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                  FUEL YOUR <span className="text-red-500">OBSESSION</span>
                </h2>
                <p className="text-zinc-400 mt-4 max-w-xl">
                  Our most potent blends, crafted for those who demand more from their coffee. Not for the
                  faint-hearted.
                </p>
              </div>
              <Button variant="link" className="text-amber-500 font-bold group flex items-center gap-2">
                VIEW ALL PRODUCTS
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "NEURAL OVERLOAD",
                  price: "$23.99",
                  description: "Dark roast with notes of chocolate, caramel, and a jolt of intensity.",
                  tag: "BESTSELLER",
                  tagColor: "bg-red-500",
                },
                {
                  name: "MIDNIGHT CIRCUIT",
                  price: "$19.99",
                  description: "Medium-dark blend with berry undertones and a smooth, electric finish.",
                  tag: "NEW",
                  tagColor: "bg-amber-500",
                },
                {
                  name: "CHAOS THEORY",
                  price: "$25.99",
                  description: "Our most unpredictable roast. Complex, bold, and different with every batch.",
                  tag: "LIMITED",
                  tagColor: "bg-zinc-600",
                },
              ].map((product, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 translate-y-4 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="h-64 bg-zinc-800 relative overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=400&width=600&text=Coffee${index + 1}`}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>

                      {/* Product tag */}
                      <div
                        className={`absolute top-4 right-4 ${product.tagColor} text-white text-xs font-bold py-1 px-3 rounded-full`}
                      >
                        {product.tag}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-zinc-100">{product.name}</h3>
                        <span className="font-bold text-amber-500">{product.price}</span>
                      </div>
                      <p className="text-zinc-400 text-sm mb-6">{product.description}</p>
                      <Button className="w-full bg-zinc-800 hover:bg-red-500 text-zinc-100 font-bold transition-colors">
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </div>
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
              <p className="text-zinc-400">
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
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15),transparent_70%)]"></div>

          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.07]"></div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-center mb-4">
                  JOIN THE <span className="text-red-500">VOLTAGE</span> CLUB
                </h2>
                <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-8">
                  Get exclusive access to limited roasts, experimental blends, and discounts that will shock your
                  system.
                </p>

                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-bold whitespace-nowrap">
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
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
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
              <div key={index}>
                <h3 className="font-bold text-zinc-300 mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <Link href="#" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">© 2025 Wired & Roasted. All rights reserved. Consume responsibly.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs">
                Privacy Policy
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs">
                Terms of Service
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
