import { motion } from "framer-motion";

import {
    FiPlusCircle,
    FiUpload,
    FiLayout,
    FiCpu,
    FiZap,
    FiTarget,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            id: 1,
            title: "Create Resume",
            description: "Build your resume manually.",
            icon: <FiPlusCircle />,
            color: "primary",
            action: () => navigate("/resume"),
        },

        {
            id: 2,
            title: "Create Resume with AI",
            description: "Generate a complete resume in seconds.",
            icon: <FiZap />,
            color: "success",
            action: () => navigate("/generate-ai-resume"),
        },

        {
            id: 3,
            title: "Import Resume",
            description: "Upload an existing resume.",
            icon: <FiUpload />,
            color: "warning",
            action: () => alert("Coming Soon"),
        },

        

        {
            id: 5,
            title: "AI Resume Optimizer",
            description: "Improve your professional summary with AI.",
            icon: <FiCpu />,
            color: "danger",
            action: () => navigate("/ai-resume-optimizer"),
        },

        {
            id: 6,
            title: "ATS Resume Analyzer",
            description: "Compare your resume with a job description and get an ATS score.",
            icon: <FiTarget />,
            color: "success",
            action: () => navigate("/ats-analyzer"),
        },

    ];

    return (

        <motion.div
            className="quick-actions"
            initial={{
                opacity: 0,
                x: 30,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: .6,
            }}
        >

            <h2>
                Quick Actions
            </h2>

            <div className="quick-actions-list">

                {actions.map((item) => (

                    <motion.button
                        key={item.id}
                        className={`quick-action ${item.color}`}
                        whileHover={{
                            scale: 1.03,
                            y: -4,
                        }}
                        whileTap={{
                            scale: .97,
                        }}
                        onClick={item.action}
                    >

                        <div className="quick-icon">
                            {item.icon}
                        </div>

                        <div className="quick-content">

                            <h3>
                                {item.title}
                            </h3>

                            <p>
                                {item.description}
                            </p>

                        </div>

                    </motion.button>

                ))}

            </div>

        </motion.div>

    );

}

export default QuickActions;