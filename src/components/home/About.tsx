import type { ReactNode } from 'react'
import type { Profile } from '@/payload-types'
import { richTextToHtml } from '@/lib/richtext'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

type Props = {
  profile: Profile
}

export function About({ profile }: Props): ReactNode {
  const bioHtml = richTextToHtml(profile.bio as Parameters<typeof richTextToHtml>[0])

  return (
    <section id="about" className="section-padding px-4 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader number="02" title="About" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <ScrollReveal>
              <div className="flex flex-row gap-8 md:flex-col md:gap-0">
                <div>
                  <p className="label-caps mb-2">Current Role</p>
                  <p className="text-body font-medium">{profile.title}</p>
                </div>
                {profile.location && (
                  <div className="md:mt-6">
                    <p className="label-caps mb-2">Location</p>
                    <p className="text-body">{profile.location}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
          <div className="md:col-span-8">
            <ScrollReveal delay={0.1}>
              <div
                className="text-body leading-relaxed text-ink-light [&_p+p]:mt-5"
                dangerouslySetInnerHTML={{ __html: bioHtml }}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
