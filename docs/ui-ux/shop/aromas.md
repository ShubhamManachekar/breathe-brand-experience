# Shop Aromas (Listing)

## Overview
The **Aroma Library** page allows users to browse oils by fragrance family (Citrus, Floral, Woody, etc.). It emphasizes mood and scent notes.

**Route:** `/shop/aromas`

---

## Layout Structure

### 1. Neo Hero (Compact)
-   **Headline:** "Curated to evoke emotion and memory."
-   **Texture:** 'loom' background.

### 2. Filter Bar (Sticky)
-   **Similar to Products:** Sticky glass bar.
-   **Categories:** Citrus, Floral, Woody, Fresh, Oriental, Gourmand.

### 3. Aroma Grid
-   **Cards:**
    -   **Visual:** Bottle image on a colored gradient background (derived from family color).
    -   **Intensity Badge:** Top-right (e.g., "High").
    -   **Info:** Name, Family (with color dot), "Mood" quote.
    -   **Notes:** Tags for top notes (e.g., "Lemon", "Bergamot").
    -   **Price:** "Starts at ₹..."

---

## Color Logic
-   **Fragrance Families:** Each family has a specific Tailwind color class:
    -   Citrus: Yellow/Orange
    -   Floral: Pink/Rose
    -   Woody: Brown/Tan
    -   Fresh: Blue/Teal
    -   Oriental: Red/Spice
-   **Gradients:** Backgrounds use `from-{color}-100 to-{color}-50`.

## Interactions
-   **Quick Add:** Adds the default size (100ml) to cart immediately.
