from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import tempfile
from face_manager import FaceManager
from typing import List

app = FastAPI(title="MSU Kiosk Vision API")

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
