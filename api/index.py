from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "MSU Kiosk API"}

@app.get("/api")
def root():
    return {"message": "Hello from FastAPI on Vercel!"}
