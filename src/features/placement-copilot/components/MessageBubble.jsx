import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCw, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function MessageBubble({ message, onRegenerate, onNavigateModule }) {
  const isUser = (message?.role === 'user') || (message?.sender === 'user');
  const contentText = message?.content || message?.text || '';
  const cta = message?.cta || message?.ctaAction || null;
  const timestamp = message?.timestamp || 'Just now';

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(message?.feedback || null);

  const handleCopy = () => {
    if (!contentText) return;
    navigator.clipboard.writeText(contentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCtaClick = () => {
    if (!cta?.targetPoc) return;
    if (onNavigateModule) {
      onNavigateModule(`/${cta.targetPoc}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3.5 p-4 rounded-2xl transition-colors ${
        isUser
          ? 'bg-primary/10 border border-primary/20 ml-auto max-w-2xl'
          : 'bg-card border border-border/80 max-w-3xl shadow-xs'
      }`}
    >
      <Avatar className={`w-8 h-8 shrink-0 ${isUser ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>
        <AvatarFallback className={isUser ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold ${isUser ? 'text-blue-400' : 'text-purple-400 flex items-center gap-1'}`}>
            {!isUser && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
            {isUser ? 'Candidate User' : 'Placement Copilot (Llama 3.1 70B)'}
          </span>
          <span className="text-[10px] text-muted-foreground">{timestamp}</span>
        </div>

        {/* Clean Markdown Rendering Container */}
        <div className="text-xs sm:text-sm text-foreground leading-relaxed prose dark:prose-invert max-w-none space-y-2">
          <ReactMarkdown
            components={{
              h3: ({ children }) => <h3 className="text-sm font-bold text-foreground mt-2 mb-1">{children}</h3>,
              h4: ({ children }) => <h4 className="text-xs font-bold text-foreground mt-2 mb-1">{children}</h4>,
              p: ({ children }) => <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-1.5">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-xs space-y-1 mb-2 text-foreground">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-xs space-y-1 mb-2 text-foreground">{children}</ol>,
              li: ({ children }) => <li className="text-xs text-foreground font-normal">{children}</li>,
              strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
              code: ({ inline, children }) =>
                inline ? (
                  <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-[11px] text-purple-400">{children}</code>
                ) : (
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto my-2 border border-slate-800">
                    <code>{children}</code>
                  </pre>
                )
            }}
          >
            {contentText}
          </ReactMarkdown>
        </div>

        {/* Intent CTA Action Button */}
        {!isUser && cta && (
          <div className="pt-2">
            <Button
              onClick={handleCtaClick}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        )}

        {!isUser && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/40 text-xs">
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="h-7 text-[11px] text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="w-3 h-3 mr-1 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>

            {onRegenerate && (
              <Button
                onClick={onRegenerate}
                variant="ghost"
                size="sm"
                className="h-7 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <RotateCw className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
            )}

            <div className="flex items-center gap-1 ml-auto">
              <Button
                onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${feedback === 'up' ? 'text-emerald-400' : 'text-muted-foreground'}`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </Button>
              <Button
                onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${feedback === 'down' ? 'text-red-400' : 'text-muted-foreground'}`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
