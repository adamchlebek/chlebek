'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/payload-types'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

type Props = {
  projects: Project[]
}

function ProjectRow({ project, index }: { project: Project; index: number }): ReactNode {
  const [hovered, setHovered] = useState(false)
  const year = project.date ? new Date(project.date).getFullYear().toString() : ''

  return (
    <ScrollReveal delay={index * 0.05}>
      <a
        href={project.externalUrl || `#${project.slug}`}
        target={project.externalUrl ? '_blank' : undefined}
        rel={project.externalUrl ? 'noopener noreferrer' : undefined}
        className="group block border-b border-border px-4 py-8 no-underline transition-colors hover:bg-cream-dark sm:px-6 sm:py-10 md:px-8 md:py-12"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <h3 className="font-serif text-h3 md:text-h2 transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <span className="label-caps">{project.role}</span>
            </div>
            <p className="mt-3 text-body leading-relaxed text-ink-muted sm:mt-4 md:max-w-2xl">{project.summary}</p>
            <motion.div
              initial={false}
              animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              {project.outcomes && project.outcomes.length > 0 && (
                <ul className="mt-4 space-y-2 sm:mt-5">
                  {project.outcomes.map((o, j) => (
                    <li key={j} className="flex items-start gap-3 text-body text-ink-light">
                      <span className="mt-2.5 block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {o.outcome}
                    </li>
                  ))}
                </ul>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                  {project.techStack.map((t, j) => (
                    <span key={j} className="label-caps rounded border border-border px-3 py-1">
                      {t.tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
          <div className="flex-shrink-0 pt-1 text-right">
            <p className="font-serif text-body text-ink-muted">{year}</p>
          </div>
        </div>
      </a>
    </ScrollReveal>
  )
}

export function ProjectsList({ projects }: Props): ReactNode {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div>
      {featured.length > 0 && (
        <div className="mb-8 sm:mb-12">
          {featured.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
      {rest.map((p, i) => (
        <ProjectRow key={p.id} project={p} index={featured.length + i} />
      ))}
    </div>
  )
}
