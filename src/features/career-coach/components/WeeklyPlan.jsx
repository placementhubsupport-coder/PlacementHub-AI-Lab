import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function WeeklyPlan({ weeklyPlan = [], onToggleTask }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-bold text-sm text-foreground">7-Day Personalized AI Learning Roadmap</h3>
            <p className="text-xs text-muted-foreground">Actionable daily targets calibrated against Tier-1 placement expectations.</p>
          </div>
        </div>
        <Badge variant="outline">Week 3 Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 pt-1">
        {weeklyPlan.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
              item.completed
                ? 'border-emerald-500/30 bg-emerald-500/5 text-foreground'
                : 'border-border/70 bg-card hover:border-primary/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.day}
              </span>
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold text-primary block truncate">{item.focus}</span>
              <p className="text-[11px] text-foreground font-medium mt-1 leading-relaxed">{item.task}</p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{item.duration}</span>
              <Badge variant={item.completed ? 'success' : 'outline'} className="py-0 text-[9px]">
                {item.completed ? 'Done' : 'Pending'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
