# ☁️ LLMOps – Healthcare App

### 🏗️ AWS Setup Branch

This branch establishes the **AWS infrastructure foundation** for the LLMOps Healthcare App.
By the end of this stage, you will have:

* A fully secured AWS account
* An IAM user for daily development
* A dedicated permission group
* Budget alerts to prevent accidental overspending
* A clear understanding of the AWS services used in later deployment stages

This branch prepares the environment you’ll need before pushing your Docker image to **Amazon ECR** and deploying the backend using **AWS App Runner** in the next stages.

## 🌐 Understanding the AWS Services We Will Use

### 🚀 AWS App Runner

A fully managed container hosting service. You give it a Docker image → it handles HTTPS, autoscaling, load balancing, and deployment.

### 🗄️ Amazon ECR

A private container registry where your Docker images will be stored.
Think of it as **GitHub for containers**.

### 🔐 AWS IAM

Controls access to AWS resources.
We will create a secure, limited-permissions IAM user for all development.

### 📊 CloudWatch

AWS's monitoring and logging service.
When your application runs on App Runner, CloudWatch will collect logs to help you debug issues.

## ⚡ AWS SETUP

### 🧩 Overview

This guide walks you through the complete AWS preparation required for later deployment.
By the end, you will have:

* A secured AWS account
* Root MFA enabled
* Billing alerts configured
* A dedicated IAM user (`aiengineer`)
* A permission group with App Runner, ECR, IAM, and CloudWatch access

These steps must be completed before you can containerise and deploy your Healthcare App.

## 🪄 Step 1: Create Your AWS Account

1. Go to **aws.amazon.com**
2. Click **Create an AWS Account**
3. Enter your email and password
4. Choose **Personal** account type
5. Enter payment details
6. Verify phone number via SMS
7. Select **Basic Support – Free**

You now have the AWS **root account** — the “god mode” account.
We will lock this down immediately.

## 🔒 Step 2: Secure the Root Account

1. Log in to AWS Console
2. Click your account name → **Security credentials**
3. Under **Multi-factor authentication (MFA)**:

   * Click **Assign MFA device**
   * Select **Authenticator app**
   * Scan the QR code with Google Authenticator / Authy
   * Enter two consecutive codes
   * Click **Add MFA**

Your root account is now protected.

## 💸 Step 3: Set Up Budget Alerts (Critical)

1. Search for **Billing** in AWS Console
2. Go to **Budgets**
3. Click **Create budget**
4. Choose **Use a template (simplified)**
5. Pick **Monthly cost budget**

Create three budgets:

### Budget 1 – Early Warning ($1)

* Budget name: `early-warning`
* Amount: **1**
* Add your email address
* Click **Create budget**

### Budget 2 – Caution ($5)

Same steps, but:

* Budget name: `caution-budget`
* Amount: **5**

### Budget 3 – Stop Alert ($10)

Same steps, but:

* Budget name: `stop-budget`
* Amount: **10**

AWS will send alerts when:

* Actual cost hits 85%
* Actual cost hits 100%
* Forecasted cost is expected to hit 100%

If you see a $10 alert → **stop everything and review what is running!**

## 👤 Step 4: Create an IAM User

Never use the root account for development.
We create a safer, restricted IAM user.

1. Search **IAM**
2. Click **Users** → **Create user**
3. Username: `aiengineer`
4. Enable: **Provide user access to AWS Management Console**
5. Select **I want to create an IAM user**
6. Set a **custom password**
7. Disable: **Require password reset**
8. Click **Next**

## 👥 Step 5: Create a Permissions Group

1. On the permissions page → **Add user to group**

2. Click **Create group**

3. Group name: `BroadAIEngineerAccess`

4. Attach these policies:

   * `AWSAppRunnerFullAccess`
   * `AmazonEC2ContainerRegistryFullAccess`
   * `CloudWatchLogsFullAccess`
   * `IAMUserChangePassword`
   * `IAMFullAccess` (required for later steps and often missed)

5. Click **Create user group**

6. Select the group (ensure it’s ticked)

7. Click **Next** → **Create user**

Finally:

* Click **Download .csv**
* Store it securely — it contains the login URL for your IAM user

## 🔑 Step 6: Sign In as the IAM User

1. Log out of your root account
2. Open the login URL from the CSV (format: `https://123456789012.signin.aws.amazon.com/console`)
3. Log in as:

   * Username: `aiengineer`
   * Password: (your chosen password)

If you see **aiengineer @ Account-ID** in the top-right corner →
Your AWS development identity is fully configured.

## ✅ Completion Checklist

| Component                   | Description                                    | Status |
| --------------------------- | ---------------------------------------------- | :----: |
| Root Account Secured        | MFA enabled                                    |    ✅   |
| AWS Budgets Created         | $1, $5, and $10 budgets set                    |    ✅   |
| IAM User Created            | `aiengineer` account configured                |    ✅   |
| IAM Group Created           | `BroadAIEngineerAccess` with required policies |    ✅   |
| CSV Credentials Saved       | IAM login URL + details downloaded             |    ✅   |
| Signed In as IAM User       | Ready for AWS development                      |    ✅   |
