'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  subtitle: string
  heading: string
  description: string
  faqs: FAQItem[]
}

export default function FAQ({ subtitle, heading, description, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* 🔹 SEO Optimized Header Block */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-luxury-pink uppercase tracking-widest mb-3 font-outfit">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight mb-4">
            {heading}
          </h2>
          <p className="text-gray-600 font-outfit text-base md:text-lg font-light">
            {description}
          </p>
        </div>

        {/* 🔹 2-Column Grid for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-luxury-pink/50 transition-colors duration-300"
                onClick={() => toggleFAQ(index)}
              >
                {/* Question Row */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-parkinsans font-bold text-luxury-dark">
                    {faq.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 w-6 h-6 relative">
                    {/* Horizontal Line (always visible) */}
                    <span className="absolute top-1/2 left-0 w-full h-[2px] bg-luxury-dark transform -translate-y-1/2 transition-colors duration-300"></span>
                    {/* Vertical Line (hides when open) */}
                    <span className={`absolute top-0 left-1/2 w-[2px] h-full bg-luxury-dark transform -translate-x-1/2 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}></span>
                  </div>
                </div>

                {/* 🔹 Expanding Answer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 font-outfit text-sm leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}