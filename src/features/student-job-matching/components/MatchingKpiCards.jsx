import { motion } from 'framer-motion';
import { Users, CheckCircle2, Target, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  students: Users,
  matches: CheckCircle2,
  avgScore: Target,
  highConf: Award,
};

export default function MatchingKpiCards({ kpis = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = iconMap[kpi.id] || Target;
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
          >
            <Card className="p-5 relative overflow-hidden group hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{kpi.title}</span>
                <div className={`p-2.5 rounded-xl ${
                  kpi.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                  kpi.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
                  kpi.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{kpi.value}</h3>
                <Badge variant={kpi.trend === 'up' ? 'success' : 'default'}>
                  {kpi.change}
                </Badge>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
