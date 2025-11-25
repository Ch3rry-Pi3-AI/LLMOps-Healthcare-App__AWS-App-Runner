# 🔐 LLMOps – Healthcare App

### 🧾 Authentication & Subscription Setup Branch

This branch adds **full Clerk authentication** and **subscription-based access control**, transforming the Healthcare App into a secure, production-ready SaaS platform.
Users can now:

* Sign in using modern authentication providers
* Obtain secure Clerk-issued JWTs
* Access plan-gated clinical features
* Subscribe to premium plans
* Manage billing & subscription settings directly via Clerk

This is the foundation that enables your AI-powered healthcare application to serve real users safely and professionally.

## 🧩 Overview

This combined stage sets up:

### 🔐 1. User Authentication

* Email, Google, GitHub (and optionally Apple) sign-in
* JWT issuance by Clerk
* Backend verification using Clerk **JWKS**
* Secure environment variable configuration

### 💳 2. Subscription & Billing

* A premium plan (`premium_subscription`)
* Subscription purchasing via Clerk Billing
* Automatic access control using:

```tsx
<Protect plan="premium_subscription">
```

* Subscription management through `<UserButton />`

Once complete, only authenticated and subscribed users will access premium clinical functionality.

## 🧑‍💻 Authentication Setup

### Step 1: Create a Clerk Account

1. Go to **clerk.com**
2. Sign up / log in
3. Create a new **Application**

### Step 2: Configure Application Sign-In

Enable:

* Email
* Google
* GitHub
* Apple (optional)

These providers are immediately available through Clerk’s hosted UI components.

### Step 3: Add Authentication Environment Variables

Instead of `.env.local`, all variables now go into **`.env`** (project root):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
CLERK_JWKS_URL=your_jwks_url_here
```

Add `.env` to your `.gitignore`.

### Step 4: Backend JWT Verification (JWKS)

In the Clerk dashboard:

* Configure → API Keys → Copy the **JWKS URL**
* Add it to `.env` as shown above

This allows your FastAPI backend (`server.py`) to validate Clerk-issued JWTs securely and cryptographically.

## 💳 Subscription Setup

### Step 5: Enable Clerk Billing

Navigate to:

* Dashboard → Configure → **Subscription Plans**

Enable Billing.

### Step 6: Create the Premium Subscription Plan

Use the exact plan key:

```
premium_subscription
```

Configure pricing (monthly or annual).
Save the plan.

### Step 7: (Optional) Connect Stripe

If using real payments:

* Billing → Settings → Switch to Stripe

Otherwise, Clerk's built-in billing system works in test mode.

### Step 8: Test Subscription Flow

1. Sign in
2. Go to `/product`
3. If unsubscribed → user sees `<PricingTable />`
4. Subscribe
5. Premium-gated pages unlock instantly

### Step 9: Manage Subscriptions

Users manage subscriptions through:

```
<UserButton />
```

This exposes Clerk’s built-in billing and account-management interface.

## 🧠 How Everything Works Together

### Frontend

* Clerk provides login, signup, and session management
* The UI retrieves a JWT via `getToken()`
* Premium pages are protected using:

```tsx
<Protect plan="premium_subscription">
```

### Backend

* FastAPI (`api/server.py`) validates JWTs using the JWKS URL
* The clinical endpoint `/api/consultation` enforces authenticated access

### Billing

* Clerk handles subscription state
* Stripe (optional) handles real payment processing
* Subscription status is always synced — no backend logic needed

## 🛠️ Troubleshooting

**“Plan not found”**

* Ensure the plan key is **exactly** `premium_subscription`
* Verify Billing is enabled in Clerk

**Pricing table still showing after subscribing**

* Sign out and back in
* Check subscription status in Clerk dashboard

**403 errors from backend**

* Confirm `CLERK_JWKS_URL` in `.env`
* Verify the frontend sends the `Authorization: Bearer <token>` header

## 🧪 Completion Checklist

| Component                       | Description                                     | Status |
| ------------------------------- | ----------------------------------------------- | :----: |
| Authentication Enabled          | Clerk login, JWTs, and env vars configured      |    ✅   |
| Backend JWT Verification Active | FastAPI verifies Clerk tokens via JWKS          |    ✅   |
| Billing Enabled                 | Subscription plans active in Clerk              |    ✅   |
| Premium Plan Created            | `premium_subscription` created and active       |    ✅   |
| Product Page Protected          | `<Protect plan="premium_subscription">` applied |    ✅   |
| PricingTable Fallback Working   | Non-subscribed users see correct upgrade prompt |    ✅   |
| Subscription Upgrade Flow Works | Users can subscribe and gain access instantly   |    ✅   |
| User Subscription Management    | Via `<UserButton />`                            |    ✅   |