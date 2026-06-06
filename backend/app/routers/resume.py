from fastapi import APIRouter, UploadFile, File
import pdfplumber
from pydantic import BaseModel

from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    text = ""

    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "resume_text": text
    }


class ResumeAnalysisRequest(BaseModel):
    resume_text: str


@router.post("/analyze")
def analyze_resume(data: ResumeAnalysisRequest):

    prompt = f"""
Analyze this resume.

Resume:
{data.resume_text}

Return:

Resume Score: X/100

Technical Skills:
- ...

Projects:
- ...

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )

    return {
        "analysis": response.choices[0].message.content
    }