# POC 4: Placement Officer AI Copilot & Risk Advisory Assistant

> [!NOTE]
> **Module Identifier:** `POC-04-Placement-Copilot`  
> **Target API Route:** `POST /api/copilot/query`  
> **Model Used:** `meta/llama-3.3-70b-instruct` (NVIDIA NIM)

---

## 1. Objective & Scope
Provides Placement Officers (TPOs) with an advisory AI assistant that aggregates cohort statistics, identifies high-risk candidates (e.g., low placement activity, missing core skills, CGPA near thresholds), and generates actionable intervention recommendations and communication drafts.

---

## 2. Test Execution Matrix

| Test Case | Query Intent | Simulated Input | Expected Output Artifacts | Status |
| :--- | :--- | :--- | :--- | :--- |
| **COPILOT-TC-01** | Risk Identification | *"Who needs immediate attention?"* | Headline summary + Structured Candidate Risk Cards | **PASS** |
| **COPILOT-TC-02** | Placement Overview | *"Give me a summary of placement stats"* | Batch statistics (Placed, Unplaced, Eligible, Total) | **PASS** |
| **COPILOT-TC-03** | Communication Draft | *"Draft reminder email for unplaced CSE students"* | Subject line, pre-populated email body, TPO review disclaimer | **PASS** |
| **COPILOT-TC-04** | Default Fallback | *(Empty Query Click)* | Default Cohort Health Report + Priority Action Items | **PASS** |

---

## 3. Governance & Legal Safety Safeguard
All copilot responses strictly enforce the mandatory decision-support disclaimer:
> *"AI Placement Copilot decision-support advisory. Final placement actions require TPO authorization."*
