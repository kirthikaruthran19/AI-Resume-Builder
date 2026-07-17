import { useEffect, useState } from "react";

import { useResume } from "../../context/ResumeContext";

import "./CertificationForm.css";

const initialForm = {
    resume: "",
    name: "",
    organization: "",
    issue_date: "",
    expiration_date: "",
    credential_id: "",
    credential_url: "",
};

function CertificationForm({ resume }) {
    const {
    certifications,
    fetchCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
    loading,
} = useResume();

    const [formData, setFormData] = useState(initialForm);

    const [editingId, setEditingId] = useState(null);

    const [errors, setErrors] = useState({});

    /* ==========================================
       Load Certifications
    ========================================== */

    useEffect(() => {
        fetchCertifications();
    }, []);

    /* ==========================================
       Set Resume ID
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
       Handle Input Change
    ========================================== */

    const handleChange = (event) => {
        const { name, value } = event.target;

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
                "Certification name is required.";
        }

        if (!formData.organization.trim()) {
            newErrors.organization =
                "Organization is required.";
        }

        if (!formData.issue_date) {
            newErrors.issue_date =
                "Issue date is required.";
        }

        if (
            formData.issue_date &&
            formData.expiration_date &&
            formData.expiration_date < formData.issue_date
        ) {
            newErrors.expiration_date =
                "Expiration date cannot be before issue date.";
        }

        if (formData.credential_url) {
    try {
        new URL(formData.credential_url);
    } catch {
        newErrors.credential_url = "Enter a valid URL.";
    }
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
            response = await updateCertification(
                editingId,
                formData
            );
        } else {
            response = await createCertification(
                formData
            );
        }

        if (response.success) {
            await fetchCertifications();

            resetForm();
        }
    };

    /* ==========================================
       Edit Certification
    ========================================== */

    const handleEdit = (item) => {
        setEditingId(item.id);

        setErrors({});

        setFormData({
    resume: resume.id,
    name: item.name,
    organization: item.organization,
    issue_date: item.issue_date,
    expiration_date: item.expiration_date || "",
    credential_id: item.credential_id || "",
    credential_url: item.credential_url || "",
});

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /* ==========================================
       Delete Certification
    ========================================== */

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this certification?"
        );

        if (!confirmed) {
            return;
        }

        const response = await deleteCertification(id);

        if (response.success) {
            await fetchCertifications();

            resetForm();
        }
    };
        return (
        <div className="certification-form">

            <h2 className="form-title">
                Certifications
            </h2>

            <form
                className="resume-form"
                onSubmit={handleSubmit}
            >

                {/* Certification Name */}

                <div className="form-group">

                    <label>
                        Certification Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="AWS Certified Cloud Practitioner"
                    />

                    {errors.name && (
                        <span className="error">
                            {errors.name}
                        </span>
                    )}

                </div>

                {/* Organization */}

                <div className="form-group">

                    <label>
                        Issuing Organization
                    </label>

                    <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Amazon Web Services"
                    />

                    {errors.organization && (
                        <span className="error">
                            {errors.organization}
                        </span>
                    )}

                </div>

                {/* Issue Date */}

                <div className="form-group">

                    <label>
                        Issue Date
                    </label>

                    <input
                        type="date"
                        name="issue_date"
                        value={formData.issue_date}
                        onChange={handleChange}
                    />

                    {errors.issue_date && (
                        <span className="error">
                            {errors.issue_date}
                        </span>
                    )}

                </div>

                {/* Expiration Date */}

                <div className="form-group">

                    <label>
                        Expiration Date
                    </label>

                    <input
                        type="date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                    />

                    {errors.expiration_date && (
                        <span className="error">
                            {errors.expiration_date}
                        </span>
                    )}

                </div>

                {/* Credential ID */}

                <div className="form-group">

                    <label>
                        Credential ID
                    </label>

                    <input
                        type="text"
                        name="credential_id"
                        value={formData.credential_id}
                        onChange={handleChange}
                        placeholder="ABC123456"
                    />

                </div>

                {/* Credential URL */}

                <div className="form-group">

                    <label>
                        Credential URL
                    </label>

                    <input
                        type="url"
                        name="credential_url"
                        value={formData.credential_url}
                        onChange={handleChange}
                        placeholder="https://www.credly.com/..."
                    />

                    {errors.credential_url && (
                        <span className="error">
                            {errors.credential_url}
                        </span>
                    )}

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
                ? "Update Certification"
                : "Add Certification"
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

                <div className="certifications-list">

                    <h3>
                        Added Certifications
                    </h3>

                    {certifications.length === 0 ? (

                        <p className="empty-message">
                            No certifications added yet.
                        </p>

                    ) : (

                        certifications.map((item) => (

                            <div
                                key={item.id}
                                className="certification-card"
                            >

                                <div className="certification-details">

                                    <h4>
                                        {item.name}
                                    </h4>

                                    <p>
                                        <strong>
                                            Organization:
                                        </strong>{" "}
                                        {item.organization}
                                    </p>

                                    <p>
                                        <strong>
                                            Issued:
                                        </strong>{" "}
                                       {new Date(item.issue_date).toLocaleDateString()}
                                    </p>

                                    {item.expiration_date && (
                                        <p>
                                            <strong>
                                                Expires:
                                            </strong>{" "}
                                            {item.expiration_date
    ? new Date(item.expiration_date).toLocaleDateString()
    : "Never Expires"}
                                        </p>
                                    )}

                                    {item.credential_id && (
                                        <p>
                                            <strong>
                                                Credential ID:
                                            </strong>{" "}
                                            {item.credential_id}
                                        </p>
                                    )}

                                    {item.credential_url && (
                                        <p>
                                            <strong>
                                                Credential:
                                            </strong>{" "}
                                            <a
                                                href={item.credential_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View Credential
                                            </a>
                                        </p>
                                    )}

                                </div>

                                <div className="certification-actions">

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

                    )}

                </div>

            </form>

        </div>
    );
}

export default CertificationForm;