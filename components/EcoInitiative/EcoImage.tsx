'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf1, Leaf2, Leaf3 } from './LeafIcons'

gsap.registerPlugin(ScrollTrigger)

export default function EcoImage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leaf1Ref = useRef<HTMLDivElement>(null)
  const leaf2Ref = useRef<HTMLDivElement>(null)
  const leaf3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Leaf 1: Goes UP
      gsap.to(leaf1Ref.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // Tied to scroll
        },
      })

      // Leaf 2: ROTATES and shifts slightly
      gsap.to(leaf2Ref.current, {
        rotation: 45,
        y: 20,
        x: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Leaf 3: Goes DOWN
      gsap.to(leaf3Ref.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert() // Clean up on unmount
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[400px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl group">
      <Image
       src="/images/whyus.webp"    alt="Green eco cleaning"
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Floating Leaves - Top Left Corner */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 pointer-events-none">
        {/* Leaf 1 */}
        <div ref={leaf1Ref} className="absolute -top-4 -left-2">
          <Leaf1 />
        </div>

        {/* Leaf 2 */}
        <div ref={leaf2Ref} className="absolute top-6 left-10">
          <Leaf2 />
        </div>

        {/* Leaf 3 */}
        <div ref={leaf3Ref} className="absolute top-14 -left-6">
          <Leaf3 />
        </div>
      </div>
    </div>
  )
}