from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models import InterviewHistory

load_dotenv()

router = APIRouter()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class QuestionRequest(BaseModel):
    resume_text: str
    role: str
    difficulty: str

class FeedbackRequest(BaseModel):
    question: str
    answer: str

class SaveHistoryRequest(BaseModel):
    user_email: str
    role: str
    question: str
    answer: str
    feedback: str

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

Role:
{data.role}

Difficulty:
{data.difficulty}

Return only numbered questions.
"""
                }
            ]
        )

        return {
            "questions": response.choices[0].message.content
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/feedback")
def generate_feedback(data: FeedbackRequest):
    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "user",
                    "content": f"""
You are an AI technical interviewer.

Evaluate the candidate answer strictly.

Question:
{data.question}

Candidate Answer:
{data.answer}

Return feedback in this exact format:

Score: X/10

Verdict:
Briefly say whether the answer is weak, average, good, or excellent.

What the candidate did well:
- point 1
- point 2

Where the candidate should improve:
- point 1
- point 2
- point 3

Correct answer:
Give the ideal interview answer in simple language.

How to improve this answer:
Give a rewritten better version of the candidate's answer.
"""
                }
            ],
        )

        return {
            "feedback": response.choices[0].message.content
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/save-history")
def save_history(data: SaveHistoryRequest, db: Session = Depends(get_db)):
    history = InterviewHistory(
        user_email=data.user_email,
        role=data.role,
        question=data.question,
        answer=data.answer,
        feedback=data.feedback
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return {
        "message": "Interview history saved successfully",
        "id": history.id
    }

@router.get("/history/{user_email}")
def get_history(user_email: str, db: Session = Depends(get_db)):
    records = (
        db.query(InterviewHistory)
        .filter(InterviewHistory.user_email == user_email)
        .order_by(InterviewHistory.created_at.desc())
        .all()
    )

    return records