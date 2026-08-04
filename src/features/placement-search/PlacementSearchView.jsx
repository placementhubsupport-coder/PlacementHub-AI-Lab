import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { placementSearchService } from '@/services/placementSearchService';

import SearchHeader from './components/SearchHeader';
import NaturalLanguageInput from './components/NaturalLanguageInput';
import SuggestedPromptsBar from './components/SuggestedPromptsBar';
import ParsedFiltersBanner from './components/ParsedFiltersBanner';
import JobResultCard from './components/JobResultCard';
import JobDetailsSheet from './components/JobDetailsSheet';

export default function PlacementSearchView() {
  const [query, setQuery] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const [p, r] = await Promise.all([
      placementSearchService.getSuggestedPrompts(),
      placementSearchService.getRecentSearches(),
    ]);
    setPrompts(p);
    setRecentSearches(r);
    // Execute default sample query
    handleSearch(p[0]);
  };

  const handleSearch = async (targetQuery = query) => {
    if (!targetQuery.trim()) return;
    setQuery(targetQuery);
    setIsSearching(true);
    const result = await placementSearchService.executeNaturalLanguageSearch(targetQuery);
    setSearchResult(result);
    setIsSearching(false);
  };

  const handleClear = () => {
    setQuery('');
    setSearchResult(null);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <SearchHeader />

      {/* Natural Language Prompt Input Bar */}
      <div className="space-y-4">
        <NaturalLanguageInput
          query={query}
          onQueryChange={setQuery}
          onSubmit={() => handleSearch(query)}
          isSearching={isSearching}
          onClear={handleClear}
        />

        {/* Suggested Prompt Chips & History */}
        <SuggestedPromptsBar
          prompts={prompts}
          recentSearches={recentSearches}
          onSelectPrompt={(p) => handleSearch(p)}
        />
      </div>

      {/* AI Parsed Filters Metadata Banner */}
      {searchResult && !isSearching && (
        <ParsedFiltersBanner filters={searchResult.filters} />
      )}

      {/* Results Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">
            Matched Recruitment Opportunities {searchResult ? `(${searchResult.totalResults})` : ''}
          </h3>
          <span className="text-xs text-muted-foreground">Ranked by NV-Embed-QA Cosine Embedding Score</span>
        </div>

        {/* Loading Skeletons */}
        {isSearching && (
          <div className="space-y-4">
            {[1, 2].map((idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-24 h-3" />
                    </div>
                  </div>
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
                <Skeleton className="w-full h-12 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isSearching && searchResult && searchResult.results.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-card border border-border space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <SearchX className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-foreground text-sm">No exact placement drives found for this query</h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting stipend thresholds, location parameters, or selecting one of the suggested prompts above.
            </p>
          </div>
        )}

        {/* Results List */}
        {!isSearching && searchResult && (
          <div className="space-y-4">
            {searchResult.results.map((job) => (
              <JobResultCard
                key={job.id}
                job={job}
                onSelectJob={handleSelectJob}
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Details Drawer Sheet */}
      <JobDetailsSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}
