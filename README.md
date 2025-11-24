# 🚑 LLMOps – Healthcare App (AWS App Runner Edition)

### 🧠 Project Setup Branch

This branch sets up the **foundations** for the **LLMOps Healthcare App** that will ultimately be deployed using **AWS App Runner** (via **Amazon ECR**).

By the end of this stage, you will have:

* A working **Next.js + Tailwind** frontend
* A **Python (FastAPI) backend skeleton** under `api/`
* Local environment ready for containerisation with **Docker**
* An **AWS account + IAM user** prepared for later deployment
* A root-level `.env` ready with your `OPENAI_API_KEY`



## ☁️ AWS & Docker Prerequisites

Before touching the application code, set up your AWS account and Docker. This ensures that when we later containerise and deploy to **App Runner**, you’re ready to go.

### 🔍 Understanding the AWS Services We’ll Use

#### AWS App Runner

**App Runner** is AWS’s simplest way to run containerised web applications. You give it a Docker image, and it handles:

* HTTPS certificates
* Load balancing
* Auto-scaling

Think of it as **“Vercel for Docker containers”**.

#### Amazon ECR (Elastic Container Registry)

**ECR** is a private Docker image registry, like GitHub but for containers. We’ll push our built image here, then point App Runner at this registry.

#### AWS IAM (Identity and Access Management)

**IAM** controls who can do what in your AWS account. We’ll:

* Lock down the **root** account
* Create a dedicated **IAM user** with just enough permissions to work with App Runner, ECR, and CloudWatch

#### CloudWatch

**CloudWatch** is AWS’s logging and metrics service. App Runner pushes logs here, so it’s effectively your **server-side console log** for debugging.



## Part 1: Create and Secure Your AWS Account

### Step 1: Sign Up for AWS

1. Go to the AWS homepage.
2. Click **Create an AWS Account**.
3. Enter your email address and a strong password.
4. Choose **Personal** as the account type (for learning).
5. Add your payment details (required; we’ll protect you with budgets).
6. Verify your phone number via SMS.
7. Choose **Basic Support – Free**.

This creates your **root** account. Treat it like a master key: powerful but risky if misused.

### Step 2: Protect the Root Account with MFA

1. Sign in to the AWS Management Console as root.
2. Click your account name (top-right) → **Security credentials**.
3. Under **Multi-Factor Authentication (MFA)**, click **Assign MFA device**.
4. Use an authenticator app (Google Authenticator, Authy, etc.):

   * Name it something like `root-mfa`.
   * Scan the QR code.
   * Enter two consecutive codes.
5. Click **Add MFA**.

From now on, accessing root requires both password and MFA code.

### Step 3: Set Up Billing Budget Alerts (Very Important)

1. In the AWS Console search bar, type **Billing** and open **Billing and Cost Management**.
2. In the left-hand menu, select **Budgets**.
3. Click **Create budget**.
4. Choose **Use a template (simplified)** → **Monthly cost budget**.

Create three separate budgets:

#### Budget 1 – Early Warning ($1)

* Name: `early-warning`
* Amount: `1` USD
* Add your email as the recipient
* Save / create the budget

#### Budget 2 – Caution ($5)

* Name: `caution-budget`
* Amount: `5` USD
* Add your email as the recipient
* Save / create the budget

#### Budget 3 – Stop Alert ($10)

* Name: `stop-budget`
* Amount: `10` USD
* Add your email as the recipient
* Save / create the budget

AWS will notify you when:

* Actual spend hits ~85% of the budget
* Actual spend hits 100%
* Forecasted spend is expected to reach 100%

If you hit **$10**, pause and review what’s running.

### Step 4: Create an IAM User for Daily Work

Never build and deploy from the **root** account.

1. In the AWS Console, search for **IAM**.
2. Go to **Users** → **Create user**.
3. Username: `aiengineer` (or similar).
4. Tick ✅ **Provide user access to the AWS Management Console**.
5. Choose **I want to create an IAM user**.
6. Set a strong **Custom password**.
7. Uncheck ⬜ **Users must create a new password at next sign-in** (optional).
8. Click **Next**.

### Step 5: Create a User Group with Required Permissions

We’ll create a group, then attach policies to it.

1. On the permissions step, choose **Add user to group** → **Create group**.

2. Group name: `BroadAIEngineerAccess`.

3. In the policy search box, enable the following:

   * `AWSAppRunnerFullAccess` – deploy/manage App Runner services
   * `AmazonEC2ContainerRegistryFullAccess` – push & pull images from ECR
   * `CloudWatchLogsFullAccess` – view logs for debugging
   * `IAMUserChangePassword` – let the user manage their own password
   * `IAMFullAccess` – needed to avoid IAM-related errors later in the workflow

4. Click **Create user group**.

5. Back on the user permissions page, select the `BroadAIEngineerAccess` group so it’s checked.

6. Click **Next** → **Create user**.

7. On the final screen, click **Download .csv** and store it securely – it contains your sign-in URL and user details.

Now:

1. Sign out of the root account.
2. Use the sign-in URL from the CSV (looks like `https://123456789012.signin.aws.amazon.com/console`).
3. Log in as the new IAM user:

   * Username: `aiengineer`
   * Password: the one you set

This IAM user is what you’ll use day-to-day.



## Part 2: Install Docker Desktop

Later we’ll build a Docker image for the Healthcare App and push it to **ECR**, so Docker must be working locally.

### Step 1: Install Docker Desktop

1. Go to the Docker Desktop download page.
2. Download the installer for your OS:

   * **Mac** – Apple Silicon or Intel version
   * **Windows** – Windows 10/11 with WSL2 support
3. Run the installer and follow prompts.
4. On Windows, allow it to install and configure **WSL2** if prompted.
5. Launch Docker Desktop.
6. Restart your machine if requested.

### Step 2: Verify Docker Works

Open **Terminal** (macOS) or **PowerShell** (Windows):

```bash
docker --version
```

You should see something like:

```text
Docker version 26.x.x, build ...
```

Then run:

```bash
docker run hello-world
```

You should see a message starting with **"Hello from Docker!"** confirming Docker is installed correctly.



## ⚡ Project Setup (Next.js + FastAPI Skeleton)

With AWS and Docker ready, we can scaffold the actual Healthcare app.

### 🧩 Overview

This branch will:

* Create a **Next.js** frontend (TypeScript + Tailwind CSS)
* Install all required **frontend dependencies** for Markdown, authentication, streaming, and date picking
* Set up a **Python FastAPI backend skeleton** under `api/`
* Prepare a root `.env` with your `OPENAI_API_KEY` (other secrets will be added in later branches)

Deployment to **AWS App Runner** (via ECR) will be covered in a later stage.



## 🖥️ Step 1: Install Node.js

Install Node.js from the official download page.

Then verify in your terminal:

```bash
node --version
npm --version
```

You should see valid version numbers for both.



## 🏗️ Step 2: Create the Next.js Frontend

From the directory where you want your project folder to live:

```bash
npx create-next-app@15.5.6 llmops-healthcare-app --typescript
```

When prompted, answer:

* ESLint: **Yes**
* Tailwind: **Yes**
* Use `src/` directory: **No**
* App Router: **No** (use **Pages Router**)
* Turbopack: **No**
* Import alias: **No**

This creates a `llmops-healthcare-app/` folder with a standard Next.js app.



## 🧭 Step 3: Open the Project

Open the folder in your editor (e.g. Cursor, VS Code).

You should see a classic **Next.js Pages Router** structure under `pages/`.



## 🧹 Step 4: Remove the Default `pages/api` Folder

We’ll manage our backend separately (under `api/` at the project root), so remove Next.js’s default API routes.

In your project:

* Right-click `pages/api`
* Click **Delete**



## 🎨 Step 5: Tailwind CSS Basics

Tailwind is already configured by `create-next-app` (because we ticked **Tailwind: Yes**).
We’ll use it later to build clean, responsive UI for the healthcare workflows.

No extra action is required in this step.



## 📦 Step 6: Install Frontend Dependencies

From the project root (`llmops-healthcare-app`):

```bash
npm install react-markdown remark-gfm remark-breaks
npm install @tailwindcss/typography
npm install @clerk/nextjs
npm install @microsoft/fetch-event-source

npm install react-datepicker
npm install --save-dev @types/react-datepicker
```

**What these are for:**

* `react-markdown`, `remark-gfm`, `remark-breaks`
  Render AI-generated medical responses as Markdown.

* `@tailwindcss/typography`
  Nice typography for clinical notes and summaries.

* `@clerk/nextjs`
  Authentication layer (sign-in, profiles, subscription tiers) for securing healthcare tools.

* `@microsoft/fetch-event-source`
  Server-Sent Events (SSE) for streaming tokens from the backend.

* `react-datepicker` + `@types/react-datepicker`
  Date selection widgets (appointments, visit dates, etc.).



## 🧬 Step 7: Add the Python Backend Skeleton

We’ll follow the same backend structure as the original Healthcare app, just without Vercel-specific wiring.

### 7.1 Create `api/` Folder

At the **project root** (same level as `pages/` and `package.json`), create a new folder:

```text
llmops-healthcare-app/
├── api/
├── pages/
├── public/
├── ...
```

### 7.2 Create `api/index.py`

Inside `api/`, create a file called `index.py`:

```python
# api/index.py

# This will be implemented in the 01_backend_api branch.
# For now, it's just a placeholder so the structure is ready.
```

We’ll turn this into a **FastAPI** app in the next branch.

### 7.3 Create `requirements.txt` (Python Dependencies)

At the project root, create a `requirements.txt` file:

```text
fastapi
uvicorn
openai
fastapi-clerk-auth
pydantic
```

**Roles:**

* `fastapi` – framework for building the healthcare API endpoints
* `uvicorn` – ASGI server for local development
* `openai` – calls to the OpenAI API
* `fastapi-clerk-auth` – integration with Clerk for authenticated endpoints
* `pydantic` – request/response models and validation



## 🔑 Step 8: Create `.env` for Local Secrets

At the project root, create a file named `.env`:

```bash
OPENAI_API_KEY=sk-your-openai-key-here
```

Guidelines:

* Do **not** commit your real key to Git.
* Make sure `.gitignore` includes `.env` (we’ll ensure that in a later step if needed).
* Other secrets (Clerk keys, AWS-related values, etc.) will be added in later branches.



## 🧷 Step 9: Initialise Git and Create the `00_project_setup` Branch

From the project root:

```bash
git init
git add .
git commit -m "Initial project setup for AWS App Runner healthcare app"
git branch -M 00_project_setup
```

If you already have a remote repository (e.g. GitHub/GitLab), you can add and push:

```bash
git remote add origin <your-repo-url>
git push -u origin 00_project_setup
```



## ✅ Completion Checklist

| Component                       | Description                                          | Status |
| ------------------------------- | ---------------------------------------------------- | :----: |
| AWS Account & IAM User          | Root secured, budgets set, IAM user created          |    ✅   |
| Docker Desktop                  | Installed and verified with `docker run hello-world` |    ✅   |
| Next.js Frontend                | `create-next-app` scaffold (TS + Tailwind)           |    ✅   |
| Frontend Dependencies Installed | Markdown, Clerk, SSE helper, date picker             |    ✅   |
| Python Backend Skeleton         | `api/` folder, `index.py`, and `requirements.txt`    |    ✅   |
| `.env` Created                  | `OPENAI_API_KEY` set (and not committed)             |    ✅   |
| Git Repository Initialised      | `00_project_setup` branch created                    |    ✅   |


