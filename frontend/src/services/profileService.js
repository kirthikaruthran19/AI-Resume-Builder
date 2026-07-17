import api from "./api";

const profileService = {

    // ==========================================
    // Get Logged-in User Profile
    // GET /api/users/profile/
    // ==========================================
    async getProfile() {

        const response = await api.get("/users/profile/");

        return response.data;

    },

    // ==========================================
    // Update Logged-in User Profile
    // PUT /api/users/profile/
    // ==========================================
    async updateProfile(profileData) {

        const formData = new FormData();

        // Split full name into first & last name
        const names = profileData.fullName
            ? profileData.fullName.trim().split(" ")
            : [];

        const firstName = names[0] || "";
        const lastName = names.slice(1).join(" ");

        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", profileData.email || "");
        formData.append("phone", profileData.phone || "");
        formData.append("location", profileData.location || "");

        // Upload image only if a new file is selected
        if (profileData.image instanceof File) {

            formData.append(
                "profile_image",
                profileData.image
            );

        }

        const response = await api.put(
            "/users/profile/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    },

};

export default profileService;