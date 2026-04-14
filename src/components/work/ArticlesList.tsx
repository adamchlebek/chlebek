import type { ReactNode } from 'react'
import type { Article } from '@/payload-types'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

type Props = {
  articles: Article[]
}

export function ArticlesList({ articles }: Props): ReactNode {
  if (!articles.length) {
    return (
      <ScrollReveal>
        <p className="text-body text-ink-muted">Articles coming soon.</p>
      </ScrollReveal>
    )
  }

  return (
    <div>
      {articles.map((article, i) => {
        const date = article.publishDate
          ? new Date(article.publishDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : ''

        const readLabel =
          article.readTimeMinutes === 1 ? '1 min read' : `${article.readTimeMinutes} min read`

        return (
          <ScrollReveal key={article.id} delay={i * 0.05}>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-border px-4 py-8 no-underline transition-colors hover:bg-cream-dark sm:px-6 sm:py-10 md:px-8 md:py-12"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-h4 md:text-h3 transition-colors group-hover:text-accent">
                    {article.title}
                  </h3>
                  {article.description ? (
                    <p className="mt-3 text-body leading-relaxed text-ink-muted sm:mt-4 md:max-w-2xl">
                      {article.description}
                    </p>
                  ) : null}
                </div>
                <div className="shrink-0 pt-1 sm:text-right">
                  <p className="text-small text-ink-muted">{date}</p>
                  <p className="mt-1 text-xs text-ink-faint">{readLabel}</p>
                </div>
              </div>
            </a>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
