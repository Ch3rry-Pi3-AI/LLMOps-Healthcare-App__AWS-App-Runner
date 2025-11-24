# 📄 Pages – LLMOps Healthcare App

The `pages/` directory contains the **core Next.js Pages Router files** that configure the global behaviour, layout, and routing of the LLMOps Healthcare App.

This folder now includes both the **global configuration files** and the first **interactive clinical page**, which together form the structural and functional foundation of the application.

These files define:

* 🌍 **Global providers** (Clerk authentication wrapper)
* 🎨 **Global CSS and layout configuration**
* 🧠 **App-wide metadata** (title, description)
* 🩺 **Consultation form UI** (`product.tsx`)
* 🏠 The default homepage placeholder (`index.tsx`) generated during project setup

As the application evolves, additional clinical and administrative pages will be introduced in later branches.

## 📁 File Overview

```
pages/
├── _app.tsx        # Global app wrapper (ClerkProvider + global styles)
├── _document.tsx   # Custom HTML document structure + metadata
├── index.tsx       # Default Next.js homepage (auto-generated placeholder)
└── product.tsx     # NEW: Consultation Form + subscription-protected clinical workflow
```

### `_app.tsx`

Wraps the entire application in **ClerkProvider**, loading authentication context and global styles such as Tailwind and the DatePicker stylesheet.

### `_document.tsx`

Defines the global HTML structure and metadata applied to all pages.
Runs only on the server and ensures consistent document-level layout.

### `index.tsx`

The placeholder landing page created automatically by `create-next-app`.
This will be replaced by a dedicated landing experience in a future branch.

### `product.tsx`

**Newly added in this branch**, this is the main clinical UI used by healthcare professionals.
It provides:

* 🧍 Patient name input
* 📅 Visit date selection
* 📝 Consultation notes textarea
* 🔐 Subscription-gated access via `<Protect />`
* 📡 Real-time AI summary streaming using SSE
* 🧾 Markdown-rendered output of the consultation summary

This file represents the first fully functional user-facing component of the Healthcare App.

## 🚀 Purpose of This Folder

The `pages/` directory governs:

* How the entire app is **initialised**
* Which global providers and styles are applied across all routes
* The layout and metadata of all rendered pages
* The structure and behaviour of each UI route, including the new consultation workflow

Together, these files provide a consistent, secure, and extensible platform for all future healthcare features.