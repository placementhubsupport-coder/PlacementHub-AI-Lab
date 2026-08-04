import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40 max-w-xl">
      <Avatar className="w-8 h-8 bg-purple-600 text-white shrink-0">
        <AvatarFallback className="bg-purple-600 text-white">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>

      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold text-purple-400">NVIDIA Llama 3.1 70B Thinking...</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
