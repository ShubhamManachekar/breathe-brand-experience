# Shop Dashboard (Customer)

## Overview
A centralized command center for B2C customers to manage their devices, subscriptions, and orders.

**Route:** `/shop/dashboard`

---

## Layout Structure

### 1. Sidebar (Persistent)
-   **State:** Collapsible on Desktop, Sheet on Mobile.
-   **Menu:** Overview, Diffusers, Orders, Aroma Oils, Subscription, Support, Settings.
-   **Footer:** User Profile, Theme Toggle, Sign Out.

### 2. Overview Panel
-   **Header:** "Welcome back, [Name]". Status indicator (System Operational).
-   **Stats Grid:**
    -   Active Diffusers (Online status).
    -   Pending Orders.
    -   Subscription Progress (Completed/Total months).
    -   Open Tickets.
-   **Active Scents Card:** Shows current oil rotation per device.
-   **Recent Orders Table:** Quick view of last 3 orders with status badges.

### 3. Subscription Management
-   **Visual:** Progress bar showing plan usage.
-   **Action:** "Selection Required" alert for upcoming months.

### 4. Devices Panel
-   **List:** Card per device.
-   **Controls:** Intensity slider, Schedule toggle, Online/Offline status.

---

## Interactions
-   **Navigation:** Client-side routing between dashboard sections without page reload.
-   **Theme Toggle:** Switches entire app to Dark/Light mode instantly.
