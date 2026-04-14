import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Hero } from '@/components/home/Hero'
import { Accomplishments } from '@/components/home/Accomplishments'
import { About } from '@/components/home/About'
import { Experience } from '@/components/home/Experience'
import { Testimonials } from '@/components/home/Testimonials'

export const metadata: Metadata = {
  title: 'Adam Chlebek — VP of Engineering',
  description: 'Engineering leader. Operator. Builder of teams that ship.',
}

export default async function HomePage(): Promise<ReactNode> {
  const payload = await getPayloadClient()

  const [profile, accomplishments, roles, testimonials] = await Promise.all([
    payload.findGlobal({ slug: 'profile' }),
    payload.find({ collection: 'accomplishments', sort: 'sortOrder', limit: 20 }),
    payload.find({ collection: 'roles', sort: 'sortOrder', limit: 20 }),
    payload.find({ collection: 'testimonials', sort: 'sortOrder', limit: 10 }),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: 'https://adamchlebek.com',
    email: profile.email || undefined,
    address: profile.location
      ? { '@type': 'PostalAddress', addressLocality: profile.location }
      : undefined,
    sameAs: profile.socialLinks?.map((l) => l.url).filter(Boolean) || [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero name={profile.name} tagline={profile.tagline} />
      <Accomplishments accomplishments={accomplishments.docs} />
      <About profile={profile} />
      <Experience roles={roles.docs} />
      <Testimonials testimonials={testimonials.docs} />
    </>
  )
}
