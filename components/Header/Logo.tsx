import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex-shrink-0 text-2xl font-bold tracking-wider">
<img src="/images/mainlogo.webp" width="80" alt="commercial cleaning" />
    </Link>
  )
}