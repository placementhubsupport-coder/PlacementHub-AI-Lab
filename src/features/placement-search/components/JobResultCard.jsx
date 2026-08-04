import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function JobResultCard({ job, onSelectJob }) {
  const { aiExplanation } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="p-6 space-y-4 hover:border-indigo-500/50 hover:shadow-xl transition-all border-border/80 group">
        {/* Top Job Title & Logo */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
              {job.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-foreground group-hover:text-indigo-400 transition-colors">
                  {job.title}
                </h3>
                <Badge variant="outline" className="text-[10px]">{job.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xl font-extrabold text-indigo-400">{job.matchScore}% Match</span>
            <p className="text-[10px] text-muted-foreground font-mono">Similarity: {job.semanticSimilarity}</p>
          </div>
        </div>

        {/* Info Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/50">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Stipend: <strong className="text-foreground">{job.stipend}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> Drive Date: <strong className="text-foreground">{job.driveDate}</strong>
          </span>
        </div>

        {/* AI Semantic Explanation Banner */}
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Natural Language Match Explanation
          </div>
          <p className="text-[11px] text-slate-200 leading-relaxed">
            {aiExplanation.whyMatch}
          </p>
        </div>

        {/* Matched & Missing Skills Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-muted-foreground">Matched Skills:</span>
            {job.matchedSkills.map((sk, idx) => (
              <Badge key={idx} variant="success" className="text-[10px]">
                ✓ {sk}
              </Badge>
            ))}
          </div>

          <Button
            onClick={() => onSelectJob && onSelectJob(job)}
            variant="outline"
            size="sm"
            className="font-semibold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-xs"
          >
            <span>View Drive Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
