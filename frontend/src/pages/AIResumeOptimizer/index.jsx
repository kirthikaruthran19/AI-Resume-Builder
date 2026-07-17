import { useState } from "react";
import { motion } from "framer-motion";
import {
    FiCpu,
    FiCheckCircle,
    FiZap,
} from "react-icons/fi";

import aiService from "../../services/aiService";

import "./AIResumeOptimizer.css";

function AIResumeOptimizer() {

    const [summary, setSummary] = useState("");

    const [optimizedSummary, setOptimizedSummary] = useState("");

    const [loading, setLoading] = useState(false);

    const score = 85;

    const suggestions = [

        "Improve your Professional Summary",

        "Add more technical skills",

        "Include measurable achievements",

        "Use action verbs in Experience",

        "Mention relevant certifications",

    ];

    const handleOptimize = async () => {

        if (!summary.trim()) {

            alert("Please enter your professional summary.");

            return;

        }

        try {

            setLoading(true);

            setOptimizedSummary("");

            const response = await aiService.optimizeSummary(summary);

            console.log("========== AI RESPONSE ==========");
            console.log(response.data);

            if (!response.data.success) {

                alert(response.data.message);

                return;

            }

            const optimized = response.data.optimized_summary;

            console.log("Optimized Summary:", optimized);

            try {

                const parsed = JSON.parse(optimized);

                console.log("Parsed Response:", parsed);

                setOptimizedSummary(

                    parsed.professionalSummary ||

                    parsed.summary ||

                    optimized

                );

            }

            catch (error) {

                console.log("Not JSON. Using plain text.");

                setOptimizedSummary(optimized);

            }

        }

        catch (error) {

            console.error("Optimization Error:", error);

            if (error.response) {

                console.log(error.response.data);

                alert(

                    error.response.data.message ||

                    "Failed to optimize summary."

                );

            }

            else {

                alert("Server is not responding.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="optimizer">

            <motion.div

                className="optimizer-card"

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

            >

                {/* Header */}

                <div className="optimizer-header">

                    <FiCpu />

                    <h1>

                        AI Resume Optimizer

                    </h1>

                </div>

                {/* Resume Score */}

                <div className="score-box">

                    <h2>

                        Resume Score

                    </h2>

                    <div className="score-circle">

                        {score}

                        <span>

                            /100

                        </span>

                    </div>

                </div>

                {/* Suggestions */}

                <div className="suggestions">

                    <h2>

                        AI Suggestions

                    </h2>

                    {

                        suggestions.map((item, index) => (

                            <div

                                key={index}

                                className="suggestion"

                            >

                                <FiCheckCircle />

                                <span>

                                    {item}

                                </span>

                            </div>

                        ))

                    }

                </div>

                {/* Summary */}

                <div className="summary-box">

                    <label>

                        Professional Summary

                    </label>

                    <textarea

                        rows={7}

                        value={summary}

                        placeholder="Enter your professional summary..."

                        onChange={(e) =>

                            setSummary(e.target.value)

                        }

                    />

                </div>

                {/* Button */}

                <button

                    className="optimize-btn"

                    onClick={handleOptimize}

                    disabled={loading}

                >

                    <FiZap />

                    {

                        loading

                            ? "Optimizing..."

                            : "Improve Resume with AI"

                    }

                </button>

                {/* Result */}

                {

                    optimizedSummary && (

                        <div className="improved-summary">

                            <h2>

                                AI Optimized Summary

                            </h2>

                            <p>

                                {optimizedSummary}

                            </p>

                        </div>

                    )

                }

            </motion.div>

        </section>

    );

}

export default AIResumeOptimizer;