import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FiSearch,
    FiPlus,
    FiFilter,
    FiGrid,
    FiFileText,
    FiEye,
    FiEdit2,
    FiTrash2,
    FiDownload,
} from "react-icons/fi";

import { useResume } from "../../context/ResumeContext";

import "./ResumeManagement.css";

function ResumeManagement() {

    const navigate = useNavigate();

    const {
        resumes,
        loading,
        fetchResumes,
        deleteResume,
    } = useResume();

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    useEffect(() => {

        fetchResumes();

    }, []);

    const filteredResumes = useMemo(() => {

        return resumes.filter((resume) => {

            const matchesSearch =
                resume.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All"
                    ? true
                    : resume.template === filter;

            return matchesSearch && matchesFilter;

        });

    }, [resumes, search, filter]);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        const result = await deleteResume(id);

        if (result?.success) {

            await fetchResumes();

        } else {

            alert(result?.message || "Unable to delete resume.");

        }

    };

    const handleEdit = (id) => {

        navigate(`/resume-builder/${id}`);

    };

    const handlePreview = (id) => {

        navigate(`/resume-preview/${id}`);

    };

    const handleCreate = () => {

        navigate("/resume");

    };

    return (

        <section className="resume-management">

            <div className="resume-management-container">

                {/* ================= HEADER ================= */}

                <motion.div

                    className="resume-header"

                    initial={{ opacity: 0, y: -40 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: .5 }}

                >

                    <div className="header-left">

                        <div className="header-badge">

                            <FiGrid />

                            Resume Manager

                        </div>

                        <h1>

                            My Resume Collection

                        </h1>

                        <p>

                            Create, organize, edit and manage all of your
                            professional resumes from one beautiful workspace.

                        </p>

                    </div>

                    <motion.button

                        whileHover={{
                            scale: 1.04
                        }}

                        whileTap={{
                            scale: .96
                        }}

                        className="create-btn"

                        onClick={handleCreate}

                    >

                        <FiPlus />

                        Create Resume

                    </motion.button>

                </motion.div>

                {/* ================= STATS ================= */}

                <motion.div

                    className="resume-summary"

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    transition={{ delay: .2 }}

                >

                    <div className="summary-card">

                        <FiFileText />

                        <div>

                            <h2>

                                {filteredResumes.length}

                            </h2>

                            <span>

                                Total Resumes

                            </span>

                        </div>

                    </div>

                </motion.div>

                {/* ================= TOOLBAR ================= */}

                <motion.div

                    className="resume-toolbar"

                    initial={{ opacity: 0, y: 20 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: .3 }}

                >

                    <div className="search-box">

                        <FiSearch />

                        <input

                            type="text"

                            placeholder="Search by resume title..."

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                        />

                    </div>

                    <div className="filter-box">

                        <FiFilter />

                        <select

                            value={filter}

                            onChange={(e) =>
                                setFilter(e.target.value)
                            }

                        >

                            <option value="All">
                                All Templates
                            </option>

                            <option value="Professional">
                                Professional
                            </option>

                            <option value="Modern">
                                Modern
                            </option>

                            <option value="Creative">
                                Creative
                            </option>

                            <option value="Minimal">
                                Minimal
                            </option>

                        </select>

                    </div>

                </motion.div>

                {/* ================= LOADING / EMPTY / GRID ================= */}
                {

                    loading ? (

                        <div className="loading-container">

                            <div className="loader"></div>

                            <p>

                                Loading your resumes...

                            </p>

                        </div>

                    ) : filteredResumes.length === 0 ? (

                        <motion.div

                            className="empty-state"

                            initial={{ opacity: 0, scale: .9 }}

                            animate={{ opacity: 1, scale: 1 }}

                        >

                            <div className="empty-icon">

                                📄

                            </div>

                            <h2>

                                No Resume Found

                            </h2>

                            <p>

                                Start building your first AI-powered professional
                                resume and impress recruiters.

                            </p>

                            <button

                                className="create-btn"

                                onClick={handleCreate}

                            >

                                <FiPlus />

                                Create Resume

                            </button>

                        </motion.div>

                    ) : (

                        <div className="resume-grid">

                            {

                                filteredResumes.map((resume, index) => (

                                    <motion.div

                                        key={resume.id}

                                        className="resume-card"

                                        initial={{
                                            opacity: 0,
                                            y: 40
                                        }}

                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}

                                        transition={{
                                            delay: index * .08
                                        }}

                                        whileHover={{
                                            y: -10
                                        }}

                                    >

                                        {/* Decorative Gradient */}

                                        <div className="card-glow"></div>

                                        {/* Top */}

                                        <div className="resume-top">

                                            <div>

                                                <span className="template-badge">

                                                    {resume.template}

                                                </span>

                                                <h3>

                                                    {resume.title}

                                                </h3>

                                            </div>

                                            <div className="ats-circle">

                                                {resume.ats_score || 0}%

                                            </div>

                                        </div>

                                        {/* ATS */}

                                        <div className="ats-section">

                                            <div className="ats-label">

                                                <span>

                                                    ATS Compatibility

                                                </span>

                                                <strong>

                                                    {resume.ats_score || 0}%

                                                </strong>

                                            </div>

                                            <div className="progress-bar">

                                                <motion.div

                                                    className="progress-fill"

                                                    initial={{
                                                        width: 0
                                                    }}

                                                    animate={{
                                                        width: `${resume.ats_score || 0}%`
                                                    }}

                                                    transition={{
                                                        duration: .8
                                                    }}

                                                />

                                            </div>

                                        </div>

                                        {/* Details */}

                                        <div className="resume-info">

                                            <div>

                                                <span>

                                                    Created

                                                </span>

                                                <strong>

                                                    {new Date(
                                                        resume.created_at
                                                    ).toLocaleDateString()}

                                                </strong>

                                            </div>

                                            <div>

                                                <span>

                                                    Updated

                                                </span>

                                                <strong>

                                                    {new Date(
                                                        resume.updated_at
                                                    ).toLocaleDateString()}

                                                </strong>

                                            </div>

                                        </div>

                                        {/* Quick Stats */}

                                        <div className="resume-stats">

                                            <div>

                                                <h4>

                                                    {resume.downloads || 0}

                                                </h4>

                                                <span>

                                                    Downloads

                                                </span>

                                            </div>

                                            <div>

                                                <h4>

                                                    {resume.applications || 0}

                                                </h4>

                                                <span>

                                                    Applications

                                                </span>

                                            </div>

                                        </div>

                                        {/* Actions */}

                                        <div className="resume-actions">

                                            <button
                                                className="action-btn edit-btn"
                                                title="Edit Resume"
                                                onClick={() => handleEdit(resume.id)}
                                            >
                                                <FiEdit2 />
                                                <span>Edit Resume</span>
                                            </button>

                                            <button
                                                className="action-btn delete-btn"
                                                title="Delete Resume"
                                                onClick={() => handleDelete(resume.id)}
                                            >
                                                <FiTrash2 />
                                                <span>Delete Resume</span>
                                            </button>

                                        </div>

                                    </motion.div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </section>

    );

}

export default ResumeManagement;