import { useState } from 'react';
import { 
  X, 
  Sparkles, 
  User, 
  Briefcase, 
  FileText, 
  ArrowLeftRight, 
  Download, 
  CheckCircle2, 
  Trophy 
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MatchExplanationCard from './MatchExplanationCard';

export default function MatchDetailsSheet({ isOpen, onClose, student, onCompare }) {
  if (!isOpen || !student) return null;
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleExportReport = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
      />

      {/* 2. Responsive 48-50vw Sheet Container */}
      <div className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-[48vw] h-full bg-card border-l border-border shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-base text-foreground">AI Candidate Match Evaluation</h3>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon" className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* 3. Premium Candidate Profile Summary Header */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 border border-border">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-foreground">{student.name}</h4>
                  <Badge variant="success" className="text-[10px]">High Confidence</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{student.email}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge variant="outline" className="text-[10px]">{student.branch}</Badge>
                  <Badge variant="outline" className="text-[10px]">{student.gradYear} Batch</Badge>
                  <Badge variant="secondary" className="text-[10px]">CGPA: {student.cgpa}</Badge>
                  <Badge variant="success" className="text-[10px]">Resume: {student.resumeScore}/100</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Modern Hero Match Score Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Top Match Benchmark</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white">{student.aiMatchScore}%</h2>
              <p className="text-xs text-indigo-300 font-medium">Rank #1 among processed candidates for this role</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Badge variant="success" className="text-xs px-3 py-1 font-bold">
                Excellent Match
              </Badge>
              <span className="text-[11px] text-slate-300 font-mono">NV-Embed-QA Cosine Embeddings</span>
            </div>
          </div>

          {/* Recommended Jobs List with Redesigned Match Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" /> Top Recommended Job Openings ({student.recommendedJobs.length})
              </h4>
              <Badge variant="outline">Vector Ranked</Badge>
            </div>

            <div className="space-y-4">
              {student.recommendedJobs.map((job) => (
                <MatchExplanationCard key={job.jobId} job={job} student={student} />
              ))}
            </div>
          </div>
        </div>

        {/* 11. Sticky Footer Inside Sheet */}
        <div className="p-4 bg-card border-t border-border flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="font-semibold text-xs">
              <FileText className="w-3.5 h-3.5 mr-1.5" /> View Resume
            </Button>
            <Button
              onClick={() => {
                if (onCompare) onCompare(student.id);
                onClose();
              }}
              variant="outline"
              size="sm"
              className="font-semibold text-xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" /> Compare Candidate
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportReport}
              variant="outline"
              size="sm"
              className="font-semibold text-xs"
            >
              {downloadNotice ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Exported!
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Export Report
                </>
              )}
            </Button>
            <Button onClick={onClose} variant="default" size="sm" className="font-semibold text-xs">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
