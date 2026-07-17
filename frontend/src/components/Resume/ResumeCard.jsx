import { motion } from "framer-motion";

import {
    FiEdit2,
    FiTrash2,
    FiDownload,
    FiBriefcase,
    FiCalendar,
} from "react-icons/fi";

import "./ResumeCard.css";

function ResumeCard({
    resume,
    onEdit,
    onDelete,
}) {

    const updatedDate = resume.updated_at
        ? new Date(resume.updated_at).toLocaleDateString()
        : "Recently";

    return (

        <motion.div
            className="resume-card"
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{
                duration: 0.3,
            }}
        >

            {/* Header */}

            <div className="resume-card-header">

                <div className="resume-title-section">

                    <h3>{resume.title}</h3>

                    <span className="template-badge">
                        {resume.template}
                    </span>

                </div>

                <div className="ats-score">

                    <span>ATS Score</span>

                    <strong>
                        {resume.ats_score ?? 0}%
                    </strong>

                </div>

            </div>

            {/* Statistics */}

            <div className="resume-stats">

                <div className="stat-box">

                    <FiDownload />

                    <h4>{resume.downloads ?? 0}</h4>

                    <p>Downloads</p>

                </div>

                <div className="stat-box">

                    <FiBriefcase />

                    <h4>{resume.applications ?? 0}</h4>

                    <p>Applications</p>

                </div>

                <div className="stat-box">

                    <FiCalendar />

                    <h4>{updatedDate}</h4>

                    <p>Updated</p>

                </div>

            </div>

            {/* Actions */}

            <div className="resume-actions">

                <button
                    className="edit-btn"
                    onClick={() => onEdit?.(resume)}
                >
                    <FiEdit2 />

                    Edit Resume

                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete?.(resume)}
                >
                    <FiTrash2 />

                    Delete Resume

                </button>

            </div>

        </motion.div>

    );
}

export default ResumeCard;