# System Architecture — PlacementHub AI Lab

This document outlines the system architecture, component composition patterns, data flow, and service abstraction layer implemented across PlacementHub AI Lab.

---

## 🏗 High-Level System Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND UI                                │
│                     (React 18 + Vite + Shadcn UI)                       │
├───────────────┬─────────────────┬───────────────┬───────────────────────┤
│ Executive     │ Student-Job     │ Resume        │ Placement Search &    │
│ Dashboard     │ Vector Matcher  │ ATS Analyzer  │ Copilot Assistants    │
└───────┬───────┴────────┬────────┴───────┬───────┴───────────┬───────────┘
        │                │                │                   │
        ▼                ▼                ▼                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       ASYNC SERVICE LAYER (`src/services/`)             │
│   (decoupled async API modules wrapping data fetching & NIM simulation) │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │  FUTURE REST / WEBSOCKET APIS  │
                 └───────────────┬───────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     NVIDIA NIM MICROSERVICE CONTAINERS                  │
├────────────────────────────────┬────────────────────────────────────────┤
│  NV-Embed-QA Vector Indexing   │  Llama 3.3 70B Instruct LLM Engine    │
│  (1,024-Dim Cosine Similarity) │  (Sub-10ms TensorRT-LLM Inference)    │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     PERSISTENT STORAGE LAYER                           │
│             (PostgreSQL / SQLite Candidate DB & Vector Index)          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🏢 Architectural Design Principles

1. **Decoupled Service Layer (`src/services/`)**:
   - React UI views never consume raw database or JSON data files directly.
   - All async data fetching methods are isolated inside `src/services/<module>Service.js`.
   - Connecting to live NVIDIA NIM containers requires editing only the service layer files—leaving 100% of the UI layout intact.

2. **Single-Responsibility Component Breakdown (< 300 Lines per File)**:
   - Views are composed from focused sub-components inside `src/features/<module>/components/`.

3. **Official Shadcn UI Primitives**:
   - Built on Radix UI primitives (`Slot`, `Dialog`, `Sheet`, `Table`, `DropdownMenu`, `Progress`, `Avatar`, `Separator`, `ScrollArea`, `Skeleton`, `Alert`, `Accordion`) styled via Tailwind CSS.

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
│   │   ├── dashboard/              # Executive Dashboard View & Components
│   │   ├── student-job-matching/   # POC 01 Vector Matching Engine
│   │   ├── resume-analyzer/        # POC 02 ATS Evaluator
│   │   ├── placement-search/       # POC 03 Natural Language Search
│   │   ├── placement-copilot/      # POC 04 Intent Orchestration Copilot
│   │   └── career-coach/           # POC 05 Agentic Career Mentorship
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
