'use client'

import { useState } from 'react'
import { Phone } from 'lucide-react'
import { serviceOptions } from './bookingConfig'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    info: '',
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-luxury-pink focus:ring-1 focus:ring-luxury-pink transition-all duration-300"

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-[30px] p-8 md:p-12 shadow-2xl">
      
      {/* Top Label */}
      <span className="text-sm font-medium text-luxury-pink uppercase tracking-widest mb-3 block">
        Booking
      </span>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-luxury-dark leading-tight mb-8">
        Get Your Estimate and Book Now
      </h2>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
            <input type="text" placeholder="John Doe" value={formData.name} onChange={handleChange('name')} className={inputClasses} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange('email')} className={inputClasses} />
          </div>
        </div>

        {/* Row 2: Phone & Select Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
            <input type="tel" placeholder="(321) 456-7890" value={formData.phone} onChange={handleChange('phone')} className={inputClasses} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select the Services</label>
            <select value={formData.service} onChange={handleChange('service')} className={`${inputClasses} appearance-none cursor-pointer`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
              <option value="" disabled>Choose a service</option>
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Address</label>
          <input type="text" placeholder="123 Main St, Orlando, FL" value={formData.address} onChange={handleChange('address')} className={inputClasses} />
        </div>

        {/* Row 4: Additional Information */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Additional Information</label>
          <textarea rows={4} placeholder="Tell us more about your needs..." value={formData.info} onChange={handleChange('info')} className={`${inputClasses} resize-none`}></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 text-white font-semibold uppercase tracking-wider rounded-md transition-all duration-300 hover:shadow-lg transform hover:scale-[1.01]"
          style={{ backgroundColor: '#1a1a1a' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8A0B4')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
        >
          I would like a quote
        </button>
      </form>

      {/* Bottom Text & Phone */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm mb-3">If you have any questions, contact our office at</p>
        <a href="tel:+13214567890" className="inline-flex items-center gap-2 text-luxury-dark font-semibold hover:text-luxury-pink transition-colors">
          <Phone size={18} />
          <span>(321) 456-7890</span>
        </a>
      </div>
    </div>
  )
}