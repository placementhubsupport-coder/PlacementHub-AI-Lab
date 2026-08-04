import { CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SkillGapSection({ skillGaps }) {
  if (!skillGaps) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Strong Skills */}
      <Card className="p-5 space-y-4 border-emerald-500/20 bg-emerald-500/5">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-foreground">Verified Strong Skills</h3>
          </div>
          <Badge variant="success">Mastered</Badge>
        </div>

        <div className="space-y-3">
          {skillGaps.strong.map((sk, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-foreground font-bold">{sk.name}</span>
                <span className="text-emerald-400 font-bold">{sk.level}%</span>
              </div>
              <Progress value={sk.level} className="h-1.5 bg-emerald-500/20" />
            </div>
          ))}
        </div>
      </Card>

      {/* Developing Skills */}
      <Card className="p-5 space-y-4 border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-foreground">Developing Skills</h3>
          </div>
          <Badge variant="warning">In Progress</Badge>
        </div>

        <div className="space-y-3">
          {skillGaps.developing.map((sk, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-foreground font-bold">{sk.name}</span>
                <span className="text-amber-400 font-bold">{sk.level}%</span>
              </div>
              <Progress value={sk.level} className="h-1.5 bg-amber-500/20" />
            </div>
          ))}
        </div>
      </Card>

      {/* Missing Skills */}
      <Card className="p-5 space-y-4 border-purple-500/20 bg-purple-500/5">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-sm text-foreground">Missing High-Impact Skills</h3>
          </div>
          <Badge variant="destructive">Priority Gap</Badge>
        </div>

        <div className="space-y-3">
          {skillGaps.missing.map((sk, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">{sk.name}</span>
                <Badge variant={sk.priority === 'High' ? 'destructive' : 'warning'} className="text-[10px]">
                  {sk.priority} Priority
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">{sk.reason}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
