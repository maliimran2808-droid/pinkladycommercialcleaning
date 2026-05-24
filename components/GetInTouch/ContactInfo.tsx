import { Phone, Mail } from 'lucide-react'
import { LocationData } from './locationsConfig'

interface ContactInfoProps {
  location: LocationData
}

export default function ContactInfo({ location }: ContactInfoProps) {
  return (
    <div className="flex flex-col justify-center h-full py-8">
      {/* Small Label */}
      <span className="text-[13px] font-medium uppercase tracking-widest font-parkinsans mb-3">
        Get In Touch
      </span>

      {/* Large Heading */}
      <h2 className="text-3xl max-w-[80%] md:text-4xl lg:text-4xl font-parkinsans font-regular mb-5">
        Choose Pink Ladies, Choose Quality
      </h2>

      {/* Paragraph */}
      <p className="text-gray-500 md:text-medium font-thin font-outfit mb-8">
Ready to experience the cleansing difference? Book our service today, and we will handle the rest!      </p>

      {/* Office Hours */}
      <div className="mb-2 font-outfit">
        <h4 className="text-[16px] text-gray-500 font-thin">Our office is open</h4>
        <p className=" text-[16px] text-gray-500 font-thin">Monday to Saturday, 9 AM to 4 PM</p>
      </div>

      {/* Dynamic Address */}
      <div className="mb-8">
        <p className="text-[16px] text-gray-500 font-thin">{location.address}</p>
      </div>

      {/* Phone & Email */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
            <Phone size={18} className="text-gray-500" />
          
          <a href="tel:+13214567890" className="text-[16px] text-gray-500 font-thin">(321) 456-7890</a>
        </div>
        <div className="flex items-center gap-4">
      
            <Mail size={18} className="text-gray-500" />
      
          <a href="mailto:info@pinkladies.com" className="text-[16px] text-gray-500 font-thin">info@pinkladies.com</a>
        </div>
      </div>

      {/* Contact Button */}
      <div>
        <a
          href="/contact"
          className="font-parkinsans w-[fit-content] text-sm px-7.5 py-3.5 rounded-full cursor-pointer text-white font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
        style={{ backgroundColor: '#E10788' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}