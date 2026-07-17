import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useResume } from "../context/ResumeContext";
import html2pdf from "html2pdf.js";

function ResumePreview() {

    const { id } = useParams();

    const {
        fetchResume,
        selectedResume,
        loading,
    } = useResume();

    useEffect(() => {

        fetchResume(id);

    }, [id]);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!selectedResume) {

        return <h2>Resume not found.</h2>;

    }

    return (

        <section className="resume-preview">

            <div className="container">

                <Link to="/dashboard">

                    ← Back to Dashboard

                </Link>

                <h1>

                    {selectedResume.title}

                </h1>

                <hr />

                <h2>Personal Information</h2>

                {selectedResume.personal_information ? (

                    <>

                        <p>
                            <strong>Name:</strong>{" "}
                            {selectedResume.personal_information.first_name}
                            {" "}
                            {selectedResume.personal_information.last_name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {selectedResume.personal_information.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {selectedResume.personal_information.phone}
                        </p>

                    </>

                ) : (

                    <p>No Personal Information</p>

                )}

                <hr />

                <h2>Education</h2>

                {

                    selectedResume.education?.map((item) => (

                        <div key={item.id}>

                            <h4>{item.degree}</h4>

                            <p>{item.institution}</p>

                        </div>

                    ))

                }

                <hr />

                <h2>Experience</h2>

                {

                    selectedResume.experience?.map((item) => (

                        <div key={item.id}>

                            <h4>{item.job_title}</h4>

                            <p>{item.company}</p>

                        </div>

                    ))

                }

                <hr />

                <h2>Skills</h2>

                <ul>

                    {

                        selectedResume.skills?.map((skill) => (

                            <li key={skill.id}>

                                {skill.name}

                            </li>

                        ))

                    }

                </ul>

            </div>

        </section>

    );

}

export default ResumePreview;