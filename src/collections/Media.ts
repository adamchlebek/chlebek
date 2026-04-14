import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const raw = typeof data.alt === 'string' ? data.alt.trim() : ''
        if (raw) {
          return
        }
        const fn = typeof data.filename === 'string' ? data.filename : ''
        const stem = fn.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim()
        data.alt = stem || 'File'
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Accessibility label; left empty on upload, we default from the filename.',
      },
    },
  ],
  upload: true,
}
