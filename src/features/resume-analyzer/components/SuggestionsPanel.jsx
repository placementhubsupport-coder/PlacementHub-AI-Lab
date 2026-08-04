import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SuggestionsPanel({ suggestions = [] }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm text-foreground">AI Phrasing & Metric Suggestions</h3>
        </div>
        <Badge variant="success">Llama 3.1 70B</Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Optimized bullet phrasing recommendations to increase ATS index ranking:
      </p>

      <div className="space-y-3">
        {suggestions.map((sug, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-muted/40 border border-border/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-400">{sug.type}</span>
              <Badge variant="success">{sug.impact}</Badge>
            </div>
            <div className="text-[11px] space-y-1">
              <p className="text-muted-foreground line-through">Current: "{sug.current}"</p>
              <p className="text-foreground font-medium">Recommended: "{sug.improved}"</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
