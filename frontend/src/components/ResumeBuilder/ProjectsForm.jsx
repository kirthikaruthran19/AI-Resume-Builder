import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./ProjectsForm.css";

const initialForm = {

    resume: "",

    title: "",

    technologies: "",

    project_url: "",

    github_url: "",

    description: "",

};

function ProjectsForm({ resume }) {

   const {

    projects,

    fetchProjects,

    createProject,

    updateProject,

    deleteProject,

    loading,

} = useResume();
    const [formData, setFormData] =
        useState(initialForm);

    const [editingId, setEditingId] =
        useState(null);

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        fetchProjects();

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

        if (!formData.title.trim()) {

            newErrors.title =
                "Project title is required.";

        }

        if (!formData.technologies.trim()) {

            newErrors.technologies =
                "Technologies are required.";

        }

        if (!formData.description.trim()) {

            newErrors.description =
                "Project description is required.";

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
                await updateProject(

                    editingId,

                    formData

                );

        }

        else {

            response =
                await createProject(

                    formData

                );

        }

        if (response.success) {

            await fetchProjects();

            resetForm();

        }

    };
        /* ==========================================
       Edit Project
    ========================================== */

    const handleEdit = (item) => {

        setEditingId(item.id);

        setErrors({});

        setFormData({

    resume: resume.id,

    title: item.title,

    technologies: item.technologies,

    project_url: item.project_url || "",

    github_url: item.github_url || "",

    description: item.description,

});

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    /* ==========================================
       Delete Project
    ========================================== */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this project?"

        );

        if (!confirmed) {

            return;

        }

        const response =

            await deleteProject(id);

        if (response.success) {

            await fetchProjects();

            resetForm();

        }

    };
        return (

        <div className="projects-form">

            <h2 className="form-title">

                Projects

            </h2>

            <form
                className="resume-form"
                onSubmit={handleSubmit}
            >

                {/* Project Title */}

                <div className="form-group">

                    <label>

                        Project Title

                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="AI Resume Builder"
                    />

                    {

                        errors.title && (

                            <span className="error">

                                {errors.title}

                            </span>

                        )

                    }

                </div>

                {/* Technologies */}

                <div className="form-group">

                    <label>

                        Technologies

                    </label>

                    <input
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        placeholder="React, Django, MySQL"
                    />

                    {

                        errors.technologies && (

                            <span className="error">

                                {errors.technologies}

                            </span>

                        )

                    }

                </div>

                {/* Project URL */}

                <div className="form-group">

                    <label>

                        Project URL

                    </label>

                    <input
                        type="url"
                        name="project_url"
                        value={formData.project_url}
                        onChange={handleChange}
                        placeholder="https://example.com"
                    />

                </div>

                {/* GitHub URL */}

                <div className="form-group">

                    <label>

                        GitHub URL

                    </label>

                    <input
                        type="url"
                        name="github_url"
                        value={formData.github_url}
                        onChange={handleChange}
                        placeholder="https://github.com/username/project"
                    />

                </div>

                {/* Description */}

                <div className="form-group">

                    <label>

                        Description

                    </label>

                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your project..."
                    />

                    {

                        errors.description && (

                            <span className="error">

                                {errors.description}

                            </span>

                        )

                    }

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
                ? "Update Project"
                : "Add Project"
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
                                <div className="projects-list">

                    <h3>

                        Added Projects

                    </h3>

                    {

                        projects.length === 0 ? (

                            <p className="empty-message">

                                No projects added yet.

                            </p>

                        ) : (

                            projects.map((item) => (

                                <div
                                    key={item.id}
                                    className="project-card"
                                >

                                    <div className="project-details">

                                        <h4>

                                            {item.title}

                                        </h4>

                                        <p>

                                            <strong>

                                                Technologies:

                                            </strong>{" "}

                                            {item.technologies}

                                        </p>

                                        {

                                            item.project_url && (

                                                <p>

                                                    <strong>

                                                        Project:

                                                    </strong>{" "}

                                                    <a
                                                        href={item.project_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >

                                                        {item.project_url}

                                                    </a>

                                                </p>

                                            )

                                        }

                                        {

                                            item.github_url && (

                                                <p>

                                                    <strong>

                                                        GitHub:

                                                    </strong>{" "}

                                                    <a
                                                        href={item.github_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >

                                                        {item.github_url}

                                                    </a>

                                                </p>

                                            )

                                        }

                                        <p>

                                            {item.description}

                                        </p>

                                    </div>

                                    <div className="project-actions">

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

export default ProjectsForm;