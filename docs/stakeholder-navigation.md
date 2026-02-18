# Stakeholder Navigation

Last Updated: February 18, 2026

This page helps each team quickly find the right documentation path.

## Quick Paths by Team

### Marketing / SEO Team

Start here:
1. [SEO Guide](./seo.md)
2. [Analytics & Observability Guide](./analytics.md)
3. [Operations Checklist](./operations-checklist.md)

Focus areas:
- Metadata quality and route intent alignment
- Canonical correctness and indexing health
- Organic performance and conversion attribution

### Frontend Engineering

Start here:
1. [Performance Guide](./performance.md)
2. [SEO Guide](./seo.md)
3. [Analytics & Observability Guide](./analytics.md)
4. [Security Hardening Guide](./security.md)

Focus areas:
- Route-level performance and bundle discipline
- Metadata consistency for new routes
- Event contract quality and no duplicate event dispatch
- Secure-by-default UI implementation

### DevOps / Platform

Start here:
1. [CDN & Edge Delivery Guide](./cdn-edge.md)
2. [Deployment Runbook](./deployment.md)
3. [Security Hardening Guide](./security.md)
4. [Operations Checklist](./operations-checklist.md)

Focus areas:
- Cache policies by asset type
- Edge compression and transport posture
- Security headers and CORS controls
- Rollback readiness and incident response

### QA Team

Start here:
1. [Operations Checklist](./operations-checklist.md)
2. [SEO Guide](./seo.md)
3. [Analytics & Observability Guide](./analytics.md)
4. [Performance Guide](./performance.md)

Focus areas:
- Release gate completeness
- Metadata and canonical regressions
- Tracking validation across route transitions
- Runtime and UX quality under realistic network/device conditions

### Product / Project Management

Start here:
1. [Documentation Hub](./README.md)
2. [SEO Guide](./seo.md)
3. [Deployment Runbook](./deployment.md)
4. [Operations Checklist](./operations-checklist.md)

Focus areas:
- Prioritization of roadmap vs infra dependencies
- Cross-team release readiness
- KPI alignment (acquisition, conversion, retention)

## Role-Based Release Checklist

### Pre-Release Signoff Matrix

- Marketing: metadata + messaging quality approved
- Frontend: implementation and regression checks completed
- DevOps: deployment, cache, and header policies confirmed
- QA: smoke + scenario validation completed
- Product: release scope and known issues acknowledged

### Post-Release Validation Matrix

- Marketing: search visibility and CTR trend check
- Frontend: client errors and route behavior check
- DevOps: cache hit ratio and edge error check
- QA: conversion path and dashboard flow check
- Product: KPI baseline vs expected impact check

## Suggested Cadence

- Weekly: doc drift review and backlog alignment
- Per release: checklist completion + update docs with any new standards
- Monthly: KPI review and optimization backlog updates
