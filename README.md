# PlacementHub AI Lab — Interactive SaaS Prototype Platform

> **Production-Ready Wireframe Suite & Interactive SaaS Frontend**
> Built with HTML5, Vanilla CSS, and Vanilla JavaScript (ES Modules). Zero build step or server runtime required — 100% compatible with GitHub Pages and Vercel static hosting.

---

## 🚀 Overview

**PlacementHub AI Lab** is a high-fidelity, interactive SaaS web application demonstrating an AI-powered campus recruitment operations and student career coaching platform.

The prototype converts static wireframe designs into a state-driven, interactive user experience using realistic mock datasets, simulated AI API response latencies, dynamic filter pipelines, `localStorage` persistence, and rich contextual feedback.

---

## ⚡ Key Features & Proofs of Concept (POCs)

### 1. Operations Dashboard (`dashboard.html`)
- **Dynamic KPI Summary**: Live indicators for Total Candidates (1,248), Placements (94), Active Drives (42), and AI Match Confidence (96.4%).
- **Simulated Data Refresh**: Header action button triggers a 1.2s loading overlay and updates metrics dynamically.
- **Interactive Activity Feed**: Live text search, tool category dropdowns (*Matching*, *Resume*, *Search*, *Copilot*), status filtering, removable filter chips, and paginated navigation.
- **Placement Trends Analytics**: Interactive chart switcher toggling between *Placements Count*, *Resume Score Averages*, and *Response Times*.

### 2. Candidate Matching (`poc1-student-job-matching.html`)
- **AI Skill Alignment Matrix**: Ranks 148 candidates against job requirements with match confidence progress bars.
- **Real-Time Filter Pipeline**: Search candidates by name/skills, filter by department (*CSE*, *IT*, *ECE*), target role (*AI Research*, *Full Stack*, *Backend*), and minimum score thresholds (≥90%, ≥80%, ≥70%).
- **Contextual Bulk Action Toolbar**: Multi-select checkboxes reveal a high-contrast dark toolbar with **Compare**, **Shortlist**, **Export to CSV**, and **Clear selection** actions.
- **⚡ AI Match Analysis**: Simulates a 1.5s neural skill alignment execution (`showLoadingOverlay`) that recalculates rankings and shortlists top matches automatically.
- **Candidate Detail Drawer Sheet**: Opens a Right Drawer displaying candidate profile tabs (*Why matched*, *Matched Skills*, *Gaps & Missing*, *Score Details*).
- **Compare Candidates Modal**: Side-by-side criteria evaluation matrix with an automated AI recommendation engine.

### 3. Resume Review & ATS Scorer (`poc2-resume-analyzer.html`)
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
- **Cross-POC Inline CTAs**: AI responses include direct action buttons (*"Open Candidate Matching →"*, *"Review Resume →"*, *"View Drives →"*) that navigate directly to corresponding POC pages.
- **Collapsible Context Rail**: Right sidebar displaying active candidate details, linked context files, and quick navigation links.

### 6. AI Student Career Coach (`poc5-career-coach.html`)
- **6-Stage Readiness Roadmap**: Clickable stage stepper (*1. Baseline*, *2. Resume*, *3. Technical*, *4. System Design*, *5. Practice Interviews*, *6. Placement Clearance*) with locked/unlocked state progression.
- **Active Stage Workspace**: Interactive checklist tasks that dynamically update the overall readiness score (e.g. `92.4%`).
- **7-Day Weekly Planner**: Interactive day grid for tracking daily practice tasks.
- **Sortable Skills Matrix**: Renders skill gap severities (High, Medium, None) with custom sorting options.
- **Practice Interview Evaluator**: Interactive Q&A textareas with 1s simulated AI grading, score breakdown, and benchmark answers.
- **Celebration Modal (🎉 Placement Ready!)**: Triggers a victory modal when all 6 stages are completed.
- **`localStorage` Persistence**: Persists stage completion, weekly planner states, and readiness calculations.

---

## 🛠️ Technology Stack & Architecture

- **Core**: HTML5, Vanilla JavaScript (ES Modules, `type="module"`), Vanilla CSS (`wireframe.css`).
- **Design System**: Monochrome typography, subtle borders, high-contrast dark badges, custom CSS variables (`--bg-surface`, `--text-primary`, `--border-medium`).
- **State Management**: Centralized reactive state modules (`data/mockData.js`, `js/components.js`).
- **Persistence**: Web Storage API (`localStorage`) for saved searches, copilot sessions, and career coach progress.
- **Zero Build Step**: No npm, webpack, Vite, or node_modules required — native static delivery.

---

## 📂 Folder Structure

```text
PlacementHub-AI-Lab/
├── index.html                                 # Root entry point (Redirects to Home Portal)
├── vercel.json                                # Static deployment configuration for Vercel
├── PlacementHub-AI-Lab-Wireframes/
│   ├── index.html                             # Home Portal & Platform Tool Directory
│   ├── dashboard.html                         # Operations Dashboard
│   ├── poc1-student-job-matching.html         # POC 1: Candidate Matching
│   ├── poc2-resume-analyzer.html              # POC 2: Resume Review & ATS Scorer
│   ├── poc3-placement-search.html             # POC 3: Natural Language Placement Search
│   ├── poc4-placement-copilot.html            # POC 4: Placement Copilot Assistant
│   ├── poc5-career-coach.html                 # POC 5: AI Student Career Coach
│   ├── wireframe.css                          # Core Design System & UI Components
│   ├── data/
│   │   └── mockData.js                        # Centralized Mock Datasets
│   └── js/
│       ├── main.js                            # Navigation & Cmd+K Initialization
│       ├── components.js                      # Toast, Modal, Drawer & Cmd+K Module
│       ├── dashboard.js                       # Operations Dashboard Controller
│       ├── candidate-matching.js              # Candidate Matching Controller
│       ├── resume-analyzer.js                 # Resume Review Controller
│       ├── placement-search.js                # Placement Search Controller
│       ├── placement-copilot.js               # Placement Copilot Controller
│       └── career-coach.js                    # Career Coach Controller
└── README.md                                  # Platform Documentation
```

---

## 💻 Running Locally

No installation or build tools are required!

### Option 1: Direct Browser Access
Open `PlacementHub-AI-Lab/index.html` directly in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (VS Code / Python)
Run a local static server from the project directory:

```bash
# Python 3
python -m http.server 8000
```

Navigate to `http://localhost:8000/index.html` in your browser.

---

## 🌐 Deployment Instructions

### Deploying to GitHub Pages (Manual Upload)
1. Drag and drop the `PlacementHub-AI-Lab` repository folder into GitHub.
2. In your GitHub repository, navigate to **Settings › Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Set the branch to `main` and folder to `/ (root)`. Click **Save**.
5. Your application will be live at `https://<your-username>.github.io/<repository-name>/`.

### Deploying to Vercel (Manual Upload / Git Sync)
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New... › Project**.
3. Import your GitHub repository or drag & drop the root folder into the Vercel project importer.
4. Leave **Build Command** and **Output Directory** empty (Vercel automatically detects static HTML/JS projects using `vercel.json`).
5. Click **Deploy**. Your site will be live instantly with global CDN acceleration.

---

## 📄 License

This project is open-source and released under the **MIT License**.
