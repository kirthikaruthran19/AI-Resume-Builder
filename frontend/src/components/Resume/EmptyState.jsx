import { motion } from "framer-motion";
import { FiFileText, FiPlus } from "react-icons/fi";

import "./EmptyState.css";

function EmptyState({ onCreateResume }) {

    return (

        <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div className="empty-icon">

                <FiFileText />

            </div>

            <h2>

                No Resumes Yet

            </h2>

            <p>

                Create your first AI-powered resume and
                start building your professional career.

            </p>

            <button
                className="empty-btn"
                onClick={onCreateResume}
            >

                <FiPlus />

                Create Resume

            </button>

        </motion.div>

    );

}

export default EmptyState;