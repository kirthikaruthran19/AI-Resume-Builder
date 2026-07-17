"""
AI Services
"""

import json

from .prompts import (
    SUMMARY_PROMPT,
    ATS_SCORE_PROMPT,
    RESUME_GENERATOR_PROMPT,
)

from .providers import generate_content


# =========================================================
# Helper Function
# =========================================================

def clean_ai_response(response):
    """
    Remove markdown code blocks from AI response.
    """

    response = response.strip()

    if response.startswith("```json"):
        response = response.replace("```json", "", 1)

    if response.startswith("```"):
        response = response.replace("```", "", 1)

    if response.endswith("```"):
        response = response[:-3]

    return response.strip()


# =========================================================
# Optimize Professional Summary
# =========================================================

def optimize_summary(summary):
    """
    Improve the professional summary.
    """

    prompt = SUMMARY_PROMPT.replace(
    "<<SUMMARY>>",
    summary,
)

    response = generate_content(prompt)

    response = clean_ai_response(response)

    try:

        parsed = json.loads(response)

        return parsed.get(
            "professionalSummary",
            response,
        )

    except json.JSONDecodeError:

        return response


# =========================================================
# ATS Resume Score Analyzer
# =========================================================

def analyze_ats_score(
    resume_text,
    job_description,
):
    """
    Analyze ATS compatibility.
    """

    prompt = ATS_SCORE_PROMPT
    prompt = prompt.replace(
    "<<RESUME_TEXT>>",
    resume_text,
)
    prompt = prompt.replace(
    "<<JOB_DESCRIPTION>>",
    job_description,
)



    response = generate_content(prompt)

    response = clean_ai_response(response)

    try:

        parsed = json.loads(response)

        return {

            "ats_score": parsed.get(
                "ats_score",
                0,
            ),

            "matched_keywords": parsed.get(
                "matched_keywords",
                [],
            ),

            "missing_keywords": parsed.get(
                "missing_keywords",
                [],
            ),

            "suggestions": parsed.get(
                "suggestions",
                [],
            ),

        }

    except json.JSONDecodeError:

        return {

            "ats_score": 0,

            "matched_keywords": [],

            "missing_keywords": [],

            "suggestions": [],

            "error": "AI returned invalid JSON.",

            "raw_response": response,

        }


# =========================================================
# Generate Complete Resume
# =========================================================

def generate_complete_resume(data):
    """
    Generate a complete ATS-friendly resume.
    """

    prompt = RESUME_GENERATOR_PROMPT

    # =====================================================
    # Replace Placeholders
    # =====================================================

    replacements = {

        "<<FULL_NAME>>": data.get("full_name", ""),
        "<<EMAIL>>": data.get("email", ""),
        "<<PHONE>>": data.get("phone", ""),
        "<<LOCATION>>": data.get("location", ""),

        "<<LINKEDIN>>": data.get("linkedin", ""),
        "<<GITHUB>>": data.get("github", ""),
        "<<PORTFOLIO>>": data.get("portfolio", ""),

        "<<JOB_TITLE>>": data.get("job_title", ""),
        "<<EDUCATION>>": data.get("education", ""),
        "<<EXPERIENCE_LEVEL>>": data.get("experience_level", ""),

        "<<LANGUAGES>>": ", ".join(
            data.get("languages", [])
        ),

        "<<SKILLS>>": ", ".join(
            data.get("skills", [])
        ),

        "<<PROJECTS>>": ", ".join(
            data.get("projects", [])
        ),

        "<<CERTIFICATIONS>>": ", ".join(
            data.get("certifications", [])
        ),

        "<<TARGET_COMPANY>>": data.get(
            "target_company",
            "",
        ),

        "<<TONE>>": data.get(
            "tone",
            "Professional",
        ),

        "<<JOB_DESCRIPTION>>": data.get(
            "job_description",
            "",
        ),

    }

    for key, value in replacements.items():

        prompt = prompt.replace(
            key,
            str(value),
        )

    # =====================================================
    # Generate AI Response
    # =====================================================

    response = generate_content(prompt)

    response = clean_ai_response(response)

    try:

        parsed = json.loads(response)

        return {

            "success": True,

            "data": parsed,

        }

    except json.JSONDecodeError:

        return {

            "success": False,

            "error": "AI returned invalid JSON.",

            "raw_response": response,

        }