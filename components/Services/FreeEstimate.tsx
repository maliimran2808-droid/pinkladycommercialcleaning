'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Location {
  label: string
  address: string
}

interface FreeEstimateProps {
  subtitle: string
  heading: string
  locations: Location[]
  bottomHeading: string
  bottomDescription: string
}

export default function FreeEstimate({ subtitle, heading, locations, bottomHeading, bottomDescription }: FreeEstimateProps) {
  const [activeLocation, setActiveLocation] = useState(0)

  // Encodes the address for the Google Maps embed URL
  const mapSrc = locations.length > 0 
    ? `https://maps.google.com/maps?q=${encodeURIComponent(locations[activeLocation].address)}&output=embed`
    : ''

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* 🔹 SEO Optimized Header Block */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-luxury-pink uppercase tracking-widest mb-3 font-outfit">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight">
            {heading}
          </h2>
        </div>

        {/* 🔹 Map & Buttons Container */}
        <div className="relative max-w-4xl mx-auto mb-16">
          
          {/* Location Buttons (Overlapping the top of the map) */}
          {locations.length > 0 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-wrap justify-center gap-3">
              {locations.map((loc, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  className={`px-6 py-2.5 rounded-full font-outfit font-semibold text-sm uppercase tracking-wider shadow-md transition-all duration-300 ${
                    activeLocation === index 
                      ? 'bg-luxury-pink text-white' 
                      : 'bg-white text-luxury-dark border border-gray-200 hover:border-luxury-pink'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          )}

          {/* Map Container */}
          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200">
            {mapSrc ? (
              <iframe 
                src={mapSrc}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={locations[activeLocation]?.label || 'Map'}
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No location added yet.
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Bottom Content & CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-parkinsans font-bold text-luxury-dark leading-tight mb-4">
            {bottomHeading}
          </h3>
          <p className="text-gray-600 font-outfit text-base md:text-lg leading-relaxed font-light mb-8">
            {bottomDescription}
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-luxury-dark text-white px-8 py-4 rounded-full font-outfit font-semibold uppercase tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-lg"
          >
            Book Cleaning
          </Link>
        </div>

      </div>
    </section>
  )
}