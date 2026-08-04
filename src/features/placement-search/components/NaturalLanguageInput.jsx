import { Sparkles, ArrowRight, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NaturalLanguageInput({
  query,
  onQueryChange,
  onSubmit,
  isSearching,
  onClear
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border-2 border-indigo-500/30 p-2 sm:p-3 shadow-xl focus-within:border-indigo-500 transition-colors">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 shrink-0">
          <Sparkles className={`w-5 h-5 ${isSearching ? 'animate-spin text-purple-400' : 'animate-pulse'}`} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Try typing: "Find remote React internships in Pune with a stipend above ₹20K"...'
          className="w-full bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />

        {query && (
          <Button
            onClick={onClear}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        <Button
          onClick={onSubmit}
          disabled={!query.trim() || isSearching}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 shrink-0"
        >
          {isSearching ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Search AI Vector</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
