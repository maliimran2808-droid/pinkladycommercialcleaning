import PricingCard from './PricingCard'
import { pricingCardsData } from './howItWorksConfig'
import { Check } from 'lucide-react'
export default function PricingCards() {
  return (<>   
    <div className="flex flex-col items-center md:flex-row relative gap-6 md:gap-8 mb-20 max-w-4xl mx-auto md:items-start">
    
      {pricingCardsData.map((card) => (
        <>
       
    <div className="absolute top-0 left-1/2 z-[300] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-white z-10">
        <Check size={24} className="text-luxury-pink" strokeWidth={2.5} />
      </div>
        <PricingCard key={card.id} data={card} />
        </>
      ))}
      
    </div>
    <div className='w-full text-center mx-auto font-parkinsans font-thin'>
      <span className='text-black text-2xl font-normal'>How Does it Work?</span>
    </div>
    </>
  )
}