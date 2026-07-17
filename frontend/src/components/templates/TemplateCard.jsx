import { motion } from "framer-motion";

import "./TemplateCard.css";

function TemplateCard({ template, onSelect }) {

    return (

        <motion.div
            className="template-card"
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{
                duration: 0.3,
            }}
        >

            <div className="template-preview">

                <img
                    src={template.image}
                    alt={template.name}
                />

            </div>

            <div className="template-content">

                <h2>{template.name}</h2>

                <p>{template.description}</p>

                <button
                    onClick={() => onSelect(template)}
                >
                    Use Template
                </button>

            </div>

        </motion.div>

    );

}

export default TemplateCard;