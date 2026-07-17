import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile/Profile";
import Resume from "../pages/Resume";
import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import ResumeBuilder from "../pages/ResumeBuilder";
import AIResumeGenerator from "../pages/AIResumeGenerator";
import ResumePreview from "../pages/ResumePreview";
import AIResumePreview from "../pages/AIResumePreview";
import ResumeManagement from "../pages/ResumeManagement";
import AIResumeOptimizer from "../pages/AIResumeOptimizer";
import ATSAnalyzer from "../pages/ATSAnalyzer";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
function AppRoutes() {

    return (

        <Routes>

            {/* ========================= */}
            {/* Public Routes */}
            {/* ========================= */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* ========================= */}
            {/* Protected Routes */}
            {/* ========================= */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resume"
                element={
                    <ProtectedRoute>
                        <Resume />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resume-builder"
                element={
                    <ProtectedRoute>
                        <ResumeBuilder />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/resume-builder/:id"
                element={
                    <ProtectedRoute>
                        <ResumeBuilder />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/generate-ai-resume"
                element={
                    <ProtectedRoute>
                        <AIResumeGenerator />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ai-resume-preview"
                element={
                    <ProtectedRoute>
                        <AIResumePreview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/resume-preview/:id"
                element={
                    <ProtectedRoute>
                        <ResumePreview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/templates"
                element={
                    <ProtectedRoute>
                        <Templates />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resumes"
                element={
                    <ProtectedRoute>
                        <ResumeManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ai-resume-optimizer"
                element={
                    <ProtectedRoute>
                        <AIResumeOptimizer />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ats-analyzer"
                element={
                    <ProtectedRoute>
                        <ATSAnalyzer />
                    </ProtectedRoute>
                }
            />
            {/* ========================= */}
            {/* 404 */}
            {/* ========================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default AppRoutes;