import { CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MatchedKeywordsCloud({ matchedSkills = [] }) {
  return (
    <Card className="p-6 space-y-3">
      <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        Detected & Verified Resume Keywords ({matchedSkills.length})
      </h3>
      <div className="flex flex-wrap gap-2 pt-1">
        {matchedSkills.map((skill, idx) => (
          <Badge key={idx} variant="success">
            ✓ {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
