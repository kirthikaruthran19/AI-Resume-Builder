import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationForm from "./CertificationForm";
import LanguageForm from "./LanguageForm";
import InterestForm from "./InterestForm";

import "./BuilderContent.css";

function BuilderContent({

    resume,

    activeSection,

}) {

    const renderSection = () => {

        switch (activeSection) {

            case "personal":

                return (

                    <PersonalInfoForm

                        resume={resume}

                    />

                );

            case "education":

                return (

                    <EducationForm

                        resume={resume}

                    />

                );

            case "experience":

                return (

                    <ExperienceForm

                        resume={resume}

                    />

                );

            case "skills":

                return (

                    <SkillsForm

                        resume={resume}

                    />

                );

            case "projects":

                return (

                    <ProjectsForm

                        resume={resume}

                    />

                );

            case "certifications":

                return (

                    <CertificationForm

                        resume={resume}

                    />

                );

            case "languages":

                return (

                    <LanguageForm

                        resume={resume}

                    />

                );

            case "interests":

                return (

                    <InterestForm

                        resume={resume}

                    />

                );

            default:

                return (

                    <PersonalInfoForm

                        resume={resume}

                    />

                );

        }

    };

    return (

        <main className="builder-content">

            {renderSection()}

        </main>

    );

}

export default BuilderContent;