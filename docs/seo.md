# SEO Guide

Last Updated: February 18, 2026

## Objectives

- Maximize discoverability for B2B and B2C intent queries
- Keep metadata quality consistent across routes
- Prevent duplicate indexing and canonical conflicts
- Improve rich results readiness with structured data

## Current Implementation

Implemented in app:
- Page-level metadata via `PageMeta`
- Fallback route metadata for resilience
- Canonical URL support on key pages
- Open Graph baseline through metadata component
- Accessibility foundations (semantic headings, alt text on primary flows)

## Metadata Standard (Per Indexable Route)

Required:
- Title: 50-60 characters, unique, includes route intent
- Description: 140-160 characters, action-oriented, unique
- Canonical: absolute HTTPS URL, one preferred URL per page
- OG Type: `website` for informational pages, `product` for catalog/detail pages

Recommended:
- Keywords: concise supporting terms (do not stuff)
- Route-level social image mapping for high-impact pages

## Canonical Rules

- Use a single canonical for each content-equivalent page
- Avoid canonicalizing login/checkout private flows unless intentionally indexable
- Ensure redirects align with canonical destination
- Keep canonical URLs segment-correct (`/shop/*` vs `/business/*`)

## Indexing Controls

- `robots.txt` should match deployment environment policy
- Use `noindex` for private or session-dependent pages if required
- Keep redirect chains single-hop
- Avoid orphan pages by linking from sitemap/navigation

## Structured Data Roadmap

Priority sequence:
1. `Organization` schema at app/global level
2. `BreadcrumbList` on hierarchical pages
3. `Product` schema on product detail pages
4. Optional: `FAQPage` on support/FAQ-heavy pages

Validation tools:
- Google Rich Results Test
- Schema.org Validator
- Google Search Console (Enhancements)

## SEO QA Release Gate

Pre-release checks:
- Each indexable page has unique title + description
- Canonical is absolute and points to final URL
- OG tags render correct card preview
- No accidental `noindex` or blocked crawl paths
- Lighthouse SEO target: >= 95 on representative pages

Post-release checks:
- Search Console coverage and enhancement reports
- Core route indexing health
- CTR and impression trends on top landing pages

## KPIs

- Organic sessions by segment (shop/business)
- Non-brand impressions and clicks
- Average position for priority keywords
- CTR on top landing pages
- Indexed pages vs submitted pages
