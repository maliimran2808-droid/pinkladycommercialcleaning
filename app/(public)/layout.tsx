import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// 🔥 Dynamic SEO: Fetches from your database!
export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await supabaseAdmin.from('settings').select('key, value')
    const settings: Record<string, string> = {}
    if (data) {
      data.forEach((item: { key: string; value: string }) => {
        settings[item.key] = item.value
      })
    }

    return {
      title: settings.meta_title || 'Pink Ladies | Luxury Commercial Cleaning',
      description: settings.meta_description || 'Premium cleaning services',
      keywords: settings.meta_keywords ? settings.meta_keywords.split(',').map((k) => k.trim()) : [],
    }
  } catch (error) {
    return {
      title: 'Pink Ladies | Luxury Commercial Cleaning',
      description: 'Premium cleaning services',
    }
  }
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}