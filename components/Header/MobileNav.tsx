'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { navConfig } from './navConfig'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Luxury Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl slide-in-right flex flex-col">
        <div className="flex-1 overflow-y-auto py-24 px-8">
          {navConfig.map((item, index) => (
            <div key={item.label} className="mb-6 fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
              {item.dropdown ? (
                <div>
                  <button
                    className="flex w-full items-center justify-between text-xl font-semibold text-luxury-dark border-b border-gray-100 pb-3"
                    onClick={() => setOpenAccordion(openAccordion === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown className={`w-5 h-5 text-luxury-pink transition-transform duration-300 ${openAccordion === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openAccordion === item.label && (
                    <div className="mt-3 pl-4 space-y-3 border-l-2 border-luxury-pink">
                      {item.dropdown.map((drop) => (
                        <Link
                          key={drop.label}
                          href={drop.href}
                          onClick={onClose}
                          className="block text-base font-medium text-gray-600 hover:text-luxury-pink transition-colors"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={onClose}
                  className="block text-xl font-semibold text-luxury-dark border-b border-gray-100 pb-3 hover:text-luxury-pink transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 border-t border-gray-100">
          <Link
            href="/quote"
            onClick={onClose}
            className="block w-full py-4 text-center text-white font-semibold uppercase tracking-widest rounded-sm transition-colors duration-300"
            style={{ backgroundColor: '#1a1a1a' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8A0B4')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  )
}