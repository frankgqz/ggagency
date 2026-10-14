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


## Changelog

### 2026-10-11 (theme + UI round)
- Two-tier CSS variable theme system (globals.css): 7 tier-1 base colors per
  theme + tier-2 derived via color-mix (panel/line/subtext/brand-soft);
  brand-* Tailwind names REBOUND to tier-1 vars so legacy classes theme
  automatically. Dark toggle (.dark on html, localStorage, pre-paint inline
  script = no FOUC) in the header.
- 2026-10-12 (Payload in PRODUCTION — /admin live on the worker): deploy
  chain fixed in layers: (1) Windows symlink EPERM = enable Developer Mode
  (Settings > System > For developers) for OpenNext's copyTracedFiles; (2)
  Turbopack hashed-externals ("Could not resolve drizzle-kit-<hash>/api") =
  do NOT put drizzle-kit in serverExternalPackages (withPayload docs say so)
  — resolveAlias to lib/drizzle-kit-stub.js instead; (3) Workers has empty
  process.env without `nodejs_compat_populate_process_env` (added) + config
  reads the secret from bindings env too; (4) "MessagePort is not defined" =
  pino logger needs the template's console logger (cloudflareLogger) AND
  Next's @edge-runtime/primitives reference MessagePort — stubbed in
  payload.config.ts + compatibility_date bumped to 2026-10-12. Bundle FIT
  the free plan (no size error!) — Workers Paid NOT needed so far. Permanently
  noisy but benign at every deploy: 4x direct-eval warnings (inside Payload)
  + DEP0190 (Node scolding wrangler) — rule: WARNING = noise, ERROR = care.
  (5) Account creation500: workerd caps pbkdf2 at 100k iterations, Payload
  hardcodes 600k -> lib/patch-crypto.js caps pbkdf2 consistently (hash+verify)
  via the first import of payload.config.ts. Production /admin fully working:
  first user created + logged in.
  importMap includes R2ClientUploadHandler = big files upload browser->R2
  directly (bypasses Worker body cap).
- 2026-10-13 (site READS from the DB — hardcoded gallery retired): page =
  static forever + app/api/gallery/route.ts (one prepared D1 query) + client
  fetch on load. RULE learned via 1102: never trigger runtime SSR on the
  free plan (no revalidate windows / revalidatePath on the home page) —
  Payload init + page render blows the 10ms CPU budget; the admin is fine
  because it's rare traffic. Seeds live in scripts/seed-gallery.sql (42
  rows; wrangler d1 execute --remote --file); the tsx/payload-run seed dies
  silently at getPayload init — SQL route is the working one. DB routing:
  `remote: true` binding = ONE shared DB everywhere; run tell = "Establishing
  remote connection..." must appear on migrate. Migration files always need
  the import-type split after migrate:create.
- 2026-10-12 (Payload CMS scaffold — admin LIVE): collections users/media/
  gallery/hero (flat schema — D1 batch-op bug #15219), payload.config.ts with
  sqliteD1Adapter + r2Storage via `plugins:` (the `storage` key doesn't exist
  in 3.90.2 — issue #17195), admin at app/(payload)/ (multiple-root-layouts:
  site = app/(site)/, each group owns its <html>). Migration applied to remote
  ggagency-db (11 tables incl. payload_* internals) + local mock. CONVENTION
  RETIRED: wrangler.jsonc `remote: true` on the D1 binding — it split CLI and
  dev proxy across two databases. New split: dev = local mock (.wrangler/
  state), deploy = real bindings always. Gotchas hit: payload CLI compiles
  config to CJS (no top-level await — use an async IIFE; extensionless
  imports fail — use .ts suffixes); generated migrations import types as
  values (split to `import type`); dev-mode schema push is disabled via
  `push: false` (migrations are the source of truth); withPayload(nextConfig,
  { devBundleServerPackages: false }) keeps drizzle-kit/esbuild out of the
  dev bundle (Unknown-module-type + libsql errors otherwise). Settings:
  PAYLOAD_SECRET in .env (gitignored) + wrangler secret for prod.
- 2026-10-11 (media pipeline + loading): 1.mp4 (6-min) moved to YouTube
  (unlisted XJlMWchGuXs) — gallery tile 1 = YT thumb, click loads the embed.
  Video tiles: preload=none + poster frames (ffmpeg 1s frame, 800px, ~50KB
  each) = instant tiles, hover-play. Error 1102 diagnosis: /images STREAMS
  (object.body) — not buffering; load profile was the trigger. Free-tier
  loading notes: workers.dev has NO edge cache (custom domain = the lever);
  pages already SSG (prerender-manifest: / + /about); hero = `-c copy`
  faststart remux (Order/hero-faststart.mp4 -> hero/hero.mp4, quality
  untouched). upload-gallery.ps1 skips 1.mp4 + 17* (R2 holds only used media).
  Gotcha: .ps1 + non-ASCII path chars = mojibake in Windows PowerShell —
  wildcard the path (`C:\Code\*stage\...`) instead of typing the char.
- Gallery populated (2026-10-11): placeholder tiles replaced with the 42 real
  media items (Order/ folder, numbered = appearance order; 17.mp4 = hero,
  excluded). Media normalized: images webp q82/1600px, videos H.264 CRF24 with
  bitrate caps; h264 sources kept-original when re-encode grew. R2 keys under
  gallery/ (upload-gallery.ps1). Video tiles hover-play muted; click = lightbox.
- Palette: "Blueberry Milk" (navy #2b3a55 text, periwinkle #5c77c9 brand,
  peach #f5c5aa + butter #f7eab8 accents) + dark variant. Theme ladder:
  surface bg/surface/ink, text subtext/text/heading, each accent has a
  pastel fill + deep partner; RULE: pastel fills always carry text-ink.
  Headings = white in dark. Heading font = Sunflower (Google Font).
  History: "Lavender Lemonade" (2026-10-11 AM) replaced same day — thin
  (purple+green only), gloomy dark.
- Header fixed + idle-hide (visible while scrolling, slides away after 1.5s,
  always shown at page top); header/footer both 67px; buttons = 40px circles
  with grey shadow, hover scales the whole button 1.3x.
- Bigo logo right of its heading; strip tail tightened; Join Us scrolls to
  #contact form; Zalo link = zalo.me/61474749999 (TEST on device — works only
  if the number is Zalo-registered); contact field 2 = "Phone / WhatsApp".
- /images/* route: video MIME + Range/206 passthrough; VideoCompare section
  (native hero.mp4 from R2 — YouTube embed removed after comparison);
  image-strip = scroll-driven horizontal parallax (sticky pin + translateX,
  SPEED 0.7, tiles clamp-sized) with click-to-zoom lightbox.

### 2026-10-11

### Added
- `VideoCompare` test section between About and Livestreamer CTA — both video routes side by side: native `<video>` from `/images/hero/hero.mp4` (R2) and a YouTube embed (KdsMaMedWtg) that autoplays muted on scroll (IntersectionObserver)
- Video support in `/images/*`: mp4/webm/mov MIME types + HTTP Range passthrough (206 partial responses for seeking)

### 2026-10-08

### Added
- Worker route `/images/*` (`app/images/[...key]/route.ts`) — streams R2 objects from the `ggagency_images` binding with content-type + cache headers
- D1 database `ggagency-db` created (region OC, id in `wrangler.jsonc`) + `d1_databases` binding `env.ggagency_db`
- `migrations/0001_contact_submissions.sql` — `contact_submissions` table
- `app/api/contact/route.ts` — `POST /api/contact`: validates name/whatsapp/email/message, prepared-statement INSERT into D1
- `types/cloudflare-env.d.ts` — minimal D1 typing (swap for `@cloudflare/workers-types` later)
- `initOpenNextCloudflareForDev()` in `next.config.ts` — `next dev` sees the bindings like production

### Changed
- All image URLs now site-relative (`/images/…`) and served through the R2 binding — the `pub-…r2.dev` public dev URL is gone from the code (5 files)
- Contact form is now real: `fetch("/api/contact")` with sending/sent/error states (was a 500ms `setTimeout` stub)

### 2026-09-30

### Added
- Full one-pager matching ggagency.com.au Wix design (header, hero, about, story, gallery, image strip, CTA, contact form, Spline 3D, footer)
- `/about` page — Meet The Team, contact info, Google Maps embed, contact form
- R2 bucket `ggagency-images` with 12 strip photos (`strip/01.jpg`–`12.jpg`)
- R2 binding in `wrangler.jsonc` (`env.ggagency_images`)
- Cloudflare Workers deploy via `@opennextjs/cloudflare` adapter
- Custom account subdomain `frankgqz` → `ggagency.frankgqz.workers.dev`
- Poppins ExtraLight font for body text (About, Story, CTA)
- Spline 3D embed (`my.spline.design/bigoimport2`) with watermark cover box
- `.gitignore` for build artifacts (`.open-next/`, `.wrangler/`)

### Changed
- Brand tokens: orange `#FC9823`, navy `#000769`, pink `#EA80FF`
- Join Us button: pink `#EA80FF`, 120×45, black text (was orange)
- Send button: black bg, white text, 140×36, square (was orange, rounded)
- Form inputs: transparent bg, square corners (was rounded with ring)
- Header: 100px, livestreaming + diamonds icons, exact brand styling
- Footer: 106px, 4 social icons (was text links)
- Gallery: 42-tile masonry layout (was 5 uniform tiles)
- Removed Frontman middleware (`proxy.ts`, `instrumentation.ts`)
- Fixed `package.json` build script recursion (`next build` for `build`, adapter for `deploy`)

### Removed
- "Join the GG Agency family" pre-footer section (not on original site)
- `components/pre-footer.tsx`
