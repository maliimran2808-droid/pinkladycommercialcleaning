'use client'

import { useState } from 'react'
import LocationTabs from './LocationTabs'
import ContactInfo from './ContactInfo'
import MapSection from './MapSection'
import { locationsData } from './locationsConfig'

export default function GetInTouch() {
  const [activeLocationId, setActiveLocationId] = useState(locationsData[0].id)

  const activeLocation = locationsData.find((loc) => loc.id === activeLocationId) || locationsData[0]

  return (
    <section className="w-full py-20 md:py-28 bg-gray-50/50 overflow-visible">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative">
        
        {/* Floating Tabs (Positioned 50% above container) */}
        <LocationTabs 
          locations={locationsData} 
          activeId={activeLocationId} 
          onSelect={setActiveLocationId} 
        />

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Side: Content */}
          <ContactInfo location={activeLocation} />
          
          {/* Right Side: Map & SVG */}
          <MapSection location={activeLocation} />

        </div>
      </div>
    </section>
  )
}