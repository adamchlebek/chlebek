import dotenv from 'dotenv'
import { getPayload } from 'payload'

import config from '@payload-config'
import { runSeed } from './lib/runSeed'

dotenv.config({ path: '.env.local' })

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  await runSeed(payload)
  process.exit(0)
}

main().catch((err: unknown) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
