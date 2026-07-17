import "./ProfileForm.css";

import { motion } from "framer-motion";

function ProfileForm({
    formData,
    onChange,
}) {

    return (

        <motion.div
            className="profile-form-card"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <form className="profile-form">

                {/* Full Name */}

                <div className="form-group">

                    <label htmlFor="fullName">
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={onChange}
                        placeholder="Enter your full name"
                    />

                </div>

                {/* Email */}

                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                    />

                </div>

                {/* Phone */}

                <div className="form-group">

                    <label htmlFor="phone">
                        Phone Number
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        placeholder="Enter your phone number"
                    />

                </div>

                {/* Location */}

                <div className="form-group">

                    <label htmlFor="location">
                        Location
                    </label>

                    <input
                        id="location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={onChange}
                        placeholder="Enter your location"
                    />

                </div>

            </form>

        </motion.div>

    );

}

export default ProfileForm;