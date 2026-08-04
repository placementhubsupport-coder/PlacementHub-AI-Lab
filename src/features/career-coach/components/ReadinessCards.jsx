import { motion } from 'framer-motion';
import { Target, Cpu, MessageSquare, Award, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  r1: Target,
  r2: Cpu,
  r3: MessageSquare,
  r4: Award,
  r5: TrendingUp,
};

export default function ReadinessCards({ readiness = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {readiness.map((item, idx) => {
        const Icon = iconMap[item.id] || Target;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
          >
            <Card className="p-4 relative overflow-hidden group hover:border-primary/40 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{item.title}</span>
                <div className={`p-2 rounded-xl ${
                  item.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                  item.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                  item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
                  item.color === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                  'bg-teal-500/10 text-teal-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{item.value}</h3>
                <Badge variant={item.trend === 'up' ? 'success' : 'default'} className="text-[10px]">
                  {item.change}
                </Badge>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
