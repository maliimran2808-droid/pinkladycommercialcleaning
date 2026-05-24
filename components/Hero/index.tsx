import HeroBackground from './HeroBackground'
import HeroCard from './HeroCard'

export default function Hero() {
  return (
    <section className="relative w-full hero-position2 sm:h-auto h-screen flex items-end justify-center">
      {/* Background Layer (95% height, 100% width) */}
      <HeroBackground />
      
      {/* Glass Card Layer (Centered) */}
      <div className="relative z-10 w-full hero-position sm:mt-20 flex items-center justify-center">
        <HeroCard />
      </div>
    </section>
  )
}