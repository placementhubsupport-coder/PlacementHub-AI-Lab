import { 
  Bot, 
  Sparkles, 
  User, 
  CheckCircle2, 
  Briefcase, 
  Award, 
  Zap 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import QuickActions from './QuickActions';

export default function ContextSidebar({ contextData, onTriggerModuleAction }) {
  if (!contextData) {
    return (
      <div className="p-4 text-xs text-muted-foreground text-center">
        No active session context selected.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card border-l border-border/80 p-4 space-y-5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">AI Session Context</h3>
        </div>
        <Badge variant="success" className="text-[10px]">Active Session</Badge>
      </div>

      {/* Candidate Overview */}
      <Card className="p-3.5 space-y-3 border-purple-500/30 bg-purple-500/5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-purple-400">Target Candidate Profile</span>
          <User className="w-4 h-4 text-purple-400" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground">{contextData.candidate}</h4>
          <p className="text-[11px] text-muted-foreground">{contextData.targetRole}</p>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ATS Score:</span>
            <strong className="text-foreground">{contextData.currentScore}/100</strong>
          </div>
          <Progress value={contextData.currentScore} className="h-1.5" />
        </div>
      </Card>

      {/* Recommended Job Context */}
      <div className="space-y-2 text-xs">
        <span className="font-bold text-foreground flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-blue-400" /> Target Job Alignment
        </span>
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">{contextData.topJob}</span>
            <Badge variant="success">{contextData.matchPercentage}%</Badge>
          </div>
          <p className="text-[10px] text-muted-foreground">Highest vector correlation in active drive roster.</p>
        </div>
      </div>

      {/* Relevant Skills */}
      <div className="space-y-2 text-xs">
        <span className="font-bold text-foreground flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Active Skill Matrix
        </span>
        <div className="flex flex-wrap gap-1">
          {contextData.keySkills.map((sk, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px]">
              {sk}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Quick Action Orchestration Panel */}
      <QuickActions onTriggerAction={onTriggerModuleAction} />
    </div>
  );
}
