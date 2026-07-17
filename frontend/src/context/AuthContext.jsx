import {
    createContext,
    useEffect,
    useState,
} from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // ===============================
    // Check Authentication on App Load
    // ===============================
    useEffect(() => {

        const accessToken =
            localStorage.getItem("accessToken");

        const refreshToken =
            localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {

            setUser({
                authenticated: true,
            });

        }

        else {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            setUser(null);

        }

        setLoading(false);

    }, []);

    // ===============================
    // Login
    // ===============================
    const login = (access, refresh) => {

        localStorage.setItem(
            "accessToken",
            access
        );

        localStorage.setItem(
            "refreshToken",
            refresh
        );

        setUser({
            authenticated: true,
        });

    };

    // ===============================
    // Logout
    // ===============================
    const logout = () => {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        setUser(null);

        window.location.href = "/login";

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated:
                    !!user?.authenticated,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;