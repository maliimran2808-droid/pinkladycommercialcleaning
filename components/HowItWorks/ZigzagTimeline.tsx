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
        className="absolute min-h-[90vh] inset-0 hidden md:block bg-no-repeat bg-center bg-contain z-0 pointer-events-none"
        style={{ backgroundImage: "url('/images/zigzag.svg')" }}
      />

      {/* STRICT 2 COLUMNS on Desktop, 1 Column on Mobile -> Creates 3 Rows */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 py-7 gap-y-5">
        {timelineStepsData.map((step) => (
          <TimelineStep key={step.id} data={step} />
        ))}
      </div>

      {/* Center Button */}

    </div>
          <div className="flex justify-center mt-5 ">
        <Link
          href="/quote"
       
          className="font-parkinsans w-[fit-content] text-sm px-7.5 py-3.5 rounded-full cursor-pointer text-white font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
        style={{ backgroundColor: '#E10788' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
            >
          Book Your Service
        </Link>
      </div>
    </>
  )
}