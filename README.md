# 🐳 LLMOps – Healthcare App

### 🧪 Local Docker Testing Branch

This branch focuses on **containerising** the Healthcare App and **testing it locally** using Docker.
The goal is to verify that the combined **Next.js frontend + FastAPI backend** works correctly inside a single container before pushing images to **Amazon ECR** and deploying with **AWS App Runner** in later stages.

With this stage complete, you will be able to:

* Build a production-grade Docker image
* Run the container locally on port `8000`
* Serve the static Next.js frontend from FastAPI
* Exercise the full consultation workflow end-to-end in Docker

## 🧩 Overview

This branch introduces:

* A **multi-stage Dockerfile** that:

  * Builds the Next.js frontend as a static export
  * Packages the FastAPI backend (`api/server.py`)
  * Serves everything from a Python 3.12 slim image

* A `.dockerignore` to keep the image lean

* A local workflow for:

  * Loading environment variables
  * Building the Docker image
  * Running and testing the app at `http://localhost:8000`

<div align="center">
  <img src="img/app/notes_generation.gif" width="100%" alt="Consultation Notes Generation Demo">
</div>

## 🧱 Step 1 – Create the Dockerfile

Create a file named `Dockerfile` in the **project root**:

```dockerfile
# Stage 1: Build the Next.js static files
FROM node:22-alpine AS frontend-builder

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
RUN npm ci

# Copy all frontend files
COPY . .

# Build argument for Clerk public key
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Build the Next.js app (creates 'out' directory with static files)
RUN npm run build

# Stage 2: Create the final Python container
FROM python:3.12-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI server
COPY api/server.py .

# Copy the Next.js static export from builder stage
COPY --from=frontend-builder /app/out ./static

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# Expose port 8000 (FastAPI will serve everything)
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

This produces a single container that:

* Hosts the **static Next.js frontend** from `/app/static`
* Serves the **FastAPI API** from `server.py` on port `8000`
* Exposes `/health` for health checks

## 🧹 Step 2 – Create `.dockerignore`

Create `.dockerignore` in the project root:

```text
node_modules
.next
.env
.env.local
.git
.gitignore
README.md
.DS_Store
*.log
.vercel
dist
build
```

## 🧪 Step 3 – Load Environment Variables

Ensure `.env` contains:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_JWKS_URL=https://...
OPENAI_API_KEY=sk-proj-...
DEFAULT_AWS_REGION=us-east-1
AWS_ACCOUNT_ID=123456789012
```

### Mac / Linux

```bash
export $(cat .env | grep -v '^#' | xargs)
```

### Windows PowerShell

```powershell
Get-Content .env | ForEach-Object {
    if ($_ -match '^(.+?)=(.+)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}
```

## 🧱 Step 4 – Build the Docker Image

### Mac / Linux

```bash
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
  -t consultation-app .
```

### Windows PowerShell

```powershell
docker build `
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" `
  -t consultation-app .
```

## 🏃 Step 5 – Run the Container Locally

### Option A – Env vars manually

```powershell
docker run -p 8000:8000 `
  -e CLERK_SECRET_KEY="$env:CLERK_SECRET_KEY" `
  -e CLERK_JWKS_URL="$env:CLERK_JWKS_URL" `
  -e OPENAI_API_KEY="$env:OPENAI_API_KEY" `
  consultation-app
```

### Option B – Use `.env` file

```powershell
docker run -p 8000:8000 --env-file .env consultation-app
```

## 🧪 Step 6 – Test the Application

1. Open:
   `http://localhost:8000`
2. Sign in via Clerk
3. Submit a consultation
4. Confirm:

   * Markdown renders correctly
   * Sections appear cleanly
   * Streaming works smoothly

Stop the container with **Ctrl + C**.

## ✅ Completion Checklist

| Component              | Description                                 | Status |
| ---------------------- | ------------------------------------------- | :----: |
| Dockerfile Created     | Multi-stage Node + Python image             |    ✅   |
| `.dockerignore` Added  | Unnecessary files excluded                  |    ✅   |
| Env Vars Loaded        | Clerk, OpenAI, AWS vars available to Docker |    ✅   |
| Image Built            | `consultation-app` built successfully       |    ✅   |
| Container Running      | Available at `localhost:8000`               |    ✅   |
| End-to-End Flow Tested | Consultation workflow verified in Docker    |    ✅   |

If you'd like, we can move on to the **ECR setup branch** next.
