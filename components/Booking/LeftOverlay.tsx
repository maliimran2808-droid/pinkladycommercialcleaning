import { Star } from 'lucide-react'

export default function LeftOverlay() {
  return (
    <div className="border-2 border-white/30 rounded-[30px] p-8 flex items-end min-h-[550px] md:min-h-[650px]">
      
      {/* Glassmorphism Box at the Bottom */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 md:p-8 flex items-center gap-8 w-full">
        
        {/* Left Part: Image, 100+, 5 Stars */}
        <div className="flex flex-col items-center text-center flex-1">
          {/* Branded/Chip Image Placeholder */}
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-3 backdrop-blur-sm">
            {/* <img 
              src="/images/badge-icon.svg" 
              alt="Badge" 
              className="w-10 h-10"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            /> */}
          </div>
          <span className="text-3xl font-bold text-white mb-2">100+</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} className="fill-luxury-pink text-luxury-pink" />
            ))}
          </div>
        </div>

        {/* Right Part: Happy Customers, Bark Reviews */}
        <div className="flex flex-col justify-center flex-1 text-left">
          <h4 className="text-xl md:text-2xl font-bold text-white mb-1">Happy Customers</h4>
          <p className="text-white/80 text-base font-medium">Bark Reviews</p>
        </div>

      </div>
    </div>
  )
}