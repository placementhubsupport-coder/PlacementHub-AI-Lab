# PlacementHub AI Solutions — Interactive AI Solutions Showcase

> **Production-Ready Pure Static HTML & Vanilla JS Showcase**
> Built with HTML5, Vanilla CSS, and Vanilla JavaScript (ES Modules). Zero build step or server runtime required — 100% compatible with GitHub Pages and Vercel static hosting.

---

## 🚀 Overview

**PlacementHub AI Solutions** is a high-fidelity, interactive showcase web application demonstrating AI-powered campus recruitment, candidate evaluation, placement operations, and student career coaching solutions.

The showcase presents interactive solution prototypes using realistic mock datasets, simulated AI API response latencies, dynamic filter pipelines, `localStorage` persistence, and rich contextual feedback.

---

## ⚡ Key AI Solutions

### 1. Home Showcase Portal (`index.html`)
- Hero introduction and central directory highlighting the five specialized AI solutions for PlacementHub. Includes an About section detailing the prototype purpose.

### 2. Candidate Matching (`poc1-student-job-matching.html`)
- **AI Skill Alignment Matrix**: Ranks 148 candidates against job requirements with match confidence progress bars.
- **Real-Time Filter Pipeline**: Search candidates by name/skills, filter by department (*CSE*, *IT*, *ECE*), target role (*AI Research*, *Full Stack*, *Backend*), and minimum score thresholds (≥90%, ≥80%, ≥70%).
- **Contextual Bulk Action Toolbar**: Multi-select checkboxes reveal a high-contrast dark toolbar with **Compare**, **Shortlist**, **Export to CSV**, and **Clear selection** actions.
- **⚡ AI Match Analysis**: Simulates a 1.5s neural skill alignment execution (`showLoadingOverlay`) that recalculates rankings and shortlists top matches automatically.
- **Candidate Detail Drawer Sheet**: Opens a Right Drawer displaying candidate profile tabs (*Why matched*, *Matched Skills*, *Gaps & Missing*, *Score Details*).
- **Compare Candidates Modal**: Side-by-side criteria evaluation matrix with an automated AI recommendation engine.

### 3. Resume Analyzer (`poc2-resume-analyzer.html`)
- **Left-Pane Selection List**: Interactive candidate resume cards displaying ATS score badges (`Score 94/100`), file size, and timestamp.
- **Target Role Recalculator**: Changing the *"Compare against"* dropdown (*TechCorp AI Research*, *FinEdge Full Stack*, *DataScale Backend*) triggers a 1s simulated AI recalculation of ATS keyword scores.
- **AI Writing Suggestions Workflow**: Interactive cards supporting:
  - **Apply to Resume**: Increases ATS score (+2 points), updates score indicators in real time, and marks card applied.
  - **Copy**: Copies improved phrasing directly to system clipboard via Clipboard API.
  - **Dismiss**: Animates out suggestion card and updates remaining suggestion count.
- **Resume Upload Simulation**: Drag & drop modal dialog for uploading new candidate resumes with automated keyword extraction and list insertion.
- **Report Actions**: Download text ATS audit reports (`Resume_Review_Report_[Name].txt`) or export CSV score matrices.

### 4. Natural Language Placement Search (`poc3-placement-search.html`)
- **Plain English Search Engine**: Translates natural language queries (e.g. *"Find remote React internships in Pune with stipend above ₹20K and PPO opportunity"*) into structured filter parameters.
- **AI Interpretation Summary**: Displays a chip summary (*"🤖 AI understood query: Filtered React drives in Pune & Remote with stipend ≥ ₹20,000/mo and PPO."*).
- **Editable AI Filter Chips**: Interactive filter chips (*Role*, *Location*, *Min Stipend*, *Offer Type*) with instant `×` clear handlers.
- **Suggested Search Prompts**: One-click quick search chips for popular placement criteria.
- **View & Sort Controls**: Toggle between **Grid View** (cards) and **Table View**, with sorting by *Best Match*, *Highest Stipend*, or *Deadline*.
- **Drive Detail Right Drawer**: Opens complete job description, 3-round selection process steps, and *"Apply Candidates to Drive"* action.
- **`localStorage` Saved Searches**: Save queries and active filters to browser storage with a dedicated saved searches management modal.

### 5. Placement Copilot (`poc4-placement-copilot.html`)
- **Conversational AI Workspace**: ChatGPT/Claude/Copilot-style chat interface for campus recruitment operations.
- **Streaming Character Animation**: Natural text streaming with typing indicators and simulated API tool execution cards (`⚡ Tool Executed: Match & Resume Review`).
- **Session Management**: Session sidebar grouping conversations into *Today* and *Previous 7 days*, with `+ New Session`, clear chat, and delete actions.
- **Cross-Solution Inline CTAs**: AI responses include direct action buttons (*"Open Candidate Matching →"*, *"Review Resume →"*, *"View Drives →"*) that navigate directly to corresponding solution pages.
- **Collapsible Context Rail**: Right sidebar displaying active candidate details, linked context files, and quick navigation links.

### 5. AI Student Participation Analyst (`poc6-student-participation.html`)
- **Participation Anomaly Diagnostic**: Active AI reasoning canvas diagnosing ECE assessment drop-offs and schedule collisions.
- **Predictive Disengagement Cohorts**: Identifies high-risk students before drop-off occurs.

### 6. AI Hiring Performance Analyst (`poc7-hiring-performance.html`)
- **Skill Selection Lift Matrix**: Calculates candidate skill multipliers (+94% selection lift for PyTorch).
- **Predictive Demand & CTC Forecast**: 12-month demand shifts across tech domains with board package exporter.

---

## 🛠️ Technology Stack & Architecture

- **Core**: HTML5, Vanilla JavaScript (ES Modules, `type="module"`), Vanilla CSS (`wireframe.css`).
- **Design System**: Monochrome typography, subtle borders, high-contrast dark badges, custom CSS variables (`--bg-surface`, `--text-primary`, `--border-medium`).
- **State Management**: Centralized reactive state modules (`data/mockData.js`, `js/components.js`).
- **Persistence**: Web Storage API (`localStorage`) for saved searches and copilot sessions.
- **Zero Build Step**: No npm, webpack, Vite, or node_modules required — native static delivery.

---

## 📂 Repository Structure

```text
PlacementHub-AI-Solutions/
├── index.html                                 # Showcase Landing Page
├── poc1-student-job-matching.html             # Candidate Matching Solution
├── poc2-resume-analyzer.html                  # Resume Analyzer Solution
├── poc3-placement-search.html                 # Placement Search Solution
├── poc4-placement-copilot.html                # Placement Copilot Solution
├── poc6-student-participation.html            # Student Participation Analyst Solution
├── poc7-hiring-performance.html               # Hiring Performance Analyst Solution
├── dashboard.html                             # Legacy Standalone Analytics
├── wireframe.css                              # Shared Core Design System & CSS Rules
├── vercel.json                                # Vercel Static Deployment Configuration
├── LICENSE                                    # License File
├── README.md                                  # Documentation
├── data/
│   └── mockData.js                            # Centralized Mock Datasets
└── js/
    ├── main.js                                # Global Navigation & Cmd+K Palette Initialization
    ├── components.js                          # Toast, Modal, Drawer & Cmd+K Module
    ├── candidate-matching.js                  # Candidate Matching Controller
    ├── resume-analyzer.js                     # Resume Analyzer Controller
    ├── placement-search.js                    # Placement Search Controller
    ├── placement-copilot.js                   # Placement Copilot Controller
    ├── student-participation.js               # Student Participation Analyst Controller
    └── hiring-performance.js                  # Hiring Performance Analyst Controller
```

---

## 💻 Running Locally

No installation or build tools are required!

### Option 1: Direct Browser Access
Open `index.html` directly in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (VS Code / Python)
Run a local static server from the project root directory:

```bash
# Python 3
python -m http.server 8000
```

Navigate to `http://localhost:8000` in your browser.

---

## 🌐 Deployment Instructions

### Deploying to Vercel (Recommended)
1. Log in to [Vercel](https://vercel.com).
2. Import your GitHub repository.
3. Leave **Build Command** and **Output Directory** blank (Vercel automatically serves standard static HTML/JS repositories).
4. Click **Deploy**. Every page (`/index.html`, `/poc1-student-job-matching.html`, etc.) is directly accessible with zero 404 errors.

### Deploying to GitHub Pages
1. Push the repository to GitHub.
2. In repository **Settings › Pages**, set **Source** to `Deploy from a branch`.
3. Select branch `main` and folder `/ (root)`. Click **Save**.

---

## 📄 License

This project is open-source and released under the **MIT License**.
