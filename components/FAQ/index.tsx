import Link from 'next/dist/client/link'
import FAQItem from './FAQItem'
import { faqData } from './faqConfig'

export default function FAQ() {
  return (
    <>
    <section className="w-full pt-20 pb-10 md:pt-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Center Header */}
        <div className="text-center mb-16">
         <span className="text-[11px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        FAQ
      </span>
      <h2 className="text-3xl w-[40vw] font-title-size text-black mx-auto md:text-5xl lg:text-[2.4rem] font-parkinsans leading-11 font-regular mt-3 mb-5">
        Frequently Asked Questions
      </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 grid-change md:grid-cols-2 gap-6 md:gap-8">
          {faqData.map((item) => (
            <FAQItem key={item.id} data={item} />
          ))}
        </div>

      </div>

    

    </section>
          <div>
             <div className="text-center mb-16">
      <span className="text-[11px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        From Our Blog
      </span>
      <h2 className="text-3xl w-[40vw] font-title-size text-black mx-auto md:text-5xl lg:text-[2.4rem] font-parkinsans leading-11 font-regular mt-3 mb-5">
        Cleaning Tips & Hacks
      </h2>
      <Link href="/blog" className="text-black bg-pink-200 border-1 border-pink-600 py-3 rounded-full px-6 font-medium text-sm hover:underline">
        Read Our Blog
      </Link>
    </div>
          </div>
    </>
  )
}