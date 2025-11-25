# 🩺 LLMOps – Healthcare App

### ⚙️ API Setup Branch

This branch introduces the **core backend API** for the LLMOps Healthcare App.
It transforms the simple backend skeleton from the previous stage into a **fully operational FastAPI service** integrated with Clerk authentication, OpenAI streaming, and optional static asset serving.

With this stage complete, the application now includes a secure, production-ready backend route for generating structured clinical summaries.

## 🧩 Overview

This branch adds the first working Python endpoint inside the `api/` directory.
The updated backend:

* Accepts patient visit details
* Authenticates incoming requests with Clerk
* Sends structured prompts to OpenAI
* Streams model output using **SSE (Server-Sent Events)** for real-time UI updates
* Exposes a `/health` check endpoint for AWS App Runner

This backend now forms the clinical reasoning core of the system and supports all future healthcare logic.

## 🧬 What We Implemented

### ✓ FastAPI Application

A `FastAPI()` instance was created inside:

```
api/server.py
```

### ✓ Clerk Authentication

The `/api/consultation` route is secured with `fastapi-clerk-auth`, validating Clerk-issued JWTs.

### ✓ Pydantic Data Model

The `Visit` model ensures structured and validated clinical inputs:

* patient name
* visit date
* raw consultation notes

### ✓ Prompt Construction

The system and user prompts were implemented to generate three required medical sections:

* a doctor-facing visit summary
* next steps
* a patient-friendly email

### ✓ OpenAI Integration

The backend streams responses from the lightweight `"gpt-5-nano"` model.

### ✓ SSE Streaming

The API now streams incremental model output using `text/event-stream`, enabling the UI to render the summary as tokens arrive.

### ✓ Health Check Endpoint

AWS-compatible health endpoint implemented at:

```
GET /health
```

### ✓ Static File Support

If a `static/` directory exists, the backend can serve the exported frontend directly from the same container.

## 🔑 Required `.env` Updates (AWS Integration)

At this stage, users **must add two AWS configuration variables** to their project-level `.env` file.
These will be used in later branches when building and deploying the container to AWS:

```
# Add AWS configuration (use your chosen region)
DEFAULT_AWS_REGION=us-east-1

# Replace with your real AWS account ID
AWS_ACCOUNT_ID=123456789012
```

Make sure `.env` is included in your `.gitignore` to avoid committing credentials.

## 📁 Updated Project Structure

Only the updated backend file is annotated.

```
llmops-healthcare-app/
├── api/
│   └── server.py        # NEW: FastAPI consultation-summary endpoint with Clerk auth + SSE
├── pages/
├── public/
├── styles/
├── package.json
├── requirements.txt
├── tsconfig.json
└── next.config.js
```

## 🩻 API Behaviour Summary

The `/api/consultation` endpoint now:

1. Validates requests using Clerk
2. Accepts the `Visit` payload
3. Builds a structured clinical prompt
4. Streams model output using SSE
5. Returns, in real time:

   * doctor summary
   * next steps
   * patient-friendly email

The `/health` endpoint provides a simple status report used by AWS App Runner and monitoring systems.
