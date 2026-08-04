import { Upload, Briefcase, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ResumeUploadCard({
  isDragOver,
  isAnalyzing,
  onDragOver,
  onDragLeave,
  onDrop,
  onSelectFile,
  targetRole
}) {
  return (
    <Card className="lg:col-span-2 p-6 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-foreground">Upload Resume</h3>
            <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX (Max size: 10MB)</p>
          </div>
          <Badge variant="outline">Drag & Drop Supported</Badge>
        </div>

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onSelectFile}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
            isDragOver
              ? 'border-purple-500 bg-purple-500/10 scale-[1.01]'
              : 'border-border/80 hover:border-purple-500/50 hover:bg-muted/30 bg-muted/10'
          }`}
        >
          <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500">
            <Upload className={`w-8 h-8 ${isAnalyzing ? 'animate-bounce' : ''}`} />
          </div>

          {isAnalyzing ? (
            <div className="space-y-1">
              <span className="font-bold text-sm text-purple-400 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                NVIDIA Llama 3.1 70B Structuring Resume Data...
              </span>
              <p className="text-xs text-muted-foreground">Extracting ATS vectors, keywords, and experience metrics...</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">
                Drag & Drop your resume here, or <span className="text-purple-400 underline">Browse Files</span>
              </p>
              <p className="text-xs text-muted-foreground">Click to simulate instant AI analysis scan</p>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-muted-foreground">Target Role Benchmark:</span>
          <span className="font-bold text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border/60">
            {targetRole}
          </span>
        </div>
        <span className="text-muted-foreground text-[11px]">
          ATS parsing calibrated against 2,400+ tech job descriptions.
        </span>
      </div>
    </Card>
  );
}
