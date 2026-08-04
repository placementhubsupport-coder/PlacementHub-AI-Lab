import copilotData from '@/data/placementCopilot.json';

/**
 * Placement Copilot Service Layer
 * Intent-based mock AI orchestration engine ready for NVIDIA NIM / Llama 3.3 70B APIs.
 */
export const copilotService = {
  /**
   * Fetch conversation history list
   */
  async getConversations() {
    return Promise.resolve(copilotData.conversations);
  },

  /**
   * Fetch details for a specific conversation ID
   */
  async getConversationById(convId) {
    const conv = copilotData.conversations.find((c) => c.id === convId);
    return Promise.resolve(conv || copilotData.conversations[0]);
  },

  /**
   * Fetch suggested prompt cards
   */
  async getSuggestedPrompts() {
    return Promise.resolve(copilotData.suggestedPrompts);
  },

  /**
   * Detect user intent from input string
   * @param {string} userText 
   * @returns {string} Intent key
   */
  detectIntent(userText) {
    const q = userText.toLowerCase().trim();

    if (/^(hi|hello|hey|greetings|good morning|good afternoon|howdy)/.test(q)) {
      return 'greeting';
    }
    if (/resume|cv|ats|analyze|score|formatting|review/.test(q)) {
      return 'resume_analysis';
    }
    if (/job|internship|openings|react|python|remote|pune|bangalore|stipend|ctc|salary/.test(q)) {
      return 'job_search';
    }
    if (/match|candidate|compare|techcorp|student|roster/.test(q)) {
      return 'student_matching';
    }
    if (/career|roadmap|study plan|interview|prep|coaching|guidance/.test(q)) {
      return 'career_guidance';
    }
    return 'unknown';
  },

  /**
   * Generate structured, intent-aware AI response
   * @param {string} intent 
   * @param {string} userText 
   * @returns {Object} Normalized message object
   */
  generateMockResponse(intent, userText) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let content = '';
    let cta = null;

    switch (intent) {
      case 'greeting':
        content = `Hello! 👋 I am your **Placement Copilot**, an AI-powered assistant designed for campus placement preparation and recruitment analytics.

### 🤖 What I Can Help You With:
1. **Resume Analysis & ATS Scoring:** Evaluate formatting, keyword alignment, and ATS compatibility.
2. **Student–Job Matching:** Vector-match candidates with corporate job criteria using NV-Embed-QA.
3. **Placement Search Engine:** Search recruitment drives using natural language prompts.
4. **AI Career Coaching:** Generate personalized 7-day study plans and mock technical interviews.

---

### 💡 Try Asking Me:
- *"Analyze candidate resume for TechCorp"*
- *"Find remote React internships in Pune with stipend > ₹20K"*
- *"Compare top candidates for AI Research Engineer role"*
- *"Generate technical interview prep questions for CUDA"*`;
        break;

      case 'resume_analysis':
        content = `### 📑 Candidate Resume Analysis & ATS Score Report

**Target Role:** Senior AI / ML Research Engineer  
**ATS Compatibility Score:** \`94 / 100\` (High Pass)  
**Vector Match Score:** \`96.4%\`

#### 🌟 Key Candidate Strengths
- **PyTorch & LLM Fine-Tuning:** Demonstrated experience fine-tuning Llama 3 70B via QLoRA.
- **Vector Search Indexing:** High-throughput FAISS vector retrieval implementation.
- **Academic Distinction:** 9.4 CGPA in Computer Science & Engineering.

#### ⚠ Identified Skill Gaps
- **TensorRT-LLM FP8 Quantization:** Missing explicit model quantization metrics.
- **Kubernetes Cluster Management:** Container orchestration recommended for MLOps roles.

#### 🚀 Recommended Next Actions
- Quantize model benchmarks to achieve sub-10ms inference latency.
- Include direct GitHub links to open-source vector retrieval repositories.`;
        cta = {
          label: 'Launch Resume Analyzer (POC 02)',
          targetPoc: 'poc-02'
        };
        break;

      case 'job_search':
        content = `### 🎯 Natural Language Placement Search Results

Query extracted: **"${userText}"**

#### 1. PuneTech Innovations — *Frontend React Engineering Intern*
- **Location:** Pune / Remote (100% Match)
- **Stipend:** ₹25,000 / month (PPO: ₹8 - ₹12 LPA)
- **Match Score:** \`96.8%\`
- **Matched Skills:** \`React\`, \`TypeScript\`, \`Tailwind CSS\`

#### 2. Cognitive Scale AI Labs — *React & GenAI UI Developer Intern*
- **Location:** Pune (Hybrid)
- **Stipend:** ₹30,000 / month (PPO: ₹12 - ₹15 LPA)
- **Match Score:** \`94.2%\`
- **Matched Skills:** \`React\`, \`TypeScript\`, \`State Management\``;
        cta = {
          label: 'Open Placement Search (POC 03)',
          targetPoc: 'poc-03'
        };
        break;

      case 'student_matching':
        content = `### ⚡ AI Student–Job Match Evaluation

**Target Company:** TechCorp AI Labs  
**Candidate Profile:** Arjun Verma (CSE 2026 Batch)

#### 📊 Vector Correlation Metrics
- **AI Match Score:** \`96.4%\`
- **Vector Confidence:** \`High\` (NV-Embed-QA 1,024 Dim)
- **Resume Score:** \`94 / 100\`

#### ✓ Why AI Matched This Candidate
1. PyTorch & Transformer depth aligns 96.4% with TechCorp criteria.
2. Vector retrieval project directly matches company's NIM deployment needs.
3. Top 1% academic standing (9.4 CGPA).`;
        cta = {
          label: 'Open Student Job Matching (POC 01)',
          targetPoc: 'poc-01'
        };
        break;

      case 'career_guidance':
        content = `### 🎓 AI Career Coach & Mentorship Summary

**Placement Readiness Score:** \`92.4%\`  
**Current Milestone:** Step 3 — Deep Technical & DSA Preparation

#### 🗓️ 7-Day Recommended Focus Plan
- **Monday:** React 18 SSR & Server Components
- **Tuesday:** Solve 3 LeetCode Graph & Shortest Path Problems
- **Wednesday:** NVIDIA TensorRT-LLM FP8 Quantization Lab
- **Thursday:** AI Copilot Mock Technical Interview

#### 📚 Recommended Courses
1. *NVIDIA DLI: Model Quantization with TensorRT* (6 Hours)
2. *Advanced Graph Algorithms in C++* (Coursera)`;
        cta = {
          label: 'Open Career Coach (POC 05)',
          targetPoc: 'poc-05'
        };
        break;

      default:
        content = `I'm not sure which PlacementHub module best fits your request: **"${userText}"**.

I can assist you with:

- **Resume Analysis & ATS Scoring** (e.g., *"Analyze candidate resume for TechCorp"*)
- **Student–Job Matching** (e.g., *"Compare top candidates for AI Research role"*)
- **Placement Search** (e.g., *"Find remote React internships in Pune with stipend > ₹20K"*)
- **Career Planning & Interview Prep** (e.g., *"Build a 7-day study plan for CUDA"*)`;
        break;
    }

    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      sender: 'ai',
      content,
      text: content,
      timestamp,
      cta,
      ctaAction: cta
    };
  },

  /**
   * Main entry point called by React UI
   * @param {string} userText 
   * @returns {Promise<Object>}
   */
  async sendMessage(userText) {
    const intent = this.detectIntent(userText);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.generateMockResponse(intent, userText));
      }, 700);
    });
  }
};
