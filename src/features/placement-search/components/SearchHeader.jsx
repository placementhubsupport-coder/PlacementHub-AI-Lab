import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SearchHeader() {
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <span>Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>AI Modules</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-bold">Placement Search Engine</span>
      </div>

      {/* Page Title Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 border border-indigo-500/20 shadow-xl"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="success">POC 03 Module</Badge>
            <span className="text-xs text-muted-foreground font-mono">NVIDIA NV-Embed-QA NIM • 14ms Response</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            AI Natural Language Placement Search
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Conversational, query-driven search across student rosters and recruitment drives using high-dimensional vector embeddings and explainable AI semantics.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
