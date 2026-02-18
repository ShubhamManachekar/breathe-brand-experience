# Security Hardening Guide

Last Updated: February 18, 2026

## Scope

This guide covers frontend and deployment-surface controls relevant to this repository.

## Current Frontend Controls

- React output encoding helps reduce XSS risk for rendered content
- Form validation with schema checks in interactive flows
- HTTPS-required deployment posture

## Required Infrastructure Controls

- CORS origin allowlist and strict methods/headers policy
- Auth token lifecycle strategy (expiry, rotation, storage model)
- API rate limiting and abuse controls

## Recommended Security Headers

Set at edge/server layer:
- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `X-Frame-Options` (or CSP `frame-ancestors`)

## CSP Guidance

- Start with report-only policy if introducing CSP incrementally
- Explicitly allow required analytics and font origins
- Minimize `unsafe-inline` and `unsafe-eval`
- Track violations and tighten over time

## Authentication and Session Guidance

- Prefer HttpOnly cookies where architecture allows
- If token storage is required in client context, use shortest practical TTL and rotation
- Ensure logout invalidates server-side session context where applicable

## Secrets and Environment Hygiene

- Never commit production secrets to source control
- Keep env values separated by environment (dev/staging/prod)
- Audit exposed build-time variables regularly

## Security QA Checklist

Before release:
- Validate security headers on deployed routes
- Confirm HTTPS redirect behavior
- Verify CORS behavior for expected origins only
- Verify no sensitive debug data in client logs

After release:
- Review WAF/CDN security events
- Monitor unusual error spikes
- Track auth/session-related anomalies
