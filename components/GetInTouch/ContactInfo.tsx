import { Phone, Mail } from 'lucide-react'
import { LocationData } from './locationsConfig'

interface ContactInfoProps {
  location: LocationData
}

export default function ContactInfo({ location }: ContactInfoProps) {
  return (
    <div className="flex flex-col justify-center h-full py-8">
      {/* Small Label */}
      <span className="text-sm font-medium text-luxury-pink uppercase tracking-widest mb-4">
        Get in touch
      </span>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-dark leading-tight mb-6">
        Choose Pink Ladies, Choose Quality
      </h2>

      {/* Paragraph */}
      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
        Ready to experience the cleaning difference? Book our services today, and we will handle the rest.
      </p>

      {/* Office Hours */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-luxury-dark mb-2">Our Office Is Open</h4>
        <p className="text-gray-600 text-base">Monday to Saturday, 9 AM to 4 PM</p>
      </div>

      {/* Dynamic Address */}
      <div className="mb-8">
        <p className="text-gray-700 text-base font-medium leading-relaxed">{location.address}</p>
      </div>

      {/* Phone & Email */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-luxury-pink/10 flex items-center justify-center flex-shrink-0">
            <Phone size={18} className="text-luxury-pink" />
          </div>
          <a href="tel:+13214567890" className="text-luxury-dark font-medium hover:text-luxury-pink transition-colors">(321) 456-7890</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-luxury-pink/10 flex items-center justify-center flex-shrink-0">
            <Mail size={18} className="text-luxury-pink" />
          </div>
          <a href="mailto:info@pinkladies.com" className="text-luxury-dark font-medium hover:text-luxury-pink transition-colors">info@pinkladies.com</a>
        </div>
      </div>

      {/* Contact Button */}
      <div>
        <a
          href="/contact"
          className="inline-block px-8 py-4 text-white font-semibold uppercase tracking-wider rounded-md transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          style={{ backgroundColor: '#1a1a1a' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8A0B4')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}