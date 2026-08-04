import { Award, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function PlacementReport({ reportData = [] }) {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="font-bold text-sm text-foreground">Comprehensive Candidate Readiness Audit Report</h3>
            <p className="text-xs text-muted-foreground">Multi-dimensional evaluation across technical, communication, and project competency.</p>
          </div>
        </div>
        <Badge variant="success">92.4% Overall Benchmark</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reportData.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-muted/30 border border-border/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-foreground">{item.metric}</span>
              <span className="text-emerald-400 font-extrabold">{item.score}%</span>
            </div>
            <Progress value={item.score} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
