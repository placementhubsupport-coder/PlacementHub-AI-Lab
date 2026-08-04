# PlacementHub AI Lab – Proof of Concept (POC) Showcase Directory

> [!IMPORTANT]
> **Exploratory Proof of Concept Showcase:**
> All 5 POC modules in this directory demonstrate NVIDIA NIM AI capabilities (`meta/llama-3.3-70b-instruct`) using 100% synthetic datasets. Zero production data or live placement databases were accessed.

---

## 📁 Showcase Structure

```
POC-Showcase/
├── README.md                                 # Master POC Showcase Index (This File)
├── POC-01-Student-Job-Matching/              # POC 1: Student-Job Compatibility & Hard Eligibility Engine
│   └── experiment-summary.md
├── POC-02-Resume-Analyzer/                   # POC 2: AI Resume & CV Alignment Analyzer
│   └── experiment-summary.md
├── POC-03-Natural-Language-Placement-Search/ # POC 3: Intent Extraction & Natural Language Search Engine
│   └── experiment-summary.md
├── POC-04-Placement-Copilot/                 # POC 4: Placement Officer AI Copilot & Risk Advisory Assistant
│   └── experiment-summary.md
└── POC-05-AI-Student-Career-Coach/           # POC 5: AI Student Career Coach & Placement Readiness Advisor
    └── experiment-summary.md
```

---

## 🎯 Summary of the 5 POC Modules

### 1. POC 1: Student–Job Compatibility Engine (`POC-01-Student-Job-Matching`)
- **Objective:** Evaluates candidate resumes against job requirements using NVIDIA Llama 3.3 70B Instruct.
- **Key Features:** Hard eligibility check (CGPA/degree), qualitative feedback, compatibility score (0-100), and improvement recommendations.
- **Test Matrix:** 5 synthetic scenario pairs (Strong Match, Moderate Match, Academic Mismatch, Skill Mismatch, Seniority Mismatch).

### 2. POC 2: AI Resume & CV Alignment Analyzer (`POC-02-Resume-Analyzer`)
- **Objective:** Dual-engine parsing separating hard deterministic eligibility from semantic resume content alignment.
- **Key Features:** Breakdown of matched/missing technical skills, project domain relevance, and academic qualification verification.
- **Test Matrix:** 5 test cases evaluating dual-score output across diverse candidate profiles.

### 3. POC 3: Natural Language Placement Intent Search (`POC-03-Natural-Language-Placement-Search`)
- **Objective:** Translates natural language placement queries from students and placement officers into structured search criteria.
- **Key Features:** Extracts role intent, skill requirements, CGPA filters, degree criteria, and returns ranked placement opportunities.
- **Test Matrix:** 7 test scenarios (exact skills, CGPA threshold search, conversational queries, negative zero-result matches).

### 4. POC 4: Placement Copilot & Advisory Assistant (`POC-04-Placement-Copilot`)
- **Objective:** AI-assisted decision-support dashboard for Placement Officers (TPOs).
- **Key Features:** Automated placement overview metrics, risk cards identifying students needing immediate intervention, and draft communication templates.
- **Test Matrix:** End-to-end verification of TPO query classification and risk advisory card generation.

### 5. POC 5: AI Student Career Coach (`POC-05-AI-Student-Career-Coach`)
- **Objective:** Personalized career guidance engine helping students build placement readiness over time.
- **Key Features:** Target role evaluation (9 roles), visual readiness score (0-100%), skill gap analysis, 5-week milestone roadmap, resume suggestions, recommended target companies, and AI career assistant chat area.
- **Test Matrix:** 4 synthetic test cases evaluating readiness score, gap analysis, career roadmap, and advisory ethical guardrails.

