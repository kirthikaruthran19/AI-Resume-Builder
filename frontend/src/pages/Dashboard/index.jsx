import "./Dashboard.css";

import { motion } from "framer-motion";

import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatsCards from "../../components/Dashboard/StatsCards";
import QuickActions from "../../components/Dashboard/QuickActions";
import Analytics from "../../components/Dashboard/Analytics";

function Dashboard() {

    return (

        <section className="dashboard">

            <div className="dashboard-container">

                {/* Header */}

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                >
                    <DashboardHeader />
                </motion.div>

                {/* Stats */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .2 }}
                >
                    <StatsCards />
                </motion.div>

                {/* Quick Actions */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .3 }}
                    className="quick-actions-wrapper"
                >
                    <QuickActions />
                </motion.div>

                {/* Analytics */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .4 }}
                    className="analytics-section"
                >
                    <Analytics />
                </motion.div>

            </div>

        </section>

    );

}

export default Dashboard;