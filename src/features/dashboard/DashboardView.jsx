import { useState, useEffect } from 'react';
import { Sparkles, FileSearch, Search, Bot, GraduationCap } from 'lucide-react';
import { dashboardService } from '@/services/dashboardService';

import DashboardHero from './components/DashboardHero';
import MetricsGrid from './components/MetricsGrid';
import PocModulesGrid from './components/PocModulesGrid';
import NimHealthPanel from './components/NimHealthPanel';
import PlacementAnalyticsChart from './components/PlacementAnalyticsChart';
import RecentActivityFeed from './components/RecentActivityFeed';

export default function DashboardView({ onSelectPoc }) {
  const [metrics, setMetrics] = useState([]);
  const [nimServices, setNimServices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pocModules = [
    {
      id: 'poc-01',
      title: 'POC 01: Student-Job Matching',
      subtitle: 'NVIDIA Vector Matching Engine',
      description: 'Semantic vector matching between student skill matrices and corporate job criteria with explainable AI match reasoning.',
      icon: Sparkles,
      badgeText: 'Active POC',
      badgeVariant: 'success',
      tech: 'NV-Embed-QA • Llama 3.1 70B',
      stats: '96.4% Precision'
    },
    {
      id: 'poc-02',
      title: 'POC 02: AI Resume Analyzer',
      subtitle: 'Automated ATS Resume Evaluator',
      description: 'Instant parsing of candidate resumes, ATS compatibility scoring, skill gap detection, and formatting recommendations.',
      icon: FileSearch,
      badgeText: 'Ready',
      badgeVariant: 'default',
      tech: 'Llama 3.1 70B • Struct-Extract',
      stats: '3,850 Resumes Scanned'
    },
    {
      id: 'poc-03',
      title: 'POC 03: Placement Search Engine',
      subtitle: 'Natural Language Query Processor',
      description: 'Natural language search across student profiles and recruitment drives using high-dimensional vector index queries.',
      icon: Search,
      badgeText: 'Ready',
      badgeVariant: 'default',
      tech: 'NV-Embed-QA NIM',
      stats: '14ms Avg Response'
    },
    {
      id: 'poc-04',
      title: 'POC 04: Placement Copilot',
      subtitle: 'TPO & College Admin Assistant',
      description: 'Conversational assistant for college placement teams to generate placement drive summaries, analytics, and email outreach.',
      icon: Bot,
      badgeText: 'New POC',
      badgeVariant: 'warning',
      tech: 'Llama 3.1 70B Instruct',
      stats: 'Interactive Chatbot'
    },
    {
      id: 'poc-05',
      title: 'POC 05: AI Student Career Coach',
      subtitle: 'Personalized Career Mentorship',
      description: 'AI-driven career roadmap planner, skill gap bridge guide, and interactive mock technical interview prep simulator.',
      icon: GraduationCap,
      badgeText: 'Ready',
      badgeVariant: 'default',
      tech: 'Llama 3.1 70B • Agentic',
      stats: 'Mock Interview Simulator'
    }
  ];

  useEffect(() => {
    loadDashboardData();
  }, [selectedFilter]);

  const loadDashboardData = async () => {
    const [m, n, a, p] = await Promise.all([
      dashboardService.getMetrics(),
      dashboardService.getNimHealthStatus(),
      dashboardService.getRecentActivities(selectedFilter),
      dashboardService.getPlacementAnalytics()
    ]);
    setMetrics(m);
    setNimServices(n);
    setActivities(a);
    setAnalyticsData(p);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDashboardData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-8 pb-10">
      <DashboardHero
        onSelectPoc={onSelectPoc}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <MetricsGrid metrics={metrics} />

      <PocModulesGrid modules={pocModules} onSelectPoc={onSelectPoc} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <NimHealthPanel nimServices={nimServices} />
        <PlacementAnalyticsChart analyticsData={analyticsData} />
      </div>

      <RecentActivityFeed
        activities={activities}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
    </div>
  );
}
