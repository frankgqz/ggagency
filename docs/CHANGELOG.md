# Changelog

## 2026-10-08

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

## 2026-09-30

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
