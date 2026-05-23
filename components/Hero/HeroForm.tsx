'use client'

import { useState } from 'react'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import { serviceOptions } from './heroConfig'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  service?: string
  address?: string
}

export default function HeroForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'This field is required'
    if (!formData.email.trim()) newErrors.email = 'This field is required'
    if (!formData.phone.trim()) newErrors.phone = 'This field is required'
    if (!formData.service) newErrors.service = 'This field is required'
    if (!formData.address.trim()) newErrors.address = 'This field is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form Submitted:', formData)
      // Handle API submission here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6">
      {/* Row 1: Name, Email, Phone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormInput placeholder="Name" value={formData.name} onChange={handleChange('name')} error={errors.name} />
        <FormInput type="email" placeholder="Email Address" value={formData.email} onChange={handleChange('email')} error={errors.email} />
        <FormInput type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange('phone')} error={errors.phone} />
      </div>

      {/* Row 2: Service Dropdown, Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormSelect options={serviceOptions} value={formData.service} onChange={handleChange('service')} error={errors.service} />
        <FormInput placeholder="Enter Address" value={formData.address} onChange={handleChange('address')} error={errors.address} />
      </div>

      {/* Submit Button */}
      <div className='w-full flex items-center justify-center'>
      <button
        type="submit"
        className="font-parkinsans w-[fit-content] px-7 py-2.5 rounded-full cursor-pointer text-white font-semibold capitalize tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
        style={{ backgroundColor: '#E10788' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
      >
        I'd like a quote
      </button></div>
    </form>
  )
}