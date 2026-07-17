import { motion } from "framer-motion";

import {
    FiUserPlus,
    FiEdit3,
    FiCpu,
    FiDownload,
} from "react-icons/fi";

import "./HowItWorks.css";

const steps = [

    {
        id: 1,
        icon: <FiUserPlus />,
        title: "Create Your Account",
        description:
            "Sign up in seconds and access your personalized dashboard to manage all your resumes.",
    },

    {
        id: 2,
        icon: <FiEdit3 />,
        title: "Build Your Resume",
        description:
            "Add your personal information, education, experience, skills, and projects using an intuitive editor.",
    },

    {
        id: 3,
        icon: <FiCpu />,
        title: "Optimize with AI",
        description:
            "Improve your resume with AI-generated suggestions and ATS score analysis to increase interview chances.",
    },

    {
        id: 4,
        icon: <FiDownload />,
        title: "Download & Apply",
        description:
            "Choose your favorite template, export your resume as PDF, and start applying for jobs confidently.",
    },

];

function HowItWorks() {

    return (

        <section className="home-how-it-works">

            <div className="home-how-container">

                <motion.div

                    className="home-how-header"

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

                        How It Works

                    </span>

                    <h2>

                        Build Your Resume In Four Easy Steps

                    </h2>

                    <p>

                        A simple workflow designed to help you create
                        professional resumes quickly with AI assistance.

                    </p>

                </motion.div>

                <div className="home-how-grid">

                    {

                        steps.map((step, index) => (

                            <motion.div

                                key={step.id}

                                className="home-how-card"

                                initial={{
                                    opacity: 0,
                                    y: 50,
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

                                {

                                    index !== steps.length - 1 &&

                                    <div className="home-how-line"></div>

                                }

                                <div className="home-how-number">

                                    {step.id}

                                </div>

                                <div className="home-how-icon">

                                    {step.icon}

                                </div>

                                <h3>

                                    {step.title}

                                </h3>

                                <p>

                                    {step.description}

                                </p>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default HowItWorks;