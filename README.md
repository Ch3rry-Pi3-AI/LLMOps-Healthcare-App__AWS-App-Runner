# 🚑 LLMOps – Healthcare App

### 🧠 Project Setup Branch

This branch establishes the **foundational setup** for the **LLMOps Healthcare App**, including environment preparation, project scaffolding, and the backend skeleton.

Once this stage is complete, you’ll have:

* A working **Next.js + Tailwind** frontend
* A **Python (FastAPI) backend skeleton** ready for local development and later deployment to AWS (ECR + App Runner in later branches)
* A project-level `.env` file with your `OPENAI_API_KEY` configured

## ⚡ PROJECT SETUP

### 🧩 Overview

This guide walks you through the full base setup for the **Healthcare App**.
By the end, you will have:

* A Next.js frontend (TS + Tailwind)
* All required npm packages (Markdown rendering, Clerk auth, streaming helpers, date picker)
* A root-level `api/` folder for your Python backend
* A `requirements.txt` for server-side Python code
* A `.env` file containing your `OPENAI_API_KEY` for local development

## 🧱 Step 1: Install Node.js

Install Node.js from [https://nodejs.org/en/download](https://nodejs.org/en/download) and verify:

```bash
node --version
npm --version
```

## 🖥️ Step 2: Create the Next.js Frontend

```bash
npx create-next-app@15.5.6 llmops-healthcare-app --typescript
```

Prompts:

* Linter: **ESLint**
* Tailwind: **y**
* Use `src/`: **n**
* App Router: **n**
* Turbopack: **n**
* Import alias: **n**

## 🧭 Step 3: Open Your Project

Open the project in Cursor (or your preferred editor) → you’ll see the standard Next.js **Pages Router** layout.

## 🧹 Step 4: Remove the Default `pages/api` Folder

Right-click `pages/api` → **Delete**.
The backend for this project will live in a separate root-level `api/` folder (Python FastAPI), not Next.js API routes.

## 🎨 Step 5: Tailwind CSS Basics

Tailwind is already configured by the Next.js setup.
You can immediately start using utility classes like:

```jsx
<div className="min-h-screen bg-slate-100 text-slate-900">
  <h1 className="text-3xl font-bold">LLMOps Healthcare App</h1>
</div>
```

## 📦 Step 6: Install Additional Frontend Dependencies

From the project root:

```bash
npm install react-markdown remark-gfm remark-breaks
npm install @tailwindcss/typography
npm install @clerk/nextjs
npm install @microsoft/fetch-event-source

npm install react-datepicker
npm install --save-dev @types/react-datepicker
```

**Packages explained:**

* **react-markdown / remark-gfm / remark-breaks**
  For medical responses rendered as clean Markdown.

* **@tailwindcss/typography**
  Beautiful, readable medical documentation layouts.

* **@clerk/nextjs**
  Authentication (sign-in, user profiles, subscription tiers).

* **@microsoft/fetch-event-source**
  SSE streaming for real-time model output.

* **react-datepicker** + TypeScript types
  Used for date selection in patient visits / appointment flows.

## 🧬 Step 7: Add the Python Backend Skeleton

### 7.1 Create `api/` Folder

At the project root:

* Right-click → **New Folder → `api`**

### 7.2 Create `api/server`

Inside `api/`, create a file called `server`:

```python
# api/server

from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health_check():
    return {"status": "ok"}
```

This is a simple placeholder for your FastAPI backend.
Later branches will extend this with actual clinical AI endpoints.

### 7.3 Create `requirements.txt`

At the project root, create `requirements.txt`:

```txt
fastapi
uvicorn
openai
fastapi-clerk-auth
pydantic
```

**Package purposes:**

* **fastapi** – Backend framework for clinical AI endpoints
* **uvicorn** – Local ASGI server
* **openai** – Model calls
* **fastapi-clerk-auth** – Auth guard for protected clinical endpoints
* **pydantic** – Request/response validation

## 🔑 Step 8: Configure Your `.env` File (OpenAI API Key)

At the project root, create a file named `.env`:

```env
OPENAI_API_KEY=sk-XXXXXXXXXXXX
```

Notes:

* Replace `sk-XXXXXXXXXXXX` with your real OpenAI API key.
* Do **not** commit this file to Git. Ensure `.gitignore` includes `.env`:

```gitignore
.env
```

The frontend and backend will read `OPENAI_API_KEY` from this `.env` file during local development.
(Deployment to AWS ECR + App Runner will configure environment variables via AWS in later branches.)

## ✅ Completion Checklist

| Component                        | Description                                  | Status |
| -------------------------------- | -------------------------------------------- | :----: |
| Next.js Frontend                 | TypeScript + Tailwind scaffold               |    ✅   |
| Frontend Dependencies Installed  | Markdown, Clerk, SSE, date picker            |    ✅   |
| Python Backend Skeleton          | `api/`, `server`, `requirements.txt`       |    ✅   |
| Environment Variables Configured | `.env` with `OPENAI_API_KEY`                 |    ✅   |
| Git Branch Initialised           | `00_project_setup` branch created            |    ✅   |
| AWS Deployment (Placeholder)     | To be configured in later AWS-focused stages |   🔜   |
