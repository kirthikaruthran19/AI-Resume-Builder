import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./DeleteResumeModal.css";

function DeleteResumeModal({
    isOpen,
    resume,
    onClose,
    onConfirm,
}) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!resume) return;

        setDeleting(true);

        try {
            const result = await onConfirm(resume);

            if (result.success) {
                onClose();
            }
        } finally {
            setDeleting(false);
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
                        className="delete-modal"
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
                    >
                        <h2>Delete Resume</h2>

                        <p>
                            Are you sure you want to delete
                        </p>

                        <strong>
                            "{resume?.title}"
                        </strong>

                        <p className="warning">
                            This action cannot be undone.
                        </p>

                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={onClose}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                className="delete-btn"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete Resume"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default DeleteResumeModal;