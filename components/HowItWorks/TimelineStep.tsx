'use client'

import { Icon } from 'lucide-react'
import { TimelineStepData } from './howItWorksConfig'

interface TimelineStepProps {
  data: TimelineStepData
}

export default function TimelineStep({ data }: TimelineStepProps) {
  const isRight = data.position === 'right'
  const IconComponent = data.icon

  return (
    <div 
      className="w-full flex flex-col items-center text-center px-4"
      style={{
      
        // Force exact row and column placement on desktop
        gridRowStart: data.step,       // Item 1 = Row 1, Item 2 = Row 2, Item 3 = Row 3
        gridColumnStart: isRight ? 2 : 1, // Right = Col 2, Left = Col 1
        gridColumnEnd: isRight ? 3 : 2,
      }}
    >
      {/* Custom SVG Icon with Violet Background */}
      <div 
        className="w-22 relative h-22 bg-luxury-pink-soft rounded-3xl flex items-center justify-center mb-3" 
     
      
      >
        <img src="/images/star.svg" width={'27'}  className='absolute top-[-9] right-[-5]' alt="commercial cleaning" />
     <IconComponent className="text-[#fadced]" />
      </div>

      {/* Centered Text Content */}
      <div className="max-w-xs">
        <h4 className="text-2xl font-regular font-parkinsans text-black mb-1">
          {data.step}. {data.title}
        </h4>
        <p className="text-black font-thin font-outfit leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  )
}