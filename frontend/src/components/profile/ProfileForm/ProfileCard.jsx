import "./ProfileCard.css";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiCamera } from "react-icons/fi";

function ProfileCard({
    image,
    fullName,
    onImageChange,
}) {

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {

        fileInputRef.current?.click();

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        onImageChange(file);

    };

    return (

        <motion.div
            className="profile-card"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* Profile Avatar */}

            <div className="profile-avatar">

                <img
                    src={
                        image?.preview ||
                        image ||
                        "https://ui-avatars.com/api/?name=Kirthika+Sureshkumar&background=6366f1&color=ffffff&size=256"
                    }
                    alt="Profile"
                />

                <button
                    type="button"
                    className="camera-btn"
                    onClick={handleButtonClick}
                >
                    <FiCamera />
                </button>

            </div>

            {/* Hidden File Input */}

            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {/* User Details */}

            <h2>{fullName}</h2>

            <p>AI Resume Builder User</p>

            {/* Change Photo Button */}

            <button
                type="button"
                className="change-photo-btn"
                onClick={handleButtonClick}
            >
                Change Photo
            </button>

        </motion.div>

    );

}

export default ProfileCard;