'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormInput from './FormInput'
import FormSelect from './FormSelect'


// Schema matches the API exactly
const heroSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  address: z.string().min(1, 'Address is required'),
})

type HeroFormData = z.infer<typeof heroSchema>

export default function HeroForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [serviceOptions, setServiceOptions] = useState<{ label: string; value: string }[]>([]) 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
  })

   useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServiceOptions(data)
        }
      } catch (err) {
        console.error('Failed to load services:', err)
      }
    }
    fetchServices()
  }, [])
  const onSubmit = async (data: HeroFormData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'hero' }), // Hardcoding source for this form
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setIsSubmitted(true)
      } else {
        setApiError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setApiError('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 🎉 SUCCESS STATE
  if (isSubmitted) {
    return (
      <div className="w-full mt-8 p-8 bg-white border border-gray-100 rounded-xl text-center shadow-sm">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-2xl font-bold text-luxury-dark mb-2">Thank You!</h3>
        <p className="text-gray-600 text-base mb-4">
          Your quote request has been received. We’ll reach out to you shortly.
        </p>
        <p className="text-sm text-gray-400 font-medium">Typical response time: Under 24 hours</p>
      </div>
    )
  }

  // 📝 FORM STATE
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8">
      <fieldset disabled={isSubmitting} className="space-y-0">
        {/* Row 1: Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormInput placeholder="Full Name" {...register('name')} error={errors.name?.message} />
          <FormInput type="email" placeholder="Email Address" {...register('email')} error={errors.email?.message} />
          <FormInput type="tel" placeholder="Phone Number" {...register('phone')} error={errors.phone?.message} />
        </div>

        {/* Row 2: Service, Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormSelect options={serviceOptions} {...register('service')} error={errors.service?.message} />
          <FormInput placeholder="Enter Address" {...register('address')} error={errors.address?.message} />
        </div>
      </fieldset>

      {/* Show API Errors cleanly */}
      {apiError && (
        <div className="mb-4 text-center text-red-600 text-sm font-medium bg-red-50 py-2 rounded-md">
          {apiError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 text-white font-semibold uppercase tracking-widest rounded-md transition-all duration-300 transform hover:scale-[1.01] ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink hover:shadow-lg'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'I Would Like A Quote'}
      </button>
    </form>
  )
}