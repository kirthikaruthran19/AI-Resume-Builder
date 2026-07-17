import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import aiService from "../../services/aiService";

import toast from "react-hot-toast";

import "./PersonalInfoForm.css";

function PersonalInfoForm({ resume }) {

    const {

        createPersonalInfo,

        updatePersonalInfo,

    } = useResume();

    const [loading, setLoading] =
        useState(false);

    const [aiLoading, setAiLoading] = useState(false);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({

            first_name: "",

            last_name: "",

            job_title: "",

            email: "",

            phone: "",

            address: "",

            city: "",

            state: "",

            country: "",

            postal_code: "",

            linkedin: "",

            github: "",

            portfolio: "",

            summary: "",

        });

    useEffect(() => {

        if (!resume?.personal_info)
            return;

        const info =
            resume.personal_info;

        setFormData({

            first_name:
                info.first_name || "",

            last_name:
                info.last_name || "",

            job_title:
                info.job_title || "",

            email:
                info.email || "",

            phone:
                info.phone || "",

            address:
                info.address || "",

            city:
                info.city || "",

            state:
                info.state || "",

            country:
                info.country || "",

            postal_code:
                info.postal_code || "",

            linkedin:
                info.linkedin || "",

            github:
                info.github || "",

            portfolio:
                info.portfolio || "",

            summary:
                info.summary || "",

        });

    }, [resume]);

    const handleChange = (event) => {

        const {

            name,

            value,

        } = event.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    const typeWriter = (text) => {

        let index = 0;

        setFormData((prev) => ({
            ...prev,
            summary: "",
        }));

        const interval = setInterval(() => {

            index++;

            setFormData((prev) => ({
                ...prev,
                summary: text.slice(0, index),
            }));

            if (index >= text.length) {

                clearInterval(interval);

            }

        }, 15);

    };

    const handleOptimizeSummary = async () => {

        if (!formData.summary.trim()) {

            toast.error(
                "Please enter a professional summary first."
            );

            return;

        }

        setError("");
        setSuccess("");
        setAiLoading(true);

        try {

            const response = await aiService.optimizeSummary(
                formData.summary
            );

            typeWriter(response.data.optimized_summary);

            toast.success(
                "AI optimized your summary successfully."
            );
        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to optimize summary."
            );

        } finally {

            setAiLoading(false);

        }

    };

    const validate = () => {

        if (!formData.first_name.trim()) {

            return "First name is required.";

        }

        if (!formData.last_name.trim()) {

            return "Last name is required.";

        }

        if (!formData.email.trim()) {

            return "Email is required.";

        }

        if (!formData.phone.trim()) {

            return "Phone number is required.";

        }

        return "";

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSuccess("");

        setError("");

        const validation =
            validate();

        if (validation) {

            setError(validation);

            return;

        }

        setLoading(true);

        try {

            const payload = {

                resume: resume.id,

                ...formData,

            };

            let response;

            if (
                resume.personal_info
            ) {

                response =
                    await updatePersonalInfo(

                        resume.personal_info.id,

                        payload

                    );

            } else {

                response =
                    await createPersonalInfo(
                        payload
                    );

            }

            if (response.success) {

                setSuccess(
                    "Personal information saved successfully."
                );

            } else {

                setError(
                    response.message
                );

            }

        } catch (err) {

            console.error(err);

            setError(
                "Unable to save personal information."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <form

            className="personal-form"

            onSubmit={handleSubmit}

        >

            {/* ========================= */}
            {/* Header */}
            {/* ========================= */}

            <div className="form-header">

                <h2>

                    Personal Information

                </h2>

                <p>

                    Complete your professional profile.

                </p>

            </div>

            {/* ========================= */}
            {/* Form */}
            {/* ========================= */}

            <div className="form-grid">

                {/* First Name */}

                <div className="form-group">

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

                {/* Last Name */}

                <div className="form-group">

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

                <div className="form-group full-width">

                    <label>

                        Job Title

                    </label>

                    <input
                        type="text"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        placeholder="Junior AI Python Full Stack Developer"
                    />

                </div>

                {/* Job Title */}

                <div className="form-group full-width">

                    <div className="summary-header">

                        <label>

                            Professional Summary

                        </label>

                        <button
                            type="button"
                            className="ai-btn"
                            onClick={handleOptimizeSummary}
                            disabled={aiLoading}
                        >

                            {aiLoading ? (

                                <>

                                    <span className="spinner"></span>

                                    Optimizing...

                                </>

                            ) : (

                                <>
                                    ✨ Optimize with AI
                                </>

                            )}

                        </button>

                    </div>

                    <textarea
                        name="summary"
                        rows={8}
                        value={formData.summary}
                        onChange={handleChange}
                        disabled={aiLoading}
                        placeholder="Write a professional summary highlighting your experience, skills and achievements..."
                    />

                </div>

                {/* Email */}

                <div className="form-group">

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

                {/* Phone */}

                <div className="form-group">

                    <label>

                        Phone

                    </label>

                    <input

                        type="text"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                        placeholder="+91 9876543210"

                    />

                </div>
                {/* ========================= */}
                {/* Address */}
                {/* ========================= */}

                <div className="form-group full-width">

                    <label>

                        Address

                    </label>

                    <input

                        type="text"

                        name="address"

                        value={formData.address}

                        onChange={handleChange}

                        placeholder="123 Main Street"

                    />

                </div>

                {/* City */}

                <div className="form-group">

                    <label>

                        City

                    </label>

                    <input

                        type="text"

                        name="city"

                        value={formData.city}

                        onChange={handleChange}

                        placeholder="Chennai"

                    />

                </div>

                {/* State */}

                <div className="form-group">

                    <label>

                        State

                    </label>

                    <input

                        type="text"

                        name="state"

                        value={formData.state}

                        onChange={handleChange}

                        placeholder="Tamil Nadu"

                    />

                </div>

                {/* Country */}

                <div className="form-group">

                    <label>

                        Country

                    </label>

                    <input

                        type="text"

                        name="country"

                        value={formData.country}

                        onChange={handleChange}

                        placeholder="India"

                    />

                </div>

                {/* Postal Code */}

                <div className="form-group">

                    <label>

                        Postal Code

                    </label>

                    <input

                        type="text"

                        name="postal_code"

                        value={formData.postal_code}

                        onChange={handleChange}

                        placeholder="600001"

                    />

                </div>

                {/* ========================= */}
                {/* Social Links */}
                {/* ========================= */}

                <div className="form-group full-width">

                    <label>

                        LinkedIn

                    </label>

                    <input

                        type="url"

                        name="linkedin"

                        value={formData.linkedin}

                        onChange={handleChange}

                        placeholder="https://linkedin.com/in/username"

                    />

                </div>

                <div className="form-group full-width">

                    <label>

                        GitHub

                    </label>

                    <input

                        type="url"

                        name="github"

                        value={formData.github}

                        onChange={handleChange}

                        placeholder="https://github.com/username"

                    />

                </div>

                <div className="form-group full-width">

                    <label>

                        Portfolio

                    </label>

                    <input

                        type="url"

                        name="portfolio"

                        value={formData.portfolio}

                        onChange={handleChange}

                        placeholder="https://yourportfolio.com"

                    />

                </div>

                {/* ========================= */}
                {/* Professional Summary */}
                {/* ========================= */}


            </div>

            {/* ========================= */}
            {/* Footer */}
            {/* ========================= */}

            <div className="form-footer">

                {

                    success && (

                        <div className="success-message">

                            {success}

                        </div>

                    )

                }

                {

                    error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )

                }

                <button

                    type="submit"

                    className="save-btn"

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            "Saving..."

                            :

                            "Save Personal Information"

                    }

                </button>

            </div>

        </form>

    );

}

export default PersonalInfoForm;