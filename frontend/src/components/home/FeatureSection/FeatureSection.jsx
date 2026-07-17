import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
    FiCpu,
    FiAward,
    FiLayout,
    FiDownload,
    FiArrowRight,
} from "react-icons/fi";

import { AuthContext } from "../../../context/AuthContext";

import "./FeatureSection.css";

const features = [
    {
        id: 1,
        icon: <FiCpu />,
        title: "AI Resume Builder",
        description:
            "Generate professional resume content with AI assistance and improve every section effortlessly.",
        route: "/generate-ai-resume",
    },
    {
        id: 2,
        icon: <FiAward />,
        title: "ATS Score Analyzer",
        description:
            "Analyze your resume against Applicant Tracking Systems and receive optimization suggestions.",
        route: "/ats-analyzer",
    },
    {
        id: 3,
        icon: <FiLayout />,
        title: "Premium Templates",
        description:
            "Choose from multiple modern, ATS-friendly resume templates with live preview support.",
        route: "/templates",
    },
    {
        id: 4,
        icon: <FiDownload />,
        title: "PDF Export",
        description:
            "Download high-quality PDF resumes instantly and share them with recruiters confidently.",
        route: "/resume",
    },
];

function FeatureSection() {

    const navigate = useNavigate();

    const { isAuthenticated } = useContext(AuthContext);

    const handleNavigation = (route) => {

        if (isAuthenticated) {

            navigate(route);

        }

        else {

            navigate("/login");

        }

    };

    return (

        <section className="home-features">

            <div className="home-features-container">

                <motion.div

                    className="home-features-heading"

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ duration: .6 }}

                >

                    <span>

                        Powerful Features

                    </span>

                    <h2>

                        Everything You Need To Build The Perfect Resume

                    </h2>

                    <p>

                        Our platform combines AI, ATS optimization, premium templates,
                        and instant PDF export to help you land more interviews.

                    </p>

                </motion.div>

                <div className="home-features-grid">

                    {

                        features.map((feature, index) => (

                            <motion.div

                                key={feature.id}

                                className="home-feature-card"

                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                viewport={{
                                    once: true,
                                }}

                                transition={{
                                    duration: .5,
                                    delay: index * .15,
                                }}

                            >

                                <div className="home-feature-icon">

                                    {feature.icon}

                                </div>

                                <h3>

                                    {feature.title}

                                </h3>

                                <p>

                                    {feature.description}

                                </p>

                                <button

                                    type="button"

                                    className="home-feature-button"

                                    onClick={() =>
                                        handleNavigation(feature.route)
                                    }

                                >

                                    Explore

                                    <FiArrowRight />

                                </button>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default FeatureSection;