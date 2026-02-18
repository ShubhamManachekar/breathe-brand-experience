# Performance Guide

Last Updated: February 18, 2026

## Goals

- Improve first-load experience
- Keep interaction fluid on mid-tier devices
- Maintain healthy Core Web Vitals

## Current Foundation

- Route splitting with lazy-loaded pages
- Structured route fallback/skeleton loading
- Image optimization pipeline (`npm run optimize:images`)
- Responsive `srcSet` and `sizes` on key visuals
- Font loading configured with `display=swap`

## Core Web Vitals Targets

- LCP: <= 2.5s (good)
- INP: <= 200ms (good)
- CLS: <= 0.1 (good)

## Build and Asset Budget Suggestions

- Keep large route chunks isolated from common vendor bundle
- Review chunk growth each release
- Prefer optimized media with explicit dimensions to avoid layout shifts
- Avoid shipping unused icon/component imports

## Image Strategy

- Continue WebP generation for source assets
- Add AVIF variants where beneficial
- Use responsive widths for hero and catalog contexts
- Set descriptive alt text for accessibility + SEO support

## JavaScript Strategy

- Lazy-load route-level and heavy feature components
- Defer non-critical analytics/event wiring when possible
- Avoid long tasks in initial render path

## CSS Strategy

- Keep utility classes predictable and avoid ambiguous patterns
- Remove dead styles where practical
- Preserve high-contrast token consistency for readability

## Performance QA Checklist

Before release:
- Run production build
- Validate no new warnings that impact runtime behavior
- Test key pages on throttled network profile
- Confirm LCP/CLS behavior on shop and business home pages

After release:
- Monitor web vitals trend by route
- Compare error budgets and bounce rate shifts
- Track image payload and bundle payload deltas
