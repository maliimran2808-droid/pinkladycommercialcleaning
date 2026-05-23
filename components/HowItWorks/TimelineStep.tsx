'use client'

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
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-5" 
        style={{ backgroundColor: '#EDE9FE' }}
      >
        <IconComponent className="w-8 h-8 text-violet-700" />
      </div>

      {/* Centered Text Content */}
      <div className="max-w-xs">
        <h4 className="text-xl font-bold text-luxury-dark mb-2">
          {data.step}. {data.title}
        </h4>
        <p className="text-gray-600 text-base leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  )
}