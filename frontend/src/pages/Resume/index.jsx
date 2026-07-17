import { useState } from "react";

import { useResume } from "../../context/ResumeContext";
import { useNavigate } from "react-router-dom";

import ResumeHeader from "../../components/Resume/ResumeHeader";
import SearchBar from "../../components/Resume/SearchBar";
import FilterDropdown from "../../components/Resume/FilterDropdown";
import SortDropdown from "../../components/Resume/SortDropdown";
import ResumeGrid from "../../components/Resume/ResumeGrid";
import CreateResumeModal from "../../components/Resume/CreateResumeModal";
import DeleteResumeModal from "../../components/Resume/DeleteResumeModal";

import "../../components/Resume/ResumeToolbar.css";
import "./Resume.css";

function Resume() {

    const {
        resumes,
        loading,
        createResume,
        updateResume,
        deleteResume,
    } = useResume();

    /* ==========================================
       Search / Filter / Sort
    ========================================== */

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");

    const [sort, setSort] = useState("newest");

    const navigate = useNavigate();

    /* ==========================================
       Create / Edit Modal
    ========================================== */

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const [editingResume, setEditingResume] =
        useState(null);

    const openCreateModal = () => {

        setEditingResume(null);

        setShowCreateModal(true);

    };

    const closeCreateModal = () => {

        setShowCreateModal(false);

        setEditingResume(null);

    };

    const handleCreateResume = async (resumeData) => {

        const result = await createResume(resumeData);

        if (result.success) {

            const newResume = result.data;

            closeCreateModal();

            navigate(`/resume-builder/${newResume.id}`);

        }

        return result;

    };

    const handleUpdateResume = async (
        id,
        resumeData
    ) => {

        return await updateResume(
            id,
            resumeData
        );

    };

    /* ==========================================
       Delete Modal
    ========================================== */

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedResume, setSelectedResume] =
        useState(null);

    const handleDelete = (resume) => {

        setSelectedResume(resume);

        setShowDeleteModal(true);

    };

    const closeDeleteModal = () => {

        setShowDeleteModal(false);

        setSelectedResume(null);

    };

    const confirmDelete = async (resume) => {

        const result =
            await deleteResume(resume.id);

        if (result.success) {

            closeDeleteModal();

        }

        return result;

    };

    /* ==========================================
       Resume Actions
    ========================================== */

    const handlePreview = (resume) => {

        console.log("Preview:", resume);

        // Next Sprint
        // Open Resume Preview

    };



    const handleDuplicate = (resume) => {

        console.log("Duplicate:", resume);

        // Next Sprint

    };

    const handleDownload = (resume) => {

        console.log("Download:", resume);

        // Next Sprint

    };

    const handleFavorite = (resume) => {

        console.log("Favorite:", resume);

        // Next Sprint

    };
    const handleEdit = (resume) => {

        navigate(`/resume-builder/${resume.id}`);

    };
    return (

        <div className="resume-page">

            {/* ==========================================
                Header
            ========================================== */}

            <ResumeHeader
                onCreateResume={openCreateModal}
            />

            {/* ==========================================
                Toolbar
            ========================================== */}

            <div className="resume-toolbar">

                <SearchBar
                    value={search}
                    onChange={setSearch}
                />

                <FilterDropdown
                    value={filter}
                    onChange={setFilter}
                />

                <SortDropdown
                    value={sort}
                    onChange={setSort}
                />

            </div>

            {/* ==========================================
                Resume Grid
            ========================================== */}

            {

                loading

                    ? (

                        <h3>

                            Loading resumes...

                        </h3>

                    )

                    : (

                        <ResumeGrid

                            resumes={resumes}

                            search={search}

                            filter={filter}

                            sort={sort}

                            onPreview={handlePreview}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                            onDuplicate={handleDuplicate}

                            onDownload={handleDownload}

                            onFavorite={handleFavorite}

                        />

                    )

            }

            {/* ==========================================
                Create / Edit Modal
            ========================================== */}

            <CreateResumeModal

                isOpen={showCreateModal}

                onClose={closeCreateModal}

                onCreate={handleCreateResume}

                onUpdate={handleUpdateResume}

                editResume={editingResume}

            />

            {/* ==========================================
                Delete Modal
            ========================================== */}

            <DeleteResumeModal

                isOpen={showDeleteModal}

                resume={selectedResume}

                onClose={closeDeleteModal}

                onConfirm={confirmDelete}

            />

        </div>

    );

}

export default Resume;