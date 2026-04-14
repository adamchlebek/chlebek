import type { CollectionConfig } from 'payload'

export const Accomplishments: CollectionConfig = {
  slug: 'accomplishments',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'metric', 'category', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'metric',
      type: 'text',
      admin: {
        description: 'The headline number — e.g. "16 months", "$2M ARR", "team of 12"',
      },
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Technical', value: 'technical' },
        { label: 'Business', value: 'business' },
        { label: 'Exit', value: 'exit' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
