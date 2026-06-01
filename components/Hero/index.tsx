'use client'
export const dynamic = 'force-dynamic'
import HeroBackground from './HeroBackground'
import HeroCard from './HeroCard'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function Hero() {
  const animRef = useScrollAnimation()
  return (
    <section className="relative w-full hero-position2 h-screen flex items-end justify-center">
      {/* Background Layer (95% height, 100% width) */}
      <HeroBackground />
      
      {/* Glass Card Layer (Centered) */}
      <div ref={animRef} className="relative z-10 w-full hero-position sm:mt-20 flex items-center justify-center">
        <HeroCard />
      </div>
    </section>
  )
}