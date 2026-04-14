import type { ReactNode } from 'react'
import type { Testimonial } from '@/payload-types'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

type Props = {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: Props): ReactNode {
  if (!testimonials.length) {
    return (
      <section className="section-padding bg-cream-dark px-4 sm:px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader number="04" title="In Their Words" />
          <ScrollReveal>
            <p className="text-body text-ink-muted">Testimonials coming soon.</p>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-cream-dark px-4 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader number="04" title="In Their Words" />
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.1}>
              <blockquote className="border-l-2 border-accent pl-4 sm:pl-6">
                <p className="font-serif text-h4 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 sm:mt-6">
                  <p className="text-body font-medium">{t.authorName}</p>
                  {(t.authorTitle || t.authorCompany) && (
                    <p className="mt-1 text-small text-ink-muted">
                      {[t.authorTitle, t.authorCompany].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
