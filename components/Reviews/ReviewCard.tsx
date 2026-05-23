import { Star } from 'lucide-react'
import { ReviewData } from './reviewsConfig'

interface ReviewCardProps {
  data: ReviewData
}

export default function ReviewCard({ data }: ReviewCardProps) {
  const firstLetter = data.name.charAt(0).toUpperCase()

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      
      {/* Stars (Dynamic Rating) */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star 
            key={i} 
            size={16} 
            className={i <= data.rating ? "fill-luxury-pink text-luxury-pink" : "text-gray-200"} 
          />
        ))}
      </div>

      {/* Review Text (Max 4 lines with ellipsis) */}
      <p className="text-gray-600 text-base leading-relaxed mb-6 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {data.text}
      </p>

      {/* Customer Info Row */}
      <div className="flex items-center gap-3 mt-auto">
        {/* Pink Circle with First Letter */}
        <div className="w-10 h-10 rounded-full bg-luxury-pink flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-base">{firstLetter}</span>
        </div>
        
        <div>
          <p className="text-luxury-dark font-semibold text-sm leading-tight">{data.name}</p>
          <p className="text-gray-400 text-xs mt-0.5">Customer</p>
        </div>
      </div>
    </div>
  )
}