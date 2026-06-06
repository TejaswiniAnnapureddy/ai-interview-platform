from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

router = APIRouter()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class QuestionRequest(BaseModel):
    resume_text: str
    role: str
    difficulty: str

@router.post("/generate-questions")
def generate_questions(data: QuestionRequest):
    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "user",
                    "content": f"""
Generate 10 interview questions.

Resume:
{data.resume_text}

Role: {data.role}
Difficulty: {data.difficulty}

Return only numbered questions.
"""
                }
            ],
        )

        return {
            "questions": response.choices[0].message.content
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))