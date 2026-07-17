import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./ExperienceForm.css";

const initialForm = {

    resume: "",

    company: "",

    position: "",

    location: "",

    employment_type: "",

    start_date: "",

    end_date: "",

    currently_working: false,

    description: "",

};

function ExperienceForm({ resume }) {

    const {

        fetchResume,

        createExperience,

        updateExperience,

        deleteExperience,

        loading,

    } = useResume();

    const [formData, setFormData] =
        useState(initialForm);

    const [editingId, setEditingId] =
        useState(null);

    const [errors, setErrors] =
        useState({});


    useEffect(() => {

        if (resume?.id) {

            setFormData((prev) => ({

                ...prev,

                resume: resume.id,

            }));

        }

    }, [resume]);

    const handleChange = (event) => {

        const {

            name,

            value,

            type,

            checked,

        } = event.target;

        setFormData((prev) => ({

            ...prev,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

    };
    const validate = () => {

        const newErrors = {};

        if (!formData.company.trim()) {

            newErrors.company =
                "Company name is required.";

        }

        if (!formData.position.trim()) {

            newErrors.position =
                "Job title is required.";

        }

        if (!formData.start_date) {

            newErrors.start_date =
                "Start date is required.";

        }

        if (

            !formData.currently_working &&

            !formData.end_date

        ) {

            newErrors.end_date =
                "End date is required.";

        }

        if (!formData.description.trim()) {

            newErrors.description =
                "Job description is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const resetForm = () => {

        setEditingId(null);

        setErrors({});

        setFormData({

            ...initialForm,

            resume: resume?.id || "",

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) {

            return;

        }


        let response;
        const payload = {

            ...formData,

            end_date: formData.currently_working
                ? null
                : (formData.end_date || null),

        };

        if (editingId) {

            response =
                await updateExperience(
                    editingId,
                    payload
                );

        }

        else {

            response =
                await createExperience(
                    payload
                );

        }

        if (response.success) {

            await fetchResume(resume.id);



            resetForm();

        }

    };
    const handleEdit = (item) => {

        setEditingId(item.id);

        setErrors({});

        setFormData({

            resume: resume.id,

            company: item.company,

            position: item.position,

            location: item.location || "",

            employment_type:
                item.employment_type || "",

            start_date:
                item.start_date,

            end_date:
                item.end_date || "",

            currently_working:
                item.currently_working,

            description:
                item.description,

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this experience?"

        );

        if (!confirmed) {

            return;

        }

        const response =

            await deleteExperience(id);

        if (response.success) {

            await fetchResume(resume.id);



        }

    };
    return (

        <div className="experience-form">

            <div className="form-header">

                <div>

                    <h2>

                        Experience

                    </h2>

                    <p>

                        Add your professional work experience.

                    </p>

                </div>

            </div>

            <form

                className="experience-card"

                onSubmit={handleSubmit}

            >

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            Company *

                        </label>

                        <input

                            type="text"

                            name="company"

                            value={formData.company}

                            onChange={handleChange}

                            placeholder="Google"

                        />

                        {errors.company && (

                            <span className="error">

                                {errors.company}

                            </span>

                        )}

                    </div>

                    <div className="form-group">

                        <label>

                            Job Title *

                        </label>

                        <input

                            type="text"

                            name="position"

                            value={formData.position}

                            onChange={handleChange}

                            placeholder="Software Engineer"

                        />

                        {errors.position && (

                            <span className="error">

                                {errors.position}

                            </span>

                        )}

                    </div>

                    <div className="form-group">

                        <label>

                            Location

                        </label>

                        <input

                            type="text"

                            name="location"

                            value={formData.location}

                            onChange={handleChange}

                            placeholder="Chennai"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Employment Type

                        </label>

                        <select

                            name="employment_type"

                            value={formData.employment_type}

                            onChange={handleChange}

                        >

                            <option value="">

                                Select Employment Type

                            </option>

                            <option value="Full-time">

                                Full-time

                            </option>

                            <option value="Part-time">

                                Part-time

                            </option>

                            <option value="Internship">

                                Internship

                            </option>

                            <option value="Contract">

                                Contract

                            </option>

                            <option value="Freelance">

                                Freelance

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Start Date *

                        </label>

                        <input

                            type="date"

                            name="start_date"

                            value={formData.start_date}

                            onChange={handleChange}

                        />

                        {errors.start_date && (

                            <span className="error">

                                {errors.start_date}

                            </span>

                        )}

                    </div>

                    <div className="form-group">

                        <label>

                            End Date

                        </label>

                        <input

                            type="date"

                            name="end_date"

                            value={formData.end_date}

                            onChange={handleChange}

                            disabled={formData.currently_working}

                        />

                        {errors.end_date && (

                            <span className="error">

                                {errors.end_date}

                            </span>

                        )}

                    </div>

                </div>

                <div className="checkbox-group">

                    <label className="checkbox-label">

                        <input

                            type="checkbox"

                            name="currently_working"

                            checked={formData.currently_working}

                            onChange={handleChange}

                        />

                        <span>

                            I currently work here

                        </span>

                    </label>

                </div>

                <div className="form-group">

                    <label>

                        Job Description *

                    </label>

                    <textarea

                        rows={6}

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Describe your responsibilities, achievements and technologies used..."

                    />

                    {errors.description && (

                        <span className="error">

                            {errors.description}

                        </span>

                    )}

                </div>

                <div className="form-actions">

                    <button

                        type="submit"

                        className="btn btn-primary"

                        disabled={loading}

                    >

                        {

                            editingId

                                ? "Update Experience"

                                : "Add Experience"

                        }

                    </button>

                    {

                        editingId && (

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={resetForm}

                            >

                                Cancel

                            </button>

                        )

                    }

                </div>

            </form>
            <div className="experience-list">

                <h3>

                    Experience List

                </h3>

                {

                    resume?.experience?.length === 0

                        ? (

                            <div className="empty-state">

                                <p>

                                    No experience records added yet.

                                </p>

                            </div>

                        )

                        : (

                            resume?.experience?.map((item) => (

                                <div

                                    key={item.id}

                                    className="experience-item"

                                >

                                    <div className="experience-details">

                                        <h4>

                                            {item.position}

                                        </h4>

                                        <h5>

                                            {item.company}

                                        </h5>

                                        {

                                            item.location && (

                                                <p>

                                                    <strong>

                                                        Location:

                                                    </strong>{" "}

                                                    {item.location}

                                                </p>

                                            )

                                        }

                                        {

                                            item.employment_type && (

                                                <p>

                                                    <strong>

                                                        Employment Type:

                                                    </strong>{" "}

                                                    {item.employment_type}

                                                </p>

                                            )

                                        }

                                        <p>

                                            <strong>

                                                Duration:

                                            </strong>{" "}

                                            {new Date(item.start_date).toLocaleDateString()}

                                            {" - "}

                                            {

                                                item.currently_working

                                                    ? "Present"

                                                    : new Date(item.end_date).toLocaleDateString()

                                            }

                                        </p>
                                        <p>

                                            {item.description}

                                        </p>

                                    </div>

                                    <div className="experience-actions">

                                        <button

                                            type="button"

                                            className="btn btn-edit"

                                            onClick={() =>

                                                handleEdit(item)

                                            }

                                        >

                                            Edit

                                        </button>

                                        <button

                                            type="button"

                                            className="btn btn-delete"

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

        </div>

    );

}

export default ExperienceForm;