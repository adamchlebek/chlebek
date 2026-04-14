import * as migration_20260414_030546_initial_schema from './20260414_030546_initial_schema'
import * as migration_20260414_031000_seed from './20260414_031000_seed'

export const migrations = [
  {
    up: migration_20260414_030546_initial_schema.up,
    down: migration_20260414_030546_initial_schema.down,
    name: '20260414_030546_initial_schema',
  },
  {
    up: migration_20260414_031000_seed.up,
    down: migration_20260414_031000_seed.down,
    name: '20260414_031000_seed',
  },
]
