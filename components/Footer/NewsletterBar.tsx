'use client'

export default function NewsletterBar() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-16 border-b border-gray-200">
      <h3 className="text-xl md:text-2xl font-bold text-luxury-dark whitespace-nowrap">
        Subscribe to our Newsletter
      </h3>
      <div className="flex w-full md:w-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 md:w-[320px] px-6 py-3.5 rounded-l-full border border-r-0 border-gray-300 text-sm focus:outline-none focus:border-luxury-pink transition-colors"
        />
        <button
          className="px-8 py-3.5 bg-luxury-dark text-white font-semibold text-sm uppercase tracking-wider rounded-r-full hover:bg-luxury-pink transition-colors duration-300"
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}