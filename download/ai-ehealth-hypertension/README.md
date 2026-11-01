<div dir="rtl">

# 🩺 AI E-Health — وحدة توقّع خطر الإصابة بضغط الدم المرتفع

> تطبيق ويب تعليمي جامعي يستعمل نموذج ذكاء اصطناعي (نظام درجات) لتقدير مستوى خطر الإصابة بارتفاع ضغط الدم.  
> **للأغراض التعليمية فقط — وليس أداة تشخيص طبي أو بديلًا عن الطبيب.**

</div>

---

<div dir="ltr">

# 🩺 AI E-Health — Hypertension Risk Predictor Module

> A university educational web app that uses an AI scoring model to estimate the risk of developing hypertension.  
> **For educational purposes only — not a medical diagnostic tool or a substitute for a doctor.**

</div>

---

## 📋 Table of Contents | الفهرس

| EN/FR | AR |
|---|---|
| [Overview](#overview) | [نظرة عامة](#نظرة-عامة) |
| [Features](#features) | [الميزات](#الميزات) |
| [Tech Stack](#tech-stack) | [التقنيات](#التقنيات) |
| [Run Locally](#run-locally) | [التشغيل المحلي](#التشغيل-المحلي) |
| [Docker](#docker) | [Docker](#docker) |
| [API](#api) | [واجهة الـ API](#api) |
| [Project Structure](#project-structure) | [هيكل المشروع](#هيكل-المشروع) |
| [Roadmap](#roadmap) | [خارطة الطريق](#خارطة-الطريق) |
| [Disclaimer](#disclaimer) | [تنبيه](#تنبيه) |
| [Team](#team) | [الفريق](#الفريق) |

---

<div dir="ltr">

## Overview

This repository contains **only the Hypertension module** of the broader **AI E-Health** university project. Each teammate built a separate module (Heart, Diabetes, Thyroid, Hypertension). They are later merged into a unified platform on GitHub.

The app lets a user enter health indicators (age, BMI, blood pressure, lifestyle…) and returns an **estimated risk level** (Low / Moderate / High / Very High) plus tailored educational recommendations.

</div>

<div dir="rtl">

## نظرة عامة

هذا المستودع يحتوي على **وحدة ضغط الدم فقط** من مشروع **AI E-Health** الجامعي. كل طالبة من الفريق طوّرت وحدة منفصلة (القلب، السكري، الغدة، ضغط الدم)، ثم تُدمج لاحقًا في منصة موحّدة على GitHub.

يُتيح التطبيق للمستخدم إدخال مؤشراته الصحية (العمر، مؤشر كتلة الجسم، ضغط الدم، نمط الحياة…) فيحصل على **مستوى الخطر المقدّر** (منخفض / متوسط / مرتفع / مرتفع جدًا) مع توصيات تعليمية مخصصة.

</div>

---

## Features | الميزات

<div dir="ltr">

- 🌐 **Bilingual UI** — Arabic (RTL) + French (LTR), one-click toggle.
- 🧮 **Educational AI model** — transparent scoring inspired by WHO/AHA guidelines.
- 📊 **Risk visualization** — score gauge, probability, top contributing factors.
- ✅ **Tailored recommendations** per risk level.
- 🔒 **Privacy-first** — all data processed locally; nothing stored.
- 🐳 **Docker-ready** — Dockerfile + docker-compose for one-command deployment.
- 🔗 **REST API** — `POST /api/predict` for integration with other modules.
- 📱 **Responsive** — works on mobile, tablet, desktop.

</div>

<div dir="rtl">

- 🌐 **واجهة ثنائية اللغة** — عربية (RTL) + فرنسية (LTR)، تبديل بنقرة واحدة.
- 🧮 **نموذج ذكاء اصطناعي تعليمي** — نظام درجات شفاف مستوحى من إرشادات WHO/AHA.
- 📊 **عرض بصري للخطر** — مقياس الدرجة، الاحتمال، وأهم العوامل المؤثرة.
- ✅ **توصيات مخصصة** حسب مستوى الخطر.
- 🔒 **الخصوصية أولًا** — كل البيانات تُعالج محليًا ولا تُخزَّن.
- 🐳 **جاهز لـ Docker** — Dockerfile + docker-compose للنشر بأمر واحد.
- 🔗 **REST API** — `POST /api/predict` للترابط مع الوحدات الأخرى.
- 📱 **متجاوب** — يعمل على الجوال، التابلت، والحاسوب.

</div>

---

## Tech Stack | التقنيات

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS 4** + **shadcn/ui** |
| Icons | **lucide-react** |
| Container | **Docker** + **Docker Compose** |
| VCS | **Git / GitHub** |

---

## Run Locally | التشغيل المحلي

<div dir="ltr">

### Prerequisites
- Node.js ≥ 20 (or [Bun](https://bun.sh) ≥ 1.3)
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/<your-org>/ai-ehealth-hypertension.git
cd ai-ehealth-hypertension

# 2. Install dependencies
bun install        # or: npm install

# 3. (Optional) Generate Prisma client
bun run db:generate

# 4. Start the dev server
bun run dev        # or: npm run dev

# 5. Open the app
#    → http://localhost:3000
```

</div>

<div dir="rtl">

### المتطلبات
- Node.js ≥ 20 (أو [Bun](https://bun.sh) ≥ 1.3)
- Git

### الخطوات

```bash
# 1. استنساخ المستودع
git clone https://github.com/<your-org>/ai-ehealth-hypertension.git
cd ai-ehealth-hypertension

# 2. تثبيت الاعتماديات
bun install        # أو: npm install

# 3. (اختياري) توليد عميل Prisma
bun run db:generate

# 4. تشغيل خادم التطوير
bun run dev        # أو: npm run dev

# 5. افتح التطبيق
#    → http://localhost:3000
```

</div>

---

## Docker

<div dir="ltr">

### Build & run with Docker

```bash
# Build the image
docker build -t ai-ehealth/hypertension:latest .

# Run the container
docker run -d \
  --name hypertension-app \
  -p 3000:3000 \
  ai-ehealth/hypertension:latest

# → open http://localhost:3000
```

### Run with Docker Compose (recommended)

```bash
# Build + start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

The Compose file creates a dedicated network (`ai-ehealth-net`) so the other modules can be added later as separate services on the same network.

</div>

<div dir="rtl">

### البناء والتشغيل بـ Docker

```bash
# بناء الصورة
docker build -t ai-ehealth/hypertension:latest .

# تشغيل الحاوية
docker run -d \
  --name hypertension-app \
  -p 3000:3000 \
  ai-ehealth/hypertension:latest

# → افتح http://localhost:3000
```

### التشغيل بـ Docker Compose (مُوصى به)

```bash
# البناء والتشغيل
docker compose up -d --build

# عرض السجل
docker compose logs -f

# الإيقاف
docker compose down
```

ملف Compose يُنشئ شبكة خاصة (`ai-ehealth-net`) بحيث يمكن إضافة الوحدات الأخرى لاحقًا كخدمات منفصلة على نفس الشبكة.

</div>

---

## API

<div dir="ltr">

### `POST /api/predict`

**Request body** (JSON):

```json
{
  "age": 45,
  "gender": "male",
  "bmi": 27.5,
  "systolic": 138,
  "diastolic": 88,
  "heartRate": 78,
  "familyHistory": true,
  "smoking": "current",
  "physicalActivity": "low",
  "salt": "high",
  "stress": "high",
  "sleep": 5.5,
  "diabetes": false,
  "thyroid": false
}
```

**Response** (200):

```json
{
  "ok": true,
  "input": { ... },
  "result": {
    "score": 72,
    "level": "veryHigh",
    "probability": 0.78,
    "topFactors": [
      { "key": "systolic", "ar": "...", "fr": "...", "contribution": 22 },
      ...
    ]
  },
  "educationalNotice": "Educational use only. Not a medical diagnosis."
}
```

### `GET /api/predict`
Returns the list of accepted fields.

</div>

<div dir="rtl">

### `POST /api/predict`

**نص الطلب** (JSON):

```json
{
  "age": 45,
  "gender": "male",
  "bmi": 27.5,
  "systolic": 138,
  "diastolic": 88,
  "heartRate": 78,
  "familyHistory": true,
  "smoking": "current",
  "physicalActivity": "low",
  "salt": "high",
  "stress": "high",
  "sleep": 5.5,
  "diabetes": false,
  "thyroid": false
}
```

**الاستجابة** (200):

```json
{
  "ok": true,
  "input": { ... },
  "result": {
    "score": 72,
    "level": "veryHigh",
    "probability": 0.78,
    "topFactors": [ ... ]
  },
  "educationalNotice": "Educational use only. Not a medical diagnosis."
}
```

### `GET /api/predict`
يُرجع قائمة الحقول المقبولة.

</div>

---

## Project Structure | هيكل المشروع

```
ai-ehealth-hypertension/
├── src/
│   ├── app/
│   │   ├── api/predict/route.ts   # REST endpoint (POST/GET)
│   │   ├── globals.css            # Tailwind + custom styles
│   │   ├── layout.tsx             # Root layout (HTML lang/dir)
│   │   └── page.tsx               # Main page (form + result + about)
│   ├── lib/
│   │   ├── hypertension.ts        # Risk scoring engine
│   │   └── i18n.ts                # Bilingual dictionary (AR + FR)
│   └── components/ui/             # shadcn/ui components
├── prisma/
│   └── schema.prisma              # (placeholder for future persistence)
├── Dockerfile                     # Multi-stage build (deps → build → runtime)
├── docker-compose.yml             # Single-service orchestration
├── .dockerignore
├── .gitignore
├── .env.example
├── package.json
└── README.md                      # ← you are here
```

---

## Roadmap | خارطة الطريق

<div dir="ltr">

- [x] Hypertension risk scoring engine
- [x] Bilingual UI (AR + FR)
- [x] REST API endpoint
- [x] Dockerfile + Docker Compose
- [ ] Add unit tests for the scoring engine
- [ ] Merge with sister modules (Heart / Diabetes / Thyroid) into unified platform
- [ ] Add history persistence (Prisma + SQLite)
- [ ] Add PDF export of the result

</div>

<div dir="rtl">

- [x] محرك حساب خطر ضغط الدم
- [x] واجهة ثنائية اللغة (عربي + فرنسي)
- [x] واجهة REST API
- [x] Dockerfile + Docker Compose
- [ ] إضافة اختبارات وحدة لمحرك الحساب
- [ ] الدمج مع الوحدات الأخرى (القلب / السكري / الغدة) في منصة موحّدة
- [ ] إضافة حفظ السجل (Prisma + SQLite)
- [ ] إضافة تصدير PDF للنتيجة

</div>

---

## Disclaimer | تنبيه

<div dir="ltr">

> ⚠️ **Educational use only.** This application is a university project for learning AI and DevOps. It is **NOT** a medical device, does **not** provide a medical diagnosis, and is **not** a substitute for professional medical advice. Always consult a qualified healthcare provider for any medical concern.

</div>

<div dir="rtl">

> ⚠️ **للاستعمال التعليمي فقط.** هذا التطبيق مشروع جامعي لتعلّم الذكاء الاصطناعي والـ DevOps. **ليس** جهازًا طبيًا، ولا يُقدّم تشخيصًا طبيًا، وليس بديلًا عن الاستشارة الطبية المهنية. استشر دائمًا طبيبًا مختصًا لأي مسألة صحية.

</div>

---

## Team | الفريق

<div dir="ltr">

**AI E-Health Project — Module 4: Hypertension**

Built as part of a university DevOps & AI course. Each teammate owns one module; this one is maintained here and will be merged into the unified `ai-ehealth-platform` repository.

</div>

<div dir="rtl">

**مشروع AI E-Health — الوحدة الرابعة: ضغط الدم**

طُوّر في إطار مقرر جامعي للذكاء الاصطناعي والـ DevOps. كل طالبة مسؤولة عن وحدة واحدة؛ وهذه الوحدة تُدار هنا وستُدمج لاحقًا في مستودع `ai-ehealth-platform` الموحّد.

</div>

---

<div dir="ltr">

© 2026 AI E-Health — Educational Project. Built with Next.js + Docker.

</div>

<div dir="rtl">

© 2026 AI E-Health — مشروع تعليمي. بُني بـ Next.js + Docker.

</div>
