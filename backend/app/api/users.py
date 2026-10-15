from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, Profile, UserSkill, LearningPath, Phase, Lesson
from app.schemas.schemas import OnboardingSubmit, ProfileUpdate

router = APIRouter(prefix="/users", tags=["User & Onboarding"])

@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = current_user.profile
    user_skills = db.query(UserSkill).filter(UserSkill.user_id == current_user.id).all()
    skills_list = [{"skill_name": s.skill_name, "proficiency": s.proficiency} for s in user_skills]
    
    return {
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,
        "education_level": profile.education_level if profile else "",
        "college": profile.college if profile else "",
        "degree": profile.degree if profile else "",
        "year_of_study": profile.year_of_study if profile else "",
        "career_goal": profile.career_goal if profile else "",
        "current_skill_level": profile.current_skill_level if profile else "",
        "daily_hours": profile.daily_hours if profile else "",
        "learning_preferences": profile.learning_preferences if profile else "",
        "onboarded": profile.onboarded if profile else False,
        "skills": skills_list
    }

@router.post("/onboarding")
def submit_onboarding(data: OnboardingSubmit, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = current_user.profile
    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)
        
    profile.education_level = data.education_level
    profile.college = data.college
    profile.degree = data.degree
    profile.year_of_study = data.year_of_study
    profile.career_goal = data.career_goal
    profile.current_skill_level = data.current_skill_level
    profile.daily_hours = data.daily_hours
    profile.learning_preferences = data.learning_preferences
    profile.onboarded = True

    # Update skills
    db.query(UserSkill).filter(UserSkill.user_id == current_user.id).delete()
    for item in data.skills:
        db.add(UserSkill(
            user_id=current_user.id,
            skill_name=item.get("skill_name", "Python"),
            proficiency=item.get("proficiency", "Beginner")
        ))
        
    db.commit()
    
    return {
        "status": "success",
        "message": "Onboarding completed successfully!",
        "onboarded": True,
        "career_goal": data.career_goal
    }
