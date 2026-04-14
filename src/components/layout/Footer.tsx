import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Profile } from '@/payload-types'

type Props = {
  profile: Profile
}

export function Footer({ profile }: Props): ReactNode {
  return (
    <footer className="border-t border-border bg-ink px-4 py-12 text-cream sm:px-6 sm:py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
          <div>
            <p className="font-serif text-h3 text-cream">{profile.name}</p>
            <p className="mt-2 text-small text-ink-faint">{profile.title}</p>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 sm:items-end">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="label-caps text-cream no-underline transition-opacity hover:opacity-70"
              >
                {profile.email}
              </a>
            )}
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {profile.socialLinks?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps text-ink-faint no-underline transition-colors hover:text-cream"
                >
                  {link.platform}
                </a>
              ))}
            </div>
            {profile.resume && typeof profile.resume !== 'number' && (
              <Link
                href={profile.resume.url || '#'}
                className="label-caps text-ink-faint no-underline transition-colors hover:text-cream"
              >
                Download Resume
              </Link>
            )}
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 sm:mt-16">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
