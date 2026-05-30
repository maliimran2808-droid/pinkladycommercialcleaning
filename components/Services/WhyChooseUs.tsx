'use client'

import { useSettings } from "@/app/context/SettingsContext"

export default function WhyChooseUs({ heading }: { heading: string }) {
  const { phone } = useSettings()

  const stats = [
    { stat: '5+', label: 'Years of Experience' },
    { stat: '500+', label: 'Cleanings Completed' },
    { stat: '1000+', label: 'Hours Saved for Clients' },
    { stat: '99%', label: 'Client Satisfaction' },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* 🔹 SEO Optimized Heading */}
        <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight text-center mb-12">
          {heading}
        </h2>

        {/* 🔹 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-4xl md:text-5xl font-parkinsans font-bold text-luxury-pink mb-3">
                {item.stat}
              </p>
              <p className="text-gray-600 font-outfit text-sm md:text-base font-medium uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* 🔹 Contact Us Button with Phone Number */}
        <div className="text-center">
          <a 
            href={`tel:${phone}`}
            className="inline-flex items-center gap-3 bg-luxury-dark text-white px-8 py-4 rounded-full font-outfit font-semibold uppercase tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Us: {phone || '(321) 456-7890'}
          </a>
        </div>

      </div>
    </section>
  )
}