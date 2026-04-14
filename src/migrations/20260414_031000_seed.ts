import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { runSeed } from '../lib/runSeed'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await runSeed(payload)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  return
}
