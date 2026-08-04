# POC 5: AI Student Career Coach & Placement Readiness Advisor

> [!NOTE]
> **Module Identifier:** `POC-05-AI-Student-Career-Coach`  
> **Target API Route:** `POST /api/career-coach/analyze`  
> **Model Used:** `meta/llama-3.3-70b-instruct` (NVIDIA NIM)

---

## 1. Objective & Scope
Serves as an AI-powered personalized career coach designed to guide students on improving their placement readiness over time. The module analyzes candidate profile data against selected target career goals (*Software Engineer, Backend Developer, Frontend Developer, Full Stack Developer, AI Engineer, Data Analyst, Product Manager, Cyber Security, DevOps Engineer*), calculates a visual readiness score, performs skill gap analysis, generates a 5-week milestone roadmap, provides resume advice, recommends matching companies, and answers interactive career queries.

---

## 2. Key Architecture & File Components
- **Backend Service:** `src/services/careerCoachService.js`
- **Controller:** `src/controllers/careerCoachController.js`
- **Route:** `src/routes/careerCoachRoutes.js` (`POST /api/career-coach/analyze`)
- **Database Schema:** Extended SQLite `students` schema (`graduation_year`, `resume_status`, `github`, `portfolio`)
- **Frontend Dashboard:** 10 structured sections in `public/index.html`, `public/styles.css`, and `public/app.js`
- **Automated Test Suite:** `tests/test_career_coach.js`

---

## 3. Test Execution Matrix

| Test Case | Candidate | Target Goal | Prompt / Query | Key Output Artifacts | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **COACH-TC-01** | Aarav Sharma (STU-001) | AI Engineer | *"How can I improve my placement chances"* | Readiness Score (74%), 5-Week Roadmap, Skill Gaps (ML, DL), Company Recommendations | **PASS** |
| **COACH-TC-02** | Priya Patel (STU-002) | Frontend Developer | *"What projects should I build"* | Readiness Score (82%), UI Project suggestions, Skill Gaps (REST APIs), Resume Advice | **PASS** |
| **COACH-TC-03** | Ananya Iyer (STU-004) | Backend Developer | *"Suggest a 30-day preparation plan"* | Readiness Score (52%), 30-Day Milestone Roadmap, Spring Boot/SQL Gap Analysis | **PASS** |
| **COACH-TC-04** | Rohan Verma (STU-003) | DevOps Engineer | *"Which companies should I target"* | Readiness Score (49%), Linux/Docker Skill Gaps, Target Company Matching | **PASS** |

---

## 4. Governance & Ethical Safeguards
1. **Advisory Capacity Only:** The AI Student Career Coach assists students with recommendations and guidance only.
2. **Strict Guardrails:** The module **NEVER** guarantees placement, **NEVER** calculates official academic eligibility, and **NEVER** makes hiring decisions.
3. **Mandatory Disclaimer:**
   > *"AI Student Career Coach is an advisory tool. It does not guarantee placement, determine official eligibility, or make hiring decisions."*
