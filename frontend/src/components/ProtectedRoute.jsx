import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    // ======================================
    // Show Loading While Checking Authentication
    // ======================================

    if (loading) {

        return (

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "20px",
                    fontWeight: "600",
                }}
            >

                Loading...

            </div>

        );

    }

    // ======================================
    // Redirect to Login if Not Authenticated
    // ======================================

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    // ======================================
    // User Authenticated
    // ======================================

    return children;

}

export default ProtectedRoute;