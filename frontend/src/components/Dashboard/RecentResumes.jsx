import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    FiEdit2,
    FiDownload,
    FiEye,
    FiTrash2,
} from "react-icons/fi";

import { useResume } from "../../context/ResumeContext";

function RecentResumes() {

    const {
        recentResumes,
        loading,
        deleteResume,
        refreshDashboard,
    } = useResume();

    const navigate = useNavigate();

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        const result = await deleteResume(id);

        if (result.success) {

            await refreshDashboard();

            alert("Resume deleted successfully.");

        } else {

            alert(result.message);

        }

    };

    return (

        <motion.div

            className="recent-resumes"

            initial={{
                opacity: 0,
                x: -30,
            }}

            animate={{
                opacity: 1,
                x: 0,
            }}

            transition={{
                duration: .6,
            }}

        >

            <div className="dashboard-section-header">

                <h2>

                    Recent Resumes

                </h2>
                <button
                    className="view-all-btn"
                    onClick={() => navigate("/resumes")}
                >
                    View All
                </button>

            </div>

            {

                loading ? (

                    <div className="empty-resume">

                        <div className="stats-loading"></div>

                    </div>

                ) : recentResumes.length === 0 ? (

                    <div className="empty-resume">

                        <div className="empty-resume-icon">

                            📄

                        </div>

                        <h3>

                            No Resumes Found

                        </h3>

                        <p>

                            Create your first resume to see it here.

                        </p>

                    </div>

                ) : (

                    <div className="resume-list">

                        {

                            recentResumes.map((resume) => (

                                <motion.div

                                    key={resume.id}

                                    className="resume-card"

                                    whileHover={{
                                        y: -4,
                                    }}

                                >

                                    <div className="resume-info">

                                        <h3>

                                            {resume.title}

                                        </h3>

                                        <p>

                                            Template : {resume.template}

                                        </p>

                                        <p>

                                            Updated : {new Date(
                                                resume.updated_at
                                            ).toLocaleDateString()}

                                        </p>

                                    </div>

                                    <div className="resume-score">

                                        <h4>

                                            ATS Score

                                        </h4>

                                        <span>

                                            {resume.ats_score}%

                                        </span>

                                    </div>

                                    <div className="resume-actions">

                                        <button
                                            title="View Resume"
                                            onClick={() => navigate(`/resume-preview/${resume.id}`)}
                                        >
                                            <FiEye />
                                        </button>

                                        <button
                                            title="Edit Resume"
                                            onClick={() => navigate(`/resume-builder/${resume.id}`)}
                                        >
                                            <FiEdit2 />
                                        </button>

                                        

                                        <button
                                            title="Delete Resume"
                                            onClick={() => handleDelete(resume.id)}
                                        >
                                            <FiTrash2 />
                                        </button>

                                    </div>

                                </motion.div>

                            ))

                        }

                    </div>

                )

            }

        </motion.div>

    );

}

export default RecentResumes;