import { motion } from 'framer-motion';
import { Download, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ResumeAnalyzerHero({ onDownloadReport, downloadSuccess }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-indigo-900/40 border border-purple-500/20 shadow-xl"
    >
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Badge variant="success">POC 02 Module</Badge>
          <span className="text-xs text-muted-foreground font-mono">NVIDIA Llama 3.1 70B Struct-Extract</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Automated AI Resume Analyzer & ATS Scorer
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Upload candidate resumes to extract structured skills, compute role-based ATS compatibility scores, detect missing high-impact keywords, and generate phrasing improvements.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onDownloadReport}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-600/25 border border-purple-400/30"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-300" />
              Report Downloaded!
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
