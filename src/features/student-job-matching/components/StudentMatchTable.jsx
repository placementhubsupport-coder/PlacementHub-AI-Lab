import { 
  Eye, 
  ArrowLeftRight, 
  MoreHorizontal, 
  Sparkles, 
  Award,
  CheckCircle
} from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';

export default function StudentMatchTable({
  students = [],
  onViewMatch,
  onCompareSelect,
  selectedCompareIds = []
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-12 text-center">Compare</TableHead>
            <TableHead>Student Candidate</TableHead>
            <TableHead>Branch & CGPA</TableHead>
            <TableHead>Primary Skills</TableHead>
            <TableHead className="w-32">Resume Score</TableHead>
            <TableHead className="w-36">AI Match Score</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((std) => {
            const isChecked = selectedCompareIds.includes(std.id);
            return (
              <TableRow key={std.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onCompareSelect && onCompareSelect(std.id)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={std.avatar} alt={std.name} />
                      <AvatarFallback>{std.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-bold text-foreground">{std.name}</p>
                      <p className="text-[10px] text-muted-foreground">{std.email}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="text-xs font-medium text-foreground">{std.branch}</p>
                    <span className="text-[10px] font-bold text-emerald-500">CGPA: {std.cgpa}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {std.primarySkills.slice(0, 3).map((sk, idx) => (
                      <Badge key={idx} variant="secondary" className="text-[9px] py-0">
                        {sk}
                      </Badge>
                    ))}
                    {std.primarySkills.length > 3 && (
                      <span className="text-[10px] text-muted-foreground font-semibold">+{std.primarySkills.length - 3}</span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-foreground">
                      <span>{std.resumeScore}</span>
                      <span className="text-muted-foreground">/ 100</span>
                    </div>
                    <Progress value={std.resumeScore} className="h-1.5" />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-purple-400">
                      <span>{std.aiMatchScore}%</span>
                      <Sparkles className="w-3 h-3 text-purple-400" />
                    </div>
                    <Progress value={std.aiMatchScore} className="h-1.5 bg-purple-500/20" />
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={std.confidence === 'High' ? 'success' : 'warning'}>
                    {std.confidence} Confidence
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={std.status === 'Matched' ? 'default' : 'outline'}>
                    {std.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      onClick={() => onViewMatch && onViewMatch(std)}
                      variant="default"
                      size="sm"
                      className="font-semibold shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Match
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewMatch && onViewMatch(std)}>
                          <Eye className="w-4 h-4 mr-2" /> View Match Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCompareSelect && onCompareSelect(std.id)}>
                          <ArrowLeftRight className="w-4 h-4 mr-2" /> Select for Comparison
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
