import { motion, AnimatePresence } from "framer-motion";

import ResumeCard from "./ResumeCard";
import "./ResumeGrid.css";

function ResumeGrid({
    resumes = [],
    search = "",
    filter = "all",
    sort = "newest",
    onEdit,
    onDelete,
}) {

    let filteredResumes = [...resumes];

    /* =========================
       Search
    ========================= */

    if (search.trim()) {
        filteredResumes = filteredResumes.filter((resume) =>
            resume.title
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }

    /* =========================
       Filter
    ========================= */

    if (filter !== "all") {
        filteredResumes = filteredResumes.filter(
            (resume) => resume.template === filter
        );
    }

    /* =========================
       Sort
    ========================= */

    switch (sort) {

        case "oldest":
            filteredResumes.sort(
                (a, b) =>
                    new Date(a.created_at) -
                    new Date(b.created_at)
            );
            break;

        case "title":
            filteredResumes.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            break;

        case "ats":
            filteredResumes.sort(
                (a, b) =>
                    (b.ats_score || 0) -
                    (a.ats_score || 0)
            );
            break;

        case "downloads":
            filteredResumes.sort(
                (a, b) =>
                    (b.downloads || 0) -
                    (a.downloads || 0)
            );
            break;

        case "newest":
        default:
            filteredResumes.sort(
                (a, b) =>
                    new Date(b.created_at) -
                    new Date(a.created_at)
            );

    }

    /* =========================
       Empty State
    ========================= */

    if (filteredResumes.length === 0) {
        return (
            <div className="resume-grid-empty">

                <h3>No Resumes Found</h3>

                <p>
                    Create your first resume or change
                    the search and filter options.
                </p>

            </div>
        );
    }

    /* =========================
       Grid
    ========================= */

    return (

        <motion.div
            className="resume-grid"
            layout
        >

            <AnimatePresence mode="popLayout">

                {filteredResumes.map((resume) => (

                    <motion.div
                        key={resume.id}
                        layout
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >

                        <ResumeCard
                            resume={resume}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    </motion.div>

                ))}

            </AnimatePresence>

        </motion.div>

    );

}

export default ResumeGrid;