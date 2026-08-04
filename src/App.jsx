import { useState } from 'react';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardView from '@/features/dashboard/DashboardView';
import ResumeAnalyzerView from '@/features/resume-analyzer/ResumeAnalyzerView';
import StudentJobMatchingView from '@/features/student-job-matching/StudentJobMatchingView';
import PlacementSearchView from '@/features/placement-search/PlacementSearchView';
import PlacementCopilotView from '@/features/placement-copilot/PlacementCopilotView';
import CareerCoachView from '@/features/career-coach/CareerCoachView';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [currentTitle, setCurrentTitle] = useState('PlacementHub AI Lab — Dashboard');

  const handleNavigate = (path) => {
    setCurrentPath(path);
    if (path === '/') setCurrentTitle('PlacementHub AI Lab — Dashboard');
    else if (path.includes('poc-01')) setCurrentTitle('POC 01: AI Student–Job Matching Engine');
    else if (path.includes('poc-02')) setCurrentTitle('POC 02: Automated AI Resume Analyzer');
    else if (path.includes('poc-03')) setCurrentTitle('POC 03: Placement Search Engine');
    else if (path.includes('poc-04')) setCurrentTitle('POC 04: Placement Copilot Assistant');
    else if (path.includes('poc-05')) setCurrentTitle('POC 05: AI Student Career Coach');
    else if (path.includes('nim-status')) setCurrentTitle('NVIDIA NIM Infrastructure Status');
    else if (path.includes('settings')) setCurrentTitle('Lab Settings');
    else setCurrentTitle('PlacementHub AI Lab');
  };

  const renderContent = () => {
    if (currentPath.includes('poc-01')) {
      return <StudentJobMatchingView />;
    }
    if (currentPath.includes('poc-02')) {
      return <ResumeAnalyzerView />;
    }
    if (currentPath.includes('poc-03')) {
      return <PlacementSearchView />;
    }
    if (currentPath.includes('poc-04')) {
      return <PlacementCopilotView onNavigateModule={(path) => handleNavigate(path)} />;
    }
    if (currentPath.includes('poc-05')) {
      return <CareerCoachView />;
    }
    return <DashboardView onSelectPoc={(id) => handleNavigate(`/${id}`)} />;
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <DashboardLayout
        currentPath={currentPath}
        currentTitle={currentTitle}
        onNavigate={handleNavigate}
      >
        {renderContent()}
      </DashboardLayout>
    </ThemeProvider>
  );
}
