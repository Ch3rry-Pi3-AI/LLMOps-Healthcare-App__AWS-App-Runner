# 🧩 LLMOps – Healthcare App

### ⚙️✨ Application Configuration Branch

This branch configures the **global application setup** for the LLMOps Healthcare App.
It introduces the two core Next.js Pages Router files that define how the entire frontend behaves, loads styles, and integrates authentication.

With this stage complete, the application now has a **fully configured global shell**, ready to host the healthcare consultation form and all UI components that follow.

## 🧩 Overview

This branch updates the files inside the `pages/` directory that control:

* 🌍 **Global layout and rendering**
* 🔐 **Application-wide Clerk authentication**
* 🎨 **CSS and style imports**
* 🧱 **Base HTML document structure**
* 🏗️ **Metadata and page setup**

These foundational elements must be in place before building the interactive healthcare UI.

## 🛠️ What We Implemented

### ✓ 🔐 Global Clerk Authentication (`_app.tsx`)

The entire app is now wrapped with `ClerkProvider`, enabling:

* Secure authentication
* Access to user session data
* Protected API calls

All pages automatically inherit this authentication context.

### ✓ 🎨 Global Stylesheet Configuration

`_app.tsx` now loads:

* The project’s global Tailwind stylesheet
* The `react-datepicker` stylesheet used for selecting clinical visit dates

This ensures consistent theming and clean UI components across all views.

### ✓ 📄 Custom Document Structure (`_document.tsx`)

We defined the application’s base HTML structure, including:

* App title: **Healthcare Consultation Assistant**
* SEO-friendly description
* A consistent HTML layout for all pages

This file runs server-side and sets the foundation for every rendered page.

## 📁 Updated Project Structure

Only the **new files** in this branch are annotated.

```
llmops-healthcare-app/
├── api/
│   └── server.py
├── pages/
│   ├── _app.tsx        # NEW: Global App wrapper (ClerkProvider + global styles)
│   ├── _document.tsx   # NEW: Custom HTML document structure + metadata
│   └── index.tsx
├── public/
├── styles/
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🩻 Why This Configuration Matters

This setup ensures:

* 🔐 **Authentication works everywhere**
* 🎨 **Global CSS and component styles are consistently applied**
* 🧠 **Metadata and document structure remain uniform**
* 📡 **The frontend is prepared for SSE streaming and Markdown output**
* 🧩 **The next UI components can rely on a stable global foundation**

With this branch complete, the frontend is structurally ready for real functionality.