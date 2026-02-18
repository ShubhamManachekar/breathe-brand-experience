# EZE AirCare Documentation Hub

Last Updated: February 18, 2026

This folder contains implementation-focused documentation for engineering, product, QA, and DevOps.

## Document Map

- [Stakeholder Navigation](./stakeholder-navigation.md)
- [Versioning Policy](./versioning.md)
- [SEO Guide](./seo.md)
- [CDN & Edge Delivery Guide](./cdn-edge.md)
- [Performance Guide](./performance.md)
- [Analytics & Observability Guide](./analytics.md)
- [Security Hardening Guide](./security.md)
- [Deployment Runbook](./deployment.md)
- [Operations Checklist](./operations-checklist.md)
- [Changelog](../CHANGELOG.md)

## Scope

The documentation reflects the current frontend architecture in this repository:
- React + TypeScript + Vite SPA
- Segment-based routing (`/shop/*`, `/business/*`)
- Shared metadata via `PageMeta`
- Image optimization pipeline using `scripts/optimize-images.mjs`
- GA4 integration via environment-gated initialization

## Ownership

- Product + Marketing: SEO content quality and metadata copy
- Frontend Engineering: implementation of metadata, tracking, performance budgets
- DevOps/Platform: CDN cache rules, edge compression, security headers
- QA: release gate checks and regression validation

## Change Management

When adding new pages or major features, update at minimum:
1. `seo.md` (metadata + canonical + indexing impact)
2. `analytics.md` (event tracking plan)
3. `deployment.md` (if infrastructure behavior changes)

## Suggested Working Process

1. Build feature branch
2. Update docs in this folder as part of the same PR
3. Validate with the release checklist
4. Deploy and verify runtime metrics
