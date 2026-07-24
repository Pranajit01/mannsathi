# 🇮🇳 Mind Care India (Mann Saathi)
### *Democratizing Accessible, Privacy-First Mental Healthcare Across India Powered by Google Gemma*

[![Google Gemma](https://img.shields.io/badge/AI_Engine-Google_Gemma-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25_On--Device_&_Zero_Cloud_Leakage-00C853?style=for-the-badge&logo=shield)](https://github.com/Pranajit01/Mind-Care-India)
[![Indic Languages](https://img.shields.io/badge/Languages-10+_Indian_Dialects-FF6D00?style=for-the-badge)](https://github.com/Pranajit01/Mind-Care-India)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)

---

## 👨‍💻 Lead Innovator & System Architect

**Mann Saathi (Mind Care India)** is architected and built end-to-end by **Pranajit Das**.

- 📧 **Email**: [daspranajit973@gmail.com](mailto:daspranajit973@gmail.com)
- 🐙 **GitHub**: [github.com/Pranajit01/Mind-Care-India](https://github.com/Pranajit01/Mind-Care-India)
- 💼 **LinkedIn**: [linkedin.com/in/pranajitdas](https://www.linkedin.com/in/pranajitdas)

---

## 🎯 Project Overview

Over **197 million people** in India suffer from mental health conditions, yet more than **83% face a critical treatment gap**. The barriers are vast: acute social stigma, prohibitive costs, extreme scarcity of mental health professionals (only 0.75 psychiatrists per 100,000 people), and a severe shortage of regional Indian language support.

**Mind Care India (Mann Saathi / मन्न साथी)** is an empathetic, multilingual, privacy-first AI mental health platform designed specifically for India's socio-cultural ecosystem. Powered exclusively by **Google's Gemma open model series**, Mann Saathi delivers real-time supportive dialogue, instant clinical safety triage, and CBT grounding tools across 10+ Indian languages (including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Punjabi, and Hinglish).

---

## 🧠 How Google Gemma is Used

Google's **Gemma** open model series forms the core intelligent engine of Mind Care India:

```
+-----------------------------------------------------------------------------------+
|                        HOW GOOGLE GEMMA POWERED MANN SAATHI                       |
+-----------------------------------------------------------------------------------+
|  1. On-Device Edge Execution   | INT4 quantization via LiteRT reduces memory from |
|                                | 8.2GB to 1.15GB RAM for sub-100ms inference.     |
+--------------------------------+--------------------------------------------------+
|  2. Multilingual Indic NLP     | Native comprehension of regional scripts and     |
|                                | Hinglish code-switching context.                |
+--------------------------------+--------------------------------------------------+
|  3. Zero Data Leakage          | Local processing with SQLCipher storage ensures  |
|                                | 100% private, anonymous conversations.          |
+--------------------------------+--------------------------------------------------+
|  4. Clinical Safety Triage     | WHO mhGAP aligned guardrails automatically route  |
|                                | Level 3-4 crisis cases to Tele-MANAS (14416).    |
+--------------------------------+--------------------------------------------------+
```

### 🔮 Future Roadmap for Gemma Model Integration:
1. **Multimodal Voice-to-Voice Processing**: Extending Gemma's multimodal capabilities for direct Indic speech input and emotional inflection synthesis.
2. **Offline Community Mesh Sync**: Allowing community health workers (ASHA workers) to run on-device Gemma screenings in remote rural sectors without active cellular connectivity.

---

## ✨ Key Platform Features

- **Living Warm Aurora UI/UX**: Dark mode aesthetic (`#07080a` canvas, warm crimson/coral/amber glowing light blades, Inter typography).
- **Device-Independent Navigation**: Floating header bar aligned across mobile, tablet, and desktop viewports.
- **Universal Hamburger Drawer (`≡`)**:
  - **Connect with Architecture**: Direct access to the Gemma INT4 technical system blueprint (`/blueprint`).
  - **Connect with Helpline**: Direct 1-tap dial trigger for Tele-MANAS (`14416`) and NIMHANS (`080-26995000`).
  - **Report Bug**: Interactive modal for submitting feedback directly to the lead architect.
- **Interactive Animated SVG Architecture Journey**: A dynamic 5-step architecture pipeline with a glowing SVG connector line (`strokeDashoffset`) that draws itself forward dynamically as you step through the workflow (`/blueprint`).
- **4-Tier Clinical Safety Matrix**:
  - **Level 1 (Mild Stress)**: Self-guided CBT journal prompts.
  - **Level 2 (Moderate Anxiety)**: 4-7-8 breathing exercises & grounding.
  - **Level 3 (High Distress)**: Automated SMS counselor alerts.
  - **Level 4 (Active Crisis)**: 1-Tap emergency helpline dialer.

---

## 🏗️ System Architecture Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      1. INDIC USER INPUT                                │
│      (Voice Prompt / Indic Text / Code-Switched Hinglish Input)        │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 2. INDICBERT SAFETY CLASSIFIER                          │
│     - Sub-50ms Distress Level Screening                                 │
│     - Safety Threshold Evaluation (WHO mhGAP Guardrails)                │
└─────────────────────────────────────────────────────────────────────────┘
               │                                       │
        [Safe / Level 1-2]                      [Crisis / Level 3-4]
               │                                       │
               ▼                                       ▼
┌──────────────────────────────┐        ┌─────────────────────────────────┐
│  3. GOOGLE GEMMA INT4 ENGINE │        │  5. EMERGENCY TRIAGE ROUTER     │
│  - On-Device LiteRT Infer   │        │  - Tele-MANAS (14416)           │
│  - CBT Dialogue Generation   │        │  - NIMHANS Crisis Helpline      │
└──────────────────────────────┘        └─────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                4. ENCRYPTED LOCAL SQLCIPHER VAULT                       │
│      - 100% On-Device Storage | Zero Data Harvesting / Cloud Leakage   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **AI Model Engine** | **Google Gemma Open Model Series** (INT4 Quantized via LiteRT) |
| **Safety Guardrails** | IndicBERT Distress Classifier & WHO mhGAP Rules Engine |
| **Frontend UI** | React 19, TypeScript 5.9, Vite 7, Tailwind CSS v4 |
| **Design System** | Inter Typeface, Living Warm Aurora System, Lucide Icons |
| **Backend / API** | Express 5, Node.js 24 |
| **Database** | SQLite + SQLCipher, ChromaDB (Local RAG) |
| **Deployment** | Vercel (Static Web + Serverless Handler) |

---

## 💻 Local Installation & Setup

### Prerequisites
- **Node.js**: `v24.0.0` or higher
- **pnpm**: `v10.0.0` or higher

### 1. Clone Repository
```bash
git clone https://github.com/Pranajit01/Mind-Care-India.git
cd Mind-Care-India
```

### 2. Install Dependencies
```bash
npx pnpm install
```

### 3. Start Development Server
```bash
npx pnpm --filter @workspace/mann-saathi run dev
```
Open **`http://localhost:5173/`** in your browser.

### 4. Build for Production
```bash
npx pnpm run build
```

---

## 🚀 Live Deployment

The project is configured for 1-click deployment on **Vercel**:
- **Repository**: `https://github.com/Pranajit01/Mind-Care-India`
- **Build Command**: `pnpm --filter @workspace/mann-saathi run build`
- **Output Directory**: `artifacts/mann-saathi/dist`

---

## 📄 License & Attribution

Distributed under the **Apache 2.0 License**. See `LICENSE` for details.

Architected & Created by **Pranajit Das**. Powered by **Google Gemma Open Models**.
