# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

## [2.1.0] - 2026-02-18

### Added

- **Recommendation engine** (`src/data/recommendations.ts`) with context-aware scoring for oils and diffusers.
- **Product detail page enhancements** (`ProductDetail.tsx`):
  - "Complete Your Setup" — suggests aroma oils with size auto-matched to diffuser coverage.
  - "Frequently Bought Together" — bundle pricing with 10% discount.
  - "You Might Also Like" — related diffusers by category.
- **Cart suggestions** (`ShopCart.tsx`):
  - "Complete Your Setup" — suggests oils when cart contains a diffuser.
  - "You'll Need a Diffuser" — suggests diffusers when cart has only oils.
  - "Bundle & Save 10%" — promotional offer banner.
- **Aroma oil pricing in carousel** (`ShopHome.tsx`) — oil cards now display "from ₹1,200 / 100ml".

### Fixed

- B2B product tile buttons ("Request Quote" / "View in Detail") not visible due to flex layout issue in `Products.tsx`.
- B2C product tile buttons ("Add to Cart" / "View Details") not visible in `ShopProducts.tsx`.

## [2.0.0] - 2026-02-18

### Added

- Full `docs/` documentation hub with guides for SEO, CDN/edge, performance, analytics, security, deployment, operations, and stakeholder navigation.
- New sample visual assets for diffuser and aroma experiences (`public/sample-images/*`).
- Image optimization script and generated responsive WebP assets (`scripts/optimize-images.mjs`, `public/optimized/*`).
- Analytics tracking foundation via GA4 route tracking.
- Shop journey pages and supporting cart context/data modules.

### Changed

- Major redesign and route experience hardening across shop/business/dashboard areas.
- Expanded page-level metadata strategy with fallback coverage.
- Dark mode readability and surface styling adjustments.
- Dashboard diffuser/oil experiences updated with auto-carousel behavior and richer imagery.

### Fixed

- Metadata consistency across major routes.
- Visual consistency for component surfaces and depth.

### Security

- Documentation now includes deployment security header and hardening guidance.

## [Unreleased]

### Added

- _TBD_

### Changed

- _TBD_

### Fixed

- _TBD_

