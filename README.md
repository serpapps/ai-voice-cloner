# AI Voice Cloning Desktop Application

Turn text into natural-sounding speech and clone voices on your own machine—no coding needed.

- Works on Windows, macOS, and Linux  
- CPU or NVIDIA GPU acceleration  
- Clean web UI at `http://localhost`  
- Models stored locally


## 🔗 Quick Links

---



## What You Get

- Text-to-Speech in your browser  
- Voice cloning (bring a short sample)  
- Local models saved to a folder you control  
- Simple, clean UI


## Zero-Tech Quick Start

---

## Pick Your Setup

**Frontend images**
- Windows / Linux → `serpcompany/ai-inference-tts-frontend:amd64`  
- macOS → `serpcompany/ai-inference-tts-frontend:arm64`

**Backend images**
- CPU (works everywhere) → `serpcompany/ai-inference-tts-backend:cpu`  
- NVIDIA GPU (base) → `serpcompany/ai-inference-tts-backend:cuda`  
- NVIDIA GPU (optimized, pick by **compute capability**) →  
  `serpcompany/ai-inference-tts-backend:cuda128-cc120`  
  `serpcompany/ai-inference-tts-backend:cuda128-cc90`  
  `serpcompany/ai-inference-tts-backend:cuda128-cc89`  
  `serpcompany/ai-inference-tts-backend:cuda128-cc86`  
  `serpcompany/ai-inference-tts-backend:cuda128-cc80`  
- macOS → `serpcompany/ai-inference-tts-backend:osx`

> **Not sure about your GPU?** Use the **CUDA (base)** image first.  
> To go optimized later, look up your GPU's **compute capability** here: <https://developer.nvidia.com/cuda-gpus>.  
> Optimized images require drivers that support **CUDA 12.8**.

---

## Copy-Paste Examples

> The `./models` folder (created next to your compose file) stores models locally.

### 1) Windows / Linux — **CPU only**

```yaml
version: "3.9"

services:
  backend:
    image: serpcompany/ai-inference-tts-backend:cpu
    container_name: ai-inference-tts-backend
    ports:
      - "8000:8000"
    volumes:
      - ./models/:/comfyui/models/
    environment:
      - EMAIL={YOUR_EMAIL}
      - LICENSE_KEY={YOUR_LICENSE_KEY}

  frontend:
    image: serpcompany/ai-inference-tts-frontend:amd64
    container_name: ai-inference-tts-frontend
    ports:
      - "80:80"
    environment:
      - NUXT_PUBLIC_API_BASE=http://backend:8000
    depends_on:
      - backend
```

### 2) Windows / Linux — **NVIDIA GPU (CUDA — base)**

> Make sure your NVIDIA drivers are up to date and that Docker Desktop has GPU support enabled.

```yaml
version: "3.9"

services:
  backend:
    image: serpcompany/ai-inference-tts-backend:cuda
    container_name: ai-inference-tts-backend
    ports:
      - "8000:8000"
    volumes:
      - ./models/:/comfyui/models/
    environment:
      - EMAIL={YOUR_EMAIL}
      - LICENSE_KEY={YOUR_LICENSE_KEY}

  frontend:
    image: serpcompany/ai-inference-tts-frontend:amd64
    container_name: ai-inference-tts-frontend
    ports:
      - "80:80"
    environment:
      - NUXT_PUBLIC_API_BASE=http://backend:8000
    depends_on:
      - backend
```

### 3) macOS (Apple Silicon or Intel)

```yaml
version: "3.9"

services:
  backend:
    image: serpcompany/ai-inference-tts-backend:osx
    container_name: ai-inference-tts-backend
    ports:
      - "8000:8000"
    volumes:
      - ./models/:/comfyui/models/
    environment:
      - EMAIL={YOUR_EMAIL}
      - LICENSE_KEY={YOUR_LICENSE_KEY}

  frontend:
    image: serpcompany/ai-inference-tts-frontend:arm64
    container_name: ai-inference-tts-frontend
    ports:
      - "80:80"
    environment:
      - NUXT_PUBLIC_API_BASE=http://backend:8000
    depends_on:
      - backend
```

### (Optional) NVIDIA **optimized** CUDA images

If you want max performance, change **only** the backend image line to one of these:

```
serpcompany/ai-inference-tts-backend:cuda128-cc120
serpcompany/ai-inference-tts-backend:cuda128-cc90
serpcompany/ai-inference-tts-backend:cuda128-cc89
serpcompany/ai-inference-tts-backend:cuda128-cc86
serpcompany/ai-inference-tts-backend:cuda128-cc80
```

> Use <https://developer.nvidia.com/cuda-gpus> to find your compute capability.  
> These optimized images are built on **CUDA 12.8** → your NVIDIA driver must support **CUDA 12.8**.

---

## Open the App

When Docker says the containers are running, open: **http://localhost:80**

If something else already uses port 80, switch to **http://localhost:{NUM}** and change the frontend port mapping (replace `{NUM}` with your chosen port, e.g., `8080`):

```yaml
# change this
- "80:80"
# to this
- "{NUM}:80"
```

---

## Update / Stop / Uninstall

**Update to the latest images**
```bash
docker compose pull
docker compose up -d --force-recreate
```

**Stop the app**
```bash
docker compose down
```

**Remove downloaded models** (optional)  
Delete the `./models` folder next to your `docker-compose.yml`.

---

## Troubleshooting

- **License key error** → Double-check `EMAIL` and `LICENSE_KEY` (no extra spaces).  
- **Slow performance (CPU)** → Use a GPU image if you have an NVIDIA GPU.
- **Slow performance (GPU)** → Initial generations are slower as models need to load into GPU memory and if the model isn't already downloaded, it needs to be fetched first. If subsequent generations are still slow, ensure your GPU is being used (see below).
- **Port in use** → Map to a different port (see "Open the App" above).
- **GPU not being used (Windows/Linux)** → Use a CUDA image (`:cuda` or an optimized tag). Ensure:
  - NVIDIA drivers installed and current  
  - Docker Desktop GPU support enabled  
  - For optimized tags, driver must support **CUDA 12.8**  
- **Clean restart**
  ```bash
  docker compose down
  docker compose up -d --pull always
  ```

---

### Behind the Scenes (FYI)

- Frontend: `serpcompany/ai-inference-tts-frontend` (`amd64` for Windows/Linux, `arm64` for macOS)  
- Backend: `serpcompany/ai-inference-tts-backend` (`cpu`, `cuda`, `cuda128-ccXX`, or `osx`)  
- Models live in `./models` on your machine.
