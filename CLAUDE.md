@AGENTS.md

# PeptidesMasters.com — Claude Code Context

## Project Overview
National authority website for peptide research education. Built with Next.js 16 (App Router), Tailwind v4, TypeScript.
Monetization: affiliate links (all currently placeholder `[AFFILIATE_LINK_*]` format — see data files).

## Tech Stack
- **Framework:** Next.js 16.2.6 with App Router, TypeScript
- **Styling:** Tailwind CSS v4 (CSS `@theme` config in `globals.css` — no `tailwind.config.ts`)
- **Fonts:** Syne (headings) + DM Sans (body) via Google Fonts
- **Icons:** lucide-react
- **UI:** Custom glass-morphism components with inline styles

## Design System (globals.css)
- Background: `#0A0A0F`, Secondary: `#12121A`
- Teal accent: `#00D4AA`, Amber accent: `#F5A623`
- Body text: `#F0F0F0`, muted: `#9CA3AF`, dim: `#6B7280`
- Card: `.glass-card` class (rgba bg + backdrop-filter blur)

## Data Layer (`src/data/`)
All content lives in static TypeScript files — no database, no CMS.
- `peptides.ts` — 15 peptide profiles with full research data
- `articles.ts` — 10 seed articles
- `faqs.ts` — 20 FAQ items across 5 categories

To add a peptide: append to the array in `src/data/peptides.ts` following the `Peptide` interface.
To add an article: append to `src/data/articles.ts` following the `Article` interface.

## Site Structure
```
/ → /peptides → /peptides/[slug] (SSG, 15 pages)
/compare → /compare/[slug] (5 pre-built static comparisons)
/quiz (client-side multi-step quiz)
/faq (server + client search)
/guide (pillar page)
/articles → /articles/[slug] (SSG, 10 pages)
/legal
/sitemap.xml + /robots.txt (auto-generated)
```

## Running Locally
```bash
npm run dev       # localhost:3000
npm run build     # Static export → out/ (43 pages)
npm run preview   # Build + preview via wrangler pages dev
```

## Deployment (Cloudflare Pages — auto-deploy via GitHub)
Static export: `output: "export"` in next.config.ts. Output dir: `out/`.
No adapter needed — Cloudflare Pages runs `npm run build` and serves `out/`.

Cloudflare Pages dashboard settings (one-time):
- Build command: `npm run build`
- Build output directory: `out`
- Node.js version env var: `NODE_VERSION=18`

Connect GitHub repo → every push to `main` auto-deploys.

## Launch TODO
- Replace all `[AFFILIATE_LINK_*]` placeholders with real URLs
- Set GA4 ID in `src/app/layout.tsx` (search for `G-XXXXXXXXXX`)
- Add OG image at `/public/og-image.png` (1200×630)
- Connect quiz email form to Mailchimp/ConvertKit (search for `TODO: Connect`)
- Connect GitHub repo in Cloudflare Pages dashboard to enable auto-deploy
