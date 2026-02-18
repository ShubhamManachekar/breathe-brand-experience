# Breathe Brand Experience

Modern React frontend for the EZE AirCare experience, redesigned with distinct B2C and B2B journeys, shared design primitives, and segment-aware styling.

## Stack

- Vite
- React + TypeScript
- Tailwind CSS
- shadcn/ui primitives
- TanStack Query

## Documentation

Detailed implementation and operations docs are available in:

- `docs/README.md`
- `docs/stakeholder-navigation.md`
- `docs/seo.md`
- `docs/cdn-edge.md`
- `docs/performance.md`
- `docs/analytics.md`
- `docs/security.md`
- `docs/deployment.md`
- `docs/operations-checklist.md`

## Performance & Analytics

- **Route splitting:** active via lazy-loaded routes in `src/App.tsx`.
- **Image optimization:** WebP generation + responsive variants via:
	- `npm run optimize:images`
	- source: `src/assets/*`
	- output: `public/optimized/*-(640|960|1280).webp`
- **Responsive loading:** key hero/product images now use `srcSet` and `sizes`.
- **Font loading:** Google Fonts already configured with `display=swap` in `index.html`.
- **GA4 integration:** env-gated SPA page tracking implemented.
	- set `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
	- bootstrapped in `src/main.tsx`
	- route tracking via `src/components/AnalyticsTracker.tsx`

## SEO Implementation Guide

### What is already implemented

- **Per-page metadata:** major routes define `PageMeta` with title, description, canonical, OG type, and keywords.
- **Fallback route metadata:** shared fallback metadata is handled in the app shell for resilience.
- **Open Graph baseline:** metadata pipeline supports social sharing tags through `PageMeta`.
- **Accessibility SEO foundations:** semantic headings, alt text usage in primary flows, and keyboard-visible focus states.

### Recommended metadata standard per route

For every indexable route, keep these fields unique and intentional:

- `title`: 50-60 chars target
- `description`: 140-160 chars target
- `canonicalUrl`: absolute HTTPS URL
- `keywords`: concise and non-spammy (supporting signal only)
- `ogType`: use `website` for content pages, `product` for product/aroma detail pages

### Structured data roadmap (JSON-LD)

Recommended next enhancement:

1. Add `Product` schema for product detail pages
2. Add `BreadcrumbList` schema for nested routes
3. Add `Organization` schema globally

Validation workflow:

- Google Rich Results Test
- Schema.org validator
- Search Console enhancements report

### Robots, crawl, and indexing checklist

- Keep `public/robots.txt` aligned with production crawl policy
- Ensure canonical points to one preferred URL per page
- Use `noindex` only on private/session routes if needed
- Keep redirect rules single-hop (avoid redirect chains)

### SEO QA checklist (release gate)

- All indexable routes have unique title + description
- Canonical URLs are absolute and correct by segment
- OG tags produce correct preview cards
- Structured data (when added) validates without critical errors
- Lighthouse SEO score >= 95 on representative pages

## CDN & Edge Delivery Guide

### Target architecture

- **Static assets:** serve `dist/assets/*`, `public/optimized/*`, and `public/sample-images/*` via CDN edge cache
- **HTML entry (`index.html`):** short cache TTL with revalidation
- **Fingerprinted bundles:** long immutable caching

### Recommended cache policy

- `index.html`: `Cache-Control: public, max-age=300, must-revalidate`
- Fingerprinted JS/CSS/images: `Cache-Control: public, max-age=31536000, immutable`
- API responses: set separately by backend (do not reuse static policy)

### Compression & transport

- Enable Brotli + gzip at edge
- Force HTTPS and HTTP/2 or HTTP/3
- Enable TLS 1.2+ only

### Image delivery strategy

- Keep WebP variants generated with `npm run optimize:images`
- Prefer responsive `srcSet` and `sizes` for large hero/catalog imagery
- Optionally add AVIF derivatives for further payload reduction

### CDN invalidation strategy

- Fingerprinted files: no purge needed (new filename per build)
- `index.html` and non-fingerprinted assets: purge on release
- Rollback: repoint deploy alias/environment to prior release artifact

## Observability, Analytics, and Consent

- GA4 is env-gated (`VITE_GA_MEASUREMENT_ID`)
- Verify pageview events on route transitions before release
- If required by region, add cookie consent gating before analytics init
- Track key events next: `view_item`, `add_to_cart`, `begin_checkout`, `login`, `generate_lead`

## Security & Production Hardening

Frontend-ready controls:

- Strict HTTPS everywhere
- Avoid inline script drift unless CSP policy updated
- Validate all user input via form schemas

Backend/infrastructure-required controls:

- CORS origin allowlist and preflight policy
- Secure auth token lifecycle (rotation/expiry/storage)
- Rate limiting + abuse protection on public forms/APIs

### Recommended HTTP security headers (edge/server)

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `X-Frame-Options: DENY` (or CSP `frame-ancestors`)

## Deployment Runbook (Quick)

1. `npm ci`
2. `npm run optimize:images`
3. `npm run build`
4. Deploy `dist/*` to hosting/CDN origin
5. Apply cache rules (HTML short TTL, hashed assets immutable)
6. Purge HTML cache
7. Run smoke checks (core routes, metadata, analytics, checkout flow)

## Local development

```powershell
npm install
npm run dev
```

Production build:

```powershell
npm run build
```

## App architecture

The app is split into two core experience segments:

- **B2C (Shop):** `/shop/*`
	- Home, Products, Product Detail, Aromas, Cart/Checkout, Contact, Login, Dashboard
- **B2B (Business):** `/business/*`
	- Home, Why Scent Marketing, Solutions (+ vertical pages), Products, Product Detail, Aromas, Contact, Login, Dashboard

Shared pages/components are reused across segments where appropriate. Legacy routes are redirected to the new segmented paths in `src/App.tsx`.

## Design system notes

Recent redesign work introduced:

- **Neo-heritage visual direction** (editorial typography + modern surfaces)
- **Segment-aware accents** via `body[data-segment]` managed in `src/components/AppLayout.tsx`
- **Updated global tokens/utilities** in `src/index.css`
- **Font stack refresh** configured through `index.html` and `tailwind.config.ts`
- **Motion primitives** (subtle reveal/float animations) for premium UI transitions
- **Atmospheric texture layers** for diffuser/oil mood (smoke, sparkle, oil-ring patterns)

### Color palette

Light mode (navy + gold + titanium):

- **Primary:** `#050058` (`242 96% 17%`) - navigation, buttons, headings
- **Secondary:** `#000182` (`240 100% 25%`) - gradients, hover states, deep surfaces
- **Background:** `#FFFFF0` (`60 100% 97%`) - page base
- **Cards:** `#FFFFFF` (`0 0% 100%`) - cards and inputs
- **Accent:** `#CE9B01` (`45 99% 41%`) - CTAs and highlights
- **Titanium support tone:** cool metallic neutral used in borders and overlays

Dark mode:

- **Background:** `242 80% 6%`
- **Cards:** `242 70% 10%`
- **Primary:** `240 80% 60%`
- **Accent:** `45 99% 45%`
- **Titanium support tone:** muted metallic neutral for outlines and depth

Key utility patterns used across redesigned pages include classes such as:

- `bg-loom`
- `bg-grid-fade`
- `surface-glass`
- `bg-diffuser-atmosphere`
- `bg-smoke-texture`
- `bg-sparkle-texture`
- `bg-oil-texture`

### Hero texture pattern

Primary hero sections now use a layered atmospheric treatment:

1. `bg-oil-texture` on the hero section container
2. `bg-grid-fade` overlay for structural depth
3. `bg-smoke-texture` overlay for diffuser plume ambience
4. `bg-sparkle-texture` overlay for premium aromatic highlights

Applied to:

- `src/pages/shop/ShopHome.tsx`
- `src/pages/business/BusinessHome.tsx`
- `src/pages/Solutions.tsx`
- `src/pages/SolutionsHospitality.tsx`
- `src/pages/SolutionsRetail.tsx`
- `src/pages/SolutionsCorporate.tsx`
- `src/pages/SolutionsWellness.tsx`

## Redesign coverage

The following areas are now aligned with the new experience language:

- Navigation and shared shell
- Footer and segment switcher
- Shop and business home pages
- Products, aromas, contact flows (both segments)
- Solutions and industry solution pages
- About page and Why Scent Marketing page
- Dashboard shell + dashboard module visual alignment

## Phase 1 status (started)

Phase 1 quick-win work is now in progress with the following delivered:

- **Dark mode visibility correction:** global dark palette tuned for better readability and contrast in all pages (`src/index.css`).
- **Image optimization pipeline:** WebP conversion and responsive image variants available (`scripts/optimize-images.mjs`).
- **Analytics foundation:** GA4 route tracking integrated behind env configuration (`VITE_GA_MEASUREMENT_ID`).
- **SEO metadata coverage:** fallback route metadata added for pages that did not previously define `PageMeta` (`src/components/AppLayout.tsx`).
- **SEO metadata hardening:** explicit page-level `PageMeta` added across shop/business/dashboard pages, with fallback coverage retained in `src/components/AppLayout.tsx`.
- **Loading skeletons:** lazy-route fallback upgraded from spinner to structured skeleton layout (`src/App.tsx`).

### Sample image pack

Added visual sample assets for diffuser and aroma experiences in:

- `public/sample-images/diffuser-compact.svg`
- `public/sample-images/diffuser-pro.svg`
- `public/sample-images/diffuser-elite.svg`
- `public/sample-images/aroma-gold.svg`
- `public/sample-images/aroma-ocean.svg`
- `public/sample-images/aroma-lavender.svg`
- `public/sample-images/aroma-citrus.svg`
- `public/sample-images/aroma-wood.svg`

Wired into:

- `src/data/productData.ts` (featured cold-air products and detail galleries)
- `src/data/aromaData.ts` (fragrance cards and aroma listings)

### Caution items addressed

- **Meta Tags caution:** improved from basic/static defaults to route-aware fallback metadata coverage.
- **Dark mode visibility caution:** corrected with lighter dark surfaces, stronger outline contrast, and clearer card/input separation.

### Caution items requiring backend/integration work

- **CORS configuration:** requires API/server environment setup.
- **Auth token hardening:** requires authentication backend and secure token lifecycle implementation.

## Project notes

- If lockfile dependencies drift after branch merges, run `npm install` to regenerate `package-lock.json`.
- This repository currently uses mocked data in several dashboard/business modules and is ready for API wiring.

