import type { ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'

type Props = {
  number: string
  title: string
  className?: string
}

export function SectionHeader({ number, title, className = '' }: Props): ReactNode {
  return (
    <ScrollReveal className={className}>
      <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-3 sm:mb-12 sm:gap-4 sm:pb-4 md:mb-16">
        <span className="section-number">{number}</span>
        <h2 className="text-h3 md:text-h2">{title}</h2>
      </div>
    </ScrollReveal>
  )
}
