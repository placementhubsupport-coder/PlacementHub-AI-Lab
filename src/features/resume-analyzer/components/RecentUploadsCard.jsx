import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RecentUploadsCard({
  resumes = [],
  selectedResumeId,
  onSelectResume
}) {
  return (
    <Card className="lg:col-span-1 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h3 className="font-bold text-sm text-foreground">Recent Candidate Uploads</h3>
        <Badge variant="secondary">Sample Data</Badge>
      </div>

      <div className="space-y-2.5">
        {resumes.map((res) => {
          const isSelected = res.id === selectedResumeId;
          return (
            <button
              key={res.id}
              onClick={() => onSelectResume && onSelectResume(res)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-purple-500/60 bg-purple-500/10 text-foreground shadow-xs'
                  : 'border-border/60 hover:bg-muted/40 text-muted-foreground'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-foreground truncate">{res.candidateName}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{res.fileName}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-extrabold text-purple-400">{res.atsScore} ATS</span>
                <p className="text-[10px] text-muted-foreground">{res.uploadDate}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
