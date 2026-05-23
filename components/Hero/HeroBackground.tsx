import Image from 'next/image'

export default function HeroBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-[95%] z-0 overflow-hidden">
      <Image
      src="/images/banner.webp"
        alt="Luxury Commercial Cleaning"
        fill
        priority
        className="object-cover object-center"
        quality={100}
      />
      {/* Subtle overlay to ensure text readability over any image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white/80" />
    </div>
  )
}