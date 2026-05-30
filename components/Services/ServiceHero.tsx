import Image from 'next/image'
import Link from 'next/link'

interface ServiceHeroProps {
  title: string
  hero_heading?: string
  hero_paragraph?: string
  hero_image_1_url?: string
  hero_image_2_url?: string
}

export default function ServiceHero({ title, hero_heading, hero_paragraph, hero_image_1_url, hero_image_2_url }: ServiceHeroProps) {
  const formattedTitle = title.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden py-16 md:py-24">
      
      {/* 🔹 Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.webp"
          alt="Background"
          fill
          className="object-cover blur-md scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-white/50"></div>
      </div>

      {/* 🔹 Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text & CTA */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight">
            {hero_heading || `The Best ${formattedTitle} in Town`}
          </h2>
          <p className="text-gray-700 font-outfit text-base md:text-lg leading-relaxed font-light">
            {hero_paragraph || `Experience top-tier cleanliness with our premium ${formattedTitle} services. We use eco-friendly products, employ vetted professionals, and guarantee a spotless finish every single time.`}
          </p>
          <div>
            <Link 
              href="/#get-quote" 
              className="inline-block bg-luxury-dark text-white px-8 py-4 rounded-full font-outfit font-semibold uppercase tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-lg"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Right Side: Blended Images */}
        <div className="relative w-full h-[400px] md:h-[500px] hidden md:block">
          {/* Back Image */}
          <div className="absolute top-0 right-0 w-[75%] h-[65%] rounded-2xl overflow-hidden shadow-xl z-10">
            <Image 
              src={hero_image_1_url || "/images/service-img-1.webp"} 
              alt={`${formattedTitle} showcase 1`}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Front Image (Overlapping) */}
          <div className="absolute bottom-0 left-0 w-[75%] h-[65%] rounded-2xl overflow-hidden shadow-xl z-20">
            <Image 
              src={hero_image_2_url || "/images/service-img-2.webp"} 
              alt={`${formattedTitle} showcase 2`}
              fill
              className="object-cover"
            />
            <div 
              className="absolute inset-0 bg-white" 
              style={{ 
                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}