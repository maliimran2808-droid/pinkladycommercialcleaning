import Image from 'next/image'
import LeftOverlay from './LeftOverlay'
import BookingForm from './BookingForm'

export default function Booking() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bannercontact.webp"  alt="Cleaning background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Left Container: Transparent with Glass Card */}
        <LeftOverlay />
        
        {/* Right Container: Booking Form */}
        <BookingForm />

      </div>
    </section>
  )
}