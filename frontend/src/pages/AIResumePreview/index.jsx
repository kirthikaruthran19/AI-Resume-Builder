import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "../../context/ResumeContext";
import "./AIResumePreview.css";

/* ==========================================
   Reusable Resume Section
========================================== */

function ResumeSection({ title, children }) {
    return (
        <section className="resume-section">
            <h2>{title}</h2>
            {children}
        </section>
    );
}

function AIResumePreview() {

    const [resume, setResume] = useState(null);

    /* ==========================================
       Download PDF
    ========================================== */

    const downloadPDF = () => {

        const element = document.getElementById("resume-content");

        const options = {

            margin: 0.3,

            filename: "AI_Resume.pdf",

            image: {
                type: "jpeg",
                quality: 1,
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
            },

            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait",
            },

            pagebreak: {
                mode: ["avoid-all", "css", "legacy"],
            },

        };

        html2pdf()

    .from(element)

    .set(options)

    .save()

    .then(() => {

        addNotification({

            type: "download",

            title: "Resume Downloaded",

            message: "Your resume PDF has been downloaded.",

        });

    });

    };

    /* ==========================================
       Load Resume
    ========================================== */

    useEffect(() => {

        const data = localStorage.getItem("aiResume");

        if (data) {

            setResume(JSON.parse(data));

        }

    }, []);

    if (!resume) {

        return (

            <div className="preview-loading">

                No AI Resume Found

            </div>

        );

    }

    const personal =
        resume.personal_information || {};

    return (

        <div className="ai-preview">

            {/* ==========================
                Top Actions
            ========================== */}

            <div className="preview-actions">

                <button

                    className="download-btn"

                    onClick={downloadPDF}

                >

                    Download Resume (PDF)

                </button>

            </div>

            {/* ==========================
                Resume
            ========================== */}

            <div

                id="resume-content"

                className="resume-paper"

            >

                {/* ==========================
                    Header
                ========================== */}

                <div className="resume-header">

                    <h1>

                        {personal.first_name} {personal.last_name}

                    </h1>

                    <h3>

                        {personal.job_title}

                    </h3>

                    <div className="contact-info">

                        <span>

                            {personal.email}

                        </span>

                        <span>

                            {personal.phone}

                        </span>

                        <span>

                            {personal.city},
                            {" "}
                            {personal.state},
                            {" "}
                            {personal.country}

                        </span>

                    </div>

                    <div className="contact-links">

                        {

                            personal.linkedin && (

                                <a

                                    href={personal.linkedin}

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    LinkedIn

                                </a>

                            )

                        }

                        {

                            personal.github && (

                                <a

                                    href={personal.github}

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    GitHub

                                </a>

                            )

                        }

                        {

                            personal.portfolio && (

                                <a

                                    href={personal.portfolio}

                                    target="_blank"

                                    rel="noreferrer"

                                >

                                    Portfolio

                                </a>

                            )

                        }

                    </div>

                </div>

                {/* ==========================
                    Summary
                ========================== */}

                <ResumeSection
                    title="Professional Summary"
                >

                    <p>

                        {personal.summary}

                    </p>

                </ResumeSection>

                {/* ==========================
                    Career Objective
                ========================== */}

                <ResumeSection
                    title="Career Objective"
                >

                    <p>

                        {resume.career_objective}

                    </p>

                </ResumeSection>
                                {/* ==========================
                    Experience
                ========================== */}

                <ResumeSection title="Experience">

                    {

                        resume.experience?.length > 0 ? (

                            resume.experience.map((exp, index) => (

                                <div
                                    key={index}
                                    className="resume-card"
                                >

                                    <div className="resume-card-header">

                                        <h4>

                                            {exp.position}

                                        </h4>

                                        <span>

                                            {exp.company}

                                        </span>

                                    </div>

                                    <div className="resume-date">

                                        {exp.start_date}

                                        {" - "}

                                        {

                                            exp.currently_working

                                                ? "Present"

                                                : exp.end_date

                                        }

                                    </div>

                                    <p>

                                        {exp.description}

                                    </p>

                                </div>

                            ))

                        ) : (

                            <p>No experience available.</p>

                        )

                    }

                </ResumeSection>

                {/* ==========================
                    Education
                ========================== */}

                <ResumeSection title="Education">

                    {

                        resume.education?.map((edu, index) => (

                            <div
                                key={index}
                                className="resume-card"
                            >

                                <div className="resume-card-header">

                                    <h4>

                                        {edu.degree}

                                    </h4>

                                    <span>

                                        {edu.institution}

                                    </span>

                                </div>

                                <div className="resume-date">

                                    {edu.start_date}

                                    {" - "}

                                    {edu.end_date}

                                </div>

                                <p>

                                    {edu.field_of_study}

                                </p>

                                <p>

                                    {edu.grade}

                                </p>

                                <p>

                                    {edu.description}

                                </p>

                            </div>

                        ))

                    }

                </ResumeSection>

                {/* ==========================
                    Projects
                ========================== */}

                <ResumeSection title="Projects">

                    {

                        resume.projects?.map((project, index) => (

                            <div
                                key={index}
                                className="resume-card"
                            >

                                <h4>

                                    {project.title}

                                </h4>

                                {

                                    project.technologies && (

                                        <div className="project-tech">

                                            {project.technologies}

                                        </div>

                                    )

                                }

                                <p>

                                    {project.description}

                                </p>

                            </div>

                        ))

                    }

                </ResumeSection>

                {/* ==========================
                    Skills
                ========================== */}

                <ResumeSection title="Technical Skills">

                    <div className="skills-container">

                        {

                            resume.skills?.map((skill, index) => (

                                <span
                                    key={index}
                                    className="skill-badge"
                                >

                                    {skill.name}

                                </span>

                            ))

                        }

                    </div>

                </ResumeSection>

                {/* ==========================
                    Certifications
                ========================== */}

                {

                    resume.certifications?.length > 0 && (

                        <ResumeSection
                            title="Certifications"
                        >

                            <ul className="resume-list">

                                {

                                    resume.certifications.map((cert, index) => (

                                        <li key={index}>

                                            <strong>

                                                {cert.name}

                                            </strong>

                                            {

                                                cert.organization && (

                                                    <> — {cert.organization}</>

                                                )

                                            }

                                        </li>

                                    ))

                                }

                            </ul>

                        </ResumeSection>

                    )

                }

                {/* ==========================
                    Languages
                ========================== */}

                {

                    resume.languages?.length > 0 && (

                        <ResumeSection
                            title="Languages"
                        >

                            <ul className="resume-list">

                                {

                                    resume.languages.map((lang, index) => (

                                        <li key={index}>

                                            {lang.name}

                                            {" - "}

                                            {lang.proficiency}

                                        </li>

                                    ))

                                }

                            </ul>

                        </ResumeSection>

                    )

                }

                {/* ==========================
                    Interests
                ========================== */}

                {

                    resume.interests?.length > 0 && (

                        <ResumeSection
                            title="Interests"
                        >

                            <div className="skills-container">

                                {

                                    resume.interests.map((interest, index) => (

                                        <span
                                            key={index}
                                            className="skill-badge"
                                        >

                                            {

                                                typeof interest === "string"

                                                    ? interest

                                                    : interest.name

                                            }

                                        </span>

                                    ))

                                }

                            </div>

                        </ResumeSection>

                    )

                }

                {/* ==========================
                    Footer
                ========================== */}

                <div className="resume-footer">

                    Generated using AI Resume Builder

                </div>

            </div>

        </div>

    );

}

export default AIResumePreview;