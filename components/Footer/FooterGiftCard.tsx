'use client';
import Link from 'next/link'

export default function FooterGiftCard() {
  return (
    <div 
      className="relative rounded-2xl p-8 border-2 border-luxury-pink overflow-hidden h-full flex flex-col"
      style={{ 
        background: 'linear-gradient(to bottom right, rgba(255,255,255,0), #ffe4e9)' 
      }}
    >
      {/* Content (70-80% width) */}
      <div className="relative z-10 w-3/4">
        <h4 className="text-2xl font-bold text-luxury-dark mb-3">Gift Card</h4>
        <p className="text-gray-600 text-base mb-6 leading-relaxed">
          Request a script for who doesn&apos;t want to clean the house.
        </p>
        <Link
          href="/gift-card"
          className="inline-block px-6 py-3 bg-luxury-dark text-white font-semibold text-sm uppercase tracking-wider rounded-md hover:bg-luxury-pink transition-colors duration-300"
        >
          Learn More
        </Link>
      </div>

      {/* Absolute Positioned Image (Right side, top 10) */}
      <div className="absolute right-0 top-10 w-1/3 h-auto pointer-events-none">
        <img 
          src="/images/gift-card-image.png" 
          alt="Gift Card" 
          className="w-full h-auto object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </div>
  )
}