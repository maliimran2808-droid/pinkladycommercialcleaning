import HeroBackground from './HeroBackground'
import HeroCard from './HeroCard'

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-end justify-center overflow-hidden">
      {/* Background Layer (95% height, 100% width) */}
      <HeroBackground />
      
      {/* Glass Card Layer (Centered) */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <HeroCard />
      </div>
    </section>
  )
}