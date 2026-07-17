import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiLinkedin,
    FiGithub,
    FiGlobe,
} from "react-icons/fi";

import "./LivePreview.css";

import { useResume } from "../../context/ResumeContext";

function LivePreview({

    resume,

    template = "professional",

}) {

    const personal = resume?.personal_info;

    const {
        education,
        experience,
        skills,
        projects,
        certifications,
        languages,
        interests,
    } = useResume();

    return (

        <aside className="live-preview">

            <div
    className={`preview-paper ${template}`}
>

                {/* ========================================== */}
                {/* Header */}
                {/* ========================================== */}

                <div
    className={`preview-header ${template}`}
>

                    <h1>

                        {

                            personal

                                ?

                                `${personal.first_name || ""} ${personal.last_name || ""}`

                                :

                                "Your Name"

                        }

                    </h1>

                    {

                        personal?.job_title && (

                            <h3>

                                {personal.job_title}

                            </h3>

                        )

                    }

                </div>

                {/* ========================================== */}
                {/* Contact */}
                {/* ========================================== */}

                <div className="preview-contact">

                    {

                        personal?.email && (

                            <div>

                                <FiMail />

                                <span>

                                    {personal.email}

                                </span>

                            </div>

                        )

                    }

                    {

                        personal?.phone && (

                            <div>

                                <FiPhone />

                                <span>

                                    {personal.phone}

                                </span>

                            </div>

                        )

                    }

                    {

                        (

                            personal?.address ||

                            personal?.city ||

                            personal?.state ||

                            personal?.country

                        ) && (

                            <div>

                                <FiMapPin />

                                <span>

                                    {

                                        [

                                            personal.address,

                                            personal.city,

                                            personal.state,

                                            personal.country,

                                            personal.postal_code,

                                        ]

                                            .filter(Boolean)

                                            .join(", ")

                                    }

                                </span>

                            </div>

                        )

                    }

                </div>

                {/* ========================================== */}
                {/* Social Links */}
                {/* ========================================== */}

                {

                    (

                        personal?.linkedin ||

                        personal?.github ||

                        personal?.portfolio

                    ) && (

                        <div className="preview-links">

                            {

                                personal.linkedin && (

                                    <div>

                                        <FiLinkedin />

                                        <span>

                                            {personal.linkedin}

                                        </span>

                                    </div>

                                )

                            }

                            {

                                personal.github && (

                                    <div>

                                        <FiGithub />

                                        <span>

                                            {personal.github}

                                        </span>

                                    </div>

                                )

                            }

                            {

                                personal.portfolio && (

                                    <div>

                                        <FiGlobe />

                                        <span>

                                            {personal.portfolio}

                                        </span>

                                    </div>

                                )

                            }

                        </div>

                    )

                }

                {/* ========================================== */}
                {/* Summary */}
                {/* ========================================== */}

                <section className="preview-section">

                    <h2>

                        Professional Summary

                    </h2>

                    <p>

                        {

                            personal?.summary ||

                            "Your professional summary will appear here."

                        }

                    </p>

                </section>

                {/* ========================================== */}
                {/* Education */}
                {/* ========================================== */}

                <section className="preview-section">

                    <h2>Education</h2>

                    {
                        education.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            education
                                .filter(
                                    (item) => item.resume === resume?.id
                                )
                                .map((item) => (

                                    <div
                                        key={item.id}
                                        className="preview-item"
                                    >

                                        <h3>
                                            {item.degree}
                                        </h3>

                                        <strong>
                                            {item.institution}
                                        </strong>

                                        <p>

                                            {item.start_date}

                                            {" - "}

                                            {
                                                item.currently_studying
                                                    ? "Present"
                                                    : item.end_date
                                            }

                                        </p>

                                    </div>

                                ))

                        ) : (

                            <p>No education added.</p>

                        )
                    }

                </section>

                {/* ========================================== */}
                {/* Experience */}
                {/* ========================================== */}

                <section className="preview-section">

                    <h2>Experience</h2>

                    {

                        experience.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            experience
                                .filter(
                                    (item) => item.resume === resume?.id
                                )
                                .map((item) => (

                                    <div
                                        key={item.id}
                                        className="preview-item"
                                    >

                                        <h3>

                                            {item.position}

                                        </h3>

                                        <strong>

                                            {item.company}

                                        </strong>

                                        <p>

                                            {item.start_date}

                                            {" - "}

                                            {

                                                item.currently_working

                                                    ? "Present"

                                                    : item.end_date

                                            }

                                        </p>

                                        {

                                            item.description && (

                                                <p>

                                                    {item.description}

                                                </p>

                                            )

                                        }

                                    </div>

                                ))

                        ) : (

                            <p>No experience added.</p>

                        )

                    }

                </section>
                {/* ========================================== */}
                {/* Skills */}
                {/* ========================================== */}

                {/* ========================================== */}
                {/* Skills */}
                {/* ========================================== */}

                <section className="preview-section">

                    <h2>Skills</h2>

                    {

                        skills.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            <div className="preview-tags">

                                {

                                    skills
                                        .filter(
                                            (item) => item.resume === resume?.id
                                        )
                                        .map((item) => (

                                            <span key={item.id}>

                                                {item.name}

                                            </span>

                                        ))

                                }

                            </div>

                        ) : (

                            <p>No skills added.</p>

                        )

                    }

                </section>

                {/* ========================================== */}
                {/* Projects */}
                {/* ========================================== */}

                <section className="preview-section">

                    <h2>Projects</h2>

                    {

                        projects.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            projects
                                .filter(
                                    (item) => item.resume === resume?.id
                                )
                                .map((item) => (

                                    <div
                                        key={item.id}
                                        className="preview-item"
                                    >

                                        <h3>{item.title}</h3>

                                        <strong>{item.technologies}</strong>

                                        {item.project_url && (
                                            <p>
                                                <strong>Project:</strong>{" "}
                                                <a
                                                    href={item.project_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {item.project_url}
                                                </a>
                                            </p>
                                        )}

                                        {item.github_url && (
                                            <p>
                                                <strong>GitHub:</strong>{" "}
                                                <a
                                                    href={item.github_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {item.github_url}
                                                </a>
                                            </p>
                                        )}

                                        {item.description && (
                                            <p>{item.description}</p>
                                        )}

                                    </div>

                                ))

                        ) : (

                            <p>No projects added.</p>

                        )

                    }

                </section>
                {/* ========================================== */}
                {/* Certifications */}
                {/* ========================================== */}

                <section className="preview-section">

                    <h2>Certifications</h2>

                    {

                        certifications.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            certifications
                                .filter(
                                    (item) => item.resume === resume?.id
                                )
                                .map((item) => (

                                    <div
                                        key={item.id}
                                        className="preview-item"
                                    >

                                        <h3>{item.name}</h3>

                                        <strong>{item.organization}</strong>

                                        <p>
                                            {item.issue_date}
                                            {item.expiration_date &&
                                                ` - ${item.expiration_date}`}
                                        </p>

                                        {item.credential_id && (
                                            <p>
                                                <strong>Credential ID:</strong>{" "}
                                                {item.credential_id}
                                            </p>
                                        )}

                                        {item.credential_url && (
                                            <p>
                                                <a
                                                    href={item.credential_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View Credential
                                                </a>
                                            </p>
                                        )}

                                    </div>

                                ))

                        ) : (

                            <p>No certifications added.</p>

                        )

                    }

                </section>

                <section className="preview-section">

                    <h2>Languages</h2>

                    {

                        languages.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            languages
                                .filter(
                                    (item) => item.resume === resume?.id
                                )
                                .map((item) => (

                                    <div
                                        key={item.id}
                                        className="preview-item"
                                    >

                                        <strong>{item.name}</strong>

                                        {item.proficiency && (
                                            <p>{item.proficiency}</p>
                                        )}

                                    </div>

                                ))

                        ) : (

                            <p>No languages added.</p>

                        )

                    }

                </section>

                <section className="preview-section">

                    <h2>Interests</h2>

                    {

                        interests.filter(
                            (item) => item.resume === resume?.id
                        ).length > 0 ? (

                            <div className="preview-tags">

                                {

                                    interests
                                        .filter(
                                            (item) => item.resume === resume?.id
                                        )
                                        .map((item) => (

                                            <span key={item.id}>

                                                {item.name}

                                            </span>

                                        ))

                                }

                            </div>

                        ) : (

                            <p>No interests added.</p>

                        )

                    }

                </section>
            </div>

        </aside>

    );

}

export default LivePreview;