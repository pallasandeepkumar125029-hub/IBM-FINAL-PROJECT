from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, Profile, UserSkill
from app.schemas.schemas import CareerAnalysisResponse

router = APIRouter(prefix="/career", tags=["Career Coach"])

@router.get("/analysis", response_model=CareerAnalysisResponse)
def get_career_analysis(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = current_user.profile
    career_goal = profile.career_goal if profile else "AI/ML Engineer"

    # User's current skills
    user_skills = db.query(UserSkill).filter(UserSkill.user_id == current_user.id).all()
    user_skill_names = {s.skill_name.lower(): s.proficiency for s in user_skills}

    # Skill Gap Matrix based on target role
    role_skill_matrix = {
        "AI/ML Engineer": [
            {"skill": "Python Programming", "req": "Intermediate", "rec": "Master OOP, generators, and async Python."},
            {"skill": "Linear Algebra & Calculus", "req": "Intermediate", "rec": "Complete Phase 2 Matrix Operations module."},
            {"skill": "PyTorch & Neural Networks", "req": "Intermediate", "rec": "Build a MLP from scratch using PyTorch autograd."},
            {"skill": "Scikit-Learn & ML Pipelines", "req": "Intermediate", "rec": "Implement Cross-Validation and Feature Scaling."},
            {"skill": "Vector Search & RAG Architecture", "req": "Advanced", "rec": "Complete RAG-based College Assistant project."},
            {"skill": "FastAPI & Microservice Deployment", "req": "Intermediate", "rec": "Deploy REST endpoints for model inference."}
        ],
        "Data Scientist": [
            {"skill": "Python & Pandas Data Analysis", "req": "Advanced", "rec": "Practice EDA on complex tabular datasets."},
            {"skill": "Probability & Hypothesis Testing", "req": "Intermediate", "rec": "Learn A/B testing and confidence intervals."},
            {"skill": "SQL & Data Warehousing", "req": "Intermediate", "rec": "Master window functions and subqueries."},
            {"skill": "Scikit-Learn & ML Models", "req": "Intermediate", "rec": "Build Random Forest and XGBoost benchmarks."}
        ]
    }

    req_skills = role_skill_matrix.get(career_goal, role_skill_matrix["AI/ML Engineer"])

    matches = []
    missing_items = []
    matched_count = 0

    for item in req_skills:
        s_name = item["skill"]
        s_lower = s_name.lower()
        if any(k in s_lower for k in user_skill_names.keys()):
            matches.append(s_name)
            matched_count += 1
        else:
            missing_items.append({
                "skill": s_name,
                "status": "missing",
                "recommendation": item["rec"]
            })

    readiness = round((matched_count / len(req_skills)) * 100, 1) if req_skills else 50.0

    return {
        "target_career": career_goal,
        "readiness_percentage": readiness,
        "current_matches": matches,
        "missing_skills": missing_items,
        "recommended_certifications": [
            "AWS Certified Machine Learning Specialty (MLS-C01)",
            "DeepLearning.AI TensorFlow / PyTorch Developer Professional Certificate",
            "Google Cloud Professional Data Engineer"
        ],
        "recommended_projects": [
            "RAG-based College Assistant",
            "Multi-Agent AI Research Assistant",
            "Autonomous Code Reviewer & Security Scanner"
        ],
        "interview_topics": [
            "Explain the bias-variance tradeoff with a real example.",
            "How does Adam optimizer differ from Standard Stochastic Gradient Descent?",
            "What is the mathematical formulation of Self-Attention in Transformers?",
            "How do vector indexes like FAISS work for high-dimensional search?"
        ]
    }
