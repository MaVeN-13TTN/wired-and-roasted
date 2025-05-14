'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"

interface FAQ {
  id: string
  question: string
  answer: string
  category: 'products' | 'shipping' | 'subscription' | 'brewing'
}

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How much caffeine is in your high-voltage blends?',
    answer: 'Our high-voltage blends contain approximately 1.5-2x the caffeine of regular coffee. Neural Overload has the highest content at approximately 180mg per 8oz cup, compared to about 95mg in regular coffee.',
    category: 'products'
  },
  {
    id: 'faq-2',
    question: 'Are your coffee beans ethically sourced?',
    answer: "Absolutely. Despite our chaotic methods, we're extremely precise about ethics. All our beans are sourced from small farms that practice sustainable farming, and we pay above fair trade prices to ensure farmers receive proper compensation.",
    category: 'products'
  },
  {
    id: 'faq-3',
    question: 'How soon after roasting do you ship your coffee?',
    answer: 'We ship all orders within 24-48 hours of roasting to ensure maximum freshness. This is why our coffee has such a vibrant, complex flavor profile compared to mass-produced brands.',
    category: 'shipping'
  },
  {
    id: 'faq-4',
    question: 'Do you offer international shipping?',
    answer: "Yes, we ship to most countries worldwide. International shipping rates vary by location. Please note that customs fees may apply depending on your country's import regulations.",
    category: 'shipping'
  },
  {
    id: 'faq-5',
    question: 'How does your subscription service work?',
    answer: "Our subscription service delivers fresh coffee to your door at your chosen frequency (weekly, bi-weekly, or monthly). You can select your preferred blends, and we'll rotate them or keep them consistent based on your preferences. Subscriptions save 15% compared to one-time purchases.",
    category: 'subscription'
  },
  {
    id: 'faq-6',
    question: 'What brewing method do you recommend for your coffee?',
    answer: 'For maximum flavor extraction, we recommend pour-over methods like V60 or Chemex for our lighter roasts, and French press or espresso for our darker roasts. However, our coffee is versatile and works well with any brewing method.',
    category: 'brewing'
  },
  {
    id: 'faq-7',
    question: "Can I return coffee if I don't like it?",
    answer: "We stand behind our coffee 100%. If you're not satisfied with your purchase for any reason, contact us within 30 days and we'll either replace it or refund your money. No questions asked.",
    category: 'shipping'
  },
  {
    id: 'faq-8',
    question: 'Do you offer sample packs to try different blends?',
    answer: "Yes! Our \"Voltage Sampler\" includes 4oz bags of our four most popular blends. It's the perfect way to discover which Wired & Roasted coffee matches your intensity preferences.",
    category: 'products'
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            FREQUENTLY <span className="text-red-500">ASKED</span> QUESTIONS
          </h2>
          <p className="text-medium-contrast">
            Everything you need to know about our coffee, shipping, and more. Can&apos;t find what you&apos;re looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-zinc-800">
                <AccordionTrigger className="text-left font-bold py-4 hover:text-red-500 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-medium-contrast pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
