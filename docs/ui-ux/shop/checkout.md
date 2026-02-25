# Shop Checkout

## Overview
A multi-step checkout process designed for trust and ease. It simulates a payment flow for demonstration purposes.

**Route:** `/shop/checkout`

---

## Layout Structure

### 1. Progress Stepper
-   **Steps:** Shipping -> Payment -> Confirmation.
-   **Visuals:** Horizontal bar with labeled icons. Active step is highlighted (`text-primary`).

### 2. Step 1: Shipping Form
-   **Fields:** Name, Email, Phone, Address, City, State, PIN.
-   **Card:** "Gradient Card" style (`shadow-elegant`).
-   **Navigation:** "Back to Cart", "Continue to Payment".

### 3. Step 2: Payment
-   **Security Banner:** "Secure Payment" badge.
-   **Fields:** Card Number, Expiry, CVV.
-   **Note:** Disclaimer that this is a demo.
-   **Action:** "Pay ₹..." button (shows processing state).

### 4. Step 3: Confirmation
-   **Visuals:** Large animated CheckCircle icon.
-   **Content:** Order ID, Thank you message, Shipping summary.
-   **Actions:** "Continue Shopping", "View My Orders".

### 5. Order Summary (Right Column)
-   **Visibility:** Hidden on Confirmation step.
-   **Content:** List of items (mini thumbnails), cost breakdown.
-   **Trust Badges:** "Free shipping above ₹2,000", "30-day returns".

---

## Interactions
-   **Form Validation:** Required fields checked on submit.
-   **Processing:** Mock 2-second delay on payment button with "Processing..." text.
-   **Scroll:** Auto-scroll to top on step change.
