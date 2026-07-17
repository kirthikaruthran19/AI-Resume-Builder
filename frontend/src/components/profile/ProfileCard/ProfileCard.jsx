import "./ProfileCard.css";

import { FiCamera } from "react-icons/fi";

function ProfileCard({
    image,
    fullName,
    onImageChange,
}) {

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            onImageChange(file);

        }

    };

    return (

        <div className="profile-card">

            <div className="profile-image">

                <img
                    src={
                        image ||
                        "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=200"
                    }
                    alt="Profile"
                />

                <label className="upload-btn">

                    <FiCamera />

                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />

                </label>

            </div>

            <h2>{fullName || "User"}</h2>

        </div>

    );

}

export default ProfileCard;