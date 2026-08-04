import searchData from '@/data/placementSearch.json';

/**
 * Placement Natural Language Search API Service Layer
 * Simulates NV-Embed-QA NIM query embedding & filter extraction.
 */
export const placementSearchService = {
  /**
   * Fetch pre-configured suggested prompts
   * @returns {Promise<Array>}
   */
  async getSuggestedPrompts() {
    return Promise.resolve(searchData.suggestedPrompts);
  },

  /**
   * Fetch recent search history
   * @returns {Promise<Array>}
   */
  async getRecentSearches() {
    return Promise.resolve(searchData.recentSearches);
  },

  /**
   * Execute Natural Language AI search across Placement Drives
   * @param {string} queryText 
   * @returns {Promise<Object>} Returns parsed filters + matching job list
   */
  async executeNaturalLanguageSearch(queryText) {
    // Simulates 600ms NVIDIA NV-Embed-QA NIM Vector query latency
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = queryText.toLowerCase();

        // Extracted Filter Interpretation Mock
        const interpretedFilters = {
          extractedRole: q.includes('react') ? 'React / Frontend Engineer' : q.includes('python') ? 'Python / AI Engineer' : 'Software Engineering',
          location: q.includes('pune') ? 'Pune / Remote' : q.includes('bangalore') ? 'Bangalore' : 'Any Location',
          jobType: q.includes('internship') ? 'Internship' : q.includes('full-time') ? 'Full-Time' : 'All Types',
          minStipend: q.includes('20k') ? '₹20,000 / mo' : 'Any Stipend',
          embeddingVectorDimensions: '1,024 Dim (NV-Embed-QA)'
        };

        let matches = searchData.jobs;

        if (q.includes('react') || q.includes('pune') || q.includes('20k')) {
          matches = searchData.jobs.filter(j => 
            j.title.toLowerCase().includes('react') || 
            j.location.toLowerCase().includes('pune') || 
            j.location.toLowerCase().includes('remote')
          );
        }

        resolve({
          query: queryText,
          filters: interpretedFilters,
          totalResults: matches.length,
          results: matches
        });
      }, 600);
    });
  }
};
