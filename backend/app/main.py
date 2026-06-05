from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routers import auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/auth")

@app.get("/")
def home():
    return {"message": "AI Interview Platform Backend"}