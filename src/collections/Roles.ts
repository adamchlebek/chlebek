import type { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoUrl',
      type: 'text',
      admin: {
        description: 'External logo URL (used if no upload)',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Overall summary for this company',
      },
    },
    {
      name: 'positions',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Roles held at this company, newest first',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Leave empty for current role',
          },
        },
      ],
    },
    {
      name: 'keyWins',
      type: 'array',
      fields: [
        {
          name: 'win',
          type: 'text',
          required: true,
        },
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
