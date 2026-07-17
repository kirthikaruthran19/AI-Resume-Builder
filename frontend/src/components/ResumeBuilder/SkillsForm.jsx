import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./SkillsForm.css";

const initialForm = {

    resume: "",

    name: "",

    level: "Intermediate",

};

function SkillsForm({ resume }) {

    const {

        skills,

        fetchSkills,

        createSkill,

        updateSkill,

        deleteSkill,

        loading,

    } = useResume();
    const [formData, setFormData] =
        useState(initialForm);

    const [editingId, setEditingId] =
        useState(null);

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        fetchSkills();

    }, [resume]);

    useEffect(() => {

        if (resume?.id) {

            setFormData((prev) => ({

                ...prev,

                resume: resume.id,

            }));

        }

    }, [resume]);
    /* ==========================================
   Handle Input Change
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
                "Skill name is required.";

        }

        if (!formData.level) {

            newErrors.level =
                "Skill level is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    /* ==========================================
       Reset Form
    ========================================== */

    const resetForm = () => {

        setEditingId(null);

        setErrors({});

        setFormData({

            ...initialForm,

            resume: resume?.id || "",

            level: "Intermediate",

        });

    };
    /* ==========================================
   Submit
========================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) {

            return;

        }

        let response;

        if (editingId) {

            response =
                await updateSkill(

                    editingId,

                    formData

                );

        }

        else {

            response =
                await createSkill(

                    formData

                );

        }

        if (response.success) {

            await fetchSkills();

            resetForm();

        }

    };
    /* ==========================================
   Edit Skill
========================================== */

    const handleEdit = (item) => {

        setEditingId(item.id);

        setErrors({});

        setFormData({

            resume: resume.id,

            name: item.name,

            level: item.level,

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    /* ==========================================
       Delete Skill
    ========================================== */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this skill?"

        );

        if (!confirmed) {

            return;

        }

        const response =

            await deleteSkill(id);

        if (response.success) {

            await fetchSkills();

            resetForm();

        }

    };
    return (

        <div className="skills-form">

            <h2 className="form-title">

                Skills

            </h2>

            <form
                className="resume-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>

                        Skill Name

                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="React.js"
                    />

                    {

                        errors.name && (

                            <span className="error">

                                {errors.name}

                            </span>

                        )

                    }

                </div>

                <div className="form-group">

                    <label>

                        Skill Level

                    </label>

                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                    >

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Advanced">
                            Advanced
                        </option>

                        <option value="Expert">
                            Expert
                        </option>

                    </select>

                </div>

                <button
                    type="submit"
                    className="save-btn"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Saving..."
                            : editingId
                                ? "Update Skill"
                                : "Add Skill"
                    }
                </button>
                {
                    editingId && (

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    )
                }
                <hr className="form-divider" />

                <div className="skills-list">

                    <h3>

                        Added Skills

                    </h3>

                    {

                        skills.length === 0 ? (

                            <p className="empty-message">

                                No skills added yet.

                            </p>

                        ) : (

                            skills.map((item) => (

                                <div
                                    key={item.id}
                                    className="skill-card"
                                >

                                    <div className="skill-details">

                                        <h4>

                                            {item.name}

                                        </h4>

                                        <span className="skill-level">

                                            {item.level}

                                        </span>

                                    </div>

                                    <div className="skill-actions">

                                        <button
                                            type="button"
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(item)
                                            }
                                        >

                                            Edit

                                        </button>

                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            ))

                        )

                    }

                </div>

            </form>

        </div>

    );

}

export default SkillsForm;