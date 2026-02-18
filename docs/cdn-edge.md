# CDN & Edge Delivery Guide

Last Updated: February 18, 2026

## Goals

- Reduce latency through edge caching
- Improve cache-hit ratio for static assets
- Minimize risk during deployments and rollbacks

## Asset Classes

1. HTML entry (`index.html`)
2. Fingerprinted bundles (`dist/assets/*`)
3. Optimized images (`public/optimized/*`)
4. Static sample media (`public/sample-images/*`)
5. API traffic (separate backend policy)

## Recommended Cache-Control Policies

- HTML:
  - `Cache-Control: public, max-age=300, must-revalidate`
- Fingerprinted JS/CSS:
  - `Cache-Control: public, max-age=31536000, immutable`
- Optimized image variants:
  - `Cache-Control: public, max-age=31536000, immutable`
- Non-fingerprinted static files:
  - Moderate TTL + purge on update

## Compression and Transport

Enable at edge:
- Brotli and gzip
- HTTPS only
- HTTP/2 or HTTP/3
- TLS 1.2+ minimum

## Invalidation Strategy

- Fingerprinted files: no purge needed (new file names per build)
- HTML and non-fingerprinted assets: purge on release
- Emergency rollback: shift traffic to prior stable artifact/release alias

## Routing / SPA Behavior

- Ensure edge/server rewrite sends unknown app routes to `index.html`
- Exclude API paths from SPA rewrite rules
- Preserve status codes for real static misses when required by hosting model

## Verification Checklist

After deployment, verify:
- Cache headers match policy by resource type
- Compression active for JS/CSS/HTML
- No stale HTML after purge
- Core routes load from edge within expected latency
- Segment paths (`/shop/*`, `/business/*`) resolve correctly

## Monitoring Suggestions

- Cache hit ratio
- Origin fetch rate
- Edge TTFB percentiles (p50/p95)
- Bandwidth by asset class
- 4xx/5xx rates by edge location
