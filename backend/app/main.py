from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routers import auth
from fastapi.middleware.cors import CORSMiddleware
from app.routers import resume
from app.routers import interview

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://ai-interview-platform-amber-nine.vercel.app",
        "https://ai-interview-platform-3xbz.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(resume.router, prefix="/resume")
app.include_router(interview.router, prefix="/interview")

@app.get("/")
def home():
    return {"message": "AI Interview Platform Backend"}