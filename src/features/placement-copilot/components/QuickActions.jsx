import { 
  FileSearch, 
  Sparkles, 
  Search, 
  GraduationCap, 
  CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickActions({ onTriggerAction }) {
  const actions = [
    {
      id: 'resume',
      label: 'Launch Resume Analyzer',
      icon: FileSearch,
      targetPoc: 'poc-02'
    },
    {
      id: 'matching',
      label: 'Launch Student Matcher',
      icon: Sparkles,
      targetPoc: 'poc-01'
    },
    {
      id: 'search',
      label: 'Launch Placement Search',
      icon: Search,
      targetPoc: 'poc-03'
    },
    {
      id: 'coach',
      label: 'Launch Career Coach',
      icon: GraduationCap,
      targetPoc: 'poc-05'
    }
  ];

  return (
    <div className="space-y-2 pt-2 border-t border-border">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        AI Module Orchestration
      </span>
      <div className="space-y-1.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Button
              key={act.id}
              onClick={() => onTriggerAction && onTriggerAction(act.targetPoc, act.label)}
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400"
            >
              <Icon className="w-3.5 h-3.5 mr-2 text-purple-400" />
              <span>{act.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
