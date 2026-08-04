import { Sparkles, CheckCircle, Zap, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function AnalysisMetricsGrid({ activeResume }) {
  if (!activeResume) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Analysis Results: <span className="text-purple-400">{activeResume.candidateName}</span>
        </h2>
        <Badge variant="success">Scan Complete</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ATS Score */}
        <Card className="p-5 relative overflow-hidden border-purple-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">ATS Compatibility Score</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold text-foreground">{activeResume.atsScore}</h3>
            <span className="text-xs font-bold text-muted-foreground">/ 100</span>
            <Badge variant="success" className="ml-auto text-[10px]">High Pass</Badge>
          </div>
          <div className="mt-3">
            <Progress value={activeResume.atsScore} className="h-2" />
          </div>
        </Card>

        {/* Overall Resume Score */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Overall Resume Score</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold text-foreground">{activeResume.resumeScore}</h3>
            <span className="text-xs font-bold text-muted-foreground">/ 100</span>
          </div>
          <div className="mt-3">
            <Progress value={activeResume.resumeScore} className="h-2" />
          </div>
        </Card>

        {/* Skill Match Score */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Skill Match Rate</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold text-foreground">{activeResume.skillMatch}%</h3>
            <Badge variant="default" className="ml-auto text-[10px]">Role Aligned</Badge>
          </div>
          <div className="mt-3">
            <Progress value={activeResume.skillMatch} className="h-2" />
          </div>
        </Card>

        {/* Keyword Match Score */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Keyword Match Rate</span>
            <Tag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold text-foreground">{activeResume.keywordMatch}%</h3>
            <Badge variant="warning" className="ml-auto text-[10px]">Good</Badge>
          </div>
          <div className="mt-3">
            <Progress value={activeResume.keywordMatch} className="h-2" />
          </div>
        </Card>
      </div>
    </div>
  );
}
