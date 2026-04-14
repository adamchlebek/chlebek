import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Fraunces, Inter } from 'next/font/google'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { getPayloadClient } from '@/lib/payload'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Adam Chlebek — VP of Engineering',
  description: 'Engineering leader. Operator. Builder of teams that ship.',
  openGraph: {
    title: 'Adam Chlebek — VP of Engineering',
    description: 'Engineering leader. Operator. Builder of teams that ship.',
    type: 'website',
    url: 'https://adamchlebek.com',
  },
}

type Props = {
  children: ReactNode
}

export default async function FrontendLayout({ children }: Props): Promise<ReactNode> {
  const payload = await getPayloadClient()
  const profile = await payload.findGlobal({ slug: 'profile' })

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink">
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer profile={profile} />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
