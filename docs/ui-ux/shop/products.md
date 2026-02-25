# Shop Products (Listing)

## Overview
The **Shop Products** page lists all available diffusers. It features a filtering system, sorting, and quick-add functionality.

**Route:** `/shop/products`

---

## Layout Structure

### 1. Neo Hero (Compact)
-   **Height:** Shorter than home hero.
-   **Content:** "Scent Systems" label, engineering-focused headline.

### 2. Floating Filter Bar (Sticky)
-   **Position:** Sticky at `top-20` (below nav).
-   **Style:** Glassmorphic pill container.
-   **Filters:** All, Cold-Air, Ultrasonic, Car, Reed.
    -   **State:** Active filter is Solid Black; Inactive is Ghost.

### 3. Product Grid
-   **Layout:** Responsive Grid (1 col mobile -> 4 cols XL).
-   **Cards:**
    -   **Image:** Large centered product image.
    -   **Tags:** "Best Seller" badge (top-left), Rating circle (top-right).
    -   **Quick Add:** "Quick Add" button slides up on hover.
    -   **Info:** Category, Model Name, Features (icon list).
    -   **Footer:** Price + Cart Icon button.

### 4. "Complete the Ritual" (Upsell)
-   **Location:** Bottom of page.
-   **Design:** Large bordered card with `bg-accent/5`.
-   **Action:** Prompts user to visit Aroma Oils page.

---

## Interactions
-   **Filtering:** Client-side filtering updates the grid instantly.
-   **Toast:** "Added to Cart" notification triggers on Quick Add.
-   **Card Hover:** Shadow depth increases (`shadow-neo` -> `shadow-neo-hover`), image zooms.

## Data Integration
-   **Source:** `src/data/productData.ts`
-   **State:** URL query params (`?category=cold-air`) manage filter state.
