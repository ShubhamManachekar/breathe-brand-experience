# Business Dashboard (Enterprise)

## Overview
The B2B version of the dashboard, sharing the same underlying structure but with enterprise-focused data contexts.

**Route:** `/business/dashboard`

---

## Layout Structure

### 1. Sidebar
-   **Same structure as Shop**, but context changes:
    -   "Diffusers" -> "Fleet Management".
    -   "Orders" -> "Procurement".

### 2. Overview Panel
-   **Context:** "Partner Portal".
-   **Stats:** Focus on "Fleet Uptime", "Scent Consumption Rate", "Service Visits".

### 3. Fleet Management (Diffusers)
-   **View:** Table/List of multiple devices across locations (e.g., Lobby, Spa, 2nd Floor).
-   **Controls:** Bulk update settings, View connectivity logs.

---

## Technical Note
The dashboard uses a shared `UserDashboard.tsx` component. It dynamically adjusts content based on the user's role (`b2c` vs `b2b`) fetched from Supabase Auth profile.
