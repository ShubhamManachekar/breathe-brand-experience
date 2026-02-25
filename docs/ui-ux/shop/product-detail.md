# Shop Product Detail

## Overview
The **Product Detail** page (PDP) is the primary conversion point. It features a rich media gallery, detailed specs, reviews, and a sticky "Buy Box".

**Route:** `/shop/products/:model`

---

## Layout Structure

### 1. Navigation
-   **Breadcrumbs:** Home / Products / [Model Name].

### 2. Main Grid (Left: Content, Right: Buy Box)

#### Left Column (Content)
-   **Gallery:**
    -   **Main Image:** Large, interactive (`group-hover:scale-105`).
    -   **Thumbnails:** Row of 4 selectable images.
    -   **Wishlist:** Heart icon button on main image.
-   **Info (Desktop):** Title, Description, Features list.
-   **Use Cases:** "Home Use" vs "Business Use" tags.
-   **Specs:** Technical table (Dimensions, Weight, Coverage). Collapsible "Show All".
-   **Bundle Upsell:** "Frequently Bought Together" section with discounts.
-   **Reviews:** Star breakdown bar charts + Review cards.
-   **Related Products:** Grid of similar items.

#### Right Column (Buy Box - Sticky)
-   **Mobile Header:** Title + Rating (visible only on mobile).
-   **Pricing:** MRP (struck), Selling Price, Discount Badge.
-   **Delivery:** Free Delivery, Estimated dates.
-   **Stock:** "In Stock" pulse indicator.
-   **Quantity:** Plus/Minus counter.
-   **Actions:**
    -   **Add to Cart:** Primary Button.
    -   **Buy Now:** Secondary Outline Button.
-   **Trust:** Wishlist, Share, Warranty icons.

---

## Key Components
-   **AnimatedSection:** Used heavily for reveal effects on scroll.
-   **PageMeta:** Dynamic SEO tags based on product data.
-   **Toaster:** "Added to Cart" feedback with product thumbnail.

## Interactions
-   **Gallery:** Clicking thumbnail updates main image.
-   **Quantity:** Updates local state.
-   **Specs:** "Show All" expands the list.
-   **Bundle:** One-click add of multiple items.
