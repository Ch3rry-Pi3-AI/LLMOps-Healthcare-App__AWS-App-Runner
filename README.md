# ⚙️ Next.js Configuration Update — LLMOps Healthcare App

### 🎯 Purpose of This Branch

This branch introduces a small but essential update to the **Next.js configuration** to ensure the Healthcare App builds and deploys correctly in a **static + serverless hybrid environment** on Vercel.

The change enables:

* Static export of all frontend pages
* Compatibility with Python serverless functions located in `/api`
* Correct handling of images without Next.js optimisation

These adjustments are required before we proceed to the next stage: **integrating Clerk authentication and subscription billing**.


# 🧩 What Was Added

A new file was created:

```
next.config.ts
```

This file configures Next.js to:

* Export static HTML/JS (`output: 'export'`)
* Disable image optimisation (`images.unoptimized: true`)

Both are necessary because the backend runs through Vercel’s Python serverless functions, not through Next.js’ Node runtime.

# 📄 Updated Project Structure

Only the new file is annotated.

```
llmops-healthcare-app/
├── api/
├── img/
│   └── app/
├── pages/
├── public/
├── styles/
├── package.json
├── requirements.txt
└── next.config.ts       # NEW: Configures static export + unoptimized images
```

# 🛠️ next.config.ts — Summary of Behaviour

This branch configures the application to:

* Build correctly using Vercel static export
* Serve images without Next.js’ optimisation server
* Avoid SSR for pages, which is incompatible with the Python backend
* Maintain predictable and efficient deployment behaviour

# 🚀 Completion Checklist

| Component               | Description                                       | Status |
| ----------------------- | ------------------------------------------------- | :----: |
| Next.js Config Added    | `next.config.ts` created                          |    ✅   |
| Static Export Enabled   | `output: 'export'` configured                     |    ✅   |
| Image Optimisation Off  | Required for export mode                          |    ✅   |
| Project Ready for Clerk | Safe to proceed to authentication + billing setup |    ✅   |
