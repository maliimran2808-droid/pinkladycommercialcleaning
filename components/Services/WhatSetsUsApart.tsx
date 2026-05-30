import Image from 'next/image'
import Link from 'next/link'

interface Feature {
  title: string
  description: string
}

interface WhatSetsUsApartProps {
  image_url: string
  heading: string
  description: string
  features: Feature[]
}

export default function WhatSetsUsApart({ image_url, heading, description, features }: WhatSetsUsApartProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* Main Container: Image Left, Content Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* 🔹 Left Side: Image */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src={image_url}
              alt={heading} // SEO optimized alt tag
              fill
              className="object-cover"
            />
          </div>

          {/* 🔹 Right Side: Content */}
          <div>
            {/* SEO Optimized Heading */}
            <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight mb-4">
              {heading}
            </h2>

            {/* SEO Optimized Paragraph */}
            <p className="text-gray-600 font-outfit text-base md:text-lg leading-relaxed font-light mb-8">
              {description}
            </p>

            {/* 🔹 Three Key Cards (List) */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-pink-50 border border-luxury-pink/20">
                    <Image 
                      src="/images/standard-icon.webp" // Shared image placeholder
                      alt={feature.title}
                      fill
                      className="object-cover p-1"
                    />
                  </div>
                  
                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg font-parkinsans font-bold text-luxury-dark mb-1">
                      {feature.title}
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 Get a Quote Button */}
            <Link 
              href="/#get-quote" 
              className="inline-block bg-luxury-dark text-white px-8 py-3 rounded-full font-outfit font-semibold uppercase tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-lg"
            >
              Get a Quote
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}