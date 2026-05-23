'use client'

import { useState } from 'react'
import Link from 'next/link'
import AccordionItem from './AccordionItem'
import { accordionData } from './whyChooseConfig'

export default function WhyChooseContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col overflow-hidden justify-center h-full py-8">
      {/* Small Label */}
      <span className="text-[13px] font-medium uppercase tracking-widest font-parkinsans mb-3">
        Why choose us
      </span>

      {/* Large Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-4xl font-parkinsans font-regular mb-5">
        Sparkling Commercial Cleaning Services in Florida
      </h2>

      {/* Paragraph */}
      <p className="text-gray-500 md:text-medium font-thin font-outfit mb-8">
        Do you want to step into an office that keeps your mood fresh all day? At Pink Ladies Commercial Cleaning Services, we create a comfortable environment in your commercial spaces by providing high grade cleaning services.
      </p>

      {/* Accordions */}
      <div className="space-y-4 mb-10">
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div>
        <Link
          href="/quote"
         
        className="font-parkinsans w-[fit-content] text-sm px-7 py-3.5 rounded-full cursor-pointer text-white font-semibold capitalize tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
        style={{ backgroundColor: '#E10788' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        >
          Get a Free Quote Now
        </Link>
      </div>
    </div>
  )
}