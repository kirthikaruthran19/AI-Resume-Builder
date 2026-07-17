import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useResume } from "../../context/ResumeContext";

import BuilderHeader from "../../components/ResumeBuilder/BuilderHeader";
import BuilderSidebar from "../../components/ResumeBuilder/BuilderSidebar";
import BuilderContent from "../../components/ResumeBuilder/BuilderContent";
import LivePreview from "../../components/ResumeBuilder/LivePreview";

import "./ResumeBuilder.css";

function ResumeBuilder() {

    const location = useLocation();

    const { id } = useParams();

    const selectedTemplate =
        location.state?.template || "professional";

    const {
        selectedResume,
        fetchResume,
    } = useResume();

    const [activeSection, setActiveSection] =
        useState("personal");

    /* ==========================================
       Load Resume when Editing
    ========================================== */

    useEffect(() => {

        if (id) {

            console.log("Editing Resume:", id);

            fetchResume(id);

        }

    }, [id]);

    /* ==========================================
       Debug
    ========================================== */

    useEffect(() => {

        console.log("Selected Resume:", selectedResume);

    }, [selectedResume]);

    return (

        <div className="resume-builder">

            {/* ==========================
                Selected Template
            ========================== */}



            {/* ==========================
                Header
            ========================== */}

            <BuilderHeader
                resume={selectedResume}
            />

            {/* ==========================
                Builder Layout
            ========================== */}

            <div className="builder-body">

                {/* Sidebar */}

                <BuilderSidebar

                    activeSection={activeSection}

                    setActiveSection={setActiveSection}

                />

                {/* Builder Forms */}

                <BuilderContent

                    resume={selectedResume}

                    activeSection={activeSection}

                />

                {/* Live Preview */}

                <LivePreview
                    resume={selectedResume}
                    template={
                        selectedResume?.template ||
                        selectedTemplate
                    }
                />

            </div>

        </div>

    );

}

export default ResumeBuilder;