"""
AI Prompts
"""

# ==========================================================
# Optimize Summary
# ==========================================================

SUMMARY_PROMPT = """
You are a professional resume writer.

Improve the following professional summary.

Requirements:
- Make it ATS friendly.
- Use professional language.
- Keep it between 60-100 words.
- Return ONLY valid JSON.

JSON Format:

{
    "professionalSummary": "..."
}

Summary:

<<SUMMARY>>
"""


# ==========================================================
# ATS Score Prompt
# ==========================================================

ATS_SCORE_PROMPT = """
You are an ATS Resume Analyzer.

Compare the resume against the job description.

Resume:

<<RESUME_TEXT>>

Job Description:

<<JOB_DESCRIPTION>>

Return ONLY valid JSON.

{
    "ats_score": 92,
    "matched_keywords": [
        "Python",
        "React"
    ],
    "missing_keywords": [
        "Docker",
        "AWS"
    ],
    "suggestions": [
        "Add Docker experience.",
        "Mention REST APIs.",
        "Include measurable achievements."
    ]
}
"""


# ==========================================================
# AI Resume Generator Prompt
# ==========================================================

RESUME_GENERATOR_PROMPT = """
You are an expert AI Resume Writer.

Create a professional ATS-friendly resume.

Use ONLY the information below.

==================================================

Full Name:
<<FULL_NAME>>

Email:
<<EMAIL>>

Phone:
<<PHONE>>

Location:
<<LOCATION>>

LinkedIn:
<<LINKEDIN>>

GitHub:
<<GITHUB>>

Portfolio:
<<PORTFOLIO>>

Target Job Title:
<<JOB_TITLE>>

Education:
<<EDUCATION>>

Experience Level:
<<EXPERIENCE_LEVEL>>

Languages:
<<LANGUAGES>>

Skills:
<<SKILLS>>

Projects:
<<PROJECTS>>

Certifications:
<<CERTIFICATIONS>>

Target Company:
<<TARGET_COMPANY>>

Resume Tone:
<<TONE>>

Job Description:
<<JOB_DESCRIPTION>>

==================================================

RULES

1. Return ONLY valid JSON.

2. Do NOT return markdown.

3. Do NOT use ```.

4. Never explain anything.

5. Never return null.

6. Every field must exist.

7. If data is unavailable use:
- ""
- []
- false

8. Split the full name into first_name and last_name.

9. Split the location into city/state/country if possible.

10. Create an ATS-friendly professional summary.

11. Create a strong career objective.

12. If the user is a Fresher,
generate project-based experience instead of fake jobs.

13. Convert comma-separated skills into objects.

14. Convert comma-separated certifications into objects.

15. Convert comma-separated languages into objects.

16. Create realistic project descriptions.

17. Do not invent unrelated information.

==================================================

Return EXACTLY this JSON:

{
  "personal_information": {
    "first_name": "",
    "last_name": "",
    "job_title": "",
    "email": "",
    "phone": "",
    "city": "",
    "state": "",
    "country": "",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "summary": ""
  },

  "career_objective": "",

  "experience": [
    {
      "position": "",
      "company": "",
      "start_date": "",
      "end_date": "",
      "currently_working": false,
      "description": ""
    }
  ],

  "education": [
    {
      "degree": "",
      "institution": "",
      "field_of_study": "",
      "start_date": "",
      "end_date": "",
      "grade": "",
      "description": ""
    }
  ],

  "projects": [
    {
      "title": "",
      "technologies": "",
      "description": ""
    }
  ],

  "skills": [
    {
      "name": ""
    }
  ],

  "certifications": [
    {
      "name": "",
      "organization": ""
    }
  ],

  "languages": [
    {
      "name": "",
      "proficiency": ""
    }
  ],

  "interests": [
    {
      "name": ""
    }
  ]
}
"""