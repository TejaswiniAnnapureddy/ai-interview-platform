from fastapi import APIRouter, UploadFile, File
import pdfplumber

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