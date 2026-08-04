import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CareerRoadmap({ roadmap = [] }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="font-bold text-sm text-foreground">Personalized AI Placement Roadmap</h3>
          <p className="text-xs text-muted-foreground">Step-by-step career progression timeline generated for Tier-1 AI Product roles.</p>
        </div>
        <Badge variant="success">Stage 3 In Progress</Badge>
      </div>

      {/* Visual Step-by-Step Timeline Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        {roadmap.map((stage) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';

          return (
            <div
              key={stage.step}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2 relative ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-foreground'
                  : isCurrent
                  ? 'border-purple-500/60 bg-purple-500/10 text-foreground shadow-md ring-2 ring-purple-500/20'
                  : 'border-border/60 bg-muted/20 text-muted-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                  Step 0{stage.step}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-purple-400 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-border" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-foreground leading-tight">{stage.title}</h4>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{stage.desc}</p>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px]">
                <Badge variant={isCompleted ? 'success' : isCurrent ? 'warning' : 'outline'} className="py-0">
                  {stage.date}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
