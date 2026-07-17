import { useState } from "react";
import { useNavigate } from "react-router-dom";

import aiService from "../../services/aiService";

import {
    FiUser,
    FiBriefcase,
    FiCode,
    FiCpu,
    FiLinkedin,
    FiGithub,
    FiGlobe,
} from "react-icons/fi";

import "./AIResumeGenerator.css";

const AIResumeGenerator = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [progress, setProgress] = useState(0);

    const [statusText, setStatusText] = useState("");

    const [formData, setFormData] = useState({

        // Personal Information
        full_name: "",
        email: "",
        phone: "",
        location: "",

        // Professional Profiles
        linkedin: "",
        github: "",
        portfolio: "",

        // Career Information
        job_title: "",
        education: "",
        experience_level: "Fresher",
        languages: "",

        // Skills & Experience
        skills: "",
        projects: "",
        certifications: "",

        // AI Settings
        tone: "Professional",
        target_company: "",
        job_description: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setProgress(10);
        setStatusText("🤖 Initializing AI...");

        try {

            // Visual Progress
            const progressSteps = [

                { progress: 25, text: "📝 Analyzing your information..." },
                { progress: 45, text: "✍️ Writing professional summary..." },
                { progress: 70, text: "🎯 Optimizing for ATS..." },
                { progress: 90, text: "📄 Building your resume..." },

            ];

            let index = 0;

            const progressInterval = setInterval(() => {

                if (index < progressSteps.length) {

                    setProgress(progressSteps[index].progress);
                    setStatusText(progressSteps[index].text);

                    index++;

                }

            }, 700);

            const payload = {

                ...formData,

                languages: formData.languages
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean),

                skills: formData.skills
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean),

                projects: formData.projects
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean),

                certifications: formData.certifications
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean),

            };

            const response = await aiService.generateResume(payload);

            clearInterval(progressInterval);

            setProgress(100);
            setStatusText("✅ Resume Generated Successfully!");

            localStorage.setItem(
                "aiResume",
                JSON.stringify(response.data.resume)
            );

            setTimeout(() => {

                navigate("/ai-resume-preview");

            }, 800);

        }

        catch (error) {

            console.log(error);

            alert("AI Resume Generation Failed.");

        }

        finally {

            setTimeout(() => {

                setLoading(false);
                setProgress(0);
                setStatusText("");

            }, 1000);

        }

    };

    return (

        <div className="ai-generator">

            <div className="ai-card">

                <div className="ai-header">

                    <div className="ai-badge">

                        AI Powered Resume Builder

                    </div>

                    <h1>

                        Create Your Professional Resume

                    </h1>

                    <p>

                        Generate an ATS-friendly resume in seconds using AI.
                        Simply enter your details and let AI craft a professional resume
                        optimized for recruiters.

                    </p>

                </div>
                <form onSubmit={handleSubmit}>

                    {/* ==========================
        Personal Information
    ========================== */}

                    <div className="form-section">

                        <h2>

                            <FiUser />

                            Personal Information

                        </h2>

                        <div className="form-grid">

                            <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                onChange={handleChange}
                            />

                            <input
                                type="url"
                                name="linkedin"
                                placeholder="https://linkedin.com/in/username"
                                onChange={handleChange}
                            />

                            <input
                                type="url"
                                name="github"
                                placeholder="https://github.com/username"
                                onChange={handleChange}
                            />

                            <input
                                type="url"
                                name="portfolio"
                                placeholder="https://yourportfolio.com"
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* ==========================
        Career Information
    ========================== */}

                    <div className="form-section">

                        <h2>

                            <FiBriefcase />

                            Career Information

                        </h2>

                        <div className="form-grid">

                            <input
                                type="text"
                                name="job_title"
                                placeholder="Target Job Title"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="education"
                                placeholder="Education"
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="experience_level"
                                onChange={handleChange}
                            >

                                <option>Fresher</option>

                                <option>Experienced</option>

                            </select>

                            <input
                                type="text"
                                name="languages"
                                placeholder="Languages (English, Tamil)"
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* ==========================
        Skills & Experience
    ========================== */}

                    <div className="form-section">

                        <h2>

                            <FiCode />

                            Skills & Experience

                        </h2>

                        <textarea
                            name="skills"
                            placeholder="Skills (Python, Django, React, MySQL)"
                            rows="3"
                            onChange={handleChange}
                        />

                        <textarea
                            name="projects"
                            placeholder="Projects (AI Resume Builder, Ecommerce Website)"
                            rows="3"
                            onChange={handleChange}
                        />

                        <textarea
                            name="certifications"
                            placeholder="Certifications (Python Full Stack, AWS Cloud Practitioner)"
                            rows="3"
                            onChange={handleChange}
                        />

                    </div>

                    {/* ==========================
        AI Settings
    ========================== */}

                    <div className="form-section">

                        <h2>

                            <FiCpu />

                            AI Settings

                        </h2>

                        <div className="form-grid">

                            <select
                                name="tone"
                                onChange={handleChange}
                            >

                                <option>Professional</option>

                                <option>Modern</option>

                                <option>Creative</option>

                            </select>

                            <input
                                type="text"
                                name="target_company"
                                placeholder="Target Company (Optional)"
                                onChange={handleChange}
                            />

                        </div>

                        <textarea
                            name="job_description"
                            placeholder="Paste Job Description (Optional)"
                            rows="6"
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="generate-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Generating Resume..."
                                : "Generate Resume with AI"
                        }

                    </button>

                    {loading && (

                        <div className="ai-progress">

                            <div className="progress-header">

                                {statusText}

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                />

                            </div>

                            <div className="progress-percentage">

                                {progress}%

                            </div>

                        </div>

                    )}

                </form>
            </div>

        </div>

    );

};

export default AIResumeGenerator;