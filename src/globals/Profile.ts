import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'One-line positioning statement for the hero',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'calendlyUrl',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
  ],
}
