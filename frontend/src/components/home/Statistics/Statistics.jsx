import { motion } from "framer-motion";

import {
    FiUsers,
    FiFileText,
    FiAward,
    FiGlobe,
} from "react-icons/fi";

import "./Statistics.css";

const statistics = [

    {
        id: 1,
        icon: <FiUsers />,
        value: "25K+",
        title: "Active Users",
        description: "Professionals trust ResumeAI to build modern resumes.",
    },

    {
        id: 2,
        icon: <FiFileText />,
        value: "150K+",
        title: "Resumes Created",
        description: "Thousands of resumes generated with premium templates.",
    },

    {
        id: 3,
        icon: <FiAward />,
        value: "96%",
        title: "ATS Success Rate",
        description: "Optimized resumes that pass Applicant Tracking Systems.",
    },

    {
        id: 4,
        icon: <FiGlobe />,
        value: "50+",
        title: "Countries",
        description: "Helping job seekers around the world build better resumes.",
    },

];

function Statistics() {

    return (

        <section className="home-statistics">

            <div className="home-statistics-container">

                <motion.div

                    className="home-statistics-header"

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
                        duration: .6,
                    }}

                >

                    <span>

                        Our Impact

                    </span>

                    <h2>

                        Trusted By Thousands Of Job Seekers

                    </h2>

                    <p>

                        ResumeAI helps professionals create ATS-friendly resumes
                        using AI, premium templates, and intelligent resume analysis.

                    </p>

                </motion.div>

                <div className="home-statistics-grid">

                    {

                        statistics.map((item, index) => (

                            <motion.div

                                key={item.id}

                                className="home-statistics-card"

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

                                <div className="home-statistics-icon">

                                    {item.icon}

                                </div>

                                <h3>

                                    {item.value}

                                </h3>

                                <h4>

                                    {item.title}

                                </h4>

                                <p>

                                    {item.description}

                                </p>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Statistics;