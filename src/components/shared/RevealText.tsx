'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export function RevealText({ children, className = '', delay = 0, as = 'div' }: Props): ReactNode {
  const Tag = motion.create(as)

  return (
    <div className="overflow-hidden">
      <Tag
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay,
        }}
        className={className}
      >
        {children}
      </Tag>
    </div>
  )
}
