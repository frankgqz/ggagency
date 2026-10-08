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

