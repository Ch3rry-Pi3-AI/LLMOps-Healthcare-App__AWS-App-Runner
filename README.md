# 🏥 **LLMOps Healthcare App — Main Project Overview**

The **LLMOps Healthcare App** is a full end-to-end AI application that allows clinicians to enter raw consultation notes and instantly receive:

* A structured **clinical summary**
* **Next-step clinical recommendations**
* A **patient-friendly email draft**
* All generated in real time via **OpenAI GPT-5-Nano**

The system combines:

* ⚛️ **Next.js (Pages Router)** frontend
* 🐍 **FastAPI backend** served inside Docker
* 🔐 **Clerk authentication** (sign-in + JWT verification)
* 📡 **Server-Sent Events (SSE)** for live token streaming
* 🧰 **Docker packaging**
* ☁️ **AWS ECR** for container storage
* 🚀 **AWS App Runner** for production deployment

It is a complete production-grade LLMOps pipeline deployed on AWS.

## 🎥 **Application Walkthrough**

### 🔑 1. User Sign-Up Flow

<div align="center">
  <img src="img/app/sign_up.gif" width="100%" alt="User Sign Up Demo">
</div>

### 💳 2. Subscription Selection & Checkout

<div align="center">
  <img src="img/app/subscription.gif" width="100%" alt="Subscription Demo">
</div>

### 📝 3. Real-Time Consultation Summary Generation

<div align="center">
  <img src="img/app/notes_generation.gif" width="100%" alt="Notes Generation Demo">
</div>

## 🧩 **Grouped Stages**

Your project had **12 branches**, but several naturally belong together.
Below is a clean, intuitive grouping in a 3-column table:

| Stage Group | Category                      | Description                                                                                       |
| :---------: | ----------------------------- | ------------------------------------------------------------------------------------------------- |
|    **00**   | Project Setup                 | Initial Next.js scaffold, project structure, global config, repo setup                            |
|    **01**   | AWS Account Setup             | Created AWS account, budgets, IAM user, permissions, regions, keys                                |
|    **02**   | Docker Environment Setup      | Installed Docker Desktop, verified CLI, created base config                                       |
|  **03–06**  | Core Application Development  | Backend API (FastAPI), app configuration, consultation form, landing page, Next.js config updates |
|  **07–08**  | Authentication & Subscription | Full Clerk setup, JWT verification, premium subscription plan, frontend protection                |
|    **09**   | Local Docker Testing          | Built multi-stage Dockerfile, ran full container locally, validated SSE + markdown rendering      |
|    **10**   | Deploy to AWS ECR             | Built linux/amd64 image, authenticated via AWS CLI, tagged + pushed container to ECR              |
|    **11**   | Deploy to AWS App Runner      | Created App Runner service, environment variables, health checks, hardened deployment             |

## 🗂️ **Project Structure**

```
LLMOps-Healthcare-App__AWS-App-Runner/
├── api/
│   ├── README.md
│   └── server.py
├── img/
│   └── app/
│       ├── sign_up.gif
│       ├── subscription.gif
│       └── notes_generation.gif
├── node_modules/
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── product.tsx
│   └── README.md
├── public/
├── styles/
│   └── globals.css
├── .dockerignore
├── .env
├── .gitignore
├── Dockerfile
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── requirements.txt
└── tsconfig.json
```

## 🧠 **Key Architectural Components**

### 🔐 Clerk Authentication

* Secure sign-in
* JWT verification in FastAPI via `CLERK_JWKS_URL`
* Premium plan gating
* No sensitive keys inside the Docker image

### 🐍 FastAPI Backend

* Implemented in `api/server.py`
* SSE streaming with `StreamingResponse`
* Serves static Next.js export (`/app/static`)
* Health check at `/health` for App Runner

### ⚛️ Next.js Frontend

* Pages Router (simpler for API integrations)
* Tailwind styling
* ReactMarkdown + remark-gfm + remark-breaks for formatted LLM output
* fetch-event-source for streamed completions

### 🐳 Dockerised Deployment

* Multi-stage build:

  * Node builder → Next.js static export
  * Python server image → serves API + static files
* Cross-architecture flag for Apple Silicon (`--platform linux/amd64`)

### ☁️ AWS ECR → AWS App Runner

* Container stored in ECR
* App Runner handles:

  * HTTPS automatically
  * Scaling
  * Load balancing
  * Instance provisioning
* Only environment variables injected at runtime:

  * `CLERK_SECRET_KEY`
  * `CLERK_JWKS_URL`
  * `OPENAI_API_KEY`

## 💻 **Local Development**

Install dependencies:

```bash
npm install
pip install -r requirements.txt
```

Run Next.js locally:

```bash
npm run dev
```

Run FastAPI locally:

```bash
uvicorn api.server:app --reload
```

## 🧪 **Local Docker Test**

```bash
docker build -t consultation-app .
docker run -p 8000:8000 --env-file .env consultation-app
```

Navigate to:

```
http://localhost:8000
```

## 🚀 **Deploying to AWS**

1. Build linux/amd64 image
2. Authenticate Docker to ECR
3. Push `latest` tag
4. Create App Runner service
5. Configure environment variables
6. Deploy and test

Your app becomes publicly accessible via HTTPS with auto-scaling handled by AWS.

## 🎉 **Project Complete**

You have successfully built, containerised, tested, and deployed a full **LLMOps Healthcare Application** on **AWS App Runner**, complete with authentication, subscriptions, real-time LLM streaming, and a polished UI.