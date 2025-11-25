# 📄 Pages – LLMOps Healthcare App

The `pages/` directory contains the **core Next.js Pages Router files** that define the global behaviour, layout, routing, and user-facing interfaces of the LLMOps Healthcare App.

This folder now includes:

* 🌍 **Global configuration files** for layout and authentication
* 🎨 **App-level styling and document structure**
* 🏥 **The main consultation workflow** (`product.tsx`)
* ⭐ **The application landing page** (`index.tsx`)

Together, these files form the foundational UI and routing structure of the healthcare platform.

## 📁 File Overview

```
pages/
├── _app.tsx        # Global app wrapper (ClerkProvider + global styles)
├── _document.tsx   # Custom HTML document structure + metadata
├── index.tsx       # NEW: Landing page for MediNotes Pro
└── product.tsx     # Consultation Form + subscription-protected clinical workflow
```

### `_app.tsx`

Wraps the entire application with **ClerkProvider**, enabling authenticated access across all routes.
Also loads global styles including Tailwind CSS and the React DatePicker stylesheet used in clinical workflows.

### `_document.tsx`

Defines the **base HTML structure**, metadata, and `<Head>` configuration for every page.
Executed only on the server, ensuring the entire application renders consistently.

### `index.tsx`

The **public marketing and landing page** for MediNotes Pro.
It includes:

* 🔐 Adaptive navigation (Sign In / Go to App)
* 🌈 Gradient hero section
* 🧩 Feature highlights
* 💬 Clear calls-to-action
* 🛡️ Trust indicators (HIPAA, security, professionalism)

This is the entry point for both new and returning users.

### `product.tsx`

The primary **clinical consultation interface**, offering:

* 🧍 Patient name entry
* 📅 Visit date picker
* 📝 Consultation notes input
* 📡 Real-time AI summary generation (SSE streaming)
* 🧾 Markdown-rendered output
* 🔐 Subscription-gated access using Clerk’s `<Protect />`

This is the first fully functional, user-facing workflow within the Healthcare App.

## 🚀 Purpose of This Folder

The `pages/` directory governs:

* How the app is **initialised and structured**
* How global providers, layouts, and metadata are applied
* How navigation and routing behave across authenticated and unauthenticated states
* All user-facing pages, from the landing experience to clinical tools

This folder provides the main UI framework upon which the rest of the Healthcare App is built.