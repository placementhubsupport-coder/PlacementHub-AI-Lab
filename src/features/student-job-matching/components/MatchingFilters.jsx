import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MatchingFilters({ filters, onFilterChange, onReset }) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border/70 space-y-3 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Search input */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search student name, skill, email..."
            value={filters.query || ''}
            onChange={(e) => onFilterChange('query', e.target.value)}
            className="pl-9 bg-muted/40"
          />
        </div>

        {/* Branch filter */}
        <select
          value={filters.branch || 'all'}
          onChange={(e) => onFilterChange('branch', e.target.value)}
          className="h-9 px-3 text-xs rounded-xl border border-input bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="all">All Branches</option>
          <option value="Computer Science & Engineering">Computer Science</option>
          <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
          <option value="Electronics & Communication">Electronics (ECE)</option>
        </select>

        {/* Graduation Year */}
        <select
          value={filters.gradYear || 'all'}
          onChange={(e) => onFilterChange('gradYear', e.target.value)}
          className="h-9 px-3 text-xs rounded-xl border border-input bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="all">All Grad Years</option>
          <option value="2026">2026 Batch</option>
          <option value="2027">2027 Batch</option>
        </select>

        {/* CGPA Filter */}
        <select
          value={filters.minCgpa || 'all'}
          onChange={(e) => onFilterChange('minCgpa', e.target.value)}
          className="h-9 px-3 text-xs rounded-xl border border-input bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="all">All CGPA Ranges</option>
          <option value="9.0">CGPA ≥ 9.0</option>
          <option value="8.5">CGPA ≥ 8.5</option>
          <option value="8.0">CGPA ≥ 8.0</option>
        </select>

        {/* Reset Action */}
        <Button
          onClick={onReset}
          variant="outline"
          className="h-9 font-semibold justify-center text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
