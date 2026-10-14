import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-d1-sqlite'
import { sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`gallery\` ADD \`key\` text;`)
  await db.run(sql`ALTER TABLE \`gallery\` ADD \`width\` numeric;`)
  await db.run(sql`ALTER TABLE \`gallery\` ADD \`height\` numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`gallery\` DROP COLUMN \`key\`;`)
  await db.run(sql`ALTER TABLE \`gallery\` DROP COLUMN \`width\`;`)
  await db.run(sql`ALTER TABLE \`gallery\` DROP COLUMN \`height\`;`)
}
