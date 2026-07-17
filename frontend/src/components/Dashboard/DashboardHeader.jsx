import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    FiBell,
    FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import { useResume } from "../../context/ResumeContext";

import NotificationDropdown from "./NotificationDropdown";

function DashboardHeader() {

    const {
        user,
        logout,
    } = useAuth();

    const {

    dashboard,

    notifications,

    markNotificationAsRead,

    markAllNotificationsAsRead,

    clearNotifications,

} = useResume();

    const [showNotifications, setShowNotifications] = useState(false);

   

    const notificationRef = useRef(null);

    const username =
        user?.username ||
        localStorage.getItem("username") ||
        "User";

    const today = new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    );

    /* ------------------------------------------
       Sync Notifications
    ------------------------------------------ */

   

    /* ------------------------------------------
       Close When Clicking Outside
    ------------------------------------------ */

    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {

                setShowNotifications(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);

    /* ------------------------------------------
       Close Using ESC
    ------------------------------------------ */

    useEffect(() => {

        function handleEscape(event) {

            if (event.key === "Escape") {

                setShowNotifications(false);

            }

        }

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);

    /* ------------------------------------------
       Notification Actions
    ------------------------------------------ */

    

    
    

    const unreadCount =
    notifications.filter(
        item => !item.read
    ).length;

    return (

        <motion.div

            className="dashboard-header"

            initial={{
                opacity: 0,
                y: -25,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: .6,
            }}

        >

            <div className="dashboard-header-left">

                <div className="dashboard-badge">

                    🚀 Premium Dashboard

                </div>

                <span className="dashboard-date">

                    {today}

                </span>

                <h1>

                    Welcome back,

                    <span>

                        {" "}

                        {username}

                    </span>

                    👋

                </h1>

                <p>

                    You currently have{" "}

                    <strong>

                        {dashboard.total_resumes}

                    </strong>{" "}

                    resume

                    {dashboard.total_resumes !== 1 ? "s" : ""}{" "}

                    ready to manage.

                </p>

            </div>

            <div className="dashboard-header-right">

                <div

                    className="notification-wrapper"

                    ref={notificationRef}

                >

                    <button

                        className="dashboard-notification"

                        title="Notifications"

                        onClick={() =>
                            setShowNotifications(
                                previous => !previous
                            )
                        }

                    >

                        <FiBell />

                        {

                            unreadCount > 0 && (

                                <span className="notification-dot">

                                    {unreadCount}

                                </span>

                            )

                        }

                    </button>

                    <NotificationDropdown

    open={showNotifications}

    notifications={notifications}

    onClose={() =>
        setShowNotifications(false)
    }

    onMarkAsRead={markNotificationAsRead}

    onMarkAllAsRead={markAllNotificationsAsRead}

    onClearAll={clearNotifications}

/>

                </div>

                <button

                    className="dashboard-logout"

                    onClick={logout}

                    title="Logout"

                >

                    <FiLogOut />

                    Logout

                </button>

            </div>

        </motion.div>

    );

}

export default DashboardHeader;