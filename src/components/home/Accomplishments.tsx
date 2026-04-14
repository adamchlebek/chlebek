import type { ReactNode } from 'react'
import type { Accomplishment } from '@/payload-types'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

type Props = {
  accomplishments: Accomplishment[]
}

const categoryLabels: Record<string, string> = {
  leadership: 'Leadership',
  technical: 'Technical',
  business: 'Business',
  exit: 'Exit',
}

export function Accomplishments({ accomplishments }: Props): ReactNode {
  const grouped = accomplishments.reduce<Record<string, Accomplishment[]>>((acc, item) => {
    const cat = item.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <section className="border-y border-border px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader number="01" title="At a glance" />
        <div className="space-y-12 sm:space-y-16">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <ScrollReveal>
                <p className="label-caps mb-6 sm:mb-8">{categoryLabels[category] || category}</p>
              </ScrollReveal>
              <div className="space-y-0">
                {items.map((item, i) => (
                  <ScrollReveal key={item.id} delay={i * 0.05}>
                    <div className="border-b border-border py-5 sm:py-6 md:grid md:grid-cols-12 md:gap-4">
                      <div className="md:col-span-3">
                        <p className="font-serif text-h3">{item.metric}</p>
                      </div>
                      <div className="mt-2 md:col-span-9 md:mt-0">
                        <p className="text-body font-medium">{item.title}</p>
                        {item.description && (
                          <p className="mt-1 text-body text-ink-muted sm:mt-2">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
