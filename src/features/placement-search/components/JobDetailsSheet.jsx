import { X, Sparkles, MapPin, DollarSign, Calendar, Building, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function JobDetailsSheet({ isOpen, onClose, job }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
      />

      {/* Sheet Container */}
      <div className="relative z-10 w-full max-w-xl h-full bg-card border-l border-border shadow-2xl overflow-y-auto p-6 space-y-6 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl shrink-0">
              {job.logo}
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground">{job.title}</h3>
              <p className="text-xs text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Location
            </span>
            <p className="font-bold text-foreground">{job.location}</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Stipend / CTC
            </span>
            <p className="font-bold text-foreground">{job.stipend}</p>
          </div>
        </div>

        {/* AI Vector Match Explanation */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> AI Vector Match Analysis
            </span>
            <Badge variant="success">{job.matchScore}% Similarity</Badge>
          </div>
          <p className="text-slate-200 leading-relaxed">
            {job.aiExplanation.whyMatch}
          </p>

          <Separator className="bg-indigo-500/20 my-2" />

          <div className="space-y-1 pt-1">
            <span className="font-semibold text-indigo-200">Query Alignment Breakdown:</span>
            <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
              {job.aiExplanation.queryAlignment.map((align, idx) => (
                <li key={idx}>{align}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-foreground">Drive & Opportunity Overview</h4>
          <p className="text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Skills Required */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-foreground">Required Technical Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {job.matchedSkills.map((sk, idx) => (
              <Badge key={idx} variant="success">
                ✓ {sk}
              </Badge>
            ))}
            {job.missingSkills.map((ms, idx) => (
              <Badge key={idx} variant="outline" className="text-muted-foreground">
                Missing: {ms}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-4 h-4 mr-2" /> Apply Candidate Roster to Drive
          </Button>
        </div>
      </div>
    </div>
  );
}
