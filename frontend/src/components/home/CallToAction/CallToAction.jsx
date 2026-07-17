import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
    FiArrowRight,
    FiLayout,
} from "react-icons/fi";

import { AuthContext } from "../../../context/AuthContext";

import "./CallToAction.css";

function CallToAction() {

    const navigate = useNavigate();

    const {
        isAuthenticated,
    } = useContext(AuthContext);

    const handlePrimaryAction = () => {

        if (isAuthenticated) {

            navigate("/dashboard");

        }

        else {

            navigate("/register");

        }

    };

    const handleTemplateNavigation = () => {

        if (isAuthenticated) {

            navigate("/templates");

        }

        else {

            navigate("/login");

        }

    };

    return (

        <section className="home-cta">

            <motion.div

                className="home-cta-container"

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

                <span className="home-cta-badge">

                    Start Building Today

                </span>

                <h2>

                    Ready To Create Your Dream Resume?

                </h2>

                <p>

                    Build a modern, ATS-friendly resume with AI assistance,
                    choose from premium templates, preview your resume live,
                    and download it instantly as a professional PDF.

                </p>

                <div className="home-cta-buttons">

                    <button

                        type="button"

                        className="home-cta-primary"

                        onClick={handlePrimaryAction}

                    >

                        {

                            isAuthenticated ?

                                "Go To Dashboard"

                                :

                                "Get Started"

                        }

                        <FiArrowRight />

                    </button>

                    <button

                        type="button"

                        className="home-cta-secondary"

                        onClick={handleTemplateNavigation}

                    >

                        <FiLayout />

                        Browse Templates

                    </button>

                </div>

            </motion.div>

        </section>

    );

}

export default CallToAction;