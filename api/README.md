# 🩺 API – LLMOps Healthcare App

This folder contains the **Python backend** for the LLMOps Healthcare application.
In later branches, this backend will be containerised with Docker, pushed to **Amazon ECR**, and deployed to **AWS App Runner** as a secure, scalable service.

The backend is responsible for:

* 🔐 **Authenticating requests** via **Clerk**
* 📝 **Receiving consultation notes** from the clinician
* 🤖 **Generating structured summaries** using OpenAI
* 📡 **Streaming real-time responses** to the frontend via SSE
* 🧩 **Supporting additional clinical endpoints** in future (triage, flags, medication checks)

The entrypoint for the backend is:

```
api/server.py
```

This file implements:

* The **FastAPI app**
* The `Visit` Pydantic model
* The system + user prompt logic
* Clerk authentication guards
* The `/api/consultation` POST endpoint
* The `/health` GET endpoint (required for AWS)
* The SSE streaming generator
* Optional static file serving (`static/` folder) for combined frontend+backend deployments

## 📦 Dependencies

The backend uses a small, efficient set of dependencies listed in `requirements.txt`:

* `fastapi` – API framework
* `uvicorn` – local development server
* `openai` – model communication
* `fastapi-clerk-auth` – Clerk JWT verification
* `pydantic` – data validation

During deployment on AWS App Runner, these are installed automatically from the container image.

## 🚀 How the Consultation Endpoint Works (High-Level)

1. The frontend sends a **JWT-signed** request (Clerk) to:

```
POST /api/consultation
```

The payload includes:

* patient name
* visit date
* free-text notes

2. The backend:

* validates the incoming data
* constructs system + user prompts
* calls the OpenAI model with **streaming enabled**
* converts the model output into **Server-Sent Events** (SSE)

3. The frontend receives the streamed tokens and renders the summary **in real time**.

This architecture is **fast**, **secure**, and **well-suited for clinical workflows**.

## ❤️ Health Check Endpoint

For AWS deployments (ECR → App Runner), the backend exposes:

```
GET /health
```

This allows App Runner and external monitors to verify the service is live.

## 📁 File Overview

```
api/
└── server.py          # FastAPI application (LLM-powered consultation summariser)
```

As the project evolves, additional endpoints (e.g., symptom triage, medication checks, model switching) will also live in this folder.