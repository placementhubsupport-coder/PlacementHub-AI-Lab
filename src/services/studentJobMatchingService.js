import matchingData from '@/data/studentJobMatching.json';

/**
 * Student-Job Matching API Service Layer
 * Abstracts AI vector search & match explanation endpoints for future NVIDIA NIM integration.
 */
export const studentJobMatchingService = {
  /**
   * Fetch top KPI statistics
   * @returns {Promise<Array>}
   */
  async getKpiStats() {
    return Promise.resolve(matchingData.kpis);
  },

  /**
   * Fetch list of candidates with AI match scores and filter parameters
   * @param {Object} filters - { query, branch, gradYear, minCgpa, location, jobType }
   * @returns {Promise<Array>}
   */
  async getStudentMatches(filters = {}) {
    let result = matchingData.students;

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.primarySkills.some((sk) => sk.toLowerCase().includes(q))
      );
    }

    if (filters.branch && filters.branch !== 'all') {
      result = result.filter((s) => s.branch === filters.branch);
    }

    if (filters.gradYear && filters.gradYear !== 'all') {
      result = result.filter((s) => s.gradYear === filters.gradYear);
    }

    if (filters.minCgpa && filters.minCgpa !== 'all') {
      const min = parseFloat(filters.minCgpa);
      result = result.filter((s) => s.cgpa >= min);
    }

    if (filters.location && filters.location !== 'all') {
      result = result.filter((s) => s.location === filters.location);
    }

    if (filters.jobType && filters.jobType !== 'all') {
      result = result.filter((s) => s.jobType === filters.jobType);
    }

    return Promise.resolve(result);
  },

  /**
   * Fetch candidate match details by ID
   * @param {string} studentId 
   * @returns {Promise<Object>}
   */
  async getMatchDetailsById(studentId) {
    const student = matchingData.students.find((s) => s.id === studentId);
    return Promise.resolve(student || matchingData.students[0]);
  },
};
