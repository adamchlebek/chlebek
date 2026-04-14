import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { ContactForm } from '@/components/contact/ContactForm'
import { RevealText } from '@/components/shared/RevealText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contact — Adam Chlebek',
  description: 'Get in touch with Adam Chlebek.',
}

export default async function ContactPage(): Promise<ReactNode> {
  const payload = await getPayloadClient()
  const profile = await payload.findGlobal({ slug: 'profile' })

  return (
    <section className="px-4 pt-24 pb-section sm:px-6 sm:pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <RevealText as="h1" className="font-serif text-h1 md:text-display">
          Contact
        </RevealText>
        <RevealText as="p" className="mt-3 max-w-xl text-body text-ink-muted sm:mt-4" delay={0.2}>
          The best way to reach me is email.
        </RevealText>

        <div className="mt-12 grid grid-cols-1 gap-12 sm:mt-16 sm:gap-16 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="space-y-6 sm:space-y-8">
                {profile.email && (
                  <div>
                    <p className="label-caps mb-2">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-body text-ink no-underline transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </div>
                )}

                {profile.location && (
                  <div>
                    <p className="label-caps mb-2">Location</p>
                    <p className="text-body">{profile.location}</p>
                  </div>
                )}

                {profile.socialLinks && profile.socialLinks.length > 0 && (
                  <div>
                    <p className="label-caps mb-2">Elsewhere</p>
                    <div className="flex flex-col gap-2">
                      {profile.socialLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body text-ink no-underline transition-colors hover:text-accent"
                        >
                          {link.platform} &rarr;
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {profile.calendlyUrl && (
                  <div>
                    <p className="label-caps mb-2">Schedule a Call</p>
                    <a
                      href={profile.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-ink no-underline transition-colors hover:text-accent"
                    >
                      Book a time &rarr;
                    </a>
                  </div>
                )}

                {profile.resume && typeof profile.resume !== 'number' && (
                  <div>
                    <p className="label-caps mb-2">Resume</p>
                    <a
                      href={profile.resume.url || '#'}
                      className="text-body text-ink no-underline transition-colors hover:text-accent"
                    >
                      Download PDF &rarr;
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
