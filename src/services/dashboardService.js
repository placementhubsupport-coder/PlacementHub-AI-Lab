import dashboardData from '@/data/dashboard.json';

/**
 * Dashboard API Service Layer
 * Abstracts backend API endpoints for seamless transition to production services.
 */
export const dashboardService = {
  /**
   * Fetch executive statistics metrics
   * @returns {Promise<Array>}
   */
  async getMetrics() {
    // Simulates API network response
    return Promise.resolve(dashboardData.metrics);
  },

  /**
   * Fetch NVIDIA NIM Microservice health status
   * @returns {Promise<Array>}
   */
  async getNimHealthStatus() {
    return Promise.resolve(dashboardData.nimServices);
  },

  /**
   * Fetch recent real-time activity stream
   * @param {string} filterType - Filter category ('all', 'match', 'resume', etc.)
   * @returns {Promise<Array>}
   */
  async getRecentActivities(filterType = 'all') {
    if (filterType === 'all') {
      return Promise.resolve(dashboardData.recentActivities);
    }
    return Promise.resolve(
      dashboardData.recentActivities.filter((act) => act.type === filterType)
    );
  },

  /**
   * Fetch department placement & match analytics
   * @returns {Promise<Array>}
   */
  async getPlacementAnalytics() {
    return Promise.resolve(dashboardData.analyticsData);
  },
};
