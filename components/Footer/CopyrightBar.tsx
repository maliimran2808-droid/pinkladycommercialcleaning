import {  Copyright } from 'lucide-react'

const socialIcons = [
  { icon: Copyright, href: '#' },
  { icon: Copyright, href: '#' },
  { icon: Copyright, href: '#' },
  { icon: Copyright, href: '#' },
]

export default function CopyrightBar() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-16">
      {/* Social Icons */}
      <div className="flex items-center gap-3 mb-8">
        {socialIcons.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-luxury-pink/10 flex items-center justify-center text-luxury-pink hover:bg-luxury-pink hover:text-white transition-all duration-300"
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>

      {/* Pink Divider */}
      <div className="w-full h-[2px] bg-luxury-pink mb-6" />

      {/* Copyright Text */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Copyright size={16} />
          <span>{currentYear} - Pink Ladies Commercial Cleaning Services</span>
        </div>
        <div className="text-gray-500 text-sm">
          Developed and marketing by Morgan with{' '}
          <a 
            href="https://animakermedia.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-luxury-pink font-semibold hover:underline"
          >
            Animaker Media
          </a>
        </div>
      </div>
    </div>
  )
}