import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MissingSkillsPanel({ missingSkills = [], targetRole }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-foreground">Missing & High-Impact Target Skills</h3>
        </div>
        <Badge variant="outline">{missingSkills.length} Detected</Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Skills required for <strong>{targetRole}</strong> missing or under-represented in candidate resume:
      </p>

      <div className="space-y-2.5">
        {missingSkills.map((sk, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
            <div>
              <span className="text-xs font-bold text-foreground">{sk.name}</span>
              <p className="text-[10px] text-muted-foreground">{sk.category}</p>
            </div>
            <Badge variant={sk.priority === 'High' ? 'destructive' : 'warning'}>
              {sk.priority} Priority
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
