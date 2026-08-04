# POC 2: AI Resume & CV Alignment Analyzer

> [!NOTE]
> **Module Identifier:** `POC-02-Resume-Analyzer`  
> **Target API Route:** `POST /api/analyze-resume`  
> **Model Used:** `meta/llama-3.3-70b-instruct` (NVIDIA NIM)

---

## 1. Objective & Scope
Evaluates raw resume text against structured job profiles by separating deterministic hard criteria (academic thresholds, degree requirements) from AI-powered semantic content analysis (skill extraction, project complexity, and missing domain competencies).

---

## 2. Test Execution Matrix (5 Synthetic Scenarios)

| Test Case | Scenario Description | Student Profile | Job Opportunity | Expected Hard Result | Expected Semantic Score | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **POC2-TC-01** | Strong Alignment | Aarav Sharma *(CSE, 8.9 CGPA)* | AI/ML Engineer | **PASS** (CGPA 8.9 >= 8.0) | **Score >= 85** (PyTorch, Python) | **PASS** |
| **POC2-TC-02** | Moderate Alignment | Priya Patel *(CSE, 7.2 CGPA)* | Frontend React Dev | **PASS** (CGPA 7.2 >= 7.0) | **Score >= 75** (React, JS, HTML) | **PASS** |
| **POC2-TC-03** | Missing Tech Skills | Ananya Iyer *(IT, 6.1 CGPA)* | AI/ML Engineer | **FAIL** (CGPA 6.1 < 8.0) | **Score < 50** (Missing ML Stack) | **PASS** |
| **POC2-TC-04** | High Skill / Hard Fail | Devansh Gupta *(CSE, 6.2 CGPA)* | AI/ML Engineer | **FAIL** (CGPA 6.2 < 8.0) | **Score >= 85** (Deep CUDA/PyTorch) | **PASS** |
| **POC2-TC-05** | Unrelated Combination | Rohan Verma *(Mech, 8.5 CGPA)* | AI/ML Engineer | **FAIL** (Degree Mismatch) | **Score < 30** (CAD vs AI/ML) | **PASS** |

---

## 3. Key Architectural Insight
Highlighting cases like **POC2-TC-04** demonstrates why a dual-engine architecture is essential: candidate Devansh Gupta possesses exceptional AI/ML project skills (high semantic match), but fails hard institutional eligibility (CGPA below minimum requirement).
