import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./styles/variables.css";

import AuthProvider from "./context/AuthContext";
import { ResumeProvider } from "./context/ResumeContext";

import "./index.css";
import "./assets/styles/variables.css";
import "./assets/styles/global.css";
import "./assets/styles/utilities.css";
import "./assets/styles/animations.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ResumeProvider>

                    <App />

                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{
                            duration: 3000,
                            style: {
                                borderRadius: "12px",
                                background: "#1f2937",
                                color: "#ffffff",
                                fontSize: "14px",
                            },
                            success: {
                                iconTheme: {
                                    primary: "#10b981",
                                    secondary: "#ffffff",
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: "#ef4444",
                                    secondary: "#ffffff",
                                },
                            },
                        }}
                    />

                </ResumeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

