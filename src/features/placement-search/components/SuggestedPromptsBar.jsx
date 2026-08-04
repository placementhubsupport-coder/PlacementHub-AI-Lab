import { Sparkles, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SuggestedPromptsBar({
  prompts = [],
  recentSearches = [],
  onSelectPrompt
}) {
  return (
    <div className="space-y-3">
      {/* Suggested Prompts */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Suggested Conversational Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          {prompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(promptText)}
              className="px-3 py-1.5 rounded-xl bg-card border border-border/70 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-xs text-foreground font-medium transition-all text-left cursor-pointer shadow-xs"
            >
              ✨ "{promptText}"
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="flex items-center gap-2 text-xs pt-1">
          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground font-medium shrink-0">Recent:</span>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto">
            {recentSearches.map((rec) => (
              <Badge
                key={rec.id}
                variant="secondary"
                onClick={() => onSelectPrompt(rec.query)}
                className="cursor-pointer hover:bg-muted font-normal text-[10px]"
              >
                {rec.query}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
