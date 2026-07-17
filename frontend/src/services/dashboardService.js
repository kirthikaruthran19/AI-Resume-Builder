import api from "./api";

export const getDashboardStats = async () => {
    const response = await api.get("/dashboard/");
    return response.data;
};

export const getRecentResumes = async () => {
    const response = await api.get("/dashboard/recent/");
    return response.data;
};

export const getMonthlyAnalytics = async () => {
    const response = await api.get("/dashboard/monthly/");
    return response.data;
};

export const getCategoryAnalytics = async () => {
    const response = await api.get("/dashboard/categories/");
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get("/dashboard/notifications/");
    return response.data;
};