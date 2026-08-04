import { MessageSquare, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ConversationList({
  conversations = [],
  activeConvId,
  onSelectConv,
  onNewChat
}) {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border/80 p-4 space-y-4">
      {/* New Chat Trigger */}
      <Button
        onClick={onNewChat}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Copilot Session
      </Button>

      {/* History Section Title */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Sessions</span>
        <Badge variant="outline" className="text-[10px]">{conversations.length}</Badge>
      </div>

      {/* Conversation Thread Items */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {conversations.map((conv) => {
          const isActive = conv.id === activeConvId;
          return (
            <button
              key={conv.id}
              onClick={() => onSelectConv(conv.id)}
              className={`w-full flex items-start justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary/10 border border-primary/30 text-foreground font-semibold shadow-xs'
                  : 'hover:bg-muted/40 border border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <MessageSquare className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="truncate">
                  <p className="text-xs font-bold truncate text-foreground">{conv.title}</p>
                  <p className="text-[10px] text-muted-foreground">{conv.lastUpdated} • {conv.messageCount} msgs</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
