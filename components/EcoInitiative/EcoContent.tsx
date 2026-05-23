import { Check } from 'lucide-react'
import { ecoFeatures } from './ecoConfig'

export default function EcoContent() {
  return (
    <div className="flex flex-col justify-center h-full py-8">
      {/* Small Label */}
      <span className="text-sm font-medium text-luxury-pink uppercase tracking-widest mb-4">
        Eco
      </span>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-dark leading-tight mb-6">
        Green Commercial Cleaning Initiative by Pink Ladies
      </h2>

      {/* Paragraph */}
      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
        At Pink Ladies Commercial Cleaning, we are committed to providing safe and non-toxic cleaning services. Cleaning should not harm the environment. All of the products and processes are chosen carefully to support a green cleaning in Florida.
      </p>

      {/* Feature List */}
      <ul className="space-y-0">
        {ecoFeatures.map((feature, index) => (
          <li 
            key={index} 
            className={`flex items-center gap-4 py-4 ${index < ecoFeatures.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <div className="w-7 h-7 rounded-full bg-luxury-pink flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-gray-700 text-base font-medium">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}