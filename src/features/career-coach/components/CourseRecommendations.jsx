import { BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CourseRecommendations({ courses = [] }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm text-foreground">AI Recommended Target Courses</h3>
        </div>
        <Badge variant="success">NVIDIA DLI & Coursera</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between space-y-3 hover:border-purple-500/40 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="text-[10px]">{c.provider}</Badge>
                <span className="text-[10px] font-bold text-purple-400">{c.difficulty} • {c.duration}</span>
              </div>
              <h4 className="font-bold text-sm text-foreground leading-snug">{c.title}</h4>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Why Recommended?
              </span>
              <p className="text-[11px] text-slate-300">{c.reason}</p>
            </div>

            <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-between">
              <span>Start Course Module</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
