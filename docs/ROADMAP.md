# Roadmap

## High priority

- [ ] **Custom domain** — attach `ggagency.com.au` via Cloudflare dashboard (Workers → Domains & Routes) after design is finalised
- [x] **Contact form backend** — DONE 2026-10-08, verified live (form → `POST /api/contact` → D1 `ggagency-db` + email notify via Resend from `forms@gqz.app` → 3 recipients; delivered & confirmed). Swap FROM to `forms@ggagency.com.au` when its DNS leaves Wix.
- [ ] **Team member photos** — replace initial-letter placeholders on `/about` with real photos (upload to R2)

## CMS & content

- [ ] **Payload CMS** — set up `with-cloudflare-d1` template for gallery/hero editing (D1 + R2 bindings already in place)
- [ ] **Gallery images** — replace 42 gradient placeholder tiles with real photos (R2)
- [ ] **Hero image** — replace gradient placeholder with real image

## Design polish

- [ ] **Mobile responsive pass** — verify all sections at 375px, 768px breakpoints
- [ ] **Spline watermark box** — fine-tune positioning if needed across more devices
- [ ] **Accessibility audit** — alt text, focus states, ARIA labels, color contrast
- [ ] **Favicon** — currently default Next.js icon

## Analytics & ops

- [ ] **Google Search Console** — verify domain, submit sitemap
- [ ] **PageSpeed Insights API** — quarterly report via Cloudflare Cron Trigger + email
- [ ] **Monitoring** — Cloudflare Workers observability / error alerts

## Future ideas

- [ ] Pricing / services page
- [ ] Blog / news section (Payload CMS collection)
- [ ] WhatsApp floating button on all pages
- [ ] Dark mode toggle
