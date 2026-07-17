import { motion, AnimatePresence } from "framer-motion";
import {
    FiBell,
    FiCheckCircle,
    FiFileText,
    FiCpu,
    FiTrash2,
    FiEdit3,
    FiAlertCircle,
} from "react-icons/fi";

import "./NotificationDropdown.css";

const iconMap = {
    success: <FiCheckCircle />,
    download: <FiFileText />,
    ai: <FiCpu />,
    delete: <FiTrash2 />,
    update: <FiEdit3 />,
    warning: <FiAlertCircle />,
};

function NotificationDropdown({

    open,

    notifications,

    onClose,

    onMarkAsRead,

    onMarkAllAsRead,

    onClearAll,

}) {

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        className="notification-dropdown"

                        initial={{
                            opacity: 0,
                            y: -15,
                            scale: .96,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}

                        exit={{
                            opacity: 0,
                            y: -10,
                            scale: .96,
                        }}

                        transition={{
                            duration: .25,
                        }}

                    >

                        {/* Header */}

                        <div className="notification-header">

                            <div>

                                <h3>

                                    Notifications

                                </h3>

                                <p>

                                    {notifications.length} Notification

                                    {notifications.length !== 1 && "s"}

                                </p>

                            </div>

                            {

                                notifications.length > 0 && (

                                    <button

                                        className="mark-all-btn"

                                        onClick={onMarkAllAsRead}

                                    >

                                        Mark All

                                    </button>

                                )

                            }

                        </div>

                        {/* Notification List */}

                        <div className="notification-list">

                            {

                                notifications.length === 0 ? (

                                    <div className="notification-empty">

                                        <FiBell />

                                        <h4>

                                            No Notifications

                                        </h4>

                                        <p>

                                            Everything looks good.

                                        </p>

                                    </div>

                                ) : (

                                    notifications.map((item) => (

                                        <motion.div

                                            key={item.id}

                                            className={`notification-item ${item.read ? "" : "unread"}`}

                                            whileHover={{
                                                scale: 1.01,
                                            }}

                                            whileTap={{
                                                scale: .98,
                                            }}

                                            onClick={() => onMarkAsRead(item.id)}

                                        >

                                            <div className={`notification-icon ${item.type}`}>

                                                {

                                                    iconMap[item.type] ||

                                                    <FiBell />

                                                }

                                            </div>

                                            <div className="notification-content">

                                                <h4>

                                                    {item.title}

                                                </h4>

                                                <p>

                                                    {item.message}

                                                </p>

                                                <span>

                                                    {item.time}

                                                </span>

                                            </div>

                                            {

                                                !item.read && (

                                                    <div className="unread-dot" />

                                                )

                                            }

                                        </motion.div>

                                    ))

                                )

                            }

                        </div>

                        {

                            notifications.length > 0 && (

                                <div className="notification-footer">

                                    <button

                                        className="notification-footer-btn"

                                        onClick={onClose}

                                    >

                                        Close

                                    </button>

                                    <button

                                        className="notification-footer-btn danger"

                                        onClick={onClearAll}

                                    >

                                        Clear All

                                    </button>

                                </div>

                            )

                        }

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

}

export default NotificationDropdown;