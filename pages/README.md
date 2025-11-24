# 📄 Pages – LLMOps Healthcare App

The `pages/` directory contains the **core Next.js Pages Router files** used to configure the global behaviour, layout, and rendering of the LLMOps Healthcare App.

These files define:

* 🌍 **Global providers** (Clerk authentication wrapper)
* 🎨 **Global CSS and layout configuration**
* 🧠 **App-wide metadata** (title, description)
* 🏠 The default homepage placeholder (`index.tsx`) generated during project setup

While this folder currently contains foundational configuration files, it forms the structural backbone of the application. Future branches will extend it with new UI pages for clinical workflows and interfaces.

## 📁 File Overview

```
pages/
├── _app.tsx        # Global app wrapper (ClerkProvider + global styles)
├── _document.tsx   # Custom HTML document structure + metadata
└── index.tsx       # Default Next.js homepage (auto-generated placeholder)
```

### `_app.tsx`

Wraps the entire app in **ClerkProvider**, loads global styles, and initialises application-level configuration.
All pages inherit behaviour defined here.

### `_document.tsx`

Defines the base HTML structure, page metadata, and ensures global layout consistency.
This file only executes on the server during page rendering.

### `index.tsx`

The default Next.js landing page created by the project scaffolding.
This will be replaced in a future stage when the healthcare UI is introduced.

## 🚀 Purpose of This Folder

The `pages/` directory governs:

* How the entire application is **initialised**
* Which global providers and styles are applied to all components
* How the HTML document is structured and described
* Which routes the app exposes (using the Pages Router)

These configuration files ensure the app’s UI, authentication, and layout behave consistently across all future healthcare features.

## 🧭 Next Steps

In a later branch, the placeholder `index.tsx` will be replaced with a **proper landing page** and eventually the **healthcare consultation UI**.

Let me know when you're ready for that branch!