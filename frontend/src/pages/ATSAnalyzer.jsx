import { useState } from "react";
import { motion } from "framer-motion";

import aiService from "../services/aiService";

import "./ATSAnalyzer.css";

function ATSAnalyzer() {
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [analysis, setAnalysis] = useState(null);

    const analyzeResume = async () => {
        if (!resumeText.trim()) {
            setError("Please enter your resume.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await aiService.analyzeATSScore(
                resumeText,
                jobDescription
            );

            setAnalysis(response.data.analysis);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to analyze ATS score."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ats-page">

            <motion.div
                className="ats-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >

                <h1>ATS Resume Analyzer</h1>

                <textarea
                    placeholder="Paste your Resume..."
                    value={resumeText}
                    onChange={(e) =>
                        setResumeText(e.target.value)
                    }
                />

                <textarea
                    placeholder="Paste Job Description..."
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <button
                    onClick={analyzeResume}
                    disabled={loading}
                >
                    {loading
                        ? "Analyzing..."
                        : "Analyze ATS Score"}
                </button>

                {analysis && (

                    <motion.div
                        className="result-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >

                        <h2>
                            ATS Score
                        </h2>

                        <div className="score-circle">
                            {analysis.ats_score}%
                        </div>

                        <div className="section">

                            <h3>
                                Matched Keywords
                            </h3>

                            <ul>
                                {analysis.matched_keywords.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>

                        <div className="section">

                            <h3>
                                Missing Keywords
                            </h3>

                            <ul>
                                {analysis.missing_keywords.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>

                        <div className="section">

                            <h3>
                                AI Suggestions
                            </h3>

                            <ul>
                                {analysis.suggestions.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>

                    </motion.div>

                )}

            </motion.div>

        </div>
    );
}

export default ATSAnalyzer;