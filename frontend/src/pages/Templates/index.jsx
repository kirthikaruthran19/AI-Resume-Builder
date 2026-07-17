import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import templates from "../../data/templates";
import TemplateCard from "../../components/templates/TemplateCard";

import "./Templates.css";

function Templates() {

    const navigate = useNavigate();

    const [selected, setSelected] = useState(null);

    const handleTemplateSelect = (template) => {

        setSelected(template);

        navigate("/resume-builder", {
            state: {
                template: template.id,
            },
        });

    };

    return (

        <section className="templates-page">

            {/* ==========================
                Header
            ========================== */}

            <motion.div
                className="templates-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >

                <h1>Resume Templates</h1>

                <p>
                    Choose a professional resume template and start building your resume.
                </p>

            </motion.div>

            {/* ==========================
                Template Grid
            ========================== */}

            <div className="templates-grid">

                {

                    templates.map((template) => (

                        <TemplateCard
                            key={template.id}
                            template={template}
                            onSelect={handleTemplateSelect}
                        />

                    ))

                }

            </div>

            {/* ==========================
                Selected Template
            ========================== */}

            {

                selected && (

                    <motion.div
                        className="selected-template"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >

                        <h2>Selected Template</h2>

                        <h3>{selected.name}</h3>

                        <p>{selected.description}</p>

                    </motion.div>

                )

            }

        </section>

    );

}

export default Templates;