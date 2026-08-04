# POC 1: Student–Job Compatibility & Eligibility Engine

> [!NOTE]
> **Module Identifier:** `POC-01-Student-Job-Matching`  
> **Target API Route:** `POST /api/analyze-match`  
> **Model Used:** `meta/llama-3.3-70b-instruct` (NVIDIA NIM)

---

## 1. Objective & Scope
Demonstrates student-to-job compatibility analysis combining deterministic hard eligibility checks (CGPA, degree requirements) with qualitative NVIDIA LLM semantic evaluation (skills alignment, experience depth, and project relevance).

---

## 2. Test Execution Matrix (5 Synthetic Scenarios)

| Test Case | Scenario Category | Student Profile | Job Opportunity | Expected Result | Score | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Strong Match | Aarav Sharma *(CSE, 8.9 CGPA)* | AI/ML Engineer *(Min 8.0 CGPA)* | Strong domain & CGPA match | **95 / 100** | **PASS** |
| **TC-02** | Moderate Match | Priya Patel *(CSE, 7.2 CGPA)* | Frontend React Developer *(Min 7.0)* | Moderate skill fit | **85 / 100** | **PASS** |
| **TC-03** | Academic Mismatch | Ananya Iyer *(IT, 6.1 CGPA)* | AI/ML Engineer *(Min 8.0 CGPA)* | Ineligible due to CGPA threshold | **40 / 100** | **PASS** |
| **TC-04** | Skill Mismatch | Rohan Verma *(Mech, 8.5 CGPA)* | AI/ML Engineer *(Min 8.0 CGPA)* | Ineligible due to domain mismatch | **20 / 100** | **PASS** |
| **TC-05** | Seniority Mismatch | Ananya Iyer *(Apprentice)* | Senior Java Architect *(5+ Yrs Exp)* | Ineligible due to experience gap | **30 / 100** | **PASS** |

---

## 3. Key Findings
- Average request latency: **~4.87 seconds**.
- Low temperature (`0.1`) yields **0% score variance** across repeated test executions.
- Clear separation between hard threshold violations (CGPA < 8.0) and soft skill alignment.
