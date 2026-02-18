# Analytics & Observability Guide

Last Updated: February 18, 2026

## Goals

- Ensure reliable route-level measurement
- Track key commerce and lead-generation actions
- Maintain event quality and governance

## Current Implementation

- GA4 initialization is environment-gated
- SPA pageview tracking on route change is implemented
- Analytics bootstrap occurs in app startup path

## Environment Configuration

- Required variable: `VITE_GA_MEASUREMENT_ID`
- Keep production/staging IDs separated
- Disable measurement in local development unless actively testing

## Event Taxonomy (Recommended)

Core events:
- `view_item`
- `add_to_cart`
- `begin_checkout`
- `login`
- `generate_lead`

Suggested dimensions:
- segment (`shop` / `business`)
- route group (home, product, aroma, checkout, dashboard)
- product category
- campaign/source metadata where applicable

## Data Quality Controls

- Define event contracts before implementation
- Validate payload fields in QA and staging
- Avoid duplicate dispatches on rerenders
- Keep naming consistent across teams

## Privacy and Compliance

- Gate analytics under consent if regional regulations require it
- Avoid transmitting personal sensitive data in event payloads
- Document retention and access policy in analytics workspace

## Observability Checklist

- Monitor frontend errors and route-level failure rates
- Track page load performance for top routes
- Correlate release versions with KPI changes
- Maintain dashboard for acquisition, conversion, and retention funnels

## QA Scenarios

- First page load event
- Client-side route transition event
- Product add-to-cart event
- Checkout start event
- Lead form submission event
