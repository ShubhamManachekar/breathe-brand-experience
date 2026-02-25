# Shop Home (Landing)

## Overview
The **Shop Home** page serves as the entry point for B2C customers. It is designed to inspire via lifestyle imagery, introduce the "Refined Living" brand promise, and guide users to product categories (Diffusers and Aroma Oils).

**Route:** `/shop`

---

## Layout Structure

### 1. Neo Hero Section
-   **Component:** `NeoHero` (Variant: 'shop', Texture: 'loom')
-   **Visuals:**
    -   Large lifestyle background image.
    -   **Interactive Graphic:** A floating 2x2 grid of product images (Diffusers & Oils) with `hover:rotate` and parallax effects.
    -   **Headline:** "A modern ritual for every room." with animated gradient text.
-   **Actions:**
    -   Primary: "Shop Diffusers" (Solid Black Pill).
    -   Secondary: "Explore Oils" (Outline Pill).

### 2. Trust Indicators (Pills)
-   **Content:** Free shipping, Warranty, Clean Oils.
-   **Style:** Horizontal scrollable row of pill-shaped badges with icons.

### 3. Decorative Divider
-   **Style:** Gradient lines with a central pulsing star/sparkle (`animate-pulse-gold`).

### 4. Diffuser Showcase (Carousel)
-   **Component:** Auto-scrolling marquee (`animate-marquee`).
-   **Cards:** Large vertical cards (`h-[480px]`).
    -   **Image:** Product on `muted/10` background.
    -   **Hover:** Image scales up, "Quick Add" button slides up from bottom.
    -   **Details:** Model name, Rating badge, Features list.

### 5. Aroma Oil Showcase (Carousel)
-   **Style:** Similar marquee layout but for oils.
-   **Cards:** Square aspect ratio image container.
    -   **Background:** Color-coded gradient based on fragrance family.
    -   **Details:** Mood quote ("Calm", "Energy"), Scent notes tags.

### 6. Scent Discovery (Grid)
-   **Purpose:** Educational categorization.
-   **Grid:** 2x2 or 4x1 cards representing fragrance families (Citrus, Floral, Woody, etc.).
-   **Interaction:** Hover card lifts up, icon scales.

### 7. Concierge CTA (Bottom Banner)
-   **Visuals:** Dark card (`bg-foreground`, text-white) with a glowing background blob.
-   **Action:** "Talk to a consultant" -> `/shop/contact`.

---

## Key Components & Colors
-   **Background:** `bg-background` (Warm White #FCFCFC).
-   **Accent:** `text-accent` (Sage Green #8E9775) used for icons and dividers.
-   **Typography:**
    -   Headlines: `font-display` (Fraunces/Georgia).
    -   Body: `font-body` (Manrope/Sans).

## Interactions
-   **Marquee:** Pauses on hover.
-   **Quick Add:** Button appears only on card hover.
-   **Parallax:** Floating hero images respond to scroll/hover.
