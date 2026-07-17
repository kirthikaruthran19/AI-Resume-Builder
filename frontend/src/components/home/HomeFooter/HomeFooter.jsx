import { Link } from "react-router-dom";

import {
    FiFileText,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";

import "./HomeFooter.css";

function HomeFooter() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="home-footer">

            <div className="home-footer-container">

                {/* ====================================
                    Company
                ==================================== */}

                <div className="home-footer-column">

                    <div className="home-footer-logo">

                        <div className="home-footer-logo-icon">

                            <FiFileText />

                        </div>

                        <div>

                            <h2>

                                ResumeAI

                            </h2>

                            <span>

                                AI Resume Builder

                            </span>

                        </div>

                    </div>

                    <p className="home-footer-description">

                        Create professional ATS-friendly resumes with AI,
                        premium templates, live preview and one-click PDF
                        download.

                    </p>

                </div>

                {/* ====================================
                    Quick Links
                ==================================== */}

                <div className="home-footer-column">

                    <h3>

                        Quick Links

                    </h3>

                    <Link to="/">

                        Home

                    </Link>

                    <Link to="/login">

                        Login

                    </Link>

                    <Link to="/register">

                        Register

                    </Link>

                </div>

                {/* ====================================
                    Features
                ==================================== */}

                <div className="home-footer-column">

                    <h3>

                        Features

                    </h3>

                    <span>

                        AI Resume Builder

                    </span>

                    <span>

                        ATS Analyzer

                    </span>

                    <span>

                        Premium Templates

                    </span>

                    <span>

                        PDF Download

                    </span>

                </div>

                {/* ====================================
                    Contact
                ==================================== */}

                <div className="home-footer-column">

                    <h3>

                        Contact

                    </h3>

                    <span>

                        <FiMail />

                        support@resumeai.com

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

            </div>

            {/* ====================================
                Bottom
            ==================================== */}

            <div className="home-footer-bottom">

                <p>

                    © {currentYear} ResumeAI. All Rights Reserved.

                </p>

                <div className="home-footer-socials">

                    <a
                        href="#"
                        aria-label="GitHub"
                    >

                        <FiGithub />

                    </a>

                    <a
                        href="#"
                        aria-label="LinkedIn"
                    >

                        <FiLinkedin />

                    </a>

                </div>

            </div>

        </footer>

    );

}

export default HomeFooter;