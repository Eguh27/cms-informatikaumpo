import 'dotenv/config'
import { execSync } from 'node:child_process'

const databaseURL = process.env.DATABASE_URL ?? ''

// The repository ships a migrated SQLite file (`.d`) that is bundled into the
// deployment (see `outputFileTracingIncludes` in next.config.ts). Running
// migrations against it at build time would try to recreate existing tables.
// Migrations only apply to remote LibSQL/Turso databases.
if (databaseURL.startsWith('file:')) {
  console.log(
    '[build] Local SQLite file database: skipping `payload migrate` (schema is stored in the committed database file).',
  )
} else {
  execSync('payload migrate', { stdio: 'inherit' })
}
