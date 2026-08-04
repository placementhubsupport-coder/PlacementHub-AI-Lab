import resumeData from '@/data/resumeAnalyzer.json';

/**
 * Resume Analyzer API Service Layer
 * Abstracts backend API endpoints for resume ATS scoring and parsing.
 */
export const resumeAnalyzerService = {
  /**
   * Fetch sample pre-loaded candidate resumes
   * @returns {Promise<Array>}
   */
  async getSampleResumes() {
    return Promise.resolve(resumeData.sampleResumes);
  },

  /**
   * Fetch analysis report for a specific candidate resume ID
   * @param {string} resumeId 
   * @returns {Promise<Object>}
   */
  async getResumeAnalysisById(resumeId) {
    const resume = resumeData.sampleResumes.find((r) => r.id === resumeId);
    return Promise.resolve(resume || resumeData.sampleResumes[0]);
  },

  /**
   * Simulate uploading and analyzing a candidate resume PDF/DOCX
   * @param {File} file 
   * @param {string} targetRole 
   * @returns {Promise<Object>}
   */
  async analyzeResumeFile(file, targetRole = 'AI / ML Engineer') {
    // Simulates NVIDIA Llama 3.1 70B Struct-Extract processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const base = resumeData.sampleResumes[0];
        resolve({
          ...base,
          candidateName: file ? file.name.replace(/\.[^/.]+$/, '') : base.candidateName,
          fileName: file ? file.name : base.fileName,
          targetRole,
          uploadDate: 'Just now',
        });
      }, 700);
    });
  },
};
