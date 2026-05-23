import Link from 'next/link'
import { companyLinks } from './footerConfig'

export default function FooterCompany() {
  return (
    <div>
      <h4 className="text-sm font-bold text-luxury-pink uppercase tracking-widest mb-5">Company</h4>
      <ul className="space-y-3">
        {companyLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-600 text-base hover:text-luxury-pink transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}