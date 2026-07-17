import { useAuth } from "../hooks/useAuth";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import resumeService from "../services/resumeService";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {

    const { isAuthenticated } = useAuth();

    /* ==========================================
       Resume State
    ========================================== */

    const [resumes, setResumes] = useState([]);

    const [selectedResume, setSelectedResume] =
        useState(null);
    /* ==========================================
       Education State
    ========================================== */

    const [education, setEducation] = useState([]);

    /* ==========================================
   Experience State
========================================== */
    /* ==========================================
       Skills State
    ========================================== */

    const [skills, setSkills] = useState([]);

    const [experience, setExperience] = useState([]);
    /* ==========================================
   Projects State
   ========================================== */

    const [projects, setProjects] = useState([]);

    /* ==========================================
   Certifications State
   ========================================== */

    const [certifications, setCertifications] = useState([]);

    const [languages, setLanguages] = useState([]);

    const [interests, setInterests] = useState([]);
    /* ==========================================
       Dashboard State
    ========================================== */

    const [dashboard, setDashboard] =
        useState({

            total_resumes: 0,

            average_ats_score: 0,

            downloads: 0,

            applications: 0,

            templates_used: 0,

        });

    const [recentResumes, setRecentResumes] =
        useState([]);

    const [monthlyAnalytics,
        setMonthlyAnalytics] =
        useState([]);

    const [categoryAnalytics,
        setCategoryAnalytics] =
        useState([]);

    const [notifications,
        setNotifications] =
        useState([]);

    /* ==========================================
       Common State
    ========================================== */

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    /* ==========================================
       Dashboard APIs
    ========================================== */

    const fetchDashboard = async () => {

        try {

            const response =
                await resumeService.getDashboard();

            setDashboard(response.data);

        }

        catch (err) {

            console.error(err);

            setError(err);

        }

    };

    const fetchRecentResumes = async () => {

        try {

            const response =
                await resumeService.getRecentResumes();

            setRecentResumes(response.data);

        }

        catch (err) {

            console.error(err);

        }

    };

    const fetchMonthlyAnalytics = async () => {

        try {

            const response =
                await resumeService.getMonthlyAnalytics();

            setMonthlyAnalytics(
                response.data
            );

        }

        catch (err) {

            console.error(err);

        }

    };

    const fetchCategoryAnalytics = async () => {

        try {

            const response =
                await resumeService.getCategoryAnalytics();

            setCategoryAnalytics(
                response.data
            );

        }

        catch (err) {

            console.error(err);

        }

    };

    const fetchNotifications = async () => {

        try {

            const response =
                await resumeService.getNotifications();

            setNotifications(
                response.data
            );

        }

        catch (err) {

            console.error(err);

        }

    };
    /* ==========================================
   Notification Actions
========================================== */

    const markNotificationAsRead = (id) => {

        setNotifications(previous =>

            previous.map(item =>

                item.id === id
                    ? {
                        ...item,
                        read: true,
                    }
                    : item

            )

        );

    };

    const markAllNotificationsAsRead = () => {

        setNotifications(previous =>

            previous.map(item => ({

                ...item,

                read: true,

            }))

        );

    };

    const clearNotifications = () => {

        setNotifications([]);

    };

    /* ==========================================
   Add Notification
========================================== */

const addNotification = (notification) => {

    setNotifications(previous => [

        {

            id: Date.now(),

            read: false,

            time: "Just now",

            ...notification,

        },

        ...previous,

    ]);

};
    /* ==========================================
   Resume APIs
========================================== */

    const fetchResumes = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getResumes();

            setResumes(response.data);

            setError(null);

            return response.data;

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data ||

                err.message ||

                "Unable to fetch resumes."

            );

            return [];

        }

        finally {

            setLoading(false);

        }

    };

    const fetchResume = async (id) => {

        try {

            setLoading(true);

            const response =
                await resumeService.getResume(id);

            setSelectedResume(
                response.data
            );
            setEducation(response.data.education || []);

            setExperience(response.data.experience || []);

            setSkills(response.data.skills || []);

            setProjects(response.data.projects || []);

            setCertifications(
                response.data.certifications || []
            );

            setLanguages(
                response.data.languages || []
            );

            setInterests(
                response.data.interests || []
            );

            setError(null);

            return response.data;

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data ||

                err.message ||

                "Unable to fetch resume."

            );

            return null;

        }

        finally {

            setLoading(false);

        }

    };

    /* ==========================================
       Resume CRUD
    ========================================== */

    const createResume = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createResume(data);

            setSelectedResume(response.data);

            await fetchResumes();

            await fetchDashboard();

            addNotification({

    type: "success",

    title: "Resume Created",

    message: `"${response.data.title}" has been created successfully.`,

});

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to create resume.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const updateResume = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updateResume(
                    id,
                    data
                );

            setSelectedResume(
                response.data
            );

            await fetchResumes();

            await fetchDashboard();

            addNotification({

    type: "update",

    title: "Resume Updated",

    message: `"${response.data.title}" has been updated successfully.`,

});

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to update resume.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const deleteResume = async (id) => {

        try {

            setLoading(true);

            const deletedResume = resumes.find(

    resume => resume.id === id

);

            await resumeService.deleteResume(id);

            if (

                selectedResume &&

                selectedResume.id === id

            ) {

                setSelectedResume(null);

            }

            await fetchResumes();

            await fetchDashboard();

            await fetchRecentResumes();

            addNotification({

    type: "delete",

    title: "Resume Deleted",

    message: deletedResume

        ? `"${deletedResume.title}" has been deleted.`

        : "Resume deleted successfully.",

});

            return {

                success: true,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to delete resume.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    /* ==========================================
   Personal Information CRUD
========================================== */

    const createPersonalInfo = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createPersonalInfo(data);

            await fetchResume(data.resume);

            await fetchResumes();

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to create personal information.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const updatePersonalInfo = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updatePersonalInfo(
                    id,
                    data
                );

            await fetchResume(data.resume);

            await fetchResumes();

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to update personal information.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const deletePersonalInfo = async (id) => {

        try {

            setLoading(true);

            await resumeService.deletePersonalInfo(id);

            if (selectedResume) {

                await fetchResume(selectedResume.id);

            }

            await fetchResumes();

            return {

                success: true,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to delete personal information.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    /* ==========================================
       Education CRUD
    ========================================== */

    const fetchEducation = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getEducation();

            setEducation(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };
    const fetchExperience = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getExperiences();

            setExperience(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };
    /* ==========================================
   Skills CRUD
========================================== */

    const fetchSkills = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getSkills();

            setSkills(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };
    /* ==========================================
   Projects CRUD
========================================== */

    const fetchProjects = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getProjects();

            setProjects(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };
    /* ==========================================
   Certifications CRUD
========================================== */

    const fetchCertifications = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getCertifications();

            setCertifications(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };
    const createEducation = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createEducation(data);

            setEducation((prev) => [

                ...prev,

                response.data,

            ]);

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to create education.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const createExperience = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createExperience(data);

            setExperience((prev) => [

                ...prev,

                response.data,

            ]);

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error("Experience Error:", err);

            console.log(
                "Response Data:",
                err.response?.data
            );

            return {

                success: false,

                message:
                    err.response?.data ||
                    "Unable to create experience.",

            };

        }
        finally {

            setLoading(false);

        }

    };
    const createSkill = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createSkill(data);

            setSkills((prev) => [

                ...prev,

                response.data,

            ]);

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to create skill.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const createProject = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createProject(data);

            setProjects((prev) => [

                ...prev,

                response.data,

            ]);

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to create project.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const createCertification = async (data) => {

        try {

            setLoading(true);

            const response =
                await resumeService.createCertification(data);

            setCertifications((prev) => [
                ...prev,
                response.data,
            ]);

            await fetchResume(data.resume);

            return {
                success: true,
                data: response.data,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message:
                    err.response?.data?.detail ||
                    "Unable to create certification.",
            };

        }

        finally {

            setLoading(false);

        }

    };

    const updateEducation = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updateEducation(
                    id,
                    data
                );

            setEducation((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to update education.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const updateExperience = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updateExperience(
                    id,
                    data
                );

            setExperience((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to update experience.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const updateSkill = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updateSkill(
                    id,
                    data
                );

            setSkills((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to update skill.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const updateProject = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updateProject(
                    id,
                    data
                );

            setProjects((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            await fetchResume(data.resume);

            return {

                success: true,

                data: response.data,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to update project.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const updateCertification = async (
        id,
        data
    ) => {

        try {

            setLoading(true);

            const response =
                await resumeService.updateCertification(
                    id,
                    data
                );

            setCertifications((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            await fetchResume(data.resume);

            return {
                success: true,
                data: response.data,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message:
                    err.response?.data?.detail ||
                    "Unable to update certification.",
            };

        }

        finally {

            setLoading(false);

        }

    };

    const deleteEducation = async (id) => {

        try {

            setLoading(true);

            await resumeService.deleteEducation(id);

            setEducation((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (selectedResume) {

                await fetchResume(selectedResume.id);

            }

            return {

                success: true,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to delete education.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const deleteExperience = async (id) => {

        try {

            setLoading(true);

            await resumeService.deleteExperience(id);

            setExperience((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (selectedResume) {

                await fetchResume(selectedResume.id);

            }

            return {

                success: true,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to delete experience.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const deleteSkill = async (id) => {

        try {

            setLoading(true);

            await resumeService.deleteSkill(id);

            setSkills((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (selectedResume) {

                await fetchResume(selectedResume.id);

            }

            return {

                success: true,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to delete skill.",

            };

        }

        finally {

            setLoading(false);

        }

    };
    const deleteProject = async (id) => {

        try {

            setLoading(true);

            await resumeService.deleteProject(id);

            setProjects((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (selectedResume) {

                await fetchResume(selectedResume.id);

            }

            return {

                success: true,

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                message:

                    err.response?.data?.detail ||

                    "Unable to delete project.",

            };

        }

        finally {

            setLoading(false);

        }

    };

    const deleteCertification = async (id) => {

        try {

            setLoading(true);

            await resumeService.deleteCertification(id);

            setCertifications((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (selectedResume) {
                await fetchResume(selectedResume.id);
            }

            return {
                success: true,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message:
                    err.response?.data?.detail ||
                    "Unable to delete certification.",
            };

        }

        finally {

            setLoading(false);

        }

    };

    /* ==========================================
   Languages
========================================== */

    const fetchLanguages = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getLanguages();

            setLanguages(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };
    const createLanguage = async (payload) => {

        try {

            const response =
                await resumeService.createLanguage(payload);

            setLanguages((prev) => [
                ...prev,
                response.data,
            ]);

            return {
                success: true,
                data: response.data,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message: err.response?.data?.detail || "Unable to create language.",
            };

        }

    };

    const updateLanguage = async (id, payload) => {

        try {

            const response =
                await resumeService.updateLanguage(id, payload);

            setLanguages((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            return {
                success: true,
                data: response.data,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message: err.response?.data?.detail || "Unable to update language.",
            };

        }

    };
    const deleteLanguage = async (id) => {

        await resumeService.deleteLanguage(id);

        setLanguages((prev) =>

            prev.filter(

                (item) => item.id !== id

            )

        );

    };

    /* ==========================================
       Interests
    ========================================== */

    const fetchInterests = async () => {

        try {

            setLoading(true);

            const response =
                await resumeService.getInterests();

            setInterests(response.data);

            return response.data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

        finally {

            setLoading(false);

        }

    };

    const createInterest = async (payload) => {

        try {

            const response =
                await resumeService.createInterest(payload);

            setInterests((prev) => [
                ...prev,
                response.data,
            ]);

            return {
                success: true,
                data: response.data,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message: err.response?.data?.detail || "Unable to create interest.",
            };

        }

    };

    const updateInterest = async (id, payload) => {

        try {

            const response =
                await resumeService.updateInterest(id, payload);

            setInterests((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? response.data
                        : item
                )
            );

            return {
                success: true,
                data: response.data,
            };

        }

        catch (err) {

            console.error(err);

            return {
                success: false,
                message: err.response?.data?.detail || "Unable to update interest.",
            };

        }

    };

    const deleteInterest = async (id) => {

        await resumeService.deleteInterest(id);

        setInterests((prev) =>

            prev.filter(

                (item) => item.id !== id

            )

        );

    };
    /* ==========================================
       Refresh Dashboard
    ========================================== */

    const refreshDashboard = async () => {

        try {

            setLoading(true);

            await Promise.all([

                fetchDashboard(),

                fetchRecentResumes(),

                fetchMonthlyAnalytics(),

                fetchCategoryAnalytics(),

                fetchNotifications(),

                fetchResumes(),

                fetchEducation(),

                fetchExperience(),

                fetchSkills(),

                fetchProjects(),

                fetchCertifications(),

                fetchLanguages(),

                fetchInterests(),

            ]);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };
    /* ==========================================
   Initial Load
========================================== */

   useEffect(() => {

    if (!isAuthenticated) {
        return;
    }

    refreshDashboard();

}, [isAuthenticated]);

    /* ==========================================
       Provider
    ========================================== */

    return (

        <ResumeContext.Provider

            value={{

                /* ==========================
                   State
                ========================== */

                resumes,

                selectedResume,

                education,

                experience,

                skills,

                projects,

                certifications,

                languages,

                interests,

                dashboard,

                recentResumes,

                monthlyAnalytics,

                categoryAnalytics,

                notifications,

                addNotification,


                markNotificationAsRead,

                markAllNotificationsAsRead,

                clearNotifications,


                loading,

                error,

                /* ==========================
                   Dashboard
                ========================== */

                fetchDashboard,

                fetchRecentResumes,

                fetchMonthlyAnalytics,

                fetchCategoryAnalytics,

                fetchNotifications,

                refreshDashboard,

                /* ==========================
                   Resume
                ========================== */

                fetchResumes,

                fetchResume,

                createResume,

                updateResume,

                deleteResume,

                /* ==========================
                   Personal Information
                ========================== */

                createPersonalInfo,

                updatePersonalInfo,

                deletePersonalInfo,

                /* ==========================
                     Education
                ========================== */

                fetchEducation,

                createEducation,

                updateEducation,

                deleteEducation,

                fetchExperience,

                createExperience,

                updateExperience,

                deleteExperience,

                fetchSkills,

                createSkill,

                updateSkill,

                deleteSkill,

                fetchProjects,

                createProject,

                updateProject,

                deleteProject,

                fetchCertifications,
                createCertification,
                updateCertification,
                deleteCertification,



                fetchLanguages,

                createLanguage,

                updateLanguage,

                deleteLanguage,

                fetchInterests,

                createInterest,

                updateInterest,

                deleteInterest,

                /* ==========================
                   Selected Resume
                ========================== */

                setSelectedResume,

            }}

        >

            {children}

        </ResumeContext.Provider>

    );

};

/* ==========================================
   Hook
========================================== */

export const useResume = () =>
    useContext(ResumeContext);