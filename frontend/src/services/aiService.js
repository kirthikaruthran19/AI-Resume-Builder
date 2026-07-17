import api from "./api";

const aiService = {
    /* ==========================================
       Optimize Professional Summary
    ========================================== */

    optimizeSummary(summary) {
        return api.post("/ai/optimize-summary/", {
            summary,
        });
    },

    /* ==========================================
       ATS Resume Score Analyzer
    ========================================== */

    analyzeATSScore(resumeText, jobDescription) {
        return api.post("/ai/ats-score/", {
            resume_text: resumeText,
            job_description: jobDescription,
        });
    },

    /* ==========================================
       Generate Complete Resume using AI
    ========================================== */

    generateResume(data) {
        return api.post("/ai/generate-resume/", data);
    },
};

export default aiService;