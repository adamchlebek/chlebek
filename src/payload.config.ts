import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Accomplishments } from './collections/Accomplishments'
import { Roles } from './collections/Roles'
import { Projects } from './collections/Projects'
import { Articles } from './collections/Articles'
import { Testimonials } from './collections/Testimonials'
import { Profile } from './globals/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function databaseConnectionString(): string {
  const raw =
    process.env.DATABASE_URI ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    ''
  if (!raw) {
    return ''
  }
  if (/[?&]sslmode=/i.test(raw)) {
    return raw
  }
  const hostIsLocal =
    /@(localhost|127\.0\.0\.1)(?=[/:]|$)/i.test(raw) ||
    /\/\/localhost(?=[/:]|$)/i.test(raw) ||
    /\/\/127\.0\.0\.1(?=[/:]|$)/i.test(raw)
  if (hostIsLocal) {
    return raw
  }
  return `${raw}${raw.includes('?') ? '&' : '?'}sslmode=require`
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Accomplishments, Roles, Projects, Articles, Testimonials],
  globals: [Profile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseConnectionString(),
    },
  }),
  sharp,
  plugins: [],
})
