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
     
      </div>

      {/* Content Layer */}
      <div className="relative">
        
        {/* Left Container: Transparent with Glass Card */}
        <div className='border-15 rounded-4xl border-white relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
        <LeftOverlay/>
        
        {/* Right Container: Booking Form */}
        <BookingForm />
</div>
      </div>
    </section>
  )
}