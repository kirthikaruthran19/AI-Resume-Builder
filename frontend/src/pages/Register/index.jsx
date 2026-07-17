import "../../assets/styles/Auth.css";
import "./Register.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Card from "../../components/Card/Card";
import { registerUser } from "../../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        first_name: "",

        last_name: "",

        username: "",

        email: "",

        password: "",

        confirm_password: "",

    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    };

    const validateForm = () => {

        if (

            !formData.first_name ||

            !formData.last_name ||

            !formData.username ||

            !formData.email ||

            !formData.password ||

            !formData.confirm_password

        ) {

            alert("Please fill in all fields.");

            return false;

        }

        if (formData.password.length < 8) {

            alert("Password must contain at least 8 characters.");

            return false;

        }

        if (formData.password !== formData.confirm_password) {

            alert("Passwords do not match.");

            return false;

        }

        return true;

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {

            const payload = {

                first_name: formData.first_name,

                last_name: formData.last_name,

                username: formData.username,

                email: formData.email,

                password: formData.password,

                confirm_password: formData.confirm_password,

            };

            await registerUser(payload);

            setFormData({

                first_name: "",

                last_name: "",

                username: "",

                email: "",

                password: "",

                confirm_password: "",

            });

            navigate("/login", {

                state: {

                    success:
                        "Registration completed successfully. Please log in.",

                },

            });

        }

        catch (error) {

            console.error(error);

            if (error.response?.data) {

                alert(JSON.stringify(error.response.data));

            }

            else {

                alert("Registration failed.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="auth-page">

            <div className="auth-bg">

                <span className="auth-circle auth-circle-1"></span>

                <span className="auth-circle auth-circle-2"></span>

                <span className="auth-circle auth-circle-3"></span>

            </div>

            <div className="auth-container">

                {/* Left Section */}

                <motion.div

                    className="auth-left"

                    initial={{

                        opacity: 0,

                        x: -80,

                    }}

                    animate={{

                        opacity: 1,

                        x: 0,

                    }}

                    transition={{

                        duration: 0.8,

                    }}

                >

                    <span className="auth-badge">

                        AI Powered

                    </span>

                    <h1>

                        AI Resume Builder

                    </h1>

                    <p>

                        Create beautiful ATS-friendly resumes using Artificial
                        Intelligence. Build, customize and download resumes
                        within minutes.

                    </p>

                </motion.div>

                {/* Right Section */}

                <motion.div

                    initial={{

                        opacity: 0,

                        x: 80,

                    }}

                    animate={{

                        opacity: 1,

                        x: 0,

                    }}

                    transition={{

                        duration: 0.8,

                    }}

                >

                    <Card className="auth-card">

                        <form

                            className="auth-form"

                            onSubmit={handleSubmit}

                        >

                            <h2>

                                Create Account

                            </h2>

                            <div className="register-name-grid">

                                <div className="auth-field">

                                    <label>

                                        First Name

                                    </label>

                                    <input

                                        type="text"

                                        name="first_name"

                                        value={formData.first_name}

                                        onChange={handleChange}

                                        placeholder="John"

                                    />

                                </div>

                                <div className="auth-field">

                                    <label>

                                        Last Name

                                    </label>

                                    <input

                                        type="text"

                                        name="last_name"

                                        value={formData.last_name}

                                        onChange={handleChange}

                                        placeholder="Doe"

                                    />

                                </div>

                            </div>

                            <div className="auth-field">

                                <label>

                                    Username

                                </label>

                                <input

                                    type="text"

                                    name="username"

                                    value={formData.username}

                                    onChange={handleChange}

                                    placeholder="johndoe"

                                />

                            </div>

                            <div className="auth-field">

                                <label>

                                    Email

                                </label>

                                <input

                                    type="email"

                                    name="email"

                                    value={formData.email}

                                    onChange={handleChange}

                                    placeholder="john@example.com"

                                />

                            </div>

                            <div className="auth-field">

                                <label>

                                    Password

                                </label>

                                <div className="auth-password">

                                    <input

                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }

                                        name="password"

                                        value={formData.password}

                                        onChange={handleChange}

                                        placeholder="••••••••"

                                    />

                                    <button

                                        type="button"

                                        className="auth-eye"

                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }

                                    >

                                        {showPassword
                                            ? <FiEyeOff />
                                            : <FiEye />}

                                    </button>

                                </div>

                            </div>

                            <div className="auth-field">

                                <label>

                                    Confirm Password

                                </label>

                                <div className="auth-password">

                                    <input

                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }

                                        name="confirm_password"

                                        value={formData.confirm_password}

                                        onChange={handleChange}

                                        placeholder="••••••••"

                                    />

                                    <button

                                        type="button"

                                        className="auth-eye"

                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }

                                    >

                                        {showConfirmPassword
                                            ? <FiEyeOff />
                                            : <FiEye />}

                                    </button>

                                </div>

                            </div>

                            <button

                                type="submit"

                                className="auth-btn"

                                disabled={loading}

                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}

                            </button>

                            <p className="auth-footer">

                                Already have an account?

                                <Link to="/login">

                                    Login

                                </Link>

                            </p>

                        </form>

                    </Card>

                </motion.div>

            </div>

        </section>

    );

}

export default Register;