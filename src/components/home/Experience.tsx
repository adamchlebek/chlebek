'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Role } from '@/payload-types'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

type Props = {
  roles: Role[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatYear(dateStr: string): string {
  return new Date(dateStr).getFullYear().toString()
}

function CompanyCard({ role, index }: { role: Role; index: number }): ReactNode {
  const [expanded, setExpanded] = useState(index === 0)
  const positions = role.positions || []
  const currentTitle = positions[0]?.title || ''
  const hasMultiple = positions.length > 1
  const earliest = positions[positions.length - 1]
  const latest = positions[0]
  const logoSrc = role.logoUrl || (role.logo && typeof role.logo !== 'number' ? role.logo.url : null)

  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="border border-border bg-cream transition-colors hover:border-border-strong">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full cursor-pointer items-start justify-between p-5 text-left sm:p-8 md:p-10"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3">
              {logoSrc ? (
                <div className="w-full">
                  <img
                    src={logoSrc}
                    alt=""
                    className="h-7 w-auto max-w-[11rem] object-contain object-left opacity-90 sm:h-8 sm:max-w-[13rem]"
                  />
                  <h3 className="sr-only">{role.company}</h3>
                </div>
              ) : null}
              {(!logoSrc || hasMultiple) && (
                <div className="flex flex-wrap items-center gap-3">
                  {!logoSrc ? (
                    <h3 className="font-serif text-h3 md:text-h2">{role.company}</h3>
                  ) : null}
                  {hasMultiple ? (
                    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-0.5 text-xs font-medium text-accent">
                      {positions.length} roles
                    </span>
                  ) : null}
                </div>
              )}
            </div>
            <p className="mt-1 text-body font-medium text-ink-light sm:mt-2">
              {currentTitle}
            </p>
            <p className="mt-1 text-small text-ink-muted">
              {earliest ? formatDate(earliest.startDate) : ''} — {latest?.endDate ? formatDate(latest.endDate) : 'Present'}
            </p>
          </div>
          <span
            className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-all duration-300 sm:h-10 sm:w-10"
            style={{ transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="sm:h-4 sm:w-4">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 md:px-10 md:pb-10 md:pt-8">
                {role.summary && (
                  <p className="mb-6 max-w-2xl text-body leading-relaxed text-ink-light sm:mb-8">
                    {role.summary}
                  </p>
                )}

                {hasMultiple && (
                  <div className="mb-6 sm:mb-8">
                    <p className="label-caps mb-4">Career Progression</p>
                    <div className="relative pl-6 sm:pl-8">
                      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]" />
                      {positions.map((pos, i) => (
                        <div key={i} className="relative pb-5 last:pb-0 sm:pb-6">
                          <div className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-cream sm:-left-8 sm:h-4 sm:w-4" />
                          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                            <p className={`text-body ${i === 0 ? 'font-medium' : ''}`}>
                              {pos.title}
                            </p>
                            <span className="text-small text-ink-muted">
                              {formatYear(pos.startDate)}
                              {pos.endDate ? ` — ${formatYear(pos.endDate)}` : ' — Present'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {role.keyWins && role.keyWins.length > 0 && (
                  <div>
                    <p className="label-caps mb-4">Key Wins</p>
                    <ul className="space-y-3">
                      {role.keyWins.map((win, j) => (
                        <li key={j} className="flex items-start gap-3 text-body leading-relaxed text-ink-light">
                          <span className="mt-2.5 block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                          {win.win}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

export function Experience({ roles }: Props): ReactNode {
  return (
    <section className="section-padding bg-cream-dark px-4 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader number="03" title="Experience" />
        <div className="space-y-4 sm:space-y-6">
          {roles.map((role, i) => (
            <CompanyCard key={role.id} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
