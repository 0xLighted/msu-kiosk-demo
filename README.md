# MSU Smart Kiosk Demo

A next-generation interactive kiosk application designed for **Management and Science University (MSU)**. This project integrates cutting-edge facial recognition and Generative AI to provide a personalized, agentic experience for students, staff, and visitors

## 🚀 Key Features

*   **👤 Facial Recognition**: Automatically detects and identifies registered users (students/staff) via webcam using `face_recognition` and OpenCV logic.
*   **🤖 Agentic AI Assistant**: A smart chatbot powered by **Groq (Llama 3.3)** that acts as a campus concierge. It uses **RAG (Retrieval-Augmented Generation)** to answer specific questions about MSU facilities, hours, and policies.
*   **🧠 Context-Aware Interactions**: The AI knows who you are (e.g., "Hello Faisal") and adjusts its responses accordingly.
*   **📚 Dynamic Knowledge Base**: Centralized FAQ and campus information (`campus_info.json`) that powers both the Chatbot and the FAQ page.
*   **🎨 Modern UI/UX**: Built with **Next.js 14**, **TailwindCSS**, and **Framer Motion** for smooth, touch-friendly animations suitable for kiosk displays.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: React Context (`UserContext`)

### Backend (Python)
- **Framework**: FastAPI
- **AI Engine**: Groq API (Llama-3.3-70b-versatile)
- **Computer Vision**: `face_recognition`, `dlib`, `numpy`, `Pillow`
- **Data Source**: Local JSON storage for face encodings and campus info.

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **Python**: v3.10 or higher
- **C++ Build Tools**: Required for compiling `dlib` (e.g., Visual Studio Build Tools on Windows, Xcode on macOS).

### 1. Installation

**Clone the repository:**
```bash
git clone https://github.com/your-username/msu-kiosk-demo.git
cd msu-kiosk-demo
```

**Frontend Dependencies:**
```bash
npm install
```

**Backend Dependencies:**
```bash
# Create a virtual environment (optional but recommended)
python -m venv .venv
# Activate: .venv\Scripts\activate (Windows) or source .venv/bin/activate (Mac/Linux)

# Install Python packages
pip install -r requirements.txt
```

### 2. Configuration (`.env.local`)

Create a `.env.local` file in the root directory and add the following keys:

```bash
# Backend URL (for Frontend)
NEXT_PUBLIC_VISION_API_URL=http://127.0.0.1:8000

# Groq API Key (for AI Chatbot)
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Running the Project

You need to run **both** the frontend and backend terminals simultaneously.

**Terminal 1: Python Backend**
```bash
python lib/vision/api.py
```
*Server will start at `http://127.0.0.1:8000`*

**Terminal 2: Next.js Frontend**
```bash
npm run dev
```
*App will be live at `http://localhost:3000`*
