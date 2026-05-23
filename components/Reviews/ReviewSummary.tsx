import { Star } from 'lucide-react'

export default function ReviewSummary() {
  return (
    <div className="relative z-10 flex justify-center mb-0 md:-mb-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-10 py-6 text-center">
        {/* 5 Pink Stars */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={22} className="fill-luxury-pink text-luxury-pink" />
          ))}
        </div>

        {/* Exceptional Text */} 
        <h3 className="text-2xl font-bold text-luxury-dark mb-1">Exceptional</h3>
        
        {/* Rating Score */}
        <p className="text-gray-500 text-sm font-medium tracking-wide">
          Rating Score 5.0 / 5
        </p>
      </div>
    </div>
  )
}