'use client';
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export default function FooterBrand() {
  return (
    <div className="flex flex-col h-full">
      {/* Logo Image Placeholder */}
      <div className="w-16 h-16 rounded-xl bg-gray-100 mb-6 flex items-center justify-center">
        <img src="/images/footersvg.svg" alt="Logo" className="w-10 h-10" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
      </div>

      <h4 className="text-xl font-bold text-luxury-dark mb-3 leading-tight">
        Trusted Housekeeper Strategy to Clean
      </h4>
      <p className="text-gray-500 text-base mb-8 leading-relaxed">
        Easy cleaning services for busy people.
      </p>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-luxury-pink" />
          <a href="tel:+13214567890" className="text-gray-700 text-sm hover:text-luxury-pink transition-colors">(321) 456-7890</a>
        </div>
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-luxury-pink" />
          <a href="mailto:info@pinkladies.com" className="text-gray-700 text-sm hover:text-luxury-pink transition-colors">info@pinkladies.com</a>
        </div>
      </div>

      <Link
        href="/contact"
        className="inline-block text-center px-6 py-3 bg-luxury-dark text-white font-semibold text-sm uppercase tracking-wider rounded-md hover:bg-luxury-pink transition-colors duration-300 mt-auto"
      >
        Book Cleaning
      </Link>
    </div>
  )
}