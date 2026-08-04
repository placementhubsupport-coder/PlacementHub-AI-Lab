# 🤖 PlacementHub AI Lab (v1.0.0)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Standardized-black.svg)](https://ui.shadcn.com/)

> **PlacementHub AI Lab** is an open-source AI research and demonstration platform showcasing next-generation artificial intelligence applications for campus recruitment, talent matching, automated ATS resume evaluation, natural language search, and agentic career mentorship.

---

## 📸 Screenshots & Visual Walkthrough

> See our [Screenshots Showcase Guide](docs/screenshots/README.md) for full 1080p visual previews of each AI module.

---

## 🌟 Key Featured AI Showcase Modules

### 📊 Executive Dashboard (`/`)
- Real-time status monitoring for NVIDIA NIM microservices (`NV-Embed-QA`, `Llama 3.1 70B`).
- Department candidate match conversion analytics powered by Recharts.
- Filterable real-time activity stream for campus recruitment drives.

### ⚡ POC 01 — AI Student–Job Matching (`/poc-01`)
- High-dimensional semantic vector matching between student skill matrices and corporate job criteria.
- **Explainable Match Reasoning**: Transparent breakdown of matched skills, missing skills, candidate project relevance, and cosine similarity scores (`0.964`).
- **Side-by-Side Comparison**: Candidate comparison matrix evaluating CGPA, resume quality, and AI verdict.
- **48–50vw Match Sheet**: Enterprise-grade candidate preview drawer with sticky export actions.

### 📑 POC 02 — AI Resume Analyzer (`/poc-02`)
- Instant resume parsing & role-based ATS compatibility scoring (`0–100`).
- Automated detection of missing high-impact keywords and skill gaps.
- AI bullet phrasing recommendations to increase ATS index ranking.

### 🔍 POC 03 — Placement Search Engine (`/poc-03`)
- ChatGPT-like conversational natural language search across recruitment drives.
- **AI Extracted Filter Banner**: Visual breakdown of parsed role, location, stipend thresholds, and vector dimensions.
- Responsive drive match cards with match confidence indicators.

### 🤖 POC 04 — Placement Copilot Assistant (`/poc-04`)
- Intent-based AI orchestration assistant supporting multi-turn conversations.
- Context-aware responses for Greetings, Resume Analysis, Job Search, Student Matching, and Career Guidance.
- Embedded CTA buttons for one-click navigation across AI showcase modules.

### 🎓 POC 05 — AI Student Career Coach (`/poc-05`)
- Step-by-step visual career progression roadmap (Current Baseline → Resume Optimization → Technical DSA → Projects → Mock Interviews → Placement Ready).
- Categorized skill gap analysis (*Strong*, *Developing*, *Missing*).
- 7-day personalized weekly learning schedule and interactive mock interview Q&A.

---

## 🏗 High-Level Architecture Flow

```text
Frontend UI (React 18 + Shadcn UI)
          │
          ▼
Async Service Layer (src/services/)
          │
          ▼
NVIDIA NIM Microservice Containers (NV-Embed-QA / Llama 3.3 70B)
          │
          ▼
PostgreSQL / SQLite Storage Layer
```

For a detailed architecture overview, see [docs/architecture.md](docs/architecture.md).

---

## 🛠 Technology Stack

- **Frontend**: React 18, Vite 5
- **UI Components**: Shadcn UI, Radix UI Primitives, Tailwind CSS
- **Icons & Typography**: Lucide React, Geist Variable Typography
- **Animations & Visualization**: Framer Motion, Recharts
- **Markdown & Code**: `react-markdown`
- **Architecture**: Async Service Abstraction Layer (`src/services/`) decoupled from mock data (`src/data/`)

---

## 📁 Repository Directory Structure

```text
PlacementHub-AI-Lab/
├── docs/                           # Architecture, overview, and roadmap docs
│   ├── architecture.md
│   ├── project-overview.md
│   ├── future-roadmap.md
│   └── screenshots/                # Visual screenshot showcase guide
│       └── README.md
├── POC-Showcase/                   # Experiment notes & POC summaries
├── public/                         # Static web assets & icons
├── src/
│   ├── assets/                     # Styles, global fonts, logos
│   ├── components/
│   │   ├── common/                 # ThemeProvider, ErrorBoundary
│   │   ├── layout/                 # Shared header, sidebar, footer
│   │   └── ui/                     # Official Shadcn UI primitives
│   ├── data/                       # Modular mock datasets (JSON format)
│   ├── features/                   # AI Proof of Concept Feature Modules
│   ├── hooks/                      # Custom React hooks (useTheme, useLocalStorage)
│   ├── layouts/                    # Master DashboardLayout wrapper
│   ├── lib/                        # Utility functions (cn, clsx, tailwind-merge)
│   ├── services/                   # Asynchronous API Service Abstraction Layer
│   └── styles/                     # Tailwind globals and HSL CSS tokens
├── components.json                 # Official Shadcn CLI configuration
├── jsconfig.json                   # Path mapping (@/* -> ./src/*)
├── package.json                    # Project dependencies & build scripts
├── tailwind.config.js              # Tailwind theme configuration
└── vite.config.js                  # Vite bundler configuration
```

---

## 🚀 Quick Start & Local Execution

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Execution

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/placementhub/placementhub-ai-lab.git
   cd placementhub-ai-lab
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🗺 Future Roadmap

- [ ] Connect live `NV-Embed-QA` NIM container for real-time vector embedding generation.
- [ ] Connect `Llama 3.3 70B Instruct` NIM container for live streaming Copilot responses.
- [ ] Implement TensorRT-LLM FP8 model quantization for sub-10ms inference latencies.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 💖 Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/) for official component primitives.
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives.
- [Lucide Icons](https://lucide.dev/) for clean vector icons.
- [NVIDIA NIM](https://www.nvidia.com/en-us/ai/) for AI microservice architecture inspiration.
