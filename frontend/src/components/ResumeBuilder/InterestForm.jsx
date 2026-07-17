import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./InterestForm.css";

const initialForm = {
    resume: "",
    name: "",
};

function InterestForm({ resume }) {

    const {
    interests,
    fetchInterests,
    createInterest,
    updateInterest,
    deleteInterest,
    loading,
} = useResume();

    const [formData, setFormData] =
        useState(initialForm);

    const [editingId, setEditingId] =
        useState(null);

    const [errors, setErrors] =
        useState({});

    /* ==========================================
       Load Interests
    ========================================== */

    useEffect(() => {

    fetchInterests();

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
                "Interest is required.";

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

                await updateInterest(
                    editingId,
                    formData
                );

            } else {

                await createInterest(formData);

            }

            await fetchInterests();

            resetForm();

        } catch (error) {

            console.error(
                "Interest save failed",
                error
            );

        }

    };

    /* ==========================================
       Edit
    ========================================== */

    const handleEdit = (interest) => {

        setEditingId(interest.id);

        setFormData({

    resume: resume.id,

    name: interest.name,

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

        const confirmDelete = window.confirm(
            "Delete this interest?"
        );

        if (!confirmDelete) return;

        try {

            await deleteInterest(id);

            await fetchInterests();

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

        <div className="interest-form">

            <div className="form-header">

                <h2>
                    Interests
                </h2>

                <p>
                    Add your hobbies and interests to make your resume more engaging.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="interest-form-container"
            >

                {/* Interest */}

                <div className="form-group">

                    <label>
                        Interest
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Reading, Photography, Travelling"
                    />

                    {errors.name && (
                        <span className="error">
                            {errors.name}
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
                ? "Update Interest"
                : "Add Interest"
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

            {/* Added Interests */}

            <div className="interest-list">

                <h3>
                    Added Interests
                </h3>

                {interests.filter(
                    (item) => item.resume === resume?.id
                ).length === 0 ? (

                    <div className="empty-state">
                        No interests added yet.
                    </div>

                ) : (

                    interests
                        .filter(
                            (item) =>
                                item.resume === resume?.id
                        )
                        .map((interest) => (

                            <div
                                key={interest.id}
                                className="interest-card"
                            >

                                <div className="interest-info">

                                    <h4>
                                        {interest.name}
                                    </h4>

                                </div>

                                <div className="interest-actions">

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEdit(interest)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(interest.id)
                                        }
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

export default InterestForm;