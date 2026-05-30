'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { navConfig } from './navConfig'

export default function DesktopNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dynamicNavConfig, setDynamicNavConfig] = useState(navConfig)

  // Fetch dynamic services and inject into the "Services" dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          
          // Map the services from the DB to match the dropdown format
          const serviceDropdown = data.map((service: { label: string; value: string }) => ({
            label: service.label,
            href: `/services/${service.value}`
          }))

          // Update the navConfig by replacing only the 'Services' dropdown
          setDynamicNavConfig(prevConfig => 
            prevConfig.map(item => 
              item.label === 'Services' 
                ? { ...item, dropdown: serviceDropdown } 
                : item
            )
          )
        }
      } catch (err) {
        console.error('Failed to load services for nav:', err)
      }
    }

    fetchServices()
  }, [])

  return (
    <nav className="hidden md:flex items-center gap-6"
    style={{
      width: 'fit-content',
      margin: '0px 0px 0px 6%'
    }}> 
      {dynamicNavConfig.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {item.dropdown ? (
            <Link href={item.href || '#'} className="flex nav-font items-center gap-1 text-[15px] font-medium text-gray-800 hover:text-luxury-pink transition-colors duration-300">
              {item.label}
              <ChevronDown className={`w-4 h-4 nav-font transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
            </Link>
          ) : (
            <Link href={item.href || '#'} className="nav-link nav-font text-[15px] font-medium text-gray-800 hover:text-luxury-pink transition-colors duration-300">
              {item.label}
            </Link>
          )}

          {item.dropdown && activeDropdown === item.label && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 dropdown-animate z-50">
              <div className="bg-white rounded-md py-2 min-w-[220px]" style={{ border: '2px solid #E8A0B4', boxShadow: '0 10px 30px rgba(232, 160, 180, 0.2)' }}>
                {item.dropdown.map((drop) => (
                  <Link
                    key={drop.label}
                    href={drop.href}
                    className="block px-5 py-3 text-[14px] nav-font font-medium text-gray-700 hover:text-luxury-pink border-transparent hover:border-luxury-pink hover:bg-luxury-pink-soft transition-all duration-200"
                  >
                    {drop.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}