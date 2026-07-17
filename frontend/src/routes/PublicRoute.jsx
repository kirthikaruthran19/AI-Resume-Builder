import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function PublicRoute({ children }) {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    // Wait until authentication is checked
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

    // Already logged in
    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default PublicRoute;