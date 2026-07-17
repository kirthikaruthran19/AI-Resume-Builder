import { motion } from "framer-motion";

import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiCheckCircle,
} from "react-icons/fi";

import "./HeroPreview.css";

function HeroPreview() {

    return (

        <motion.div

            className="home-hero-preview-card"

            initial={{
                opacity: 0,
                scale: .9,
                y: 40,
            }}

            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}

            transition={{
                duration: .8,
                delay: .3,
            }}

        >

            <div className="home-preview-header">

                <div className="home-preview-avatar">

                    KS

                </div>

                <div>

                    <h2>

                        Kirthika Sureshkumar

                    </h2>

                    <p>

                        AI Python Full Stack Developer

                    </p>

                </div>

            </div>

            <div className="home-preview-contact">

                <span>

                    <FiMail />

                    kirthika@email.com

                </span>

                <span>

                    <FiPhone />

                    +91 98765 43210

                </span>

                <span>

                    <FiMapPin />

                    Chennai, India

                </span>

            </div>

            <div className="home-preview-section">

                <h4>

                    Professional Summary

                </h4>

                <div className="home-preview-line large"></div>

                <div className="home-preview-line"></div>

                <div className="home-preview-line short"></div>

            </div>

            <div className="home-preview-section">

                <h4>

                    Skills

                </h4>

                <div className="home-preview-skills">

                    <span>React</span>

                    <span>Django</span>

                    <span>Python</span>

                    <span>REST API</span>

                    <span>MySQL</span>

                    <span>AI</span>

                </div>

            </div>

            <div className="home-preview-section">

                <h4>

                    Experience

                </h4>

                <div className="home-preview-experience">

                    <div className="home-preview-dot">

                        <FiCheckCircle />

                    </div>

                    <div>

                        <strong>

                            Junior AI Python Full Stack Developer

                        </strong>

                        <p>

                            Vetri IT Systems

                        </p>

                    </div>

                </div>

                <div className="home-preview-line"></div>

                <div className="home-preview-line short"></div>

            </div>

        </motion.div>

    );

}

export default HeroPreview;