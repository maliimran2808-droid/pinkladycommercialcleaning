import Link from 'next/link'

interface Feature {
  text: string
}

interface ServiceFeaturesProps {
  heading: string
  description: string
  features: Feature[]
}
interface ServiceHeroProps {
hero_image_2_url?: string
}
export default function ServiceFeatures({ heading, description, features, hero_image_2_url }: ServiceFeaturesProps & ServiceHeroProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-4">
        
        {/* 🔹 SEO Optimized Heading */}
        <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight text-center mb-6">
          {heading}
        </h2>

        {/* 🔹 SEO Optimized Paragraph */}
        <p className="text-gray-600 font-outfit text-base md:text-lg leading-relaxed text-center mb-10 font-light">
          {description}
        </p>

       
        {/* 🔹 Dynamic Checklist */}
        <ul className="space-y-4 mb-10">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {/* Clean Checkmark Icon (No background) */}
              <svg 
                className="w-6 h-6 text-luxury-pink flex-shrink-0 mt-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 font-outfit text-base leading-relaxed">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* 🔹 Hardcoded "Learn More" Button */}
        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-block border-2 border-luxury-dark text-luxury-dark px-8 py-3 rounded-full font-outfit font-semibold uppercase tracking-wider text-sm hover:bg-luxury-dark hover:text-white transition-colors duration-300"
          >
            Learn More
          </Link>
        </div>
 <div>
          <img src={hero_image_2_url} alt="" />
        </div>

      </div>
    </section>
  )
}