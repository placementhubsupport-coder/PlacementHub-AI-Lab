import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RecentActivityFeed({ 
  activities = [], 
  selectedFilter = 'all', 
  onFilterChange 
}) {
  const filterKeys = ['all', 'match', 'resume', 'search', 'copilot'];

  return (
    <Card className="p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-bold text-sm text-foreground">Recent Real-Time Activity Feed</h3>
            <p className="text-xs text-muted-foreground">Live log of AI candidate matching, ATS evaluations, and copilot actions.</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border/60">
          {filterKeys.map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => onFilterChange && onFilterChange(filterKey)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedFilter === filterKey
                  ? 'bg-card text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filterKey}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {activities.map((act) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-start justify-between p-3.5 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-foreground">{act.title}</h4>
                    <Badge variant="outline" className="text-[10px] py-0">{act.badge}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{act.description}</p>
                </div>
              </div>

              <span className="text-[10px] text-muted-foreground font-medium shrink-0 ml-4">{act.timestamp}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
