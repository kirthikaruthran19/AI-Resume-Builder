import { motion } from "framer-motion";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import { useResume } from "../../context/ResumeContext";

const COLORS = [
    "#2563EB",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
];

function Analytics() {

    const {
        monthlyAnalytics,
        categoryAnalytics,
        loading,
    } = useResume();

    return (

        <motion.div

            className="analytics-section"

            initial={{
                opacity: 0,
                y: 40,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: .6,
            }}

        >

            <div className="analytics-grid">

                {/* ==========================
                    Monthly Analytics
                ========================== */}

                <div className="analytics-card">

                    <div className="analytics-header">

                        <div>

                            <h2>

                                Monthly Resume Analytics

                            </h2>

                            <p className="analytics-subtitle">

                                Resume creation overview

                            </p>

                        </div>

                    </div>

                    {

                        loading ? (

                            <div className="analytics-loading"></div>

                        ) : (

                            <div className="chart-wrapper">

                                <ResponsiveContainer
                                    width="100%"
                                    height={320}
                                >

                                    <BarChart
                                        data={monthlyAnalytics}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            dataKey="month"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Legend />

                                        <Bar
                                            dataKey="count"
                                            radius={[8, 8, 0, 0]}
                                            fill="#2563EB"
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        )

                    }

                </div>

                {/* ==========================
                    Category Analytics
                ========================== */}

                <div className="analytics-card">

                    <div className="analytics-header">

                        <div>

                            <h2>

                                Template Usage

                            </h2>

                            <p className="analytics-subtitle">

                                Distribution of resume templates

                            </p>

                        </div>

                    </div>

                    {

                        loading ? (

                            <div className="analytics-loading"></div>

                        ) : (

                            <div className="pie-wrapper">

                                <ResponsiveContainer
                                    width="100%"
                                    height={320}
                                >

                                    <PieChart>

                                        <Pie

                                            data={categoryAnalytics}

                                            dataKey="value"

                                            nameKey="name"

                                            outerRadius={100}

                                            label

                                        >

                                            {

                                                categoryAnalytics.map(

                                                    (_, index) => (

                                                        <Cell

                                                            key={index}

                                                            fill={
                                                                COLORS[
                                                                    index % COLORS.length
                                                                ]
                                                            }

                                                        />

                                                    )

                                                )

                                            }

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        )

                    }

                </div>

            </div>

        </motion.div>

    );

}

export default Analytics;