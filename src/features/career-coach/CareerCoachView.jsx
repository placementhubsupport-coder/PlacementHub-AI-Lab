import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, GraduationCap, Zap, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { careerCoachService } from '@/services/careerCoachService';

import ReadinessCards from './components/ReadinessCards';
import CareerRoadmap from './components/CareerRoadmap';
import SkillGapSection from './components/SkillGapSection';
import WeeklyPlan from './components/WeeklyPlan';
import CourseRecommendations from './components/CourseRecommendations';
import InterviewPrep from './components/InterviewPrep';
import PlacementReport from './components/PlacementReport';
import Achievements from './components/Achievements';

export default function CareerCoachView() {
  const [readiness, setReadiness] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [skillGaps, setSkillGaps] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [courses, setCourses] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [auditReport, setAuditReport] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    loadCoachData();
  }, []);

  const loadCoachData = async () => {
    const [r, rm, sg, wp, c, ip, ar, ach] = await Promise.all([
      careerCoachService.getReadinessOverview(),
      careerCoachService.getCareerRoadmap(),
      careerCoachService.getSkillGapAnalysis(),
      careerCoachService.getWeeklyPlan(),
      careerCoachService.getRecommendedCourses(),
      careerCoachService.getInterviewPrep(),
      careerCoachService.getAuditReport(),
      careerCoachService.getAchievements()
    ]);
    setReadiness(r);
    setRoadmap(rm);
    setSkillGaps(sg);
    setWeeklyPlan(wp);
    setCourses(c);
    setInterviewPrep(ip);
    setAuditReport(ar);
    setAchievements(ach);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>AI Modules</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-bold">AI Career Coach</span>
      </div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/20 shadow-xl"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="success">POC 05 Module</Badge>
            <span className="text-xs text-muted-foreground font-mono">NVIDIA Llama 3.1 70B • Agentic Career Advisor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            AI Student Career Coach & Mentorship Engine
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Receive personalized placement readiness scoring, skill gap diagnostics, a 7-day weekly learning roadmap, and mock technical interview preparation.
          </p>
        </div>
      </motion.div>

      {/* KPI Readiness Overview Cards */}
      <ReadinessCards readiness={readiness} />

      {/* Career Roadmap Timeline */}
      <CareerRoadmap roadmap={roadmap} />

      {/* Skill Gap Analysis (Strong, Developing, Missing) */}
      <SkillGapSection skillGaps={skillGaps} />

      {/* 7-Day Weekly Learning Roadmap */}
      <WeeklyPlan weeklyPlan={weeklyPlan} />

      {/* AI Recommended Courses & Mock Interview Prep */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseRecommendations courses={courses} />
        <InterviewPrep interviewPrep={interviewPrep} />
      </div>

      {/* Detailed Audit Report */}
      <PlacementReport reportData={auditReport} />

      {/* Unlocked Milestones */}
      <Achievements achievements={achievements} />
    </div>
  );
}
