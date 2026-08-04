import { motion } from 'framer-motion';
import { Sparkles, Target, FileCheck, Zap, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = { Sparkles, Target, FileCheck, Zap };

export default function MetricsGrid({ metrics = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = iconMap[metric.icon] || Activity;
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
          >
            <Card className="relative overflow-hidden p-5 group hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{metric.title}</span>
                <div className={`p-2.5 rounded-xl ${
                  metric.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                  metric.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
                  metric.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{metric.value}</h3>
                <Badge variant={metric.trend === 'up' ? 'success' : 'default'}>
                  {metric.change}
                </Badge>
              </div>

              <p className="mt-1 text-[11px] text-muted-foreground font-medium">
                {metric.period}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
