import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PlacementAnalyticsChart({ analyticsData = [] }) {
  return (
    <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-foreground">Department Candidate Match & Placement Analytics</h3>
            <p className="text-xs text-muted-foreground">Comparison of AI matched candidate rosters versus final offers across departments.</p>
          </div>
          <Badge variant="outline">Term Overview</Badge>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="department" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="matched" name="AI Matched Candidates" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="placed" name="Placed Candidates" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Overall Candidate Match Conversion: <strong className="text-foreground font-bold">84.6%</strong></span>
        <span className="text-emerald-500 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> +5.2% vs previous drive
        </span>
      </div>
    </Card>
  );
}
