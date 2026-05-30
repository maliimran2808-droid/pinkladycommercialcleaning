'use client'

import Link from 'next/link'
import ReviewCard from './ReviewCard'
import { useState, useEffect } from 'react'
import { ReviewData } from './reviewsConfig'
import ReviewSummary from './ReviewSummary'
import ReviewTopAwards from './ReviewTopAwards'


export default function ReviewsGrid() {
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [loading, setLoading] = useState(true)



    useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/testimonials')
        if (res.ok) {
          const data = await res.json()
          setReviews(data)
        }
      } catch (err) {
        console.error('Failed to load reviews:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading reviews...</div>
  }

  return (
    <div className="relative rounded-3xl pt-0 pb-12 px-6 md:px-12"
    style={
    {
      background:'linear-gradient(to bottom, #f3f5f0 10%, #fff 100%)'
    }
    }>

          <ReviewSummary />
      {/* The Summary Badge sits slightly on top of this container */}
      

        <ReviewTopAwards />



      {/* 3x3 Grid */}
        <div className="grid grid-cols-1 grid-change md:grid-cols-3 gap-6 mb-12">
      {reviews.map((review) => (
        <ReviewCard key={review.id} data={review} />
      ))}
    </div>

      {/* Center Button */}
      <div className="flex justify-center">
        <Link
          href="https://bark.com"
          target="_blank"
          rel="noopener noreferrer"
         className="font-parkinsans w-[fit-content] text-sm px-7.5 py-3.5 rounded-full cursor-pointer text-white font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
        style={{ backgroundColor: '#E10788' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E10788')}
        >
          View Our Reviews on Bark
        </Link>
      </div>
    </div>
  )
}