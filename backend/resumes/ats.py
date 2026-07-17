from .models import Resume


def calculate_ats_score(resume):

    score = 0

    suggestions = []

    # ===============================
    # Personal Information (20)
    # ===============================

    personal = getattr(resume, "personal_info", None)

    if personal:

        score += 20

        if not personal.summary:
            suggestions.append(
                "Add a professional summary."
            )

    else:

        suggestions.append(
            "Complete your personal information."
        )

    # ===============================
    # Education (15)
    # ===============================

    if resume.education.exists():

        score += 15

    else:

        suggestions.append(
            "Add education details."
        )

    # ===============================
    # Experience (20)
    # ===============================

    if resume.experience.exists():

        score += 20

    else:

        suggestions.append(
            "Add work experience."
        )

    # ===============================
    # Skills (15)
    # ===============================

    if resume.skills.exists():

        score += 15

    else:

        suggestions.append(
            "Add technical skills."
        )

    # ===============================
    # Projects (10)
    # ===============================

    if resume.projects.exists():

        score += 10

    else:

        suggestions.append(
            "Add projects."
        )

    # ===============================
    # Certifications (8)
    # ===============================

    if resume.certifications.exists():

        score += 8

    else:

        suggestions.append(
            "Add certifications."
        )

    # ===============================
    # Languages (6)
    # ===============================

    if resume.languages.exists():

        score += 6

    else:

        suggestions.append(
            "Add languages."
        )

    # ===============================
    # Interests (6)
    # ===============================

    if resume.interests.exists():

        score += 6

    else:

        suggestions.append(
            "Add interests."
        )

    score = min(score, 100)

    return score, suggestions