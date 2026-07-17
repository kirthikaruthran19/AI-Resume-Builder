import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./LanguageForm.css";

const initialForm = {
    resume: "",
    name: "",
    proficiency: "Professional",
};

function LanguageForm({ resume }) {

    const {
        languages,
        fetchLanguages,
        createLanguage,
        updateLanguage,
        deleteLanguage,
        loading,
    } = useResume();
    const [formData, setFormData] =
        useState(initialForm);

    const [editingId, setEditingId] =
        useState(null);

    const [errors, setErrors] =
        useState({});

    /* ==========================================
       Load Languages
    ========================================== */

    useEffect(() => {

        fetchLanguages();

    }, [resume]);


    /* ==========================================
       Resume ID
    ========================================== */

    useEffect(() => {

        if (resume?.id) {

            setFormData((prev) => ({

                ...prev,

                resume: resume.id,

            }));

        }

    }, [resume]);

    /* ==========================================
       Handle Input
    ========================================== */

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

    /* ==========================================
       Validation
    ========================================== */

    const validate = () => {

        const newErrors = {};

        if (!formData.name.trim()) {

            newErrors.name =
                "Language is required.";

        }

        if (!formData.proficiency) {

            newErrors.proficiency =
                "Select proficiency.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };
    /* ==========================================
   Reset Form
========================================== */

    const resetForm = () => {

        setFormData({
            resume: resume?.id || "",
            name: "",
            proficiency: "Professional",
        });

        setEditingId(null);

        setErrors({});

    };

    /* ==========================================
       Submit
    ========================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) return;

        try {

            if (editingId) {

                await updateLanguage(
                    editingId,
                    formData
                );

            } else {

                await createLanguage(formData);

            }

            await fetchLanguages();

            resetForm();

        } catch (error) {

            console.error(
                "Language save failed",
                error
            );

        }

    };

    /* ==========================================
       Edit
    ========================================== */

    const handleEdit = (language) => {

        setEditingId(language.id);

        setFormData({

            resume: resume.id,

            name: language.name,

            proficiency: language.proficiency,

        });


        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    /* ==========================================
       Delete
    ========================================== */

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this language?"
            );

        if (!confirmDelete) return;

        try {

            await deleteLanguage(id);

            await fetchLanguages();

            if (editingId === id) {

                resetForm();

            }

        } catch (error) {

            console.error(
                "Delete failed",
                error
            );

        }

    };
    /* ==========================================
   Render
========================================== */

    return (

        <div className="language-form">

            <div className="form-header">

                <h2>
                    Languages
                </h2>

                <p>
                    Add the languages you know along with your proficiency level.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="language-form-container"
            >

                {/* Language */}

                <div className="form-group">

                    <label>
                        Language
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. English"
                    />

                    {errors.name && (
                        <span className="error">
                            {errors.name}
                        </span>
                    )}

                </div>

                {/* Proficiency */}

                <div className="form-group">

                    <label>
                        Proficiency
                    </label>

                    <select
                        name="proficiency"
                        value={formData.proficiency}
                        onChange={handleChange}
                    >

                        <option value="Basic">
                            Basic
                        </option>

                        <option value="Conversational">
                            Conversational
                        </option>

                        <option value="Professional">
                            Professional
                        </option>

                        <option value="Native">
                            Native
                        </option>

                    </select>

                    {errors.proficiency && (
                        <span className="error">
                            {errors.proficiency}
                        </span>
                    )}

                </div>

                {/* Buttons */}

                <div className="form-actions">

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Language"
                                    : "Add Language"
                        }
                    </button>


                    {editingId && (

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </form>

            {/* Added Languages */}

            <div className="language-list">

                <h3>
                    Added Languages
                </h3>

                {languages.length === 0 ? (

                    <div className="empty-state">
                        No languages added yet.
                    </div>

                ) : (

                    languages
                        .filter(
                            (item) =>
                                item.resume === resume?.id
                        )
                        .map((language) => (

                            <div
                                key={language.id}
                                className="language-card"
                            >

                                <div className="language-info">

                                    <h4>
                                        {language.name}
                                    </h4>

                                    <span className={`proficiency ${language.proficiency.toLowerCase()}`}>
                                        {language.proficiency}
                                    </span>

                                </div>

                                <div className="language-actions">

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() => handleEdit(language)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() => handleDelete(language.id)}
                                    >
                                        Delete
                                    </button>


                                </div>

                            </div>

                        ))

                )}

            </div>

        </div>

    );

}

export default LanguageForm;