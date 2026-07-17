import { useContext, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
    FiMenu,
    FiX,
    FiLogOut,
    FiUser,
    FiGrid,
    FiHome,
    FiFileText,
} from "react-icons/fi";

import { AuthContext } from "../../../context/AuthContext";

import "./HomeNavbar.css";

function HomeNavbar() {

    const navigate = useNavigate();

    const {
        isAuthenticated,
        logout,
    } = useContext(AuthContext);

    const [mobileMenu, setMobileMenu] =
        useState(false);

    const toggleMenu = () => {

        setMobileMenu((prev) => !prev);

    };

    const closeMenu = () => {

        setMobileMenu(false);

    };

    const handleTemplates = () => {

        closeMenu();

        if (isAuthenticated) {

            navigate("/templates");

        }

        else {

            navigate("/login");

        }

    };

    return (

        <motion.header

            className="home-navbar"

            initial={{
                y: -60,
                opacity: 0,
            }}

            animate={{
                y: 0,
                opacity: 1,
            }}

            transition={{
                duration: .5,
            }}

        >

            <div className="home-navbar-container">

                {/* ======================
                    LOGO
                ====================== */}

                <Link

                    to="/"

                    className="home-navbar-logo"

                >

                    <div className="home-navbar-logo-icon">

                        <FiFileText />

                    </div>

                    <div className="home-navbar-logo-content">

                        <h2>

                            ResumeAI

                        </h2>

                        <span>

                            AI Resume Builder

                        </span>

                    </div>

                </Link>

                {/* ======================
                    DESKTOP MENU
                ====================== */}

                <nav className="home-navbar-links">

                    <NavLink

                        to="/"

                        className={({ isActive }) =>
                            isActive
                                ? "home-navbar-link active"
                                : "home-navbar-link"
                        }

                    >

                        <FiHome />

                        Home

                    </NavLink>

                    <button

                        className="home-navbar-link"

                        onClick={handleTemplates}

                    >

                        <FiGrid />

                        Templates

                    </button>

                </nav>

                {/* ======================
                    ACTIONS
                ====================== */}

                <div className="home-navbar-actions">

                    {

                        !isAuthenticated ?

                            <>

                                <button

                                    className="home-navbar-login"

                                    onClick={() =>
                                        navigate("/login")
                                    }

                                >

                                    Login

                                </button>

                                <button

                                    className="home-navbar-register"

                                    onClick={() =>
                                        navigate("/register")
                                    }

                                >

                                    Get Started

                                </button>

                            </>

                            :

                            <>

                                <button

                                    className="home-navbar-dashboard"

                                    onClick={() =>
                                        navigate("/dashboard")
                                    }

                                >

                                    Dashboard

                                </button>

                                <button

                                    className="home-navbar-profile"

                                    onClick={() =>
                                        navigate("/profile")
                                    }

                                >

                                    <FiUser />

                                </button>

                                <button

                                    className="home-navbar-logout"

                                    onClick={logout}

                                >

                                    <FiLogOut />

                                </button>

                            </>

                    }

                </div>

                {/* ======================
                    MOBILE BUTTON
                ====================== */}

                <button

                    className="home-navbar-mobile-toggle"

                    onClick={toggleMenu}

                >

                    {

                        mobileMenu ?

                            <FiX />

                            :

                            <FiMenu />

                    }

                </button>

            </div>

            {/* ======================
                MOBILE MENU
            ====================== */}

            <AnimatePresence>

                {

                    mobileMenu &&

                    <motion.div

                        className="home-navbar-mobile-menu"

                        initial={{
                            opacity: 0,
                            y: -20,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        exit={{
                            opacity: 0,
                            y: -20,
                        }}

                        transition={{
                            duration: .25,
                        }}

                    >

                        <NavLink

                            to="/"

                            className={({ isActive }) =>
                                isActive
                                    ? "home-navbar-mobile-link home-navbar-mobile-link-active"
                                    : "home-navbar-mobile-link"
                            }

                            onClick={closeMenu}

                        >

                            Home

                        </NavLink>

                        <button

                            type="button"

                            className="home-navbar-mobile-link"

                            onClick={handleTemplates}

                        >

                            Templates

                        </button>

                        {

                            !isAuthenticated ?

                                <>

                                    <button

                                        type="button"

                                        className="home-navbar-mobile-link"

                                        onClick={() => {

                                            closeMenu();

                                            navigate("/login");

                                        }}

                                    >

                                        Login

                                    </button>

                                    <button

                                        type="button"

                                        className="home-navbar-mobile-link"

                                        onClick={() => {

                                            closeMenu();

                                            navigate("/register");

                                        }}

                                    >

                                        Register

                                    </button>

                                </>

                                :

                                <>

                                    <button

                                        type="button"

                                        className="home-navbar-mobile-link"

                                        onClick={() => {

                                            closeMenu();

                                            navigate("/dashboard");

                                        }}

                                    >

                                        Dashboard

                                    </button>

                                    <button

                                        type="button"

                                        className="home-navbar-mobile-link"

                                        onClick={() => {

                                            closeMenu();

                                            navigate("/profile");

                                        }}

                                    >

                                        Profile

                                    </button>

                                    <button

                                        type="button"

                                        className="home-navbar-mobile-link"

                                        onClick={logout}

                                    >

                                        Logout

                                    </button>

                                </>

                        }

                    </motion.div>

                }

            </AnimatePresence>

        </motion.header>

    );

}

export default HomeNavbar;