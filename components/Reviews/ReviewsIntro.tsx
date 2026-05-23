import Image from 'next/image'
import { companyLogos } from './reviewsConfig'

export default function ReviewsIntro() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
      {/* Left Side: Image */}
      <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl group">
        <Image
       src="/images/reviewsimage.webp" alt="Happy customer service team"
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          quality={100}
        />
      </div>

      {/* Right Side: Text & Logos */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-luxury-pink uppercase tracking-widest mb-4">
          Reviews
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-dark leading-tight mb-6">
          Trusted by Thousands of People and Companies
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          Our dedicated customer service team is always here to provide prompt and helpful assistance with any question or concerns you might have.
        </p>

        {/* Logos */}
        <div className="flex flex-wrap items-center gap-8">
          {companyLogos.map((logo, index) => (
            <div key={index} className="text-xl font-bold text-gray-300 tracking-wider uppercase">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}