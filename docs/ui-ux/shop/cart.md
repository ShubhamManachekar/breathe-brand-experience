# Shop Cart

## Overview
The **Shopping Cart** page provides a summary of selected items, allowing users to adjust quantities, remove items, and view cost breakdowns before checkout.

**Route:** `/shop/cart`

---

## Layout Structure

### 1. Empty State
-   **Condition:** `items.length === 0`
-   **Content:** Centered icon (ShoppingCart), headline "Your cart is empty", CTA "Start Shopping".

### 2. Cart Items (Left Column)
-   **List:** Vertical stack of cards.
-   **Card Layout:**
    -   **Image:** Thumbnail on `muted/20` background.
    -   **Details:** Name, Variant (e.g., "100ml"), Price.
    -   **Controls:**
        -   **Quantity:** Pill with Minus/Plus buttons.
        -   **Remove:** Trash icon button.

### 3. Order Summary (Right Column / Sticky)
-   **Container:** Glassmorphic card (`backdrop-blur-xl`, `shadow-neo`).
-   **Breakdown:**
    -   Subtotal
    -   Discount (if any)
    -   Shipping (Free/Cost)
    -   **Total:** Large bold text.
-   **Action:** "Proceed to Checkout" (Primary Button).
-   **Trust:** "Secure SSL Encrypted Payment" icon.

### 4. "You might also like" (Upsell)
-   **Location:** Bottom section.
-   **Content:** 4-column grid of suggested diffusers/oils.
-   **Interaction:** "Quick Add" buttons on hover.

---

## Interactions
-   **Quantity Update:** Instant state update (Context).
-   **Remove:** Removes item from list immediately.
-   **Sticky Summary:** Stays in view while scrolling long cart lists on desktop.
