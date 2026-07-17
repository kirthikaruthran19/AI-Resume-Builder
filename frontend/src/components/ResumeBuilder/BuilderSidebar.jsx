import { motion } from "framer-motion";

import {
    FiUser,
    FiBook,
    FiBriefcase,
    FiAward,
    FiFolder,
    FiStar,
    FiGlobe,
    FiHeart,
} from "react-icons/fi";

import "./BuilderSidebar.css";

const sections = [
    {
        id: "personal",
        title: "Personal Information",
        icon: FiUser,
    },
    {
        id: "education",
        title: "Education",
        icon: FiBook,
    },
    {
        id: "experience",
        title: "Experience",
        icon: FiBriefcase,
    },
    {
        id: "skills",
        title: "Skills",
        icon: FiStar,
    },
    {
        id: "projects",
        title: "Projects",
        icon: FiFolder,
    },
    {
        id: "certifications",
        title: "Certifications",
        icon: FiAward,
    },
    {
        id: "languages",
        title: "Languages",
        icon: FiGlobe,
    },
    {
        id: "interests",
        title: "Interests",
        icon: FiHeart,
    },
];

function BuilderSidebar({
    activeSection,
    setActiveSection,
}) {
    return (
        <aside className="builder-sidebar">

            <div className="sidebar-header">

                <h2>Resume Sections</h2>

                <p>
                    Complete each section to
                    build your resume.
                </p>

            </div>

            <nav className="sidebar-menu">

                {sections.map((section) => {

                    const Icon = section.icon;

                    return (
                        <motion.button
                            key={section.id}
                            type="button"
                            className={
                                activeSection === section.id
                                    ? "sidebar-item active"
                                    : "sidebar-item"
                            }
                            whileHover={{
                                x: 5,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            onClick={() =>
                                setActiveSection(
                                    section.id
                                )
                            }
                        >
                            <Icon />

                            <span>
                                {section.title}
                            </span>

                        </motion.button>
                    );

                })}

            </nav>

        </aside>
    );
}

export default BuilderSidebar;