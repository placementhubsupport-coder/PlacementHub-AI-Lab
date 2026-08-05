/**
 * PlacementHub AI Lab — Centralized Mock Data Store
 * Contains realistic data for Candidates, Resumes, Placement Drives, 
 * Career Roadmap, Skills, Activity History, and System Health.
 */

export const mockCandidates = [
  {
    id: "cand-1",
    name: "Arjun Verma",
    email: "arjun.verma@example.edu",
    phone: "+91 98765 43210",
    department: "CSE",
    degree: "B.Tech CSE",
    cgpa: 9.4,
    batch: "2026",
    resumeScore: 94,
    matchScore: 96.4,
    targetRole: "TechCorp AI Labs — AI Research Engineer",
    status: "Shortlisted",
    resumeUrl: "Arjun_Verma_Resume.pdf",
    skills: ["PyTorch", "FAISS", "CUDA", "Transformers", "Python 3.11", "QLoRA"],
    missingSkills: ["TensorRT-LLM", "Kubernetes", "Triton"],
    matchReasoning: [
      "PyTorch & HuggingFace — direct domain alignment with role requirements",
      "Resume score 94/100 exceeds drive benchmark (90/100)",
      "Strong AI/ML project history with vector database retrieval",
      "Gap: Kubernetes — not required but preferred for production scaling"
    ],
    experienceSummary: "2 years research assistant at AI Lab, 1 publication on LLM Quantization."
  },
  {
    id: "cand-2",
    name: "Priya Sharma",
    email: "priya.sharma@example.edu",
    phone: "+91 98765 12345",
    department: "IT",
    degree: "B.Tech IT",
    cgpa: 9.1,
    batch: "2026",
    resumeScore: 91,
    matchScore: 94.2,
    targetRole: "FinEdge Analytics — Full Stack Developer",
    status: "Shortlisted",
    resumeUrl: "Priya_Sharma_Resume.pdf",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "GraphQL"],
    missingSkills: ["System Architecture", "Redis Caching", "Docker"],
    matchReasoning: [
      "Proven track record in building React & Node.js web applications",
      "CGPA 9.1 matches tier-1 engineering requirements",
      "Active contributor to open-source UI libraries",
      "Gap: Redis caching — easily learnable on the job"
    ],
    experienceSummary: "Full-stack intern at CloudTech, built real-time analytics dashboard."
  },
  {
    id: "cand-3",
    name: "Rohan Gupta",
    email: "rohan.gupta@example.edu",
    phone: "+91 98123 45678",
    department: "ECE",
    degree: "B.Tech ECE",
    cgpa: 8.7,
    batch: "2026",
    resumeScore: 88,
    matchScore: 87.5,
    targetRole: "DataScale Systems — Data Engineer",
    status: "Under Review",
    resumeUrl: "Rohan_Gupta_Resume.docx",
    skills: ["Python", "SQL", "Apache Spark", "Kafka", "Pandas", "AWS S3"],
    missingSkills: ["Snowflake", "dbt", "Airflow"],
    matchReasoning: [
      "Good foundation in distributed data pipelines and Kafka streaming",
      "Solid math and analytics background from ECE coursework",
      "Gap: Needs advanced ETL orchestration tool knowledge (Airflow)"
    ],
    experienceSummary: "Data Engineering trainee at AnalyticsHub, processed 10GB daily event stream."
  },
  {
    id: "cand-4",
    name: "Ananya Patel",
    email: "ananya.patel@example.edu",
    phone: "+91 97654 32109",
    department: "CSE",
    degree: "B.Tech CSE",
    cgpa: 9.6,
    batch: "2026",
    resumeScore: 96,
    matchScore: 97.8,
    targetRole: "TechCorp AI Labs — AI Research Engineer",
    status: "Shortlisted",
    resumeUrl: "Ananya_Patel_Resume.pdf",
    skills: ["PyTorch", "TensorFlow", "Computer Vision", "OpenCV", "C++20", "CUDA"],
    missingSkills: ["LLM Fine-Tuning"],
    matchReasoning: [
      "Rank #1 CGPA (9.6) in CSE department",
      "Published IEEE paper on edge computer vision models",
      "Exceptional C++ performance optimization skills"
    ],
    experienceSummary: "Research fellow at Robotics Institute, developed real-time object tracking."
  },
  {
    id: "cand-5",
    name: "Vikram Malhotra",
    email: "vikram.m@example.edu",
    phone: "+91 99887 76655",
    department: "CSE",
    degree: "B.Tech CSE",
    cgpa: 8.4,
    batch: "2026",
    resumeScore: 82,
    matchScore: 81.0,
    targetRole: "PuneTech Innovations — Frontend React Engineering Intern",
    status: "In Progress",
    resumeUrl: "Vikram_Malhotra_Resume.pdf",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React 18", "Git"],
    missingSkills: ["TypeScript", "Next.js", "Jest Testing"],
    matchReasoning: [
      "Strong core JavaScript fundamentals and responsive layout building",
      "Created 3 personal portfolio projects in React",
      "Gap: Lacks experience in static typing (TypeScript) and automated testing"
    ],
    experienceSummary: "Freelance web designer, delivered 5 client landing pages."
  }
];

export const mockResumes = [
  {
    id: "res-1",
    candidateId: "cand-1",
    fileName: "Arjun_Verma_Resume.pdf",
    uploadTime: "10 mins ago",
    size: "2.4 MB",
    overallScore: 94,
    keywordMatch: 95,
    formatScore: 98,
    experienceDetail: 88,
    targetRole: "TechCorp — AI Research Engineer",
    skillsFound: ["PyTorch", "Transformers", "FAISS", "QLoRA", "Python 3.11", "CUDA"],
    missingKeywords: ["TensorRT-LLM", "Kubernetes", "Triton"],
    suggestions: [
      {
        id: "sug-1",
        current: "Built vector search retrieval pipeline using FAISS.",
        suggested: "Architected high-throughput FAISS search pipeline indexing 1M+ entries, reducing query latency by 42%.",
        impact: "Quantifies performance achievement and scale."
      },
      {
        id: "sug-2",
        current: "Fine-tuned Llama model on custom dataset.",
        suggested: "Fine-tuned Llama 3 70B across 4× GPUs using QLoRA, achieving 94.2% accuracy on domain evaluation benchmarks.",
        impact: "Highlights distributed GPU scaling and concrete benchmarks."
      },
      {
        id: "sug-3",
        current: "Wrote documentation for AI model APIs.",
        suggested: "Authored comprehensive OpenAPI specs and developer guide for 12+ microservices consumed by 50+ engineers.",
        impact: "Demonstrates cross-functional collaboration and standard documentation."
      }
    ]
  },
  {
    id: "res-2",
    candidateId: "cand-2",
    fileName: "Priya_Sharma_Resume.pdf",
    uploadTime: "45 mins ago",
    size: "1.8 MB",
    overallScore: 91,
    keywordMatch: 92,
    formatScore: 95,
    experienceDetail: 86,
    targetRole: "FinEdge — Full Stack Developer",
    skillsFound: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "GraphQL"],
    missingKeywords: ["Redis", "Docker", "CI/CD Pipeline"],
    suggestions: [
      {
        id: "sug-4",
        current: "Developed user dashboard using React.",
        suggested: "Engineered responsive React 18 administrative dashboard handling 50k daily active users with sub-200ms page loads.",
        impact: "Stresses scale, framework version, and performance SLA."
      },
      {
        id: "sug-5",
        current: "Worked with PostgreSQL databases.",
        suggested: "Optimized complex PostgreSQL relational queries and indexed foreign keys, boosting read query speed by 3.5x.",
        impact: "Emphasizes database optimization and measurable gains."
      }
    ]
  },
  {
    id: "res-3",
    candidateId: "cand-3",
    fileName: "Rohan_Gupta_Resume.docx",
    uploadTime: "2 hrs ago",
    size: "1.2 MB",
    overallScore: 88,
    keywordMatch: 87,
    formatScore: 92,
    experienceDetail: 85,
    targetRole: "DataScale — Data Engineer",
    skillsFound: ["Python", "SQL", "Spark", "Kafka", "Pandas", "AWS S3"],
    missingKeywords: ["Snowflake", "Airflow", "dbt"],
    suggestions: [
      {
        id: "sug-6",
        current: "Streamed data with Kafka.",
        suggested: "Constructed fault-tolerant Apache Kafka event streaming pipeline processing 10M events per day.",
        impact: "Highlights scale and reliability architecture."
      }
    ]
  }
];

export const mockDrives = [
  {
    id: "drive-1",
    code: "PT-2026-01",
    company: "PuneTech Innovations",
    title: "Frontend React Engineering Intern",
    location: "Pune / Remote",
    stipend: "₹25,000 / mo",
    ppoRange: "₹8.5 – 12 LPA",
    deadline: "Aug 20, 2026",
    postedDate: "Posted 3 days ago",
    matchScore: 96.8,
    minCgpa: 7.5,
    batch: "2026 Batch",
    eligibleDepts: ["CSE", "IT"],
    tags: ["React 18", "TypeScript", "Tailwind"],
    selectionProcess: [
      { round: 1, title: "Aptitude & Coding Test", desc: "60 min online assessment on React & JS fundamentals" },
      { round: 2, title: "Technical Interview", desc: "Live coding on state management & DSA" },
      { round: 3, title: "Culture & System Design", desc: "HR alignment + component architecture review" }
    ],
    saved: false,
    applied: false
  },
  {
    id: "drive-2",
    code: "CS-2026-04",
    company: "Cognitive Scale AI Labs",
    title: "React & AI UI Developer Intern",
    location: "Pune Hybrid",
    stipend: "₹30,000 / mo",
    ppoRange: "₹12 – 15 LPA",
    deadline: "Sep 05, 2026",
    postedDate: "Posted 1 day ago",
    matchScore: 94.2,
    minCgpa: 8.0,
    batch: "2026 All Branches",
    eligibleDepts: ["CSE", "IT", "ECE"],
    tags: ["React 18", "TypeScript", "State Mgmt"],
    selectionProcess: [
      { round: 1, title: "AI/Web Screening", desc: "Interactive UI task & code evaluation" },
      { round: 2, title: "Deep Dive Tech Round", desc: "Frontend performance & component design" },
      { round: 3, title: "Executive HR Round", desc: "Offer discussion and team matching" }
    ],
    saved: true,
    applied: false
  },
  {
    id: "drive-3",
    code: "TC-2026-09",
    company: "TechCorp AI Labs",
    title: "AI Research Engineer",
    location: "Bengaluru / Remote",
    stipend: "₹45,000 / mo",
    ppoRange: "₹18 – 24 LPA",
    deadline: "Aug 15, 2026",
    postedDate: "Posted 5 days ago",
    matchScore: 98.4,
    minCgpa: 8.5,
    batch: "2026 Batch",
    eligibleDepts: ["CSE", "IT"],
    tags: ["PyTorch", "FAISS", "CUDA", "LLMs"],
    selectionProcess: [
      { round: 1, title: "ML Engineering Challenge", desc: "Model fine-tuning & benchmarking notebook submission" },
      { round: 2, title: "AI Architecture Panel", desc: "System design for vector retrieval" },
      { round: 3, title: "Founder / Director Chat", desc: "Final clearance" }
    ],
    saved: false,
    applied: true
  },
  {
    id: "drive-4",
    code: "FE-2026-02",
    company: "FinEdge Analytics",
    title: "Full Stack Developer Intern",
    location: "Mumbai / Remote",
    stipend: "₹28,000 / mo",
    ppoRange: "₹10 – 14 LPA",
    deadline: "Aug 25, 2026",
    postedDate: "Posted 2 days ago",
    matchScore: 91.5,
    minCgpa: 7.8,
    batch: "2026 Batch",
    eligibleDepts: ["CSE", "IT", "ECE"],
    tags: ["Node.js", "React", "PostgreSQL"],
    selectionProcess: [
      { round: 1, title: "Online Hackathon", desc: "Build REST API + React frontend in 3 hours" },
      { round: 2, title: "Technical Interview", desc: "Database query optimization and security" },
      { round: 3, title: "HR Interview", desc: "Fitment & culture check" }
    ],
    saved: false,
    applied: false
  }
];

export const mockCareerRoadmap = {
  currentStage: 3,
  readinessScore: 92.4,
  mockInterviewsPassed: 4,
  mockInterviewsTotal: 5,
  stages: [
    {
      id: 1,
      title: "Baseline Assessment",
      subtitle: "Complete",
      status: "completed",
      description: "Initial evaluation of coding skills, aptitude, and technical core foundation.",
      tasks: [
        { id: "t1-1", title: "Complete diagnostic coding assessment", done: true },
        { id: "t1-2", title: "Submit baseline transcript and CGPA proof", done: true },
        { id: "t1-3", title: "Initial AI skill gap audit", done: true }
      ]
    },
    {
      id: 2,
      title: "Resume Optimization",
      subtitle: "Score 94/100",
      status: "completed",
      description: "Crafting ATS-compliant resume with quantified achievement bullet points.",
      tasks: [
        { id: "t2-1", title: "Upload master resume PDF", done: true },
        { id: "t2-2", title: "Apply AI phrasing recommendations", done: true },
        { id: "t2-3", title: "Verify ATS keyword match above 90%", done: true }
      ]
    },
    {
      id: 3,
      title: "Technical Preparation",
      subtitle: "DSA · GPU Labs",
      status: "active",
      description: "Deep dive into Data Structures, Algorithms, and specialized domain labs.",
      tasks: [
        { id: "t3-1", title: "Solve 15 graph algorithm problems (BFS / DFS)", done: true },
        { id: "t3-2", title: "Complete GPU memory hierarchy lab", done: true },
        { id: "t3-3", title: "NVIDIA TensorRT-LLM Quantization Lab", done: false },
        { id: "t3-4", title: "Pass Stage 3 practice technical interview (≥80%)", done: false }
      ]
    },
    {
      id: 4,
      title: "System Design",
      subtitle: "Architecture practice",
      status: "locked",
      description: "Scalable system architecture, database partitioning, caching, and API design.",
      tasks: [
        { id: "t4-1", title: "Design rate limiter and API gateway", done: false },
        { id: "t4-2", title: "Database sharding and replication lab", done: false },
        { id: "t4-3", title: "Mock system design interview", done: false }
      ]
    },
    {
      id: 5,
      title: "Practice Interviews",
      subtitle: "HR & Technical rounds",
      status: "locked",
      description: "Simulated live interviews with AI Copilot and peer feedback rounds.",
      tasks: [
        { id: "t5-1", title: "Complete 3 technical mock interviews", done: false },
        { id: "t5-2", title: "Complete 2 HR behavioral rounds", done: false },
        { id: "t5-3", title: "Review AI communication feedback analysis", done: false }
      ]
    },
    {
      id: 6,
      title: "Placement Ready",
      subtitle: "Final clearance",
      status: "locked",
      description: "Final placement coordinator clearance and priority recommendation badge.",
      tasks: [
        { id: "t6-1", title: "Final placement drive shortlisting review", done: false },
        { id: "t6-2", title: "Verified candidate badge issue", done: false }
      ]
    }
  ],
  skillsToImprove: [
    { skill: "TensorRT-LLM Quantization", required: "Advanced", current: "Beginner", gap: "High", actionText: "NVIDIA DLI Course →", actionUrl: "#course-tensorrt" },
    { skill: "Kubernetes", required: "Intermediate", current: "None", gap: "High", actionText: "K8s for ML →", actionUrl: "#k8s" },
    { skill: "Graph Algorithms", required: "Advanced", current: "Intermediate", gap: "Medium", actionText: "Practice problems →", actionUrl: "#graph" },
    { skill: "Distributed Systems", required: "Intermediate", current: "Basic", gap: "Medium", actionText: "Practice via Assistant →", actionUrl: "poc4-placement-copilot.html" },
    { skill: "PyTorch 2.0", required: "Advanced", current: "Advanced", gap: "None", actionText: "Mastered", actionUrl: null },
    { skill: "FAISS Vector Search", required: "Advanced", current: "Advanced", gap: "None", actionText: "Mastered", actionUrl: null }
  ],
  practiceQuestions: [
    {
      id: "q1",
      topic: "GPU Architecture",
      question: "Explain SRAM vs HBM on NVIDIA Hopper architecture and how memory latency impacts kernel design.",
      benchmarkAnswer: "SRAM (Shared memory) sits directly on the Streaming Multiprocessor (SM) with ~1 cycle latency and 228 KB capacity per SM. HBM3 provides 80 GB+ capacity with ~200 cycle latency. Well-optimized CUDA kernels move block tile data from HBM3 into shared memory for reuse to bypass the global memory bandwidth bottleneck."
    },
    {
      id: "q2",
      topic: "System Design",
      question: "Design a high-throughput vector retrieval API serving 10,000 QPS with under 20ms p99 latency.",
      benchmarkAnswer: "Use hierarchical HNSW indexes sharded across vector node clusters with read replicas. Maintain an in-memory LRU cache for frequent query embeddings, pre-compute query projections, and use gRPC for low-overhead inter-service communication."
    },
    {
      id: "q3",
      topic: "ML Engineering",
      question: "What are the key trade-offs between QLoRA fine-tuning and Full Fine-Tuning for LLMs?",
      benchmarkAnswer: "QLoRA quantizes the base model weights to 4-bit NormalFloat and trains adapter matrices (LoRA), reducing VRAM consumption by 60–70% with negligible accuracy drop. Full fine-tuning updates all parameters, requiring multi-node distributed GPU setups (e.g. FSDP/DeepSpeed), but retains higher plasticity for domain-specific vocabulary adaptation."
    }
  ]
};

export const mockActivityHistory = [
  { time: "10:42:15", candidate: "Arjun Verma", tool: "Candidate Matching", action: "Matched vs TechCorp AI", status: "Shortlisted", pageUrl: "poc1-student-job-matching.html" },
  { time: "10:15:02", candidate: "Priya Sharma", tool: "Resume Review", action: "Resume scored · 94 / 100", status: "Reviewed", pageUrl: "poc2-resume-analyzer.html" },
  { time: "09:50:44", candidate: "Rohan Gupta", tool: "Placement Search", action: '"Remote React internships in Pune"', status: "3 drives found", pageUrl: "poc3-placement-search.html" },
  { time: "09:12:10", candidate: "Ananya Patel", tool: "Career Coach", action: "Completed Stage 2 — Resume Optimization", status: "Stage 3 Active", pageUrl: "poc5-career-coach.html" },
  { time: "08:45:00", candidate: "Vikram Malhotra", tool: "Candidate Matching", action: "Matched vs PuneTech Innovations", status: "Under Review", pageUrl: "poc1-student-job-matching.html" },
  { time: "08:30:12", candidate: "Arjun Verma", tool: "Placement Assistant", action: "Generated 7-day preparation plan", status: "Completed", pageUrl: "poc4-placement-copilot.html" }
];

export const mockSystemHealth = {
  status: "Online",
  latency: "14 ms",
  capacity: "42%",
  indexedCandidates: 1248,
  activeDrives: 42,
  engineLoad: 42,
  memoryUsage: "68% · 1.2 GB",
  endpoints: [
    { name: "Embedding service", status: "ok" },
    { name: "Language model", status: "ok" },
    { name: "Vector index", status: "ok" }
  ]
};
