'use client'

import Link from 'next/link'
import TimelineStep from './TimelineStep'
import { timelineStepsData } from './howItWorksConfig'

export default function ZigzagTimeline() {
  return (
    <>
    <div className="relative mt-5">
      
      {/* Background SVG Image - Hidden on mobile */}
      <div 
        className="absolute inset-0 hidden md:block bg-no-repeat bg-center bg-contain z-0 pointer-events-none"
        style={{ backgroundImage: "url('/images/zigzag.svg')" }}
      />

      {/* STRICT 2 COLUMNS on Desktop, 1 Column on Mobile -> Creates 3 Rows */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24">
        {timelineStepsData.map((step) => (
          <TimelineStep key={step.id} data={step} />
        ))}
      </div>

      {/* Center Button */}

    </div>
          <div className="flex justify-center mt-12 md:mt-16">
        <Link
          href="/quote"
          className="inline-block px-10 py-4 text-white font-semibold uppercase tracking-wider rounded-md transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          style={{ backgroundColor: '#1a1a1a' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8A0B4')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
        >
          Book Your Service
        </Link>
      </div>
    </>
  )
}