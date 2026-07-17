import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
    FiArrowRight,
    FiCheckCircle,
} from "react-icons/fi";

import { AuthContext } from "../../../context/AuthContext";

import HeroPreview from "../HeroPreview/HeroPreview";

import "./Hero.css";

function Hero() {

    const navigate = useNavigate();

    const {
        isAuthenticated,
    } = useContext(AuthContext);

    const handleGetStarted = () => {

        if (isAuthenticated) {

            navigate("/dashboard");

        }

        else {

            navigate("/register");

        }

    };

    const handleTemplates = () => {

        if (isAuthenticated) {

            navigate("/templates");

        }

        else {

            navigate("/login");

        }

    };

    return (

        <section className="home-hero">

            <div className="home-hero-container">

                {/* Left */}

                <motion.div

                    className="home-hero-content"

                    initial={{
                        opacity: 0,
                        x: -50,
                    }}

                    animate={{
                        opacity: 1,
                        x: 0,
                    }}

                    transition={{
                        duration: .7,
                    }}

                >

                    <span className="home-hero-badge">

                        AI Powered Resume Builder

                    </span>

                    <h1>

                        Build a Professional Resume

                        <span>

                            {" "}in Minutes

                        </span>

                    </h1>

                    <p>

                        Create modern, ATS-friendly resumes with AI assistance,
                        multiple templates, real-time preview, and one-click PDF export.

                    </p>

                    <div className="home-hero-buttons">

                        <button

                            type="button"

                            className="home-hero-primary"

                            onClick={handleGetStarted}

                        >

                            Get Started

                            <FiArrowRight />

                        </button>

                        <button

                            type="button"

                            className="home-hero-secondary"

                            onClick={handleTemplates}

                        >

                            View Templates

                        </button>

                    </div>

                    <div className="home-hero-features">

                        <div>

                            <FiCheckCircle />

                            ATS Optimized

                        </div>

                        <div>

                            <FiCheckCircle />

                            AI Suggestions

                        </div>

                        <div>

                            <FiCheckCircle />

                            PDF Download

                        </div>

                    </div>

                </motion.div>

                {/* Right */}

                <motion.div

                    className="home-hero-preview"

                    initial={{
                        opacity: 0,
                        x: 50,
                    }}

                    animate={{
                        opacity: 1,
                        x: 0,
                    }}

                    transition={{
                        duration: .7,
                        delay: .2,
                    }}

                >

                    <HeroPreview />

                </motion.div>

            </div>

        </section>

    );

}

export default Hero;