import { Award, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  CheckCircle2,
  Award,
  Zap,
  Sparkles
};

export default function Achievements({ achievements = [] }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-foreground">Unlocked Candidate Career Milestones ({achievements.length})</h3>
        </div>
        <Badge variant="warning">Tier-1 Qualified</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {achievements.map((ach) => {
          const Icon = iconMap[ach.icon] || CheckCircle2;
          return (
            <div
              key={ach.id}
              className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 space-y-1"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-foreground">{ach.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-snug">{ach.desc}</p>
                <Badge variant="success" className="text-[9px] py-0 mt-1">
                  ✓ {ach.date}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
