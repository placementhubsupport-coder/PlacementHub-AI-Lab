import { Cpu, CheckCircle2, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ParsedFiltersBanner({ filters }) {
  if (!filters) return null;

  return (
    <Card className="p-4 bg-gradient-to-br from-indigo-950/20 via-card to-card border-indigo-500/30 space-y-3">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">
            AI Extracted Filter Parameters (NVIDIA NV-Embed-QA Parsing)
          </h3>
        </div>
        <Badge variant="success" className="text-[10px]">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Vector Parsed
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <div className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
          Role: <strong className="text-foreground">{filters.extractedRole}</strong>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
          Location: <strong className="text-foreground">{filters.location}</strong>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
          Type: <strong className="text-foreground">{filters.jobType}</strong>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
          Min Stipend: <strong className="text-foreground">{filters.minStipend}</strong>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[10px] ml-auto">
          ⚡ {filters.embeddingVectorDimensions}
        </div>
      </div>
    </Card>
  );
}
