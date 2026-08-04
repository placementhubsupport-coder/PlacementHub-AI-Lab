import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowLeftRight, 
  ChevronRight, 
  Layers 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { studentJobMatchingService } from '@/services/studentJobMatchingService';

import MatchingKpiCards from './components/MatchingKpiCards';
import MatchingFilters from './components/MatchingFilters';
import StudentMatchTable from './components/StudentMatchTable';
import MatchDetailsSheet from './components/MatchDetailsSheet';
import CompareStudentsDialog from './components/CompareStudentsDialog';

export default function StudentJobMatchingView() {
  const [kpis, setKpis] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCompareIds, setSelectedCompareIds] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [filters, setFilters] = useState({
    query: '',
    branch: 'all',
    gradYear: 'all',
    minCgpa: 'all',
    location: 'all',
    jobType: 'all',
  });

  useEffect(() => {
    loadKpis();
  }, []);

  useEffect(() => {
    loadMatches();
  }, [filters]);

  const loadKpis = async () => {
    const data = await studentJobMatchingService.getKpiStats();
    setKpis(data);
  };

  const loadMatches = async () => {
    const data = await studentJobMatchingService.getStudentMatches(filters);
    setStudents(data);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      branch: 'all',
      gradYear: 'all',
      minCgpa: 'all',
      location: 'all',
      jobType: 'all',
    });
  };

  const handleViewMatch = (student) => {
    setSelectedStudent(student);
    setIsSheetOpen(true);
  };

  const handleCompareSelect = (studentId) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }
      if (prev.length >= 2) {
        return [prev[1], studentId];
      }
      return [...prev, studentId];
    });
  };

  const compareCandidates = students.filter((s) => selectedCompareIds.includes(s.id));

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>AI Modules</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-bold">Student-Job Matching</span>
      </div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 shadow-xl"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="success">POC 01 Module</Badge>
            <span className="text-xs text-muted-foreground font-mono">NV-Embed-QA • Llama 3.1 70B</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            AI Student–Job Matching Engine
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Match students with the most suitable corporate opportunities using AI-powered semantic vector analysis and explainable match scoring.
          </p>
        </div>

        {selectedCompareIds.length >= 2 && (
          <Button
            onClick={() => setIsCompareOpen(true)}
            className="bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25"
          >
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Compare {selectedCompareIds.length} Selected Candidates
          </Button>
        )}
      </motion.div>

      {/* KPI Cards */}
      <MatchingKpiCards kpis={kpis} />

      {/* Filters Bar */}
      <MatchingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Candidate Data Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">
            Processed Candidate Match Roster ({students.length})
          </h3>
          <span className="text-xs text-muted-foreground">Select candidate row to view detailed AI vector breakdown</span>
        </div>

        <StudentMatchTable
          students={students}
          onViewMatch={handleViewMatch}
          onCompareSelect={handleCompareSelect}
          selectedCompareIds={selectedCompareIds}
        />
      </div>

      {/* AI Match Details Sheet Drawer */}
      <MatchDetailsSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        student={selectedStudent}
      />

      {/* Compare Students Dialog */}
      <CompareStudentsDialog
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        candidates={compareCandidates}
      />
    </div>
  );
}
