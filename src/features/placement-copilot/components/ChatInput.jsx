import { Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ChatInput({ input, onInputChange, onSend, isSending }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-3 bg-card border-t border-border/80 space-y-2">
      <div className="relative flex items-center">
        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Placement Copilot anything (e.g., 'Analyze candidate resume for TechCorp AI Labs')..."
          className="min-h-[50px] max-h-[140px] pr-14 py-3 bg-muted/40 resize-none rounded-2xl text-xs sm:text-sm"
        />

        <Button
          onClick={onSend}
          disabled={!input.trim() || isSending}
          size="icon"
          className="absolute right-2.5 bottom-2.5 h-9 w-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/25 shrink-0"
        >
          {isSending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
        <span>Placement Copilot (Llama 3.1 70B Instruct)</span>
        <span>Press <kbd className="font-semibold text-foreground">Shift + Enter</kbd> for new line</span>
      </div>
    </div>
  );
}
