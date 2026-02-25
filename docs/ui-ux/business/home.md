# Business Home (Landing)

## Overview
The **Business Home** page is the B2B storefront. It focuses on ROI, professional trust, case studies, and lead generation for enterprise clients (Hospitality, Retail, Corporate).

**Route:** `/business`

---

## Layout Structure

### 1. Neo Hero (Enterprise)
-   **Variant:** 'business' (Texture: 'oil').
-   **Headline:** "Scent strategy that compounds ROI."
-   **Subheadline:** Focus on "design, deploy, optimize".
-   **Visuals:**
    -   **Card:** "Impact Snapshot" floating card showing live counters (+40% Dwell time, +20% Revenue).
    -   **Decor:** Floating 4.9 Rating badge.
-   **Actions:**
    -   Primary: "Schedule Demo" (Solid).
    -   Secondary: "View Solutions" (Outline).

### 2. Trust Bar
-   **Style:** Minimalist, monochromatic logos.
-   **Content:** Luxe Hotels, Metro Mall, ZenWork, etc.
-   **Interaction:** Logos gain full opacity/color on hover.

### 3. Solutions Grid (Architectural)
-   **Layout:** 4-column grid.
-   **Cards:**
    -   **Icon:** Thin stroke icons (Hotel, ShoppingBag, Briefcase).
    -   **Content:** Title, Tag (e.g., "Hotels & Spas"), Description.
    -   **Interaction:** "Explore ->" link reveals on hover; gradient overlay appears.

### 4. Case Studies (Editorial)
-   **Layout:** Split screen (Sticky Left Text + Scrolling Right Cards).
-   **Left:** "Results" large text overlay, Headline, "View All" button.
-   **Right:** Grid of case study cards.
    -   **Content:** Industry Badge, Big Metric (+40%), Quote, Company Name.

### 5. Engagement Model (Process)
-   **Steps:** Discovery -> Design -> Optimize.
-   **Visuals:** Circular icon containers connected by a faint line (desktop).

### 6. Lead Capture (Bottom Form)
-   **Layout:** Split 50/50 container.
-   **Left (Visual):** `bg-primary` with oil texture. "Let's craft your signature atmosphere."
-   **Right (Form):**
    -   **Fields:** Name, Work Email, Company, Industry (Select).
    -   **Action:** "Request Proposal" (Primary Button).
    -   **Success State:** Replaces form with "Request Received" checkmark.

---

## Design System Notes
-   **Palette:**
    -   Primary: Navy (`bg-primary`, `text-primary`) - conveys trust/authority.
    -   Accent: Gold - used sparingly for high-value metrics.
-   **Typography:**
    -   Headers: Sharp, professional serif.
    -   Data: Monospace or tabular nums for metrics.
