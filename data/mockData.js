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
  { time: "09:12:10", candidate: "Ananya Patel", tool: "Student Participation", action: "Ran AI Diagnostic Audit", status: "Audit Complete", pageUrl: "poc6-student-participation.html" },
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

export const mockStudentParticipationData = {
  kpis: {
    totalRegistered: 420,
    assessmentAttendanceRate: "94.2%",
    interviewConversionRate: "68.5%",
    offerAcceptanceRate: "88.4%",
    ppoCount: 34
  },
  presetQueries: [
    { id: "q1", text: "🔍 Why is ECE assessment participation dropping?", queryKey: "ece_drop" },
    { id: "q2", text: "⚠️ Predict which candidates are likely to disengage", queryKey: "disengage_risk" },
    { id: "q3", text: "💡 Which placement activities produce highest PPO conversion?", queryKey: "ppo_conversion" },
    { id: "q4", text: "📊 Compare 2026 batch participation with 2025 batch", queryKey: "batch_compare" }
  ],
  activeDiagnostic: {
    title: "Root-Cause Analysis: ECE Department Assessment Drop-Off (94% Confidence)",
    primaryCause: "Academic Exam Schedule Collision",
    summary: "14 ECE candidates missed the DataScale Systems Online Assessment due to an unscheduled End-Sem Microprocessor practical exam held on June 16, 2026 between 14:00 and 16:30.",
    factors: [
      { factor: "Exam Schedule Overlap (Primary)", impact: "62% Contribution", detail: "14 students in ECE Section B had mandatory laboratory practicals overlapping with test window." },
      { factor: "CGPA 6.0–7.0 Backlog Fear (Secondary)", impact: "28% Contribution", detail: "6 students with active backlogs avoided registration due to perceived automatic disqualification." },
      { factor: "Communication Delay", impact: "10% Contribution", detail: "Drive notification sent < 12 hours prior to assessment launch." }
    ],
    evidenceLineage: [
      "Cross-referenced 14 missed assessment logs in ECE302 with University Exam Controller schedule",
      "Compared with CSE department baseline (0 exam overlaps, 98.2% attendance)",
      "Analyzed historical 2025 batch data (Case #2025-ECE-04)"
    ]
  },
  predictiveCohort: [
    {
      studentId: "part-4",
      name: "Siddharth Rao",
      rollNo: "2022ECE018",
      department: "ECE",
      cgpa: 6.4,
      riskScore: "92% High Risk",
      predictedStage: "Assessment Drop-Off",
      rootCause: "1 Missed OA + Academic Probation Warning",
      recommendedAction: "Dispatch Counselor & Issue Remediated Assessment Token"
    },
    {
      studentId: "part-8",
      name: "Rahul Verma",
      rollNo: "2022ECE044",
      department: "ECE",
      cgpa: 6.8,
      riskScore: "85% High Risk",
      predictedStage: "Interview Attendance",
      rootCause: "0 Interviews attended despite 4 drive registrations",
      recommendedAction: "Schedule 1-on-1 Interview Confidence Mentoring"
    },
    {
      studentId: "part-9",
      name: "Sneha Kapoor",
      rollNo: "2022IT072",
      department: "IT",
      cgpa: 7.2,
      riskScore: "74% Moderate Risk",
      predictedStage: "Offer Acceptance Hold",
      rootCause: "Holding Tier 2 offer while awaiting off-campus response",
      recommendedAction: "Trigger Offer Decision Counseling"
    }
  ],
  funnel: [
    { stage: "Registration", count: 420, percentage: "100%", drop: "0%" },
    { stage: "OA Assessment", count: 396, percentage: "94.2%", drop: "5.8%" },
    { stage: "Interview R1", count: 288, percentage: "68.5%", drop: "27.2%" },
    { stage: "Final Round", count: 184, percentage: "43.8%", drop: "36.1%" },
    { stage: "Offers Extended", count: 147, percentage: "35.0%", drop: "20.1%" },
    { stage: "Offer Accepted / PPO", count: 130, percentage: "31.0%", drop: "11.5%" }
  ],
  students: [
    {
      id: "part-1",
      name: "Arjun Verma",
      rollNo: "2022CSE001",
      department: "CSE",
      cgpa: 9.4,
      drivesApplied: 8,
      assessmentsAttended: 8,
      interviewsAttended: 5,
      offersReceived: 2,
      ppoStatus: "PPO Offered (TechCorp)",
      participationScore: 98,
      status: "Placed & Accepted",
      timeline: [
        { date: "2026-06-10", event: "Registered for Campus Placement Drive 2026", type: "system" },
        { date: "2026-06-15", event: "Completed TechCorp Online Technical Assessment (Score 96/100)", type: "assessment" },
        { date: "2026-06-20", event: "Shortlisted for TechCorp Technical Interview Round 1", type: "interview" },
        { date: "2026-06-25", event: "Completed Final HR Interview with TechCorp AI Research Panel", type: "interview" },
        { date: "2026-07-01", event: "Received PPO / Full-time Offer from TechCorp AI Research (₹24.0 LPA)", type: "offer" },
        { date: "2026-07-05", event: "Accepted TechCorp PPO Offer — Status updated to Placed", type: "action" }
      ]
    },
    {
      id: "part-2",
      name: "Priya Sharma",
      rollNo: "2022IT012",
      department: "IT",
      cgpa: 9.1,
      drivesApplied: 6,
      assessmentsAttended: 6,
      interviewsAttended: 4,
      offersReceived: 1,
      ppoStatus: "In PPO Discussion",
      participationScore: 94,
      status: "Placed & Accepted",
      timeline: [
        { date: "2026-06-12", event: "Registered for Campus Placement Drive 2026", type: "system" },
        { date: "2026-06-18", event: "Completed FinEdge Online Coding Challenge (Score 92/100)", type: "assessment" },
        { date: "2026-06-24", event: "Attended FinEdge Full Stack Engineering Interview", type: "interview" },
        { date: "2026-07-02", event: "Received Full-Time Offer from FinEdge Systems (₹18.5 LPA)", type: "offer" },
        { date: "2026-07-06", event: "Accepted FinEdge Offer", type: "action" }
      ]
    },
    {
      id: "part-3",
      name: "Rohan Gupta",
      rollNo: "2022ECE054",
      department: "ECE",
      cgpa: 8.7,
      drivesApplied: 11,
      assessmentsAttended: 9,
      interviewsAttended: 3,
      offersReceived: 1,
      ppoStatus: "None",
      participationScore: 82,
      status: "Offer Under Review",
      timeline: [
        { date: "2026-06-08", event: "Registered for Campus Placement Drive 2026", type: "system" },
        { date: "2026-06-14", event: "Attended DataScale Systems OA Assessment", type: "assessment" },
        { date: "2026-06-28", event: "Completed Round 2 System Design Interview at DataScale", type: "interview" },
        { date: "2026-07-10", event: "Received Offer Letter from DataScale (₹12.0 LPA)", type: "offer" }
      ]
    },
    {
      id: "part-4",
      name: "Siddharth Rao",
      rollNo: "2022ECE018",
      department: "ECE",
      cgpa: 6.4,
      drivesApplied: 5,
      assessmentsAttended: 2,
      interviewsAttended: 0,
      offersReceived: 0,
      ppoStatus: "Not Eligible",
      participationScore: 45,
      status: "High Drop-Off Risk",
      timeline: [
        { date: "2026-06-10", event: "Registered for Placement Drive", type: "system" },
        { date: "2026-06-16", event: "Missed DataScale OA Assessment (Absent due to exam collision)", type: "warning" },
        { date: "2026-07-01", event: "Policy warning issued for non-attendance", type: "warning" }
      ]
    }
  ],
  aiRecommendations: [
    { id: "rec-1", title: "Dispatch Remedial Assessment Window for 14 ECE Candidates", desc: "Issue a 24-hour make-up assessment window approved by DataScale HR.", actionText: "Execute Dispatch" },
    { id: "rec-2", title: "Schedule Emergency OA Readiness Workshop", desc: "Target 8 unplaced ECE candidates with CGPA < 7.0 to prevent future test avoidance.", actionText: "Schedule Workshop" },
    { id: "rec-3", title: "Automate Exam Calendar Sync Guardrail", desc: "Block placement drive scheduling when university semester exam APIs report active practicals.", actionText: "Enable Guardrail" }
  ]
};

export const mockHiringPerformanceData = {
  kpis: {
    totalDrives: 42,
    overallPlacementRate: "92.4%",
    avgSalary: "₹14.8 LPA",
    medianSalary: "₹12.4 LPA",
    highestPackage: "₹32.0 LPA",
    topHiringPartner: "TechCorp AI Labs (18 Offers)"
  },
  presetQueries: [
    { id: "hq1", text: "🔍 Why did Tier-1 Fintech offers decline this season?", queryKey: "fintech_decline" },
    { id: "hq2", text: "💡 Which skills increase candidate offer probability?", queryKey: "skill_lift" },
    { id: "hq3", text: "📈 Forecast Q4 hiring demand and CTC growth shifts", queryKey: "demand_forecast" },
    { id: "hq4", text: "🏢 Identify top 12 target companies for upcoming drive", queryKey: "target_companies" }
  ],
  activeDiagnostic: {
    title: "AI Market Hiring Diagnosis: Shift in Recruiter Evaluation Benchmark",
    summary: "Tier-1 Tech & FinTech recruiters have shifted primary screening criteria from standalone Algorithmic DSA to Distributed System Design and Real-Time API Resilience.",
    factors: [
      { factor: "System Architecture Cutoff Shift", impact: "+88% Selection Lift", detail: "Recruiters penalize candidates lacking cloud deployment & caching experience." },
      { factor: "Generative AI & Quantization Demand", impact: "+94% Selection Lift", detail: "Highest premium paid for PyTorch model quantization and vector database indexing." },
      { factor: "Generic Web Dev Oversupply", impact: "-18% Salary Compression", detail: "Standard React/Node roles experienced 12% lower offer conversion compared to 2025." }
    ],
    evidenceLineage: [
      "Parsed evaluation rubrics across 42 campus recruitment drives",
      "Correlated 162 offer letters with candidate GitHub & project skill profiles",
      "Benchmarked vs 2025 institutional recruitment dataset"
    ]
  },
  skillLiftMatrix: [
    { skill: "PyTorch & Transformer Quantization", demandScore: 96, selectionBoost: "+94%", avgPackage: "₹24.0 LPA", topRole: "AI Research Engineer", recommendation: "Core Requirement" },
    { skill: "System Design & Distributed DB", demandScore: 92, selectionBoost: "+88%", avgPackage: "₹18.5 LPA", topRole: "Backend Architect", recommendation: "Core Requirement" },
    { skill: "Kafka & Real-Time Data Streaming", demandScore: 86, selectionBoost: "+79%", avgPackage: "₹16.0 LPA", topRole: "Data Engineer", recommendation: "High Value" },
    { skill: "React & TypeScript Full-Stack", demandScore: 78, selectionBoost: "+62%", avgPackage: "₹12.5 LPA", topRole: "Full Stack Engineer", recommendation: "Standard" }
  ],
  predictiveForecast: [
    { domain: "AI / ML Engineering", predictedDemand: "+24% Growth", expectedAvgCtc: "₹22.5 LPA", hiringWindow: "Q4 Phase 1", strategy: "Aggressive Hiring Expansion" },
    { domain: "Distributed Systems & FinTech", predictedDemand: "+18% Growth", expectedAvgCtc: "₹19.0 LPA", hiringWindow: "Q4 Phase 1", strategy: "Partner Expansion (12 Companies)" },
    { domain: "Frontend & UI Engineering", predictedDemand: "-6% Contraction", expectedAvgCtc: "₹11.5 LPA", hiringWindow: "Q4 Phase 2", strategy: "Upskill to Full-Stack & Systems" }
  ],
  funnel: [
    { stage: "Drives Announced", count: 42, percentage: "100%", detail: "Across Tech, FinTech & Analytics" },
    { stage: "Candidates Registered", count: 420, percentage: "100%", detail: "Active 2026 Graduating Class" },
    { stage: "OA Qualified", count: 288, percentage: "68.5%", detail: "Passed coding & aptitude cutoffs" },
    { stage: "Interviewed", count: 210, percentage: "50.0%", detail: "Attended Tech & HR rounds" },
    { stage: "Offers Extended", count: 162, percentage: "38.5%", detail: "Full-time & PPO combined" },
    { stage: "Offers Accepted", count: 147, percentage: "35.0%", detail: "Official acceptance slips verified" }
  ],
  departments: [
    { dept: "CSE", totalStudents: 180, placedCount: 172, placementRate: "95.5%", avgCtc: "₹18.2 LPA", highestCtc: "₹32.0 LPA", topRecruiter: "TechCorp AI", conversionIndex: "High (9.4/10)" },
    { dept: "IT", totalStudents: 120, placedCount: 112, placementRate: "93.3%", avgCtc: "₹15.4 LPA", highestCtc: "₹24.0 LPA", topRecruiter: "FinEdge Systems", conversionIndex: "High (8.9/10)" },
    { dept: "ECE", totalStudents: 80, placedCount: 71, placementRate: "88.7%", avgCtc: "₹11.8 LPA", highestCtc: "₹18.0 LPA", topRecruiter: "DataScale Backend", conversionIndex: "Medium (7.6/10)" },
    { dept: "ME", totalStudents: 40, placedCount: 33, placementRate: "82.5%", avgCtc: "₹8.5 LPA", highestCtc: "₹14.0 LPA", topRecruiter: "ElectroMech R&D", conversionIndex: "Medium (7.1/10)" }
  ],
  aiRecommendations: [
    { id: "hrec-1", title: "Launch Mandatory Cloud & System Design Bootcamp for 2027 Batch", desc: "Equip 180 students with verified Redis, gRPC, and System Architecture badges before Phase 1 drives.", actionText: "Provision Bootcamp" },
    { id: "hrec-2", title: "Initiate Outreach to 12 Target FinTech Companies", desc: "AI matched candidate skill overlaps with hiring criteria at Goldman Sachs, Razorpay, and CRED.", actionText: "Generate Pitch Package" },
    { id: "hrec-3", title: "Re-align ECE Elective Curriculum to Include CUDA & C++20", desc: "Bridge the ₹6.4 LPA CTC gap between ECE and CSE by introducing parallel computing labs.", actionText: "Send Curriculum Brief" }
  ]
};

export const mockPlacementAnalytics = {
  kpis: {
    healthScore: "91%",
    confidence: "94%",
    overallPlacementRate: "92.4%",
    unplacedInterventionCount: 22,
    expectedPackageGrowth: "+9.2%"
  },
  presetQueries: [
    { id: "p1", text: "• Predict Placement Probability", queryKey: "predict_prob" },
    { id: "p2", text: "• High-Risk Students", queryKey: "risk_students" },
    { id: "p3", text: "• Salary Forecast", queryKey: "salary_forecast" },
    { id: "p4", text: "• Company Forecast", queryKey: "company_forecast" },
    { id: "p5", text: "• Branch Comparison", queryKey: "branch_compare" },
    { id: "p6", text: "• Weekly Executive Report", queryKey: "exec_report" }
  ],
  executiveSummary: {
    title: "AI Institutional Executive Summary: Placement Health 91%",
    healthScore: "91%",
    confidenceScore: "94%",
    bullets: [
      "Overall batch placement rate increased by 11% compared to 2025 baseline.",
      "SQL and Relational Database querying demand increased by 38% across recruiter rubrics.",
      "Mechanical engineering interview conversion declined 18% due to missing database competencies.",
      "22 students identified requiring urgent academic & resume intervention before Phase 2.",
      "Expected average package growth projected at +9.2% YoY (reaching ₹14.8 LPA)."
    ],
    primaryFindings: "Core bottleneck identified in Mechanical (ME) and ECE non-core tracks due to unaddressed SQL and System Design skill gaps.",
    businessImpact: "Resolving Mechanical SQL gap will unlock 18 additional offers and boost overall institutional placement rate to 96.2%.",
    confidence: "94% Confidence (Derived from 42 completed drive rubrics and 162 offer letters)",
    evidenceSources: ["42 Campus Drive Evaluation Rubrics", "162 Verified Offer Slips", "420 Candidate Assessment Logs"],
    recommendations: ["Conduct 3-Day SQL & Database Bootcamp for ME candidates", "Provision Mock OA tokens for 22 high-risk students"]
  },
  rootCauseAnalysis: {
    title: "AI Root Cause Analysis: Mechanical Placement Conversion Decline",
    primaryIssue: "Mechanical interview conversion dropped 18% YoY.",
    impactedCount: "42 Candidates",
    confidence: "92%",
    evidenceDecomposition: [
      { metric: "Resume Keyword Alignment", score: "54 / 100", detail: "Missing relational database & automation keywords" },
      { metric: "Lack of SQL Competency", score: "High Impact (44%)", detail: "Failed online assessment database screening questions" },
      { metric: "Coding OA Pass Rate", score: "38.2%", detail: "Below 65% institutional cutoff threshold" },
      { metric: "OA Assessment Attendance", score: "76.4%", detail: "10 candidates missed tests due to lab schedule collisions" },
      { metric: "Interview Panel Feedback", score: "Critical", detail: "Recruiters noted inability to write basic SQL JOIN queries" }
    ]
  }
};

export const mockPredictions = [
  {
    studentId: "p-1",
    name: "Rahul Sharma",
    rollNo: "2022CSE042",
    department: "CSE",
    cgpa: 9.4,
    probability: "94%",
    expectedPackage: "₹18.5 LPA",
    likelyDomain: "Backend Architecture",
    risk: "Low Risk",
    recommendation: "Continue Track",
    actionText: "View Profile"
  },
  {
    studentId: "p-2",
    name: "Aman Gupta",
    rollNo: "2022ME014",
    department: "ME",
    cgpa: 6.2,
    probability: "42%",
    expectedPackage: "₹4.2 LPA",
    likelyDomain: "Technical Support",
    risk: "High Risk",
    recommendation: "Resume & SQL Workshop",
    actionText: "Create Intervention"
  },
  {
    studentId: "p-3",
    name: "Sneha Reddy",
    rollNo: "2022IT018",
    department: "IT",
    cgpa: 8.9,
    probability: "91%",
    expectedPackage: "₹16.0 LPA",
    likelyDomain: "Full Stack Web",
    risk: "Low Risk",
    recommendation: "Continue Track",
    actionText: "View Profile"
  },
  {
    studentId: "p-4",
    name: "Vikram Joshi",
    rollNo: "2022ECE052",
    department: "ECE",
    cgpa: 6.8,
    probability: "58%",
    expectedPackage: "₹6.5 LPA",
    likelyDomain: "Embedded Systems",
    risk: "Moderate Risk",
    recommendation: "Mock Interview Prep",
    actionText: "Schedule Workshop"
  },
  {
    studentId: "p-5",
    name: "Ananya Patel",
    rollNo: "2022CSE099",
    department: "CSE",
    cgpa: 9.1,
    probability: "96%",
    expectedPackage: "₹24.0 LPA",
    likelyDomain: "AI Research",
    risk: "Low Risk",
    recommendation: "Fast-Track PPO",
    actionText: "View Profile"
  }
];

export const mockSalaryForecast = {
  avgPackage: "₹14.8 LPA",
  highestPackage: "₹32.0 LPA",
  medianPackage: "₹12.4 LPA",
  expectedGrowth: "+9.2% YoY",
  confidence: "91% Confidence",
  breakdown: [
    { tier: "Super Dream (≥ ₹20 LPA)", percentage: "22%", candidateCount: 92 },
    { tier: "Dream (₹10 - 19 LPA)", percentage: "48%", candidateCount: 201 },
    { tier: "Standard (₹5 - 9 LPA)", percentage: "24%", candidateCount: 101 },
    { tier: "Needs Support (< ₹5 LPA)", percentage: "6%", candidateCount: 26 }
  ]
};

export const mockCompanyForecasts = [
  {
    company: "Google",
    expectedApplicants: 420,
    expectedShortlist: 150,
    expectedInterviews: 48,
    expectedOffers: 18,
    panelsRequired: "4 Panels",
    status: "Confirmed Drive"
  },
  {
    company: "TechCorp AI Labs",
    expectedApplicants: 380,
    expectedShortlist: 120,
    expectedInterviews: 42,
    expectedOffers: 15,
    panelsRequired: "3 Panels",
    status: "Confirmed Drive"
  },
  {
    company: "Goldman Sachs",
    expectedApplicants: 290,
    expectedShortlist: 90,
    expectedInterviews: 30,
    expectedOffers: 12,
    panelsRequired: "3 Panels",
    status: "Confirmed Drive"
  },
  {
    company: "FinEdge Systems",
    expectedApplicants: 310,
    expectedShortlist: 110,
    expectedInterviews: 36,
    expectedOffers: 14,
    panelsRequired: "3 Panels",
    status: "Scheduling"
  },
  {
    company: "DataScale Backend",
    expectedApplicants: 260,
    expectedShortlist: 80,
    expectedInterviews: 28,
    expectedOffers: 10,
    panelsRequired: "2 Panels",
    status: "Scheduling"
  }
];

export const mockBranchForecast = [
  {
    branch: "CSE",
    likelyPlacement: "96%",
    statusBadge: "wf-badge-dark",
    statusText: "Likely Placement",
    explanation: "High recruiter demand for PyTorch, System Design, and Cloud Backend engineering."
  },
  {
    branch: "IT",
    likelyPlacement: "93%",
    statusBadge: "wf-badge-dark",
    statusText: "Likely Placement",
    explanation: "Strong full-stack web engineering, TypeScript, and database optimization alignment."
  },
  {
    branch: "ECE",
    likelyPlacement: "82%",
    statusBadge: "wf-badge-outline",
    statusText: "Moderate Risk",
    explanation: "Core semiconductor hiring stable; non-core software requires System Design upskilling."
  },
  {
    branch: "Mechanical",
    likelyPlacement: "67%",
    statusBadge: "wf-badge-dark",
    statusText: "Needs Attention",
    explanation: "Interview conversion dropped 18% due to missing relational SQL & Python automation skills."
  }
];

export const mockRiskStudents = [
  {
    id: "r-1",
    name: "Aman Gupta",
    department: "ME",
    rollNo: "2022ME014",
    riskLevel: "High Risk",
    reason: "Failed SQL OA Screening + CGPA 6.2",
    disengagementProbability: "78%",
    recommendation: "Enroll in Emergency 3-Day SQL & Database Bootcamp",
    actions: ["View Profile", "Create Intervention", "Schedule Workshop"]
  },
  {
    id: "r-2",
    name: "Siddharth Rao",
    department: "ECE",
    rollNo: "2022ECE018",
    riskLevel: "High Risk",
    reason: "1 Missed OA + Academic Probation Warning",
    disengagementProbability: "92%",
    recommendation: "Issue Remedial Assessment Token & Assign Mentor",
    actions: ["View Profile", "Create Intervention", "Schedule Workshop"]
  },
  {
    id: "r-3",
    name: "Rahul Verma",
    department: "ECE",
    rollNo: "2022ECE044",
    riskLevel: "High Risk",
    reason: "0 Interviews attended despite 4 drive registrations",
    disengagementProbability: "85%",
    recommendation: "Schedule 1-on-1 Interview Confidence Mentoring",
    actions: ["View Profile", "Create Intervention", "Schedule Workshop"]
  }
];

export const mockAiRecommendationsEngine = [
  {
    id: "ai-rec-1",
    title: "Conduct 3-Day SQL & Relational Database Bootcamp for Mechanical Students",
    problem: "42 Mechanical students lacking core SQL & Database querying capabilities, causing an 18% interview conversion drop.",
    recommendation: "Schedule an intensive 3-day workshop covering SQL JOINs, indexing, and basic Python automation scripts.",
    estimatedImprovement: "+11% Selection Conversion",
    estimatedPlacements: "18 Candidates",
    confidence: "93% Confidence",
    actionText: "Provision & Schedule Bootcamp →"
  },
  {
    id: "ai-rec-2",
    title: "Issue Remedial Assessment Tokens for 14 ECE Candidates",
    problem: "14 ECE candidates missed the DataScale OA due to an unscheduled university microprocessor exam collision.",
    recommendation: "Issue approved 24-hour make-up assessment window backed by DataScale HR.",
    estimatedImprovement: "+8.4% Attendance Lift",
    estimatedPlacements: "8 Candidates",
    confidence: "95% Confidence",
    actionText: "Issue Make-up Tokens →"
  },
  {
    id: "ai-rec-3",
    title: "Target 12 Additional FinTech Recruiters for Full-Stack Roles",
    problem: "Surplus of high-performing IT candidates with full-stack skills exceeding current drive capacity.",
    recommendation: "Initiate automated placement officer outreach to Goldman Sachs, Razorpay, and CRED.",
    estimatedImprovement: "+14.2% Package Elevation",
    estimatedPlacements: "12 Candidates",
    confidence: "91% Confidence",
    actionText: "Generate Outreach Package →"
  }
];

export const mockDocuments = [
  { id: "doc-1", name: "Arjun_Verma_Resume_Final.pdf", type: "Resume", candidate: "Arjun Verma", rollNo: "2022CSE042", status: "Verified", uploadTime: "10:42 AM", size: "1.2 MB", confidence: "96%" },
  { id: "doc-2", name: "Arjun_Verma_Resume_v3.pdf", type: "Resume", candidate: "Arjun Verma", rollNo: "2022CSE042", status: "Duplicate", uploadTime: "10:30 AM", size: "1.1 MB", confidence: "98% Similarity" },
  { id: "doc-3", name: "Semester_7_Marksheet.pdf", type: "Marksheet", candidate: "Arjun Verma", rollNo: "2022CSE042", status: "Verified", uploadTime: "09:15 AM", size: "2.4 MB", confidence: "98%" },
  { id: "doc-4", name: "AWS_Developer_Certificate.pdf", type: "Certificate", candidate: "Arjun Verma", rollNo: "2022CSE042", status: "Flagged", uploadTime: "08:50 AM", size: "850 KB", confidence: "91% (Expired)" },
  { id: "doc-5", name: "TechCorp_Offer_Letter_2026.pdf", type: "Offer Letter", candidate: "Arjun Verma", rollNo: "2022CSE042", status: "Verified", uploadTime: "08:20 AM", size: "1.8 MB", confidence: "99%" },
  { id: "doc-6", name: "TechCorp_AI_Research_JD.pdf", type: "Job Description", candidate: "TechCorp AI Labs", rollNo: "CORP-902", status: "Verified", uploadTime: "08:00 AM", size: "640 KB", confidence: "97%" }
];

export const mockResumeExtraction = {
  candidateName: "Arjun Verma",
  email: "arjun.verma@placementhub.edu",
  phone: "+91 98765 43210",
  education: "B.Tech Computer Science & Engineering (2022 - 2026)",
  cgpa: "9.4 / 10.0",
  skills: ["Python", "PyTorch", "Transformers", "CUDA", "FastAPI", "Docker", "Git"],
  projects: ["Distributed Vector Search Engine", "LLM Model Quantization Framework"],
  experience: "AI Research Intern at TechCorp AI Labs (4 months)",
  certifications: ["AWS Certified Developer (Expired)", "TensorFlow Developer Certificate"]
};

export const mockMarksheetExtraction = {
  university: "State Technological University",
  degree: "B.Tech CSE",
  semester: "Semester 7 (Autumn 2025)",
  cgpa: "9.4 / 10.0",
  sgpa: "9.6 / 10.0",
  totalCredits: "182 Credits Cleared",
  backlogs: 0,
  verificationStatus: "Verified via University Blockchain Ledger"
};

export const mockCertificates = [
  { title: "AWS Certified Developer Associate", provider: "Amazon Web Services", issueDate: "Nov 2023", expiryDate: "Nov 2025", status: "Expired 2 Months Ago", actionNeeded: "Renew Certification" },
  { title: "TensorFlow Developer Certificate", provider: "Google DeepMind / Coursera", issueDate: "Mar 2024", expiryDate: "Mar 2026", status: "Active & Verified", actionNeeded: "None" }
];

export const mockOfferLetters = {
  company: "TechCorp AI Labs",
  role: "AI Research Engineer",
  package: "₹18.5 LPA (Fixed ₹16.0 LPA + ₹2.5 LPA Joining Bonus)",
  joiningDate: "July 1, 2026",
  location: "Bengaluru, India (Hybrid)",
  bondPeriod: "None (0 months)",
  verification: "Verified with TechCorp HR System API"
};

export const mockValidationResults = [
  { item: "CGPA & Academic Marks", extracted: "9.4 / 10.0", ledger: "9.4 / 10.0", status: "✓ Verified", statusBadge: "wf-badge-dark" },
  { item: "Identity Proof (Aadhaar / PAN)", extracted: "PAN Verified", ledger: "Aadhaar Pending", status: "× Missing Aadhaar", statusBadge: "wf-badge-outline" },
  { item: "Technical Skill Badges", extracted: "PyTorch, CUDA, FastAPI", ledger: "Verified in 4 Drives", status: "✓ Verified", statusBadge: "wf-badge-dark" },
  { item: "AWS Developer Certificate", extracted: "Expired Nov 2025", ledger: "Expired", status: "⚠ Expired Certificate", statusBadge: "wf-badge-outline" },
  { item: "Offer Letter CTC", extracted: "₹18.5 LPA", ledger: "Approved in Drive", status: "✓ Verified", statusBadge: "wf-badge-dark" }
];

export const mockDuplicateResults = [
  { fileA: "Arjun_Verma_Resume_Final.pdf", fileB: "Arjun_Verma_Resume_v3.pdf", similarity: "98% Vector Match", resolution: "Keep Arjun_Verma_Resume_Final.pdf (Latest timestamp) · Archive v3.pdf" }
];

export const mockDocumentRecommendations = [
  {
    id: "drec-1",
    title: "Upload Missing Identity Document (Aadhaar Card)",
    problem: "Aadhaar Card is missing from candidate verification folder.",
    evidence: "University ledger flagged mandatory Aadhaar verification for TechCorp drive.",
    recommendation: "Request candidate to upload Aadhaar card via Student Portal.",
    expectedImpact: "Clears verification check for TechCorp joining",
    confidence: "99% Confidence",
    primaryAction: "Request Document",
    secondaryAction: "Waive Check"
  },
  {
    id: "drec-2",
    title: "Archive Duplicate Resume Version (Arjun_Verma_Resume_v3.pdf)",
    problem: "98% similarity detected between Resume_Final.pdf and Resume_v3.pdf, creating index redundancy.",
    evidence: "Neural document hashing confirmed identical work experience text.",
    recommendation: "Set Resume_Final.pdf as primary and archive v3.pdf to clean drive index.",
    expectedImpact: "Eliminates duplicate candidate matches in Copilot",
    confidence: "98% Confidence",
    primaryAction: "Archive Duplicate",
    secondaryAction: "Keep Both"
  }
];

export const mockCommunicationKpis = {
  eligibleStudents: 148,
  notEligible: 32,
  missingDocuments: 14,
  alreadyContacted: 94,
  pendingRecruiterFollowups: 4,
  pendingOfferAcceptances: 8
};

export const mockCommunicationQueue = [
  { id: "cq-1", recipient: "Arjun Verma", rollNo: "2022CSE042", role: "CSE Candidate", eligibility: "Eligible (9.4 CGPA)", type: "Drive Invitation", channel: "Email & WhatsApp", status: "Delivered", opened: "Yes (10 mins ago)", responded: "Confirmed", time: "10:45 AM" },
  { id: "cq-2", recipient: "Priya Sharma", rollNo: "2022IT018", role: "IT Candidate", eligibility: "Eligible (8.9 CGPA)", type: "Drive Invitation", channel: "Email & WhatsApp", status: "Delivered", opened: "Yes (2 hours ago)", responded: "Pending", time: "10:45 AM" },
  { id: "cq-3", recipient: "Rohan Gupta", rollNo: "2022ECE056", role: "ECE Candidate", eligibility: "Eligible (8.7 CGPA)", type: "Interview Reminder", channel: "WhatsApp & SMS", status: "Delivered", opened: "Yes (1 hour ago)", responded: "Confirmed", time: "09:30 AM" },
  { id: "cq-4", recipient: "Neha Patel", rollNo: "2022ME031", role: "ME Candidate", eligibility: "Missing Doc (Aadhaar)", type: "Document Reminder", channel: "Email", status: "Sent", opened: "No", responded: "No", time: "09:00 AM" },
  { id: "cq-5", recipient: "Karan Singh", rollNo: "2022CSE089", role: "CSE Candidate", eligibility: "Not Eligible (CGPA < 7.5)", type: "Eligibility Notice", channel: "Email", status: "Sent", opened: "Yes (4 hours ago)", responded: "N/A", time: "08:30 AM" },
  { id: "cq-6", recipient: "Ananya Roy", rollNo: "2022IT044", role: "IT Candidate", eligibility: "Eligible (9.1 CGPA)", type: "Offer Acceptance", channel: "Email & WhatsApp", status: "Delivered", opened: "Yes (Yesterday)", responded: "Accepted", time: "Yesterday" }
];

export const mockCommunicationTemplates = {
  email: {
    subject: "Official Invitation: Google AI Placement Drive 2026 — PlacementHub",
    body: `Dear Candidate,

You have been identified by the PlacementHub AI Engine as an ELIGIBLE candidate for the upcoming Google AI Placement Drive scheduled for next Monday at 09:00 AM in Audi-3.

Drive Details:
- Recruiter: Google Campus Recruitment Team
- Target Roles: AI Software Engineer / Systems Developer
- CTC Package: ₹24.0 LPA Fixed + Performance Bonus
- Eligibility Cutoff: B.Tech CSE/IT, CGPA >= 8.0, 0 Active Backlogs

Action Required:
Please confirm your attendance on the PlacementHub portal before Friday 5:00 PM. Make sure your Resume and Semester 7 Marksheets are verified in the Document Processing module.

Best regards,
Placement Operations Cell
PlacementHub AI Solutions`
  },
  whatsapp: {
    body: `🎯 *Google AI Placement Drive Invitation*

Hi {{Student_Name}}, you are eligible for the Google AI Placement Drive on *Next Monday, 9:00 AM*!

Package: ₹24.0 LPA
Venue: Main Auditorium (Audi-3)

Reply *YES* to confirm your attendance or tap here to update your resume: https://placementhub.edu/drives/google-2026`
  },
  sms: {
    body: `PlacementHub Notice: You are eligible for Google AI Drive on Monday 9AM. CTC 24LPA. Confirm attendance at placementhub.edu before Friday 5PM.`
  },
  calendar: {
    title: "Google AI Placement Drive — Technical Interview & OA",
    location: "Main Auditorium (Audi-3) & Online Assessment Lab 2",
    time: "Monday, Aug 10, 2026 · 09:00 AM - 05:00 PM IST",
    description: "Mandatory campus placement drive for Google AI Engineering roles. Carry 2 printed copies of verified resume and student ID."
  }
};

export const mockRecruiterFollowups = [
  { id: "rf-1", company: "Deloitte India", recruiter: "Vikram Malhotra (Lead Campus HR)", daysIdle: 8, status: "Pending Shortlist", suggestion: "Follow up regarding shortlisting status for 42 Finance-Tech candidates.", actionEmail: "Draft Deloitte Follow-up" },
  { id: "rf-2", company: "TechCorp AI Labs", recruiter: "Sarah Jenkins (Senior Talent Partner)", daysIdle: 3, status: "Offer Letters Pending", suggestion: "Request confirmation for 12 issued offer letter release dates.", actionEmail: "Draft TechCorp Follow-up" },
  { id: "rf-3", company: "Goldman Sachs", recruiter: "Anand Iyer (University Relations)", daysIdle: 5, status: "OA Results Pending", suggestion: "Inquire about Online Assessment scores for 38 IT candidates.", actionEmail: "Draft Goldman Follow-up" }
];

export const mockNewsletterData = {
  title: "PlacementHub Monthly Career & Recruitment Highlights — August 2026",
  placedCount: "348 Students Placed (84.2% Batch Placement Rate)",
  highestPackage: "₹45.0 LPA (Super Dream Offer — Uber AI Labs)",
  avgPackage: "₹14.2 LPA (+12.4% YoY Growth)",
  topRecruiters: ["Google", "Microsoft", "TechCorp AI", "Deloitte", "Goldman Sachs", "Amazon"],
  aiHighlights: [
    "96% candidate skill matching precision achieved across 14 campus drives.",
    "Student interview conversion improved +14% following SQL & PyTorch bootcamps.",
    "Document verification time reduced from 3 days to 4.2 seconds via AI Document Intelligence."
  ]
};

export const mockCommunicationAnalytics = {
  emailsSent: 420,
  whatsAppDelivered: "98.4%",
  openRate: "84.2%",
  responseRate: "72.1%",
  pendingReplies: 18,
  deliverySuccess: "99.1%",
  avgResponseTime: "24 mins"
};

export const mockCommunicationRecommendations = [
  {
    id: "crec-1",
    title: "Dispatch Automated WhatsApp Reminder Batch to 31 Unresponsive Candidates",
    problem: "31 eligible candidates have opened the Google Drive email but have not yet confirmed their attendance.",
    evidence: "Open rate is 84.2%, but response rate remains at 72.1%.",
    recommendation: "Send a targeted 1-click WhatsApp interactive reminder with quick confirmation buttons.",
    expectedImpact: "Boosts drive confirmation rate by +17% within 2 hours",
    confidence: "96% Confidence",
    primaryAction: "Send WhatsApp Batch",
    secondaryAction: "Snooze 24 Hours"
  },
  {
    id: "crec-2",
    title: "Initiate Officer Follow-up with Deloitte HR (8 Days Inactive)",
    problem: "Deloitte Campus Lead has not updated shortlist status for 42 candidates after 8 calendar days.",
    evidence: "Average recruiter response threshold is 3 days.",
    recommendation: "Generate an executive nudge email detailing candidate test score summary.",
    expectedImpact: "Accelerates shortlist clearance for 42 candidates",
    confidence: "94% Confidence",
    primaryAction: "Send Recruiter Nudge",
    secondaryAction: "Schedule Call"
  }
];





