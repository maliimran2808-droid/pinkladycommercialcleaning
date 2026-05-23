import EcoContent from './EcoContent'
import EcoImage from './EcoImage'

export default function EcoInitiative() {
  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Side: Content */}
        <EcoContent />
        
        {/* Right Side: Image + Leaves */}
        <EcoImage />
      </div>
    </section>
  )
}