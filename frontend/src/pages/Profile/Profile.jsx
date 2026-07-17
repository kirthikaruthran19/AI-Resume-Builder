import "./Profile.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import ProfileCard from "../../components/profile/ProfileCard/ProfileCard";
import ProfileForm from "../../components/profile/ProfileForm/ProfileForm";
import SaveButton from "../../components/profile/SaveButton/SaveButton";

import profileService from "../../services/profileService";

function Profile() {

    const [profileData, setProfileData] = useState({

        fullName: "",

        email: "",

        phone: "",

        location: "",

        image: null,

        imagePreview: null,

    });

    const [loading, setLoading] = useState(true);

    // ==========================================================
    // Load Profile
    // ==========================================================

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);

            const data = await profileService.getProfile();

            setProfileData({

                fullName: data.full_name || "",

                email: data.email || "",

                phone: data.phone || "",

                location: data.location || "",

                image: null,

                imagePreview: data.profile_image || null,

            });

        }

        catch (error) {

            console.error("Profile Load Error:", error);

            toast.error("Unable to load profile.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================================
    // Handle Input Change
    // ==========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfileData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    // ==========================================================
    // Handle Image Upload
    // ==========================================================

    const handleImageChange = (file) => {

        if (!file) return;

        setProfileData((prev) => ({

            ...prev,

            image: file,

            imagePreview: URL.createObjectURL(file),

        }));

    };

    if (loading) {

        return (

            <section className="profile-page">

                <div className="profile-container">

                    <div className="profile-header">

                        <h1>Loading Profile...</h1>

                    </div>

                </div>

            </section>

        );

    }

    return (

        <section className="profile-page">

            <div className="profile-container">

                {/* Header */}

                <motion.div
                    className="profile-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >

                    <h1>My Profile</h1>

                    <p>

                        Manage your personal information

                    </p>

                </motion.div>

                {/* Content */}

                <motion.div
                    className="profile-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >

                    <ProfileCard

                        image={profileData.imagePreview}

                        fullName={profileData.fullName}

                        onImageChange={handleImageChange}

                    />

                    <div className="profile-right">

                        <ProfileForm

                            formData={profileData}

                            onChange={handleChange}

                        />

                        <SaveButton

                            profileData={profileData}

                        />

                    </div>

                </motion.div>

            </div>

        </section>

    );

}

export default Profile;