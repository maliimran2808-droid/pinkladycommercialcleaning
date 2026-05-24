import EcoContent from './EcoContent'
import EcoImage from './EcoImage'

export default function EcoInitiative() {
  return (
    <section className="w-full pt-28 pb-5 bg-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Side: Content */}
        <EcoContent />
        
        {/* Right Side: Image + Leaves */}
        <EcoImage />
      </div>
    </section>
  )
}