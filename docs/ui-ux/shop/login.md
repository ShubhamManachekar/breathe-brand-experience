# Shop Login

## Overview
The authentication entry point for B2C users. It features a split-screen layout with a branding side and a form side.

**Route:** `/shop/login`

---

## Layout Structure

### 1. Visual Side (Left - Desktop Only)
-   **Background:** `bg-muted` with `bg-loom` texture overlay.
-   **Decor:** Floating glass orbs (`animate-float-slow`).
-   **Content:** "Welcome to your sanctuary" headline.
-   **Navigation:** "Back to Shop" link.

### 2. Form Side (Right)
-   **Header:** Icon + "Welcome back" / "Create account".
-   **Demo Login:** Quick-access button to login as "Priya Sharma" (Demo User).
-   **Form:**
    -   **Toggle:** Switch between Login/Signup.
    -   **Fields:** Name (Signup only), Email, Password (with visibility toggle).
    -   **Action:** Primary rounded button.
-   **Footer:** Link to Business Portal.

---

## Interactions
-   **Toggle Mode:** Swaps form fields and button text.
-   **Password Visibility:** Eye icon toggles input type.
-   **Demo Login:** Instantly authenticates and redirects to dashboard.
