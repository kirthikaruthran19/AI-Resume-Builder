import "../../assets/styles/Auth.css";
import "./Login.css";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";
import {
    FiEye,
    FiEyeOff,
} from "react-icons/fi";

import Card from "../../components/Card/Card";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const successMessage =
        location.state?.success || "";

    const [formData, setFormData] = useState({

        username: "",

        password: "",

        remember: false,

    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (
            !formData.username ||
            !formData.password
        ) {

            alert("Please enter username and password.");

            return;

        }

        setLoading(true);

        try {

            const response =
                await loginUser({

                    username: formData.username,

                    password: formData.password,

                });

            // Save username
            localStorage.setItem(
                "username",
                formData.username
            );

            // Login
            login(
                response.access,
                response.refresh
            );

            navigate("/");

        }

        catch (error) {

            console.error(error);

            if (
                error.response?.data?.detail
            ) {

                alert(
                    error.response.data.detail
                );

            }

            else {

                alert(
                    "Invalid username or password."
                );

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="auth-page">

            {/* Floating Background */}

            <div className="auth-bg">

                <span className="auth-circle auth-circle-1"></span>

                <span className="auth-circle auth-circle-2"></span>

                <span className="auth-circle auth-circle-3"></span>

            </div>

            <div className="auth-container">

                {/* Left Side */}

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
                        duration: .8,
                    }}
                >

                    <span className="auth-badge">

                        Welcome Back

                    </span>

                    <h1>

                        AI Resume Builder

                    </h1>

                    <p>

                        Continue creating professional
                        AI-powered resumes and manage
                        your applications from one
                        premium dashboard.

                    </p>

                </motion.div>

                {/* Right Side */}

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
                        duration: .8,
                    }}
                >

                    <Card className="auth-card">

                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                        >

                            <h2>

                                Sign In

                            </h2>

                            {successMessage && (

                                <div className="auth-success">

                                    {successMessage}

                                </div>

                            )}

                            <div className="auth-field">

                                <label>

                                    Username

                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
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
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >

                                        {showPassword
                                            ? <FiEyeOff />
                                            : <FiEye />}

                                    </button>

                                </div>

                            </div>

                            <div className="auth-options">

                                <label className="auth-checkbox">

                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={formData.remember}
                                        onChange={handleChange}
                                    />

                                    Remember Me

                                </label>

                                <Link to="#">

                                    Forgot Password?

                                </Link>

                            </div>

                            <button
                                type="submit"
                                className="auth-btn"
                                disabled={loading}
                            >

                                {loading
                                    ? "Signing In..."
                                    : "Sign In"}

                            </button>

                            <p className="auth-footer">

                                Don't have an account?

                                <Link to="/register">

                                    Register

                                </Link>

                            </p>

                        </form>

                    </Card>

                </motion.div>

            </div>

        </section>

    );

}

export default Login;