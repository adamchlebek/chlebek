import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { ProjectsList } from '@/components/work/ProjectsList'
import { ArticlesList } from '@/components/work/ArticlesList'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { RevealText } from '@/components/shared/RevealText'

export const metadata: Metadata = {
  title: 'Work — Adam Chlebek',
  description: 'Selected projects and writing by Adam Chlebek.',
}

export const dynamic = 'force-dynamic'

export default async function WorkPage(): Promise<ReactNode> {
  const payload = await getPayloadClient()

  const [projects, articles] = await Promise.all([
    payload.find({ collection: 'projects', sort: 'sortOrder', limit: 50 }),
    payload.find({ collection: 'articles', sort: '-publishDate', limit: 50 }),
  ])

  const hasArticles = articles.docs.length > 0

  return (
    <>
      <section className="px-4 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-16 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <RevealText as="h1" className="font-serif text-h1 md:text-display">
            Work
          </RevealText>
          <RevealText as="p" className="mt-3 max-w-xl text-body text-ink-muted sm:mt-4" delay={0.2}>
            {hasArticles ? 'Selected projects and writing. Outcomes over output.' : 'Selected projects. Outcomes over output.'}
          </RevealText>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b border-border bg-cream/90 px-4 backdrop-blur-sm sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl gap-6 py-3 sm:gap-8 sm:py-4">
          <a href="#projects" className="label-caps text-ink no-underline transition-opacity hover:opacity-70">
            Projects
          </a>
          {hasArticles ? (
            <a href="#writing" className="label-caps text-ink-muted no-underline transition-opacity hover:opacity-70">
              Writing
            </a>
          ) : null}
        </div>
      </nav>

      <section id="projects" className="section-padding px-4 sm:px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader number="01" title="Projects" />
          <ProjectsList projects={projects.docs} />
        </div>
      </section>

      {hasArticles ? (
        <>
          <hr className="mx-4 border-border sm:mx-auto sm:max-w-7xl" />
          <section id="writing" className="section-padding px-4 sm:px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <SectionHeader number="02" title="Writing" />
              <ArticlesList articles={articles.docs} />
            </div>
          </section>
        </>
      ) : null}
    </>
  )
}
