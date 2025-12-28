from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import tempfile
from face_manager import FaceManager
from typing import List, Optional
from pydantic import BaseModel
import sys

# Ensure lib directory is in path for imports
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from ai.groq_client import ai_manager

app = FastAPI(title="MSU Kiosk Vision API")

class ChatRequest(BaseModel):
    user_id: str
    user_name: Optional[str] = "Student"
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Handle chatbot interactions using Groq AI.
    """
    response = ai_manager.get_chat_response(
        request.user_id, 
        request.message, 
        request.user_name
    )
    return {"response": response}

@app.delete("/chat/{user_id}")
async def clear_chat_endpoint(user_id: str):
    """
    Clear the chat history for a specific user.
    """
    ai_manager.clear_session(user_id)
    return {"status": "success", "message": f"Session for {user_id} has been cleared."}

# Add CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize FaceManager
# Note: Using the default storage data/face_data.json
manager = FaceManager()

@app.post("/register")
async def register_user(
    user_id: str = Form(...),
    name: str = Form(...),
    file: UploadFile = File(...)
):
    """
    Register a new user with a face image.
    Accepts user_id, name, and an image file.
    """
    # Create a temporary file to save the uploaded image
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        success = manager.add_user(user_id, name, tmp_path)
        if not success:
            raise HTTPException(status_code=400, detail="Could not extract face from image.")
        
        return {"status": "success", "message": f"User {name} registered successfully."}
    finally:
        # Clean up temporary file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

@app.post("/identify")
async def identify_user(
    file: UploadFile = File(...)
):
    """
    Identify users in an uploaded image.
    Returns a list of identified user objects.
    """
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        results = manager.identify_face(tmp_path)
        return {"results": results}
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "user_count": len(manager.users)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)
