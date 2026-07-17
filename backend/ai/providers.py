import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_content(prompt):
    """
    Generate AI response using Groq.
    """

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert ATS Resume Writer. "
                    "Always return ONLY valid JSON when requested. "
                    "Never return markdown. "
                    "Never wrap JSON inside ```."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],

        temperature=0.3,

        max_tokens=4000,
    )

    return response.choices[0].message.content.strip()