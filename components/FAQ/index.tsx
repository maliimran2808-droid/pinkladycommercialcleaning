import FAQItem from './FAQItem'
import { faqData } from './faqConfig'

export default function FAQ() {
  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Center Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-luxury-pink uppercase tracking-widest mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-dark leading-tight">
            Frequently Asked Question
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {faqData.map((item) => (
            <FAQItem key={item.id} data={item} />
          ))}
        </div>

      </div>
    </section>
  )
}