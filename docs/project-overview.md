# Project Overview — PlacementHub AI Lab

**PlacementHub AI Lab** is a standalone, open-source AI Proof of Concept (POC) research showcase demonstrating next-generation artificial intelligence applications for campus recruitment, talent matching, resume evaluation, natural language search, and agentic career coaching.

---

## 🎯 Objectives & Purpose

Campus placement workflows traditionally rely on manual resume screening, keyword filtering, and rigid criteria matching. **PlacementHub AI Lab** explores how modern LLM architectures (e.g. **NVIDIA Llama 3.1 70B**) and dense vector embedding models (e.g. **NVIDIA NV-Embed-QA**) can transform campus hiring into an explainable, data-driven experience.

---

## 🚀 Featured AI Showcase Modules

| Module ID | Feature Name | Core AI Capability | Architecture & Model Showcase |
| :--- | :--- | :--- | :--- |
| **Overview** | **Executive Dashboard** | System Health & Infrastructure Monitoring | NVIDIA DGX Cloud NIM status, candidate match analytics |
| **POC 01** | **AI Student–Job Matching** | Semantic Vector Matching & Reasoning | `NV-Embed-QA` 1,024-Dim embeddings + explainable match scores |
| **POC 02** | **AI Resume Analyzer** | Automated ATS Evaluation & Phrasing | `Llama 3.1 70B Struct-Extract` parsing & skill gap analysis |
| **POC 03** | **Placement Search Engine** | Conversational Query Vector Search | Natural language prompt query extraction & drive matching |
| **POC 04** | **Placement Copilot** | Intent-Based AI Orchestration | Multi-turn conversational assistant with module orchestration |
| **POC 05** | **AI Student Career Coach** | Agentic Mentorship & Skill Bridging | Personalized 7-day learning roadmaps & mock technical interview prep |

---

## ⚙️ Technology Stack

- **Core Framework**: React 18 with Vite
- **UI & Component System**: Official Shadcn UI primitives, Radix UI accessibility layer, Tailwind CSS
- **Icons & Typography**: Lucide React, Geist Variable Typography
- **Animations & Charts**: Framer Motion, Recharts
- **Service Layer**: Asynchronous API service abstractions (`src/services/`) ready for direct REST/WebSocket NVIDIA NIM integration.
