'use client'

import { useState, type ReactNode, type FormEvent } from 'react'

export function ContactForm(): ReactNode {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus('sending')

    // TODO: Wire to Next.js route handler with Resend or similar
    // const formData = new FormData(e.currentTarget)
    // const res = await fetch('/api/contact', { method: 'POST', body: formData })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="border border-accent/20 p-8">
        <p className="font-serif text-h4">Message sent.</p>
        <p className="mt-2 text-body text-ink-muted">I&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="label-caps mb-2 block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border-b border-border bg-transparent py-3 text-body text-ink outline-none transition-colors focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="company" className="label-caps mb-2 block">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="w-full border-b border-border bg-transparent py-3 text-body text-ink outline-none transition-colors focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="message" className="label-caps mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none border-b border-border bg-transparent py-3 text-body text-ink outline-none transition-colors focus:border-ink"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="label-caps border border-ink px-8 py-3 text-ink transition-all duration-300 hover:bg-ink hover:text-cream disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
