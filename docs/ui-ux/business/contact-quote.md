# Contact & Quote Request

## Overview
The primary lead generation engine. A smart form that adapts based on user selection (Bundle Builder).

**Route:** `/business/contact`

---

## Layout Structure

### 1. Hero
-   **Headline:** "Build a scent program tailored to your space."

### 2. Main Form Container (Split Layout)
-   **Left (Form):**
    -   **Bundle Builder:** If a product was selected, it appears here as a summary card with quantity controls.
    -   **Smart Suggestions:** "Recommended oils to pair" (if diffuser selected) or vice versa. One-click add.
    -   **Fields:** Name, Work Email, Phone, Role, Company, Industry, Space Size, Timeline, Budget.
    -   **Action:** "Request Custom Quote".
-   **Right (Sidebar):**
    -   **Contact Info:** Phone, Email, Address.
    -   **Quote Summary:** Live breakdown of selected items.
    -   **Fallback:** "Browse our solutions" links if no items selected.

### 3. Success State
-   **Visual:** Overlay with CheckCircle icon.
-   **Message:** "Request received. Our team will reach out within 24 hours."

---

## Interactions
-   **Bundle Logic:** Adding/removing items updates the sidebar summary and the "Interest" text field.
-   **Smart Pairings:** Context-aware suggestions based on current selection.
