# Versioning Policy

Last Updated: February 18, 2026

## Versioning Standard

This project uses Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`.

- **MAJOR**: breaking changes, architecture shifts, major redesigns
- **MINOR**: backward-compatible feature additions
- **PATCH**: backward-compatible fixes, docs-only fixes, small improvements

## Current Baseline

- Current release target: `2.0.0`
- Rationale: major UX redesign, route architecture hardening, metadata/analytics/performance upgrades, docs overhaul

## Release Types

### Patch (`x.y.Z`)

Use for:
- bug fixes
- docs corrections
- non-breaking style/performance tweaks

### Minor (`x.Y.z`)

Use for:
- new features that do not break existing behavior
- additional pages/modules
- new analytics events (backward compatible)

### Major (`X.y.z`)

Use for:
- route or API contract breakage
- significant design/system migration
- removal of previously supported behavior

## Tagging Convention

- Git tag format: `vMAJOR.MINOR.PATCH`
- Example: `v2.0.0`

## Release Artifacts

Each release should include:
1. Updated `package.json` version
2. Updated `package-lock.json` version
3. `CHANGELOG.md` entry
4. Git tag pushed to remote

## Changelog Convention

Use Keep a Changelog style sections per release:
- Added
- Changed
- Fixed
- Removed
- Security

## Suggested Workflow

1. Complete feature/fix work
2. Update docs and changelog
3. Bump version
4. Build and validate
5. Commit with release message
6. Push branch + tag

## Ownership

- Engineering lead approves version bump level
- Product owner confirms release scope
- DevOps confirms deployment readiness
