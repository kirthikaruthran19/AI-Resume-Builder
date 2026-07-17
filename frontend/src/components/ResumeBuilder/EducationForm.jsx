import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./EducationForm.css";

const initialForm = {

    resume: "",

    institution: "",

    degree: "",

    field_of_study: "",

    start_date: "",

    end_date: "",

    currently_studying: false,

    grade: "",

    description: "",

};

function EducationForm({ resume }) {

    const {

    selectedResume,

    fetchResume,

    createEducation,

    updateEducation,

    deleteEducation,

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

        if (!formData.institution.trim()) {

            newErrors.institution =
                "Institution is required.";

        }

        if (!formData.degree.trim()) {

            newErrors.degree =
                "Degree is required.";

        }

        if (!formData.start_date) {

            newErrors.start_date =
                "Start date is required.";

        }

        if (

            !formData.currently_studying &&

            !formData.end_date

        ) {

            newErrors.end_date =
                "End date is required.";

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

        if (editingId) {

            response = await updateEducation(

                editingId,

                formData

            );

        }

        else {

            response = await createEducation(

                formData

            );

        }

        if (response.success) {

            await fetchResume(resume.id);

            resetForm();

        }

    };

    const handleEdit = (item) => {

        setEditingId(item.id);

        setFormData({

           resume: resume.id,

            institution: item.institution,

            degree: item.degree,

            field_of_study:
                item.field_of_study,

            start_date:
                item.start_date,

            end_date:
                item.end_date || "",

            currently_studying:
                item.currently_studying,

            grade:
                item.grade,

            description:
                item.description,

        });

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(

            "Delete this education record?"

        );

        if (!confirmed) return;

        const response =

            await deleteEducation(id);

        if (response.success) {

            await fetchResume(resume.id);

        }

    };

    return (

        <div className="education-form">
            <div className="form-header">

                <div>

                    <h2>

                        Education

                    </h2>

                    <p>

                        Add your educational qualifications.

                    </p>

                </div>

            </div>

            <form

                className="education-card"

                onSubmit={handleSubmit}

            >

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            Institution *

                        </label>

                        <input

                            type="text"

                            name="institution"

                            value={formData.institution}

                            onChange={handleChange}

                            placeholder="Anna University"

                        />

                        {errors.institution && (

                            <span className="error">

                                {errors.institution}

                            </span>

                        )}

                    </div>

                    <div className="form-group">

                        <label>

                            Degree *

                        </label>

                        <input

                            type="text"

                            name="degree"

                            value={formData.degree}

                            onChange={handleChange}

                            placeholder="Bachelor of Engineering"

                        />

                        {errors.degree && (

                            <span className="error">

                                {errors.degree}

                            </span>

                        )}

                    </div>

                    <div className="form-group">

                        <label>

                            Field of Study

                        </label>

                        <input

                            type="text"

                            name="field_of_study"

                            value={formData.field_of_study}

                            onChange={handleChange}

                            placeholder="Computer Science"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Grade / CGPA

                        </label>

                        <input

                            type="text"

                            name="grade"

                            value={formData.grade}

                            onChange={handleChange}

                            placeholder="8.6 CGPA"

                        />

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

                            disabled={formData.currently_studying}

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

                            name="currently_studying"

                            checked={formData.currently_studying}

                            onChange={handleChange}

                        />

                        <span>

                            I am currently studying here

                        </span>

                    </label>

                </div>

                <div className="form-group">

                    <label>

                        Description

                    </label>

                    <textarea

                        rows={5}

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Achievements, coursework, activities..."

                    />

                </div>
                <div className="form-actions">

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >

                        {editingId
                            ? "Update Education"
                            : "Add Education"}

                    </button>

                    {editingId && (

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >

                            Cancel

                        </button>

                    )}

                </div>

            </form>

            <div className="education-list">

                <h3>

                    Education List

                </h3>

                {resume?.education?.length === 0 ? (
                    <div className="empty-state">

                        <p>

                            No education records added yet.

                        </p>

                    </div>

                ) : (

                    resume?.education?.map((item) => (

                        <div
                            key={item.id}
                            className="education-item"
                        >

                            <div className="education-details">

                                <h4>

                                    {item.degree}

                                </h4>

                                <h5>

                                    {item.institution}

                                </h5>

                                {item.field_of_study && (

                                    <p>

                                        <strong>

                                            Field:

                                        </strong>{" "}

                                        {item.field_of_study}

                                    </p>

                                )}

                                <p>

                                    <strong>

                                        Duration:

                                    </strong>{" "}

                                    {item.start_date}

                                    {" - "}

                                    {item.currently_studying

                                        ? "Present"

                                        : item.end_date}

                                </p>

                                {item.grade && (

                                    <p>

                                        <strong>

                                            Grade:

                                        </strong>{" "}

                                        {item.grade}

                                    </p>

                                )}

                                {item.description && (

                                    <p>

                                        {item.description}

                                    </p>

                                )}

                            </div>

                            <div className="education-actions">

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

                )}

            </div>

        </div>

    );

}

export default EducationForm;
