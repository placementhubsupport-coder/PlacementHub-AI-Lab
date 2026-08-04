import coachData from '@/data/careerCoach.json';

/**
 * AI Career Coach API Service Layer
 * Abstracts personalized career roadmap & skill audit endpoints for future NVIDIA NIM integration.
 */
export const careerCoachService = {
  /**
   * Fetch readiness overview KPI statistics
   * @returns {Promise<Array>}
   */
  async getReadinessOverview() {
    return Promise.resolve(coachData.readiness);
  },

  /**
   * Fetch career roadmap timeline stages
   * @returns {Promise<Array>}
   */
  async getCareerRoadmap() {
    return Promise.resolve(coachData.roadmap);
  },

  /**
   * Fetch categorized skill gap analysis
   * @returns {Promise<Object>}
   */
  async getSkillGapAnalysis() {
    return Promise.resolve(coachData.skillGaps);
  },

  /**
   * Fetch 7-day personalized weekly learning roadmap
   * @returns {Promise<Array>}
   */
  async getWeeklyPlan() {
    return Promise.resolve(coachData.weeklyPlan);
  },

  /**
   * Fetch recommended courses
   * @returns {Promise<Array>}
   */
  async getRecommendedCourses() {
    return Promise.resolve(coachData.recommendedCourses);
  },

  /**
   * Fetch mock interview prep Q&As
   * @returns {Promise<Object>}
   */
  async getInterviewPrep() {
    return Promise.resolve(coachData.interviewPrep);
  },

  /**
   * Fetch detailed readiness audit metrics
   * @returns {Promise<Array>}
   */
  async getAuditReport() {
    return Promise.resolve(coachData.auditReport);
  },

  /**
   * Fetch unlocked candidate achievements
   * @returns {Promise<Array>}
   */
  async getAchievements() {
    return Promise.resolve(coachData.achievements);
  }
};
