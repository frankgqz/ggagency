<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ggagency — Haylee's agency website (Wix → Node migration)

Client site for GG Agency Entertainment (Haylee Trinh). Live at
ggagency.frankgqz.workers.dev (Cloudflare Workers, `@opennextjs/nextjs`).
Repo: /code/works/ggagency (remote frankgqz/ggagency). Pipeline notes:
`/code/⌁ docs/business.md`.

## State (audit 2026-10-04 — PARKED, resumes as teach-the-stack sittings)
Deploy is current with HEAD (`ba37c0f`). Missing = the whole data layer:
no D1 / Drizzle / PayloadCMS / Turnstile / SEO files exist. Contact form is
a fake setTimeout stub (no storage, no email). Gallery = 42 gradient
placeholder tiles; real images sit in R2 (`ggagency_images` binding unused;
served via public dev URL `pub-…r2.dev` — should move to a custom domain).
Cleanup candidates: dead `@frontman-ai/nextjs` devDep, `shadcn` in prod deps.

## Resume mode (Frank's standing request)
Teach-the-stack sittings — mechanism first, one topic per sitting:
1. D1 (what a database at the edge is; wire the contact form to it for real)
2. Drizzle (schema/migrations on top of D1)
3. PayloadCMS (content model for gallery/services)
4. SEO (metadata, sitemap, OG images)
Order of building: form-slice-first (form → D1 → validation/Turnstile), then
gallery, then CMS. Explain mechanisms, don't just ship.

## Progress
- 2026-10-08: **Contact form → D1 slice WRITTEN** (not yet deployed):
  `migrations/0001_contact_submissions.sql` (table),
  `app/api/contact/route.ts` (POST handler: validates + prepared-statement
  INSERT via `getCloudflareContext().env.ggagency_db`),
  `components/contact-form.tsx` (real fetch, error state),
  `wrangler.jsonc` d1_databases binding (database_id = PLACEHOLDER),
  `next.config.ts` `initOpenNextCloudflareForDev()` (dev parity),
  `types/cloudflare-env.d.ts` (minimal D1 typing; swap for
  `@cloudflare/workers-types` later). `tsc --noEmit` clean.
  DEPLOY STEPS (Frank's host shell — container has no CF auth and win32
  node_modules): `npx wrangler d1 create ggagency-db` → paste database_id
  into wrangler.jsonc → `npx wrangler d1 migrations apply ggagency-db
  --remote` → `npm run deploy`. Verify: submit the form, then
  `npx wrangler d1 execute ggagency-db --remote --command "SELECT * FROM
  contact_submissions"`.

## Browser setup (Frank's machine, proven 2026-10-08)
Dedicated debug Chrome: taskbar shortcut →
`chrome.exe --remote-debugging-port=9222 --user-data-dir="C:\Users\Frank\AppData\Local\chrome-debug"`
(profile must NOT be at C:\ root — Chrome can't create it there).
Working combo: `browser.use_real_profile: false` in Hermes config + run
`/browser connect` in chat to arm the session (sets the CDP attach path).
Known bugs: without `/browser connect`, browser_exec dies with
`ModuleNotFoundError: fcntl` (harness launch path is Unix-only — needs
`hermes update` eventually) or hangs 420s. The connected browser = ALL its
windows/tabs visible via `Target.getTargets`; Frank's everyday Chrome is a
separate instance and stays private.

## Provenance & workflow (Frank 2026-10-08)
Current page was mostly built by **stagewise** (an AI coding agent with a
built-in browser/element selector — handy for frontend work; NOT connected
to our continuity framework). Going forward the site is built HERE (Hermes):
changes come as Frank's edit requests, each with mechanism explanations
(teach-the-stack standing request). Stagewise-generated code is ours to
maintain — expect its conventions, don't assume mine.

## Tool facts
stagewise = design tool of record (works out of the box). Frontman never
worked (vault/frontman deletable — Frank's call).

