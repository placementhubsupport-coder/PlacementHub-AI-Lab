import { useState, useEffect } from 'react';
import { resumeAnalyzerService } from '@/services/resumeAnalyzerService';

import ResumeAnalyzerHero from './components/ResumeAnalyzerHero';
import ResumeUploadCard from './components/ResumeUploadCard';
import RecentUploadsCard from './components/RecentUploadsCard';
import AnalysisMetricsGrid from './components/AnalysisMetricsGrid';
import MissingSkillsPanel from './components/MissingSkillsPanel';
import SuggestionsPanel from './components/SuggestionsPanel';
import MatchedKeywordsCloud from './components/MatchedKeywordsCloud';

export default function ResumeAnalyzerView() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('res-1');
  const [activeResume, setActiveResume] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [customRole, setCustomRole] = useState('AI / ML Engineer');

  useEffect(() => {
    loadInitialResumes();
  }, []);

  useEffect(() => {
    if (selectedResumeId) {
      loadResumeAnalysis(selectedResumeId);
    }
  }, [selectedResumeId]);

  const loadInitialResumes = async () => {
    const list = await resumeAnalyzerService.getSampleResumes();
    setResumes(list);
    if (list.length > 0) {
      setSelectedResumeId(list[0].id);
      setCustomRole(list[0].targetRole);
    }
  };

  const loadResumeAnalysis = async (id) => {
    const data = await resumeAnalyzerService.getResumeAnalysisById(id);
    setActiveResume(data);
  };

  const handleSelectResume = (res) => {
    setSelectedResumeId(res.id);
    setCustomRole(res.targetRole);
  };

  const simulateAnalysis = async (file = null) => {
    setIsAnalyzing(true);
    const result = await resumeAnalyzerService.analyzeResumeFile(file, customRole);
    setActiveResume(result);
    setIsAnalyzing(false);
  };

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      <ResumeAnalyzerHero
        onDownloadReport={handleDownloadReport}
        downloadSuccess={downloadSuccess}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResumeUploadCard
          isDragOver={isDragOver}
          isAnalyzing={isAnalyzing}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); simulateAnalysis(); }}
          onSelectFile={() => simulateAnalysis()}
          targetRole={customRole}
        />

        <RecentUploadsCard
          resumes={resumes}
          selectedResumeId={selectedResumeId}
          onSelectResume={handleSelectResume}
        />
      </div>

      <AnalysisMetricsGrid activeResume={activeResume} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MissingSkillsPanel
          missingSkills={activeResume?.missingSkills || []}
          targetRole={customRole}
        />

        <SuggestionsPanel
          suggestions={activeResume?.suggestions || []}
        />
      </div>

      <MatchedKeywordsCloud
        matchedSkills={activeResume?.matchedSkills || []}
      />
    </div>
  );
}
