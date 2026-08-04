import { useState } from 'react';
import { Bot, HelpCircle, Code2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function InterviewPrep({ interviewPrep }) {
  const [activeTab, setActiveTab] = useState('technical');
  if (!interviewPrep) return null;

  const questions = activeTab === 'technical' ? interviewPrep.technical : interviewPrep.hr;

  return (
    <Card className="p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-bold text-sm text-foreground">Interactive AI Mock Interview Preparation</h3>
            <p className="text-xs text-muted-foreground">High-frequency technical and behavioral questions generated for AI Research & Kernel engineering roles.</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border/60">
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'technical'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Technical & Architecture
          </button>
          <button
            onClick={() => setActiveTab('hr')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'hr'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Behavioral & HR
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
              <h4 className="font-bold text-foreground text-xs sm:text-sm">{item.q}</h4>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-slate-200 leading-relaxed pl-6">
              <span className="font-bold text-purple-300 block mb-1">AI Recommended Sample Answer Strategy:</span>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
