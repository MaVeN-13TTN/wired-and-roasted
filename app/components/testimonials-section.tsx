'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Software Developer',
    content: 'Neural Overload is the only coffee that keeps me coding through the night. The intensity is unmatched, and I love the complex flavor profile.',
    rating: 5,
    image: '/placeholder-user.jpg'
  },
  {
    id: 2,
    name: 'Jamie Chen',
    role: 'Graphic Designer',
    content: 'As a creative professional, I need something that sparks my imagination. Midnight Circuit has become my morning ritual - smooth yet powerful.',
    rating: 5,
    image: '/placeholder-user.jpg'
  },
  {
    id: 3,
    name: 'Taylor Wilson',
    role: 'Fitness Instructor',
    content: 'Firewall Fuel gives me the perfect pre-workout boost without the crash. Clean energy and amazing taste. My clients have started ordering it too!',
    rating: 4,
    image: '/placeholder-user.jpg'
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(220,38,38,0.1),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            WHAT OUR <span className="text-red-500">CUSTOMERS</span> SAY
          </h2>
          <p className="text-medium-contrast">
            Don't just take our word for it. Here's what the Wired & Roasted community has to say about our high-voltage coffee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 relative group hover:border-red-500/50 transition-colors"
            >
              <div className="absolute -top-5 -right-5 bg-zinc-900 rounded-full p-3 border border-zinc-700">
                <Quote className="h-6 w-6 text-red-500" />
              </div>

              <div className="flex mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-700'}`}
                  />
                ))}
              </div>

              <p className="text-medium-contrast mb-6 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-zinc-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
