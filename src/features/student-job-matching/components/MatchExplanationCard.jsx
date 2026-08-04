import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Briefcase, 
  Code2, 
  BookOpen, 
  TrendingUp,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MatchExplanationCard({ job, student }) {
  if (!job) return null;
  const { aiExplanation } = job;

  return (
    <Card className="p-6 space-y-6 border-border bg-card shadow-xs hover:border-primary/40 transition-all">
      {/* 5. Premium Recommended Job Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-2xl shrink-0">
            {job.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-foreground">{job.role}</h4>
              <Badge variant="outline" className="text-[10px]">{job.location}</Badge>
            </div>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5">{job.company}</p>
          </div>
        </div>

        <div className="text-right">
          <Badge variant="success" className="text-xs px-3 py-1 font-bold">
            {job.matchScore}% Match
          </Badge>
          <p className="text-xs text-muted-foreground font-medium mt-1">CTC: {job.ctc}</p>
        </div>
      </div>

      {/* 8. Compact KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Resume Quality</span>
          <p className="font-extrabold text-foreground text-sm">{student?.resumeScore || 94}/100</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Experience Match</span>
          <p className="font-extrabold text-foreground text-sm">95%</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Semantic Similarity</span>
          <p className="font-extrabold text-foreground text-sm">{job.semanticSimilarity}</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Vector Confidence</span>
          <p className="font-extrabold text-emerald-500 text-sm">{job.confidence}</p>
        </div>
      </div>

      {/* 6. Redesigned AI Match Explanation Checklist */}
      <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>AI Vector Match Reasoning</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Strong PyTorch & Transformer experience</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Previous vector retrieval project aligns well</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Resume ATS score exceeds benchmark (94/100)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Internship experience matches job criteria</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Kubernetes orchestration recommended</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>TensorRT-LLM FP8 would improve ranking</span>
          </div>
        </div>
      </div>

      {/* 7. Organized Skills Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matched Skills */}
        <div className="space-y-2">
          <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Matched Skills ({job.matchedSkills.length})
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {job.matchedSkills.map((sk, idx) => (
              <Badge key={idx} variant="success" className="text-[10px]">
                ✓ {sk}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="space-y-2">
          <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Missing Target Skills ({job.missingSkills.length})
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {job.missingSkills.map((ms, idx) => (
              <Badge key={idx} variant="warning" className="text-[10px]">
                ⚠ {ms}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 9. Modern Project Cards */}
      {job.relevantProjects && job.relevantProjects.length > 0 && (
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-primary" /> High-Alignment Candidate Projects
          </h5>
          <div className="grid grid-cols-1 gap-2.5">
            {job.relevantProjects.map((proj, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-card border border-border space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{proj}</span>
                  <Badge variant="outline" className="text-[9px]">96% Relevance</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Alignd with company high-throughput vector retrieval pipeline requirements.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Skill Bridge Roadmap Checklist */}
      <div className="space-y-3">
        <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Skill Bridge Action Roadmap
        </h5>
        <div className="space-y-2">
          {aiExplanation.suggestedPath.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-card border border-border flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <input type="checkbox" readOnly checked className="w-4 h-4 rounded text-primary border-border cursor-pointer" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
              <Badge variant="outline" className="text-[9px] shrink-0">Est: 2-3 Days</Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
