import Image from 'next/image'
import Link from 'next/link'

interface ServiceCard {
  image_url: string
  title: string
}

interface OurServicesProps {
  heading: string
  services: ServiceCard[]
}

export default function OurServices({ heading, services }: OurServicesProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* 🔹 SEO Optimized Main Heading */}
        <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight text-center mb-12">
          {heading}
        </h2>

        {/* 🔹 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <article 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image 
                  src={service.image_url} 
                  alt={service.title} // SEO: Dynamic alt tag
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* SEO Optimized Card Title */}
                <h3 className="text-lg font-parkinsans font-bold text-luxury-dark mb-4">
                  {service.title}
                </h3>

                {/* Get Service Button */}
                <div className="mt-auto">
                  <Link 
                    href="/contact" 
                    className="inline-block w-full text-center border-2 border-luxury-dark text-luxury-dark px-4 py-2.5 rounded-full font-outfit font-semibold uppercase tracking-wider text-xs hover:bg-luxury-dark hover:text-white transition-colors duration-300"
                  >
                    Get Service
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}