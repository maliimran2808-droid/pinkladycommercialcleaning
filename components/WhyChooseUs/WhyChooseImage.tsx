import Image from 'next/image'

export default function WhyChooseImage() {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl group">
      <Image
      src="/images/whychooseus.webp"
    alt="Sparkling clean office space"
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out"
        quality={100}
      />
      {/* Luxury bottom gradient overlay */}
         </div>
  )
}