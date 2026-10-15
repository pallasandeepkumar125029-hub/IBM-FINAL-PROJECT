# 🎓 SkillPilot AI — Agentic AI Learning Companion
> **UN SDG 4: Quality Education Platform** — Autonomous, Personalized AI Mentorship for Engineering Students.

SkillPilot AI is an Agentic AI learning companion designed to democratize high-quality AI/ML education. Aligned with **UN Sustainable Development Goal 4 (Quality Education)**, SkillPilot AI transforms static study materials into dynamic, personalized roadmaps, interactive multi-agent AI tutoring, adaptive quizzes, capstone projects, and real-time career readiness matrix evaluation.

---

## 🌟 Key Features

- 🧭 **Personalized 8-Phase AI Roadmaps**: Custom-tailored learning paths adjusting dynamically to student velocity, background, and study availability.
- 🤖 **Multi-Agent AI Orchestrator**: 5 specialized agents working in harmony:
  - **Tutor Agent**: Step-by-step Socratic concepts & code breakdown.
  - **Research Agent**: RAG-grounded breakthroughs & doc retrieval.
  - **Quiz Master**: Dynamic adaptive question generation & scoring.
  - **Career Agent**: Skill gap matrix matching & technical mock interview simulation.
  - **Reminder & Streak Agent**: Nudges and daily streak protection.
- ⚡ **Adaptive Quiz Engine**: Difficulty scales automatically based on student score performance (scores >85% unlock advanced modules; <60% trigger instant simplified review hints).
- 💼 **Career Gap Matrix & Mock Interviews**: Match student skills against real-world AI/ML Job Specs with instant voice/text mock interview feedback.
- 📊 **Institutional Telemetry & Admin Panel**: Monitor daily active learners, SDG 4 study hours delivered, retention rates, and content quality.

---

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **AI Engine**: Google Gemini API / Antigravity Orchestrator (with Mock Provider fallbacks)
- **Knowledge Retrieval**: RAG Engine with TF-IDF / Vector Store
- **Database**: SQLite / Cloud Firestore integration
- **Authentication**: JWT & Passlib Password Hashing

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS + Tailwind CSS (Light White Glassmorphism Theme)
- **Routing**: React Router v6
- **Icons**: Lucide React

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Backend API server will run at: `http://localhost:8000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend Web Application will run at: `http://localhost:3000`

---

## 📜 Repository & Remote
- **GitHub Repository**: [https://github.com/pallasandeepkumar125029-hub/IBM-FINAL-PROJECT.git](https://github.com/pallasandeepkumar125029-hub/IBM-FINAL-PROJECT.git)
- **Branch**: `main`

