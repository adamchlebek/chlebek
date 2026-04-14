'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

export function Nav(): ReactNode {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
        <Link href="/" className="font-serif text-lg text-ink no-underline">
          AC
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`label-caps no-underline transition-colors duration-300 ${
                pathname === link.href
                  ? 'text-ink'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
