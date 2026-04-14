'use client'

import { type ReactNode } from 'react'
import { RevealText } from '@/components/shared/RevealText'
import { HeroBackground } from './HeroBackground'

type Props = {
  name: string
  tagline: string
}

export function Hero({ name, tagline }: Props): ReactNode {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <RevealText as="h1" className="text-center font-serif text-display leading-none tracking-tight" delay={0.2}>
            {name}
          </RevealText>
          <RevealText as="p" className="mx-auto mt-4 max-w-2xl text-center text-body text-ink-muted sm:mt-6 md:mt-8 md:text-h4" delay={0.5}>
            {tagline}
          </RevealText>
          <RevealText className="mt-8 flex justify-center sm:mt-10 md:mt-12" delay={0.8}>
            <a
              href="#about"
              className="label-caps border border-ink/20 px-6 py-3 text-ink no-underline transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream sm:px-8"
            >
              Learn More
            </a>
          </RevealText>
        </div>
      </div>
    </section>
  )
}
