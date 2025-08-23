# AI Voice Cloning Desktop Application


![ai voice cloner4](https://github.com/user-attachments/assets/2ba4d59b-ed86-45a8-97d7-d7afdd1803f7)



Turn text into natural-sounding speech and clone voices on your own machine—no coding needed.

- Text-to-Speech in your browser  
- Voice cloning (bring a short sample)  
- Local models saved to a folder you control  
- Simple, clean UI
- Works on Windows, macOS, and Linux  
- CPU or NVIDIA GPU acceleration  
- Clean web UI at `http://localhost`  
- Models stored locally


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
