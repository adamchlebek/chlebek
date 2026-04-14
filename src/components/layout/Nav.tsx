'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

import type { ProfileResumeDownload } from '@/lib/profileResume'

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

type NavProps = {
  resumeDownload: ProfileResumeDownload | null
}

export function Nav({ resumeDownload }: NavProps): ReactNode {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
        <Link
          href="/"
          className="flex shrink-0 items-center no-underline"
          aria-label="Adam Chlebek — home"
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-border shadow-sm sm:h-10 sm:w-10">
            <Image
              src="/avatar.png"
              alt=""
              width={40}
              height={40}
              className="h-full w-full scale-[1.15] object-cover object-[center_25%]"
              priority
            />
          </span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6 md:gap-8">
          {resumeDownload ? (
            <a
              href={resumeDownload.href}
              download={resumeDownload.downloadName}
              className="label-caps shrink-0 border border-ink/25 bg-cream px-3 py-2 text-ink no-underline transition-colors hover:border-ink hover:bg-ink hover:text-cream sm:px-4"
            >
              Download resume
            </a>
          ) : null}
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
