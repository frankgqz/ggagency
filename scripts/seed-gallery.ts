// One-time seed: insert the existing gallery items (files already in R2 under
// gallery/) as Payload gallery rows. Idempotent — skips keys that exist.
// Usage:
//   local mock : npx payload run scripts/seed-gallery.ts
//   real DB    : cmd /c "set PAYLOAD_REMOTE=1&& npx payload run scripts/seed-gallery.ts"
import { getPayload } from 'payload'
import { readFileSync } from 'node:fs'
import config from '../payload.config.ts'

console.log('seed: script loaded')

async function main() {
  const items = JSON.parse(readFileSync('scripts/seed-data.json', 'utf8'))
  console.log(`seed: ${items.length} items in source file`)
  const payload = await getPayload({ config })
  console.log('seed: payload ready')
  const existing = await payload.find({ collection: 'gallery', limit: 500 })
  const seen = new Set(existing.docs.map((d: any) => d.key || d.youtubeId))
  let created = 0
  for (const item of items as any[]) {
    const id = item.key || item.youtubeId
    if (seen.has(id)) continue
    await payload.create({ collection: 'gallery', data: item })
    created++
  }
  console.log(`seed: DONE — ${created} created, ${seen.size} already present`)
}

main()
  .then(() => setTimeout(() => process.exit(0), 200))
  .catch((e) => {
    console.error('seed: FAILED', e)
    process.exit(1)
  })
