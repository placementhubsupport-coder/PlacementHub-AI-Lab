import { X, Sparkles, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function CompareStudentsDialog({ isOpen, onClose, candidates = [] }) {
  if (!isOpen || candidates.length < 2) return null;
  const [c1, c2] = candidates;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
      />

      {/* Dialog Body */}
      <div className="relative z-10 w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Side-by-Side AI Candidate Comparison</h3>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Candidate 1 */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border border-primary/20">
                <AvatarImage src={c1.avatar} alt={c1.name} />
                <AvatarFallback>{c1.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-sm text-foreground">{c1.name}</h4>
                <p className="text-xs text-muted-foreground">{c1.branch}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">CGPA:</span>
                <strong className="text-foreground">{c1.cgpa}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resume Score:</span>
                <strong className="text-foreground">{c1.resumeScore}/100</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Match Score:</span>
                <strong className="text-purple-400">{c1.aiMatchScore}%</strong>
              </div>
              <Progress value={c1.aiMatchScore} className="h-1.5 bg-purple-500/20" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-muted-foreground">Primary Skills:</span>
              <div className="flex flex-wrap gap-1">
                {c1.primarySkills.map((sk, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[9px]">{sk}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Candidate 2 */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border border-primary/20">
                <AvatarImage src={c2.avatar} alt={c2.name} />
                <AvatarFallback>{c2.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-sm text-foreground">{c2.name}</h4>
                <p className="text-xs text-muted-foreground">{c2.branch}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">CGPA:</span>
                <strong className="text-foreground">{c2.cgpa}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resume Score:</span>
                <strong className="text-foreground">{c2.resumeScore}/100</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Match Score:</span>
                <strong className="text-purple-400">{c2.aiMatchScore}%</strong>
              </div>
              <Progress value={c2.aiMatchScore} className="h-1.5 bg-purple-500/20" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-muted-foreground">Primary Skills:</span>
              <div className="flex flex-wrap gap-1">
                {c2.primarySkills.map((sk, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[9px]">{sk}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation Summary */}
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI Comparison Verdict
          </div>
          <p className="text-[11px] text-slate-200">
            {c1.aiMatchScore > c2.aiMatchScore
              ? `${c1.name} demonstrates a higher overall match score (${c1.aiMatchScore}%) with strong GPU kernel alignment compared to ${c2.name} (${c2.aiMatchScore}%).`
              : `${c2.name} exhibits a higher overall match score (${c2.aiMatchScore}%) compared to ${c1.name} (${c1.aiMatchScore}%).`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
