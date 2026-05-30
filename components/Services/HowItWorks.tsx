import Image from 'next/image'

interface Step {
  image_url: string
  title: string
  description: string
}

interface HowItWorksProps {
  subtitle: string
  heading: string
  steps: Step[]
}

export default function HowItWorks({ subtitle, heading, steps }: HowItWorksProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* 🔹 SEO Optimized Header Block */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-luxury-pink uppercase tracking-widest mb-3 font-outfit">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark leading-tight">
            {heading}
          </h2>
        </div>

        {/* 🔹 Cards & Arrows Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center">
              
              {/* The Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-[300px] text-center flex flex-col items-center hover:shadow-md transition-shadow duration-300">
                {/* Image */}
                <div className="relative w-20 h-20 mb-5 rounded-full bg-pink-50 flex items-center justify-center overflow-hidden border-2 border-luxury-pink/20">
                  <Image 
                    src={step.image_url} 
                    alt={step.title} // SEO: Dynamic alt tag based on title
                    fill 
                    className="object-cover"
                  />
                </div>
                
                {/* SEO Optimized Title */}
                <h3 className="text-xl font-parkinsans font-bold text-luxury-dark mb-3">
                  {step.title}
                </h3>
                
                {/* SEO Optimized Paragraph */}
                <p className="text-gray-600 font-outfit text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* 🔹 The Arrows (Only shown between cards) */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Arrow (Pointing Right) */}
                  <div className="hidden md:flex items-center mx-6 text-luxury-pink">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  
                  {/* Mobile Arrow (Pointing Down) */}
                  <div className="flex md:hidden items-center my-2 text-luxury-pink">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}