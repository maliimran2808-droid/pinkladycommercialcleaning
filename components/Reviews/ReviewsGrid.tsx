'use client'

import Link from 'next/link'
import ReviewCard from './ReviewCard'
import { reviewsData } from './reviewsConfig'

export default function ReviewsGrid() {
  return (
    <div className="relative bg-gray-50/50 rounded-2xl border border-gray-100 pt-20 pb-12 px-6 md:px-12">
      {/* The Summary Badge sits slightly on top of this container */}
      
      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} data={review} />
        ))}
      </div>

      {/* Center Button */}
      <div className="flex justify-center">
        <Link
          href="https://bark.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 text-white font-semibold uppercase tracking-wider rounded-md transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          style={{ backgroundColor: '#1a1a1a' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8A0B4')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
        >
          View Our Reviews on Bark
        </Link>
      </div>
    </div>
  )
}