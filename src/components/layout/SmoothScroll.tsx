'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function SmoothScroll({ children }: Props): ReactNode {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
