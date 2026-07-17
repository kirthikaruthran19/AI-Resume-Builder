import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {

    const {

        user,

        loading,

    } = useAuth();

    if (loading) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "20px",
                    fontWeight: "600",
                }}
            >
                Loading...
            </div>
        );

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default ProtectedRoute;