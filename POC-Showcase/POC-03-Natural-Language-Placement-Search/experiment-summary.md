# POC 3: Intent Extraction & Natural Language Search Engine

> [!NOTE]
> **Module Identifier:** `POC-03-Natural-Language-Placement-Search`  
> **Target API Route:** `POST /api/search-placement`  
> **Model Used:** `meta/llama-3.3-70b-instruct` (NVIDIA NIM)

---

## 1. Objective & Scope
Translates unstructured conversational placement queries from candidates and placement officers into structured JSON criteria (role intent, required skills, degree filters, CGPA thresholds) to perform semantic search and ranking across job opportunities.

---

## 2. Test Execution Matrix (7 Synthetic Query Scenarios)

| Test Case | Scenario Category | Input Query String | Extracted Intent Criteria | Match Results | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POC3-TC-01** | Technical Search | *"Find AI/ML roles requiring Python and PyTorch."* | Role: `AI/ML`, Skills: `[Python, PyTorch]` | TechCorp AI/ML Engineer | **PASS** |
| **POC3-TC-02** | Eligibility Search | *"Show jobs I can apply to with a 7.5 CGPA in CSE."* | CGPA: `7.5`, Degree: `CSE` | CloudScale, FinTech, DataDrive | **PASS** |
| **POC3-TC-03** | Semantic Backend | *"Server-side roles building APIs with Express & Node."* | Role: `Backend`, Skills: `[Express, Node]` | CloudScale, FinTech | **PASS** |
| **POC3-TC-04** | Broad Category | *"I want frontend opportunities."* | Role: `Frontend` | CloudScale Frontend React Dev | **PASS** |
| **POC3-TC-05** | Multi-Constraint | *"Internships for CSE with CGPA > 8 & Python."* | Degree: `CSE`, Min CGPA: `8.0`, Skill: `Python` | TechCorp AI/ML Engineer | **PASS** |
| **POC3-TC-06** | Conversational | *"Interested in ML but don't want a senior role."* | Domain: `Machine Learning`, Seniority: `Junior/Mid` | TechCorp AI/ML Engineer | **PASS** |
| **POC3-TC-07** | Zero-Result Match | *"Quantum computing internships requiring Rust and CUDA."* | Specialty: `Quantum Computing`, Skills: `[Rust, CUDA]` | 0 Matches (Clean Empty State) | **PASS** |

---

## 3. Key Findings
- NVIDIA Llama 3.3 70B reliably parses complex natural language multi-constraint filters into strict JSON parameters.
- Empty states (**POC3-TC-07**) are handled gracefully without false positive matches.
