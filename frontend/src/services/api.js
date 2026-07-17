import axios from "axios";

const API_BASE_URL = "https://ai-resume-builder-ecn9.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Public APIs (No Authentication Required)
const publicRoutes = [
    "/users/login/",
    "/users/register/",
];

// ========================================
// Request Interceptor
// ========================================

api.interceptors.request.use(

    (config) => {

        const isPublicRoute = publicRoutes.some((route) =>
            config.url?.includes(route)
        );

        if (!isPublicRoute) {

            const token = localStorage.getItem("accessToken");

            if (token) {

                config.headers = config.headers || {};

                config.headers.Authorization = `Bearer ${token}`;

            }

        }

        return config;

    },

    (error) => Promise.reject(error)

);

// ========================================
// Response Interceptor
// ========================================

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            console.warn("Session expired. Please login again.");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            if (
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/register"
            ) {

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }

);

export default api;