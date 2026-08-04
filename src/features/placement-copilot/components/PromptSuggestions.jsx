import { 
  FileSearch, 
  Sparkles, 
  Bot, 
  GraduationCap 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  FileSearch,
  Sparkles,
  Bot,
  GraduationCap
};

export default function PromptSuggestions({ prompts = [], onSelectPrompt }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto py-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-2xl">
          🤖
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          How can I assist your campus placement journey today?
        </h2>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Ask me to evaluate candidate resumes, recommend vector-matched jobs, generate technical interview questions, or plan a career roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prompts.map((p) => {
          const Icon = iconMap[p.icon] || Sparkles;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPrompt(p.title)}
              className="text-left cursor-pointer transition-all"
            >
              <Card className="p-4 h-full hover:border-purple-500/50 hover:bg-purple-500/5 transition-all space-y-2 group border-border/80">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground group-hover:text-purple-400 transition-colors">{p.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{p.description}</p>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
