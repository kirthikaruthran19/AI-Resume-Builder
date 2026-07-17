import {
    FaFileAlt,
    FaChartLine,
    FaDownload,
    FaBriefcase,
} from "react-icons/fa";

import { useResume } from "../../context/ResumeContext";

function StatsCards() {

    const { dashboard, loading } = useResume();

    const stats = [

        {
            title: "Total Resumes",
            value: dashboard.total_resumes,
            icon: <FaFileAlt />,
            color: "primary",
        },

        {
            title: "Average ATS Score",
            value: `${dashboard.average_ats_score}%`,
            icon: <FaChartLine />,
            color: "success",
        },

        {
            title: "Downloads",
            value: dashboard.downloads,
            icon: <FaDownload />,
            color: "warning",
        },

        {
            title: "Applications",
            value: dashboard.applications,
            icon: <FaBriefcase />,
            color: "danger",
        },

    ];

    return (

        <section className="stats">

            {

                stats.map((item, index) => (

                    <div
                        key={index}
                        className={`stats-card ${item.color}`}
                    >

                        <div className="stats-icon">

                            {item.icon}

                        </div>

                        <div className="stats-content">

                            <p>

                                {item.title}

                            </p>

                            {

                                loading ? (

                                    <div className="stats-loading"></div>

                                ) : (

                                    <h3>

                                        {item.value}

                                    </h3>

                                )

                            }

                        </div>

                    </div>

                ))

            }

        </section>

    );

}

export default StatsCards;