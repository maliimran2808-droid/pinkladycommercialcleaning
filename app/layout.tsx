import type { Metadata } from 'next'
import './globals.css'
import { Parkinsans, Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from './Providers'
import ScrollToTop from '@/components/ScrollToTop'
const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-parkinsans',
  display: 'swap',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pink Ladies | Luxury Commercial Cleaning',
  description: 'Premium cleaning services',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${outfit.variable} scroll-smooth`}>
      <body className={`${parkinsans.className} ${outfit.className} antialiased bg-white text-gray-900`}>
          <Providers>
        {/* <ScrollToTop />  */}
          <main>{children}</main>
     
        </Providers>
      </body>
    </html>
  )
}