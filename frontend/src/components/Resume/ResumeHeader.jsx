import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

import "./ResumeHeader.css";

function ResumeHeader({
    onCreateResume,
    disabled = false,
}) {
    return (
        <motion.div
            className="resume-header"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="resume-header-content">
                <div>
                    <h1>Resume Builder</h1>

                    <p>
                        Create, manage and optimize your professional resumes.
                    </p>
                </div>

                <button
                    type="button"
                    className="resume-create-btn"
                    onClick={onCreateResume}
                    disabled={disabled}
                    aria-label="Create Resume"
                >
                    <FiPlus />

                    <span>Create Resume</span>
                </button>
            </div>
        </motion.div>
    );
}

export default ResumeHeader;