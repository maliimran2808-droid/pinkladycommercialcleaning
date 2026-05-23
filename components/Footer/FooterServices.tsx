import Link from 'next/link'
import { servicesLinks, areasLinks } from './footerConfig'

export default function FooterServices() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="mb-10">
        <h4 className="text-sm font-bold text-luxury-pink uppercase tracking-widest mb-5">Services</h4>
        <ul className="space-y-3">
          {servicesLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-gray-600 text-base hover:text-luxury-pink transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-sm font-bold text-luxury-pink uppercase tracking-widest mb-5">Service Areas</h4>
        <ul className="space-y-3">
          {areasLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-gray-600 text-base hover:text-luxury-pink transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}