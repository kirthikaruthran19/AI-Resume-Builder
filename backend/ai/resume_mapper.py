"""
AI Resume Mapper

Converts AI generated JSON into Resume database models.
"""

from datetime import datetime

from resumes.models import (
    Resume,
    PersonalInformation,
    Education,
    Experience,
    Skill,
    Project,
    Certification,
    Language,
    Interest,
)
def parse_date(date_string, default="2024-01-01"):
    """
    Safely convert YYYY-MM-DD string into date object.
    """

    try:
        return datetime.strptime(date_string, "%Y-%m-%d").date()

    except Exception:
        return datetime.strptime(default, "%Y-%m-%d").date()


def save_generated_resume(user, input_data, ai_data):
    """
    Save AI generated resume into database.

    Current Version Saves:
    ✔ Resume
    ✔ Personal Information
    ✔ Education
    """

    # =====================================================
    # Resume
    # =====================================================

    resume = Resume.objects.create(
        user=user,
        title=f"{input_data.get('full_name', 'Untitled')} Resume",
        template="professional",
    )

    # =====================================================
    # Split Full Name
    # =====================================================

    full_name = input_data.get(
        "full_name",
        ""
    ).strip()

    parts = full_name.split()

    first_name = ""

    last_name = ""

    if len(parts) >= 1:
        first_name = parts[0]

    if len(parts) > 1:
        last_name = " ".join(parts[1:])

    # =====================================================
    # Personal Information
    # =====================================================

    personal = ai_data.get(
        "personal_information",
        {}
    )

    PersonalInformation.objects.create(

        resume=resume,

        first_name=first_name,

        last_name=last_name,

        job_title=personal.get(
            "job_title",
            input_data.get("job_title", "")
        ),

        email=input_data.get(
            "email",
            ""
        ),

        phone=input_data.get(
            "phone",
            ""
        ),

        address=personal.get(
            "address",
            input_data.get("location", "")
        ),

        city=personal.get(
            "city",
            ""
        ),

        state=personal.get(
            "state",
            ""
        ),

        country=personal.get(
            "country",
            ""
        ),

        postal_code=personal.get(
            "postal_code",
            ""
        ),

        linkedin=personal.get(
            "linkedin",
            ""
        ),

        github=personal.get(
            "github",
            ""
        ),

        portfolio=personal.get(
            "portfolio",
            ""
        ),

        summary=personal.get(
            "summary",
            ""
        ),
    )

    # =====================================================
    # Education
    # =====================================================

    educations = ai_data.get(
        "education",
        []
    )

    for education in educations:

        Education.objects.create(

            resume=resume,

            institution=education.get(
                "institution",
                ""
            ),

            degree=education.get(
                "degree",
                ""
            ),

            field_of_study=education.get(
                "field_of_study",
                ""
            ),

            start_date=parse_date(
                education.get(
                    "start_date",
                    "2021-06-01"
                )
            ),

            end_date=parse_date(
                education.get(
                    "end_date",
                    "2025-05-31"
                )
            ),

            currently_studying=education.get(
                "currently_studying",
                False
            ),

            grade=education.get(
                "grade",
                ""
            ),

            description=education.get(
                "description",
                ""
            ),
        )
    # =====================================================
    # Experience
    # =====================================================

    experiences = ai_data.get("experience", [])

    for experience in experiences:

        Experience.objects.create(

            resume=resume,

            company=experience.get(
                "company",
                ""
            ),

            position=experience.get(
                "position",
                ""
            ),

            location=experience.get(
                "location",
                ""
            ),

            employment_type=experience.get(
                "employment_type",
                ""
            ),

            start_date=parse_date(
                experience.get(
                    "start_date",
                    "2024-01-01"
                )
            ),

            end_date=parse_date(
                experience.get(
                    "end_date",
                    "2024-06-01"
                )
            ),

            currently_working=experience.get(
                "currently_working",
                False
            ),

            description=experience.get(
                "description",
                ""
            ),
        )

    # =====================================================
    # Skills
    # =====================================================

    skills = ai_data.get("skills", [])

    for skill in skills:

        Skill.objects.create(

            resume=resume,

            name=skill.get(
                "name",
                ""
            ),

            level=skill.get(
                "level",
                "Intermediate"
            ),
        )

    
    # =====================================================
    # Projects
    # =====================================================

    projects = ai_data.get("projects", [])

    for project in projects:

        Project.objects.create(

            resume=resume,

            title=project.get(
                "title",
                ""
            ),

            technologies=project.get(
                "technologies",
                ""
            ),

            project_url=project.get(
                "project_url",
                ""
            ),

            github_url=project.get(
                "github_url",
                ""
            ),

            description=project.get(
                "description",
                ""
            ),
        )

    # =====================================================
    # Certifications
    # =====================================================

    certifications = ai_data.get("certifications", [])

    for certification in certifications:

        Certification.objects.create(

            resume=resume,

            name=certification.get(
                "name",
                ""
            ),

            organization=certification.get(
                "organization",
                ""
            ),

            issue_date=parse_date(
                certification.get(
                    "issue_date",
                    "2024-01-01"
                )
            ),

            expiration_date=(
                parse_date(certification["expiration_date"])
                if certification.get("expiration_date")
                else None
            ),

            credential_id=certification.get(
                "credential_id",
                ""
            ),

            credential_url=certification.get(
                "credential_url",
                ""
            ),
        )

    # =====================================================
    # Languages
    # =====================================================

    languages = ai_data.get("languages", [])

    for language in languages:

        Language.objects.create(

            resume=resume,

            name=language.get(
                "name",
                ""
            ),

            proficiency=language.get(
                "proficiency",
                "Professional"
            ),
        )

    # =====================================================
    # Interests
    # =====================================================

    interests = ai_data.get("interests", [])

    for interest in interests:

        if isinstance(interest, dict):

            Interest.objects.create(

                resume=resume,

                name=interest.get(
                    "name",
                    ""
                ),
            )

        else:

            Interest.objects.create(

                resume=resume,

                name=interest,
            )

    # =====================================================
    # Return Resume
    # =====================================================

    return resume