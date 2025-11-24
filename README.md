# 🐳 LLMOps – Healthcare App

### 🛠️ Docker Installation Branch

This branch focuses on installing and verifying **Docker Desktop**, which you will use later to build and containerise the Healthcare App before pushing it to **Amazon ECR**.

By the end of this stage, you will have:

* Docker Desktop fully installed
* WSL2 configured (Windows)
* The ability to run containers locally
* Validation that Docker Engine works correctly

## ⚡ DOCKER SETUP

### 🧩 Overview

Docker is the tool that lets us package the entire Healthcare App — frontend + backend + dependencies — into a single container image.
This container will later be uploaded to **Amazon ECR** and then deployed with **AWS App Runner**.

In this stage, you will:

* Install Docker Desktop
* Ensure WSL2 is enabled (Windows)
* Run a test container to confirm everything works

## 🐋 Step 1: Install Docker Desktop

1. Go to **docker.com/products/docker-desktop**

2. Download Docker Desktop for your system:

   * **Mac** → Choose Apple Silicon or Intel
   * **Windows** → Windows 10/11 supported (Docker will auto-check prerequisites)

3. Run the installer

4. **Windows users:**

   * Docker will offer to install **WSL2**
   * Accept all prompts
   * Allow it to configure the Linux subsystem

5. Once installation completes, start **Docker Desktop**

6. A system restart may be required

After restarting, ensure Docker Desktop is running in the background (the whale icon in the system tray or menu bar).

## 🧾 Step 2: Verify Docker Works

Open:

* Terminal (Mac)
* PowerShell (Windows)

Run:

```bash
docker --version
```

You should see output like:

```
Docker version 26.x.x
```

Now test Docker Engine by pulling and running the official test container:

```bash
docker run hello-world
```

Expected output begins with:

```
Hello from Docker!
```

This confirms:

* Docker Engine is running
* Images can be pulled
* Containers can start
* Networking is functioning correctly

## 🧪 Completion Checklist

| Component                 | Description                            | Status |
| ------------------------- | -------------------------------------- | :----: |
| Docker Desktop Installed  | Mac or Windows installation complete   |    ✅   |
| WSL2 Configured (Windows) | WSL2 enabled & linked to Docker Engine |    ✅   |
| Version Verified          | `docker --version` shows running build |    ✅   |
| Test Container Run        | `hello-world` prints expected message  |    ✅   |

