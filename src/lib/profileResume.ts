import type { Profile } from '@/payload-types'

export type ProfileResumeDownload = {
  href: string
  downloadName: string | undefined
}

export function getProfileResumeDownload(profile: Profile): ProfileResumeDownload | null {
  const r = profile.resume
  if (!r || typeof r !== 'object' || !r.url) {
    return null
  }
  return {
    href: r.url,
    downloadName: r.filename ?? undefined,
  }
}
