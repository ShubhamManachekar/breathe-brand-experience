# Deployment Runbook

Last Updated: February 18, 2026

## Purpose

Standard deployment process for frontend releases with predictable rollback and verification.

## Prerequisites

- Clean install state (`npm ci` preferred in CI)
- Required environment variables configured
- CDN/hosting credentials and permissions available

## Standard Release Flow

1. Install dependencies
   - `npm ci`
2. Generate optimized images
   - `npm run optimize:images`
3. Build production assets
   - `npm run build`
4. Publish `dist/*` to hosting origin
5. Apply/verify cache policies at CDN edge
6. Purge HTML cache
7. Run smoke checks

## Smoke Check Scope

- Home pages load in both segments
- Core catalog routes load and render metadata
- Cart and checkout flows render correctly
- Dashboard route shell loads (auth-mode as configured)
- No missing static assets in browser console

## Rollback Plan

- Re-point deployment alias/environment to last known stable release
- Purge HTML cache again
- Re-run smoke checks on critical routes
- Log incident notes and root cause

## Release Notes Template

Capture in each release:
- User-facing changes
- SEO/metadata impacts
- CDN/cache policy changes
- Analytics event changes
- Known issues and mitigation

## Deployment Risks

- Stale HTML served after release
- Incorrect SPA rewrites causing 404s on deep links
- Missing env vars for analytics
- Misconfigured cache headers for index vs hashed assets

## Mitigation Controls

- Header verification after deploy
- Targeted route smoke tests
- Canary release (if supported)
- Immediate rollback readiness
