# Operations Checklist

Last Updated: February 18, 2026

## Pre-Release

- [ ] Pull latest main and install dependencies
- [ ] Run image optimization pipeline
- [ ] Run production build successfully
- [ ] Confirm metadata and canonical coverage for changed routes
- [ ] Confirm analytics IDs and environment config
- [ ] Confirm CDN cache policy values are ready

## Release

- [ ] Deploy build artifacts to hosting origin
- [ ] Purge HTML cache
- [ ] Verify cache headers on HTML and hashed assets
- [ ] Verify SPA route rewrites
- [ ] Execute smoke test routes for shop + business

## Post-Release (First Hour)

- [ ] Validate pageview analytics flow
- [ ] Validate top conversion events
- [ ] Check edge error rates (4xx/5xx)
- [ ] Check frontend error monitoring
- [ ] Confirm no major Core Web Vitals regression

## Incident / Rollback Trigger Conditions

- Persistent route 404/500 on core routes
- Broken checkout or lead capture path
- Significant analytics outage
- Severe rendering/performance regression

## Rollback Steps

- [ ] Re-point to previous stable release
- [ ] Purge HTML cache
- [ ] Re-run smoke checks
- [ ] Post incident summary with root cause and prevention action
