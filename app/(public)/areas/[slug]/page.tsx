import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic' // Ensures new areas show up immediately

// Fetch the area data from the database using the URL slug
async function getAreaData(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('areas')
    .select('name, slug, address')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = await getAreaData(slug)

  // If someone goes to /areas/random-city that doesn't exist, show 404
  if (!area) return notFound()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-6 py-24">
        {/* Dynamic City Name in Title */}
        <h1 className="text-5xl md:text-6xl font-parkinsans font-bold text-luxury-dark mb-6">
          Premium Cleaning in {area.name}
        </h1>

        {/* Dynamic City Name in Paragraph */}
        <p className="text-lg md:text-xl text-gray-600 font-outfit leading-relaxed max-w-2xl mx-auto mb-8">
          Welcome to the premier commercial cleaning service for {area.name}. We are dedicated to providing spotless, healthy, and inspiring workspaces for businesses right here in {area.name}{area.address ? `, ${area.address}` : ''}.
        </p>

        <a 
          href="/contact" 
          className="inline-flex items-center bg-luxury-dark text-white px-8 py-4 rounded-full font-outfit font-semibold uppercase tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-lg"
        >
          Get a Free Quote for {area.name}
        </a>
      </div>
    </main>
  )
}