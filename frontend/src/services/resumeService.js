import api from "./api";

const resumeService = {

    /* ==========================================
       Dashboard APIs
    ========================================== */

    getDashboard() {
        return api.get("/dashboard/");
    },

    getRecentResumes() {
        return api.get("/dashboard/recent/");
    },

    getMonthlyAnalytics() {
        return api.get("/dashboard/monthly/");
    },

    getCategoryAnalytics() {
        return api.get("/dashboard/categories/");
    },

    getNotifications() {
        return api.get("/dashboard/notifications/");
    },

    /* ==========================================
       Resume CRUD
    ========================================== */

    getResumes() {
        return api.get("/resumes/");
    },

    getResume(id) {
        return api.get(`/resumes/${id}/`);
    },

    createResume(data) {
        return api.post("/resumes/", data);
    },

    updateResume(id, data) {
        return api.patch(`/resumes/${id}/`, data);
    },

    deleteResume(id) {
        return api.delete(`/resumes/${id}/`);
    },

    /* ==========================================
       Future Resume Features
       (Implement backend later)
    ========================================== */

    duplicateResume(id) {
        return api.post(`/resumes/${id}/duplicate/`);
    },

    downloadResume(id) {
        return api.get(`/resumes/${id}/download/`, {
            responseType: "blob",
        });
    },

    getATSScore(id) {
    return api.get(`/resumes/${id}/ats/`);
},

    /* ==========================================
       Personal Information
    ========================================== */

    getPersonalInfo() {
        return api.get("/personal-info/");
    },

    createPersonalInfo(data) {
        return api.post("/personal-info/", data);
    },

    updatePersonalInfo(id, data) {
        return api.patch(`/personal-info/${id}/`, data);
    },

    deletePersonalInfo(id) {
        return api.delete(`/personal-info/${id}/`);
    },

    /* ==========================================
       Education
    ========================================== */

    getEducation() {
        return api.get("/education/");
    },

    createEducation(data) {
        return api.post("/education/", data);
    },

    updateEducation(id, data) {
        return api.patch(`/education/${id}/`, data);
    },

    deleteEducation(id) {
        return api.delete(`/education/${id}/`);
    },

    /* ==========================================
       Experience
    ========================================== */

    getExperiences() {
        return api.get("/experience/");
    },

    createExperience(data) {
        return api.post("/experience/", data);
    },

    updateExperience(id, data) {
        return api.patch(`/experience/${id}/`, data);
    },

    deleteExperience(id) {
        return api.delete(`/experience/${id}/`);
    },

    /* ==========================================
       Skills
    ========================================== */

    getSkills() {
        return api.get("/skills/");
    },

    createSkill(data) {
        return api.post("/skills/", data);
    },

    updateSkill(id, data) {
        return api.patch(`/skills/${id}/`, data);
    },

    deleteSkill(id) {
        return api.delete(`/skills/${id}/`);
    },

    /* ==========================================
       Projects
    ========================================== */

    getProjects() {
        return api.get("/projects/");
    },

    createProject(data) {
        return api.post("/projects/", data);
    },

    updateProject(id, data) {
        return api.patch(`/projects/${id}/`, data);
    },

    deleteProject(id) {
        return api.delete(`/projects/${id}/`);
    },

    /* ==========================================
       Certifications
    ========================================== */

    getCertifications() {
        return api.get("/certifications/");
    },

    createCertification(data) {
        return api.post("/certifications/", data);
    },

    updateCertification(id, data) {
        return api.patch(`/certifications/${id}/`, data);
    },

    deleteCertification(id) {
        return api.delete(`/certifications/${id}/`);
    },

    /* ==========================================
       Languages
    ========================================== */

    getLanguages() {
        return api.get("/languages/");
    },

    createLanguage(data) {
        return api.post("/languages/", data);
    },

    updateLanguage(id, data) {
        return api.patch(`/languages/${id}/`, data);
    },

    deleteLanguage(id) {
        return api.delete(`/languages/${id}/`);
    },

    /* ==========================================
       Interests
    ========================================== */

    getInterests() {
        return api.get("/interests/");
    },

    createInterest(data) {
        return api.post("/interests/", data);
    },

    updateInterest(id, data) {
        return api.patch(`/interests/${id}/`, data);
    },

    deleteInterest(id) {
        return api.delete(`/interests/${id}/`);
    },

};

export default resumeService;