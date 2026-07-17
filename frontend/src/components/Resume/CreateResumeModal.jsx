import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./CreateResumeModal.css";

function CreateResumeModal({
    isOpen,
    onClose,
    onCreate,
    onUpdate,
    editResume,
}) {
    const [title, setTitle] = useState("");
    const [template, setTemplate] = useState("professional");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    /* =====================================
       Initialize Form
    ===================================== */

    useEffect(() => {
        if (!isOpen) return;

        if (editResume) {
            setTitle(editResume.title || "");
            setTemplate(
                editResume.template || "professional"
            );
        } else {
            setTitle("");
            setTemplate("professional");
        }

        setError("");
    }, [isOpen, editResume]);

    /* =====================================
       Submit
    ===================================== */

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            setError("Resume title is required.");
            return;
        }

        setError("");
        setCreating(true);

        try {
            let result;

            if (editResume) {
                result = await onUpdate(
                    editResume.id,
                    {
                        title: title.trim(),
                        template,
                    }
                );
            } else {
                result = await onCreate({
                    title: title.trim(),
                    template,
                });
            }

            if (result.success) {
                onClose();
            } else {
                setError(
                    result.message ||
                        "Unable to save resume."
                );
            }
        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setCreating(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="create-modal"
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >
                        <h2>
                            {editResume
                                ? "Edit Resume"
                                : "Create Resume"}
                        </h2>

                        <form onSubmit={handleSubmit}>

                            {/* Resume Title */}

                            <div className="modal-field">

                                <label>
                                    Resume Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="Software Engineer Resume"
                                    value={title}
                                    onChange={(event) => {
                                        setTitle(
                                            event.target.value
                                        );

                                        if (error) {
                                            setError("");
                                        }
                                    }}
                                />

                            </div>

                            {/* Template */}

                            <div className="modal-field">

                                <label>
                                    Template
                                </label>

                                <select
                                    value={template}
                                    onChange={(event) =>
                                        setTemplate(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="professional">
                                        Professional
                                    </option>

                                    <option value="modern">
                                        Modern
                                    </option>

                                    <option value="creative">
                                        Creative
                                    </option>

                                    <option value="minimal">
                                        Minimal
                                    </option>

                                </select>

                            </div>

                            {/* Error */}

                            {error && (
                                <div className="modal-error">
                                    {error}
                                </div>
                            )}

                            {/* Actions */}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={onClose}
                                    disabled={creating}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="create-btn"
                                    disabled={creating}
                                >
                                    {creating
                                        ? editResume
                                            ? "Updating..."
                                            : "Creating..."
                                        : editResume
                                            ? "Update Resume"
                                            : "Create Resume"}
                                </button>

                            </div>

                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CreateResumeModal;