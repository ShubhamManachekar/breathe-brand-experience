# Navigation & Global Elements

## Overview
The application features a split navigation system to cater to two distinct user journeys:
1.  **Shop (B2C)**: Focused on discovery, visual appeal, and quick checkout.
2.  **Business (B2B)**: Focused on solutions, trust, and lead generation (quotes).

A global `SegmentSwitcher` allows users to toggle between these contexts.

---

## 1. Shop Navigation
**Component:** `src/components/ShopNavigation.tsx`

### Layout
-   **Style:** Floating "pill" design with glassmorphism (`backdrop-blur-2xl`, `bg-background/80`).
-   **Position:** Fixed at top (`top-0`, `z-50`).
-   **Responsive:**
    -   **Desktop:** Centered links, right-aligned actions (Cart, Account, Theme).
    -   **Mobile:** Hamburger menu triggers a full-width dropdown card.

### Key Elements
-   **Logo:** Organic rounded square icon ("E") + Text "EZE AirCare" with "Refined Living" tagline.
-   **Links:** Home, Diffusers, Aroma Oils, Support.
    -   *State:* Active link gets `bg-background` + shadow; inactive are `text-muted-foreground`.
-   **Actions:**
    -   **ThemeToggle:** Sun/Moon icon.
    -   **SegmentSwitcher:** Toggle between Shop/Business.
    -   **Cart:** Pill button with item count badge.
    -   **User:** Icon for login/dashboard.

### Interactions
-   **Scroll:** `ScrollProgress` bar at the very top.
-   **Hover:** Links have a subtle background fade (`hover:bg-white/40`).
-   **Mobile Menu:** smooth transition (`max-h`, `opacity`) reveal.

---

## 2. Business Navigation
**Component:** `src/components/BusinessNavigation.tsx`

### Layout
-   **Style:** Identical structure to Shop (Floating pill) to maintain brand consistency, but with different content.
-   **Position:** Fixed at top.

### Key Elements
-   **Logo:** Same icon, but tagline changes to "Enterprise".
-   **Links:** Home, Scent Marketing, Solutions (Dropdown), Products, Aroma Library.
    -   **Mega Menu (Solutions):** Hovering "Solutions" reveals a card with:
        -   Hospitality (Hotels & Spas)
        -   Retail (Stores & Malls)
        -   Corporate (Offices)
        -   Wellness (Healthcare)
-   **Actions:**
    -   **CTA:** "Request Demo" (Primary Button) instead of Cart.
    -   **Login:** "Business Login".

### Interactions
-   **Dropdown:** Hover-triggered mega-menu with `opacity` and `transform` transitions.
-   **CTA:** Hover effect `translate-y` lift.

---

## 3. Segment Switcher
**Component:** `src/components/SegmentSwitcher.tsx`

-   **Purpose:** Global toggle to switch contexts.
-   **Design:** Small pill container with two segments: "Shop" (Bag icon) and "Business" (Building icon).
-   **Logic:**
    -   Auto-detects active segment based on URL path (`/shop` vs `/business`).
    -   Active segment is highlighted with `bg-foreground` (reversed contrast).

---

## 4. Footer
**Component:** `src/components/Footer.tsx`

### Layout
-   **Structure:** 4-column grid on Desktop, stacked on Mobile.
-   **Visuals:** Glassmorphic container for the "Call to Action" banner, followed by links.

### Context Awareness
The footer adapts its content based on the current route:
-   **Shop Mode:**
    -   *CTA:* "Start shopping" -> `/shop/products`
    -   *Links:* Diffusers, Aroma Oils, Cart, Support.
    -   *Contact:* `support@ezeaircare.com`
-   **Business Mode:**
    -   *CTA:* "Request a demo" -> `/business/contact`
    -   *Links:* Hospitality, Retail, Corporate, Wellness.
    -   *Contact:* `hello@ezeaircare.com`

### Global Elements
-   **Social Links:** Instagram, LinkedIn, Twitter, Facebook.
-   **Newsletter:** Email input with "hero" variant button.
-   **Legal:** Privacy, Terms, Cookies.
-   **Contact Info:** Address (Gurgaon), Phone (+91 98765 43210).

---

## Design System References
-   **Shadows:** `shadow-neo` (soft, elevated).
-   **Blur:** `backdrop-blur-xl` or `2xl`.
-   **Borders:** `border-white/20` (subtle glass border).
-   **Animations:** Transitions on all interactive elements (`duration-300`).
