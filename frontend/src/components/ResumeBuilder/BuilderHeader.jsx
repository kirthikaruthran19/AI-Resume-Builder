import { useState } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FiArrowLeft,
    FiDownload,
    FiShield,
    FiCheckCircle,
    FiX,
} from "react-icons/fi";

import resumeService from "../../services/resumeService";

import "./BuilderHeader.css";

function BuilderHeader({ resume }) {

    const navigate = useNavigate();

    const [showATS, setShowATS] =
        useState(false);

    const [atsLoading, setATSLoading] =
        useState(false);

    const [atsData, setATSData] =
        useState(null);

    /* ==========================================
       Download PDF
    ========================================== */

    const handleDownload = async () => {

        if (!resume?.id) {

            alert("Resume not found.");

            return;

        }

        try {

            const response =
                await resumeService.downloadResume(
                    resume.id
                );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `${resume.title || "resume"}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.error(
                "PDF Download Error:",
                error
            );

            alert(
                "Unable to download PDF."
            );

        }

    };

    /* ==========================================
       ATS Score
    ========================================== */

    const handleATS = async () => {

        if (!resume?.id) {

            alert("Resume not found.");

            return;

        }

        try {

            setATSLoading(true);

            const response =
                await resumeService.getATSScore(
                    resume.id
                );

            setATSData(response.data);

            setShowATS(true);

        }

        catch (error) {

            console.error(error);

            alert(
                "Unable to calculate ATS score."
            );

        }

        finally {

            setATSLoading(false);

        }

    };

    const handleTemplateChange = async (e) => {

    try {

        await resumeService.updateResume(
            resume.id,
            {
                template: e.target.value,
            }
        );

        window.location.reload();

    }

    catch (error) {

        console.error(error);

        alert("Unable to change template.");

    }

};

    return (

        <>

            <motion.header

                className="builder-header"

                initial={{
                    opacity: 0,
                    y: -20,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: 0.3,
                }}

            >

                {/* Left */}

                <div className="builder-header-left">

                    <button

                        className="builder-back-btn"

                        onClick={() =>
                            navigate("/resume")
                        }

                    >

                        <FiArrowLeft />

                        Back

                    </button>

                    <div className="builder-title">

                        <h1>

                            {resume?.title ||
                                "Resume Builder"}

                        </h1>

                        <div className="builder-meta">

                            <select
                                className="template-select"
                                value={resume?.template || "professional"}
                                onChange={handleTemplateChange}
                            >

                                <option value="professional">
                                    Professional
                                </option>

                                <option value="modern">
                                    Modern
                                </option>

                                <option value="minimal">
                                    Minimal
                                </option>

                            </select>

                            <span className="save-status">

                                <FiCheckCircle />

                                Auto Saved

                            </span>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="builder-header-actions">

                    <button

                        className="ats-btn"

                        type="button"

                        onClick={handleATS}

                    >

                        <FiShield />

                        {

                            atsLoading

                                ? "Checking..."

                                : "ATS Score"

                        }

                    </button>

                    <button

                        className="download-btn"

                        type="button"

                        onClick={handleDownload}

                    >

                        <FiDownload />

                        Download PDF

                    </button>

                </div>

            </motion.header>

            {/* ==========================================
               ATS Modal
            ========================================== */}

            {

                showATS && atsData && (

                    <div className="ats-modal-overlay">

                        <div className="ats-modal">

                            <button

                                className="ats-close"

                                onClick={() =>
                                    setShowATS(false)
                                }

                            >

                                <FiX />

                            </button>

                            <h2>

                                ATS Score

                            </h2>

                            <h1>

                                {atsData.score}%

                            </h1>

                            <h3>

                                Suggestions

                            </h3>

                            {

                                atsData.suggestions
                                    ?.length > 0 ? (

                                    <ul>

                                        {

                                            atsData.suggestions.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <li
                                                        key={index}
                                                    >

                                                        {item}

                                                    </li>

                                                )
                                            )

                                        }

                                    </ul>

                                ) : (

                                    <p>

                                        Excellent!
                                        Your resume is
                                        ATS friendly.

                                    </p>

                                )

                            }

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default BuilderHeader;