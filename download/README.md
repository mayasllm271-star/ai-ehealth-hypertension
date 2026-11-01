# AI E-Health — Hypertension Risk Predictor (Deliverables)

This folder contains the standalone hypertension module built for the AI E-Health university project.

## 📦 Contents

| Path | Description |
|---|---|
| `ai-ehealth-hypertension/` | Full source code (Next.js 16 + TypeScript + Tailwind + shadcn/ui), ready for GitHub |
| `ai-ehealth-hypertension.tar.gz` | Same code as a single archive (~155 KB) |
| `screenshots/preview-arabic.png` | Screenshot of the app in Arabic (RTL) with a high-risk result |
| `screenshots/preview-french.png` | Screenshot of the app in French (LTR) with a high-risk result |
| `screenshots/preview-mobile.png` | Mobile (375px) viewport screenshot |

## 🚀 Quick start

```bash
# Option A — extract and run with bun (recommended)
tar xzf ai-ehealth-hypertension.tar.gz
cd ai-ehealth-hypertension
bun install
bun run dev          # → http://localhost:3000

# Option B — with Docker (no local install needed)
cd ai-ehealth-hypertension
docker compose up -d --build
# → http://localhost:3000
```

## 🌐 Live preview

The running app is also available via the Preview panel:
**https://preview-<bot-id>.space-z.ai/**

## 🗂 Pushing to GitHub

1. Create an empty repo `ai-ehealth-hypertension` on GitHub.
2. Inside the extracted folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Hypertension module"
   git branch -M main
   git remote add origin https://github.com/<your-user>/ai-ehealth-hypertension.git
   git push -u origin main
   ```
3. When the team is ready, the maintainer merges this with the heart / diabetes / thyroid modules into the unified `ai-ehealth-platform` repo.

## ⚠️ Educational disclaimer

This application is a university project for learning AI and DevOps. It is **not** a medical device and does **not** provide a medical diagnosis. Always consult a qualified healthcare provider.
