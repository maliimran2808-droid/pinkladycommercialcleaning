import ReviewsIntro from './ReviewsIntro'
import ReviewSummary from './ReviewSummary'
import ReviewsGrid from './ReviewsGrid'

export default function Reviews() {
  return (
    <section className="w-full py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Top: 50/50 Image & Text */}
        <ReviewsIntro />

        {/* Floating Summary Badge */}
        <ReviewSummary />

        {/* Bottom: 3x3 Grid & Button Container */}
        <ReviewsGrid />

      </div>
    </section>
  )
}