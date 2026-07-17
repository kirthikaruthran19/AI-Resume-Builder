import "./SaveButton.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";

import profileService from "../../../services/profileService";

function SaveButton({
    profileData,
}) {

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {

        try {

            setLoading(true);

            console.log("Saving Profile:", profileData);

            // ==========================================
            // Save Profile to Django
            // ==========================================

            await profileService.updateProfile(profileData);

            toast.success("Profile updated successfully!");

        }

        catch (error) {

            console.error("Profile Update Error:", error);

            if (error.response?.data) {

                console.error(error.response.data);

            }

            toast.error(
                error.response?.data?.detail ||
                "Failed to update profile."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <motion.div
            className="save-button-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >

            <motion.button
                type="button"
                className="save-btn"
                onClick={handleSave}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
            >

                {

                    loading ?

                        (
                            <>
                                <FiLoader className="spin" />
                                Saving...
                            </>
                        )

                        :

                        (
                            <>
                                <FiSave />
                                Save Changes
                            </>
                        )

                }

            </motion.button>

        </motion.div>

    );

}

export default SaveButton;