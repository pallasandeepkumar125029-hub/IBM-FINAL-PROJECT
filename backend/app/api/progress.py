from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, Streak, Achievement, LearningPath, Phase, Lesson, LessonProgress, Project, ProjectSubmission, Notification

router = APIRouter(prefix="/progress", tags=["Progress Dashboard & Gamification"])

@router.get("/dashboard")
def get_dashboard_summary(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = current_user.profile
    streak = db.query(Streak).filter(Streak.user_id == current_user.id).first()
    
    if not streak:
        streak = Streak(user_id=current_user.id, current_streak=1, xp_points=100, level=1)
        db.add(streak)
        db.commit()
        db.refresh(streak)

    # Learning Path stats
    path = db.query(LearningPath).filter(LearningPath.user_id == current_user.id).first()
    if not path:
        path = db.query(LearningPath).first()

    total_lessons = db.query(Lesson).count()
    completed_lessons = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.is_completed == True
    ).count()

    progress_pct = path.progress_percentage if path else round((completed_lessons / (total_lessons or 1)) * 100, 1)

    # Fetch next lesson
    next_lesson = db.query(Lesson).join(Phase).filter(Phase.status.in_(["in_progress", "not_started"])).first()
    
    # Recommended project
    rec_project = db.query(Project).first()

    # Recent achievements
    achievements = db.query(Achievement).filter(Achievement.user_id == current_user.id).all()
    ach_list = [{
        "id": a.id,
        "title": a.title,
        "description": a.description,
        "icon": a.icon,
        "unlocked_at": a.unlocked_at.isoformat()
    } for a in achievements]

    # Notifications
    notifications = db.query(Notification).filter(Notification.user_id == current_user.id, Notification.is_read == False).all()
    notif_list = [{
        "id": n.id,
        "title": n.title,
        "message": n.message,
        "notification_type": n.notification_type,
        "created_at": n.created_at.isoformat()
    } for n in notifications]

    return {
        "user_name": current_user.full_name,
        "email": current_user.email,
        "career_goal": profile.career_goal if profile else "AI/ML Engineer",
        "current_skill_level": profile.current_skill_level if profile else "Beginner",
        "daily_hours": profile.daily_hours if profile else "2 hours",
        "level": streak.level,
        "xp_points": streak.xp_points,
        "current_streak": streak.current_streak,
        "longest_streak": streak.longest_streak,
        "hours_learned": streak.hours_learned,
        "completed_topics": completed_lessons,
        "total_topics": total_lessons,
        "progress_percentage": progress_pct,
        "current_phase_index": path.current_phase if path else 2,
        "next_lesson": {
            "id": next_lesson.id if next_lesson else 1,
            "title": next_lesson.title if next_lesson else "Vectors & Matrices",
            "topic": next_lesson.topic if next_lesson else "Linear Algebra",
            "estimated_minutes": next_lesson.estimated_minutes if next_lesson else 25
        } if next_lesson else None,
        "recommended_project": {
            "id": rec_project.id if rec_project else 1,
            "title": rec_project.title if rec_project else "AI Student Chatbot",
            "difficulty": rec_project.difficulty if rec_project else "Beginner",
            "duration_hours": rec_project.duration_hours if rec_project else 6
        } if rec_project else None,
        "achievements": ach_list,
        "notifications": notif_list,
        "skill_breakdown": [
            {"skill": "Python Foundations", "mastery": 90},
            {"skill": "Linear Algebra & Math", "mastery": 65},
            {"skill": "Data Structures", "mastery": 40},
            {"skill": "Machine Learning", "mastery": 25},
            {"skill": "Generative AI", "mastery": 15}
        ]
    }
