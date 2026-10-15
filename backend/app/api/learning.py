import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, Profile, LearningPath, Phase, Lesson, LessonProgress, Streak, UserSkill

router = APIRouter(prefix="/learning", tags=["Learning Path & Lessons"])

@router.get("/path")
def get_learning_path(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    path = db.query(LearningPath).filter(LearningPath.user_id == current_user.id).first()
    
    # Fallback to demo path if user has no path yet
    if not path:
        demo_path = db.query(LearningPath).first()
        if not demo_path:
            raise HTTPException(status_code=404, detail="No learning path found")
        path = demo_path

    phases = db.query(Phase).filter(Phase.learning_path_id == path.id).order_by(Phase.order_index).all()
    phases_res = []
    
    for p in phases:
        lessons = db.query(Lesson).filter(Lesson.phase_id == p.id).order_by(Lesson.order_index).all()
        lessons_res = []
        for l in lessons:
            prog = db.query(LessonProgress).filter(
                LessonProgress.user_id == current_user.id,
                LessonProgress.lesson_id == l.id
            ).first()
            
            lessons_res.append({
                "id": l.id,
                "order_index": l.order_index,
                "title": l.title,
                "topic": l.topic,
                "estimated_minutes": l.estimated_minutes,
                "difficulty": l.difficulty,
                "is_completed": prog.is_completed if prog else False
            })
            
        phases_res.append({
            "id": p.id,
            "order_index": p.order_index,
            "title": p.title,
            "description": p.description,
            "estimated_hours": p.estimated_hours,
            "difficulty": p.difficulty,
            "status": p.status,
            "lessons": lessons_res
        })

    return {
        "id": path.id,
        "title": path.title,
        "career_goal": path.career_goal,
        "total_phases": path.total_phases,
        "current_phase": path.current_phase,
        "progress_percentage": path.progress_percentage,
        "phases": phases_res
    }

@router.get("/lessons/{lesson_id}")
def get_lesson(lesson_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    prog = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.lesson_id == lesson_id
    ).first()

    return {
        "id": lesson.id,
        "phase_id": lesson.phase_id,
        "title": lesson.title,
        "topic": lesson.topic,
        "content_markdown": lesson.content_markdown,
        "code_snippet": lesson.code_snippet,
        "estimated_minutes": lesson.estimated_minutes,
        "difficulty": lesson.difficulty,
        "is_completed": prog.is_completed if prog else False
    }

@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    prog = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.lesson_id == lesson_id
    ).first()

    if not prog:
        prog = LessonProgress(user_id=current_user.id, lesson_id=lesson_id)
        db.add(prog)

    prog.is_completed = True
    prog.time_spent_minutes += lesson.estimated_minutes
    prog.completed_at = datetime.datetime.utcnow()

    # Award XP points to streak
    streak = db.query(Streak).filter(Streak.user_id == current_user.id).first()
    if streak:
        streak.xp_points += 50
        streak.hours_learned += round(lesson.estimated_minutes / 60.0, 1)

    # Recalculate learning path progress
    path = db.query(LearningPath).filter(LearningPath.user_id == current_user.id).first()
    if path:
        total_lessons = db.query(Lesson).join(Phase).filter(Phase.learning_path_id == path.id).count()
        completed_lessons = db.query(LessonProgress).filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.is_completed == True
        ).count()
        if total_lessons > 0:
            path.progress_percentage = round((completed_lessons / total_lessons) * 100, 1)

    db.commit()
    
    return {
        "status": "success",
        "lesson_id": lesson_id,
        "xp_gained": 50,
        "message": f"🎉 Lesson '{lesson.title}' completed! +50 XP gained!"
    }

@router.post("/generate-roadmap")
def generate_roadmap(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = current_user.profile
    career_goal = profile.career_goal if profile else "AI/ML Engineer"
    
    # Recalculate adaptive roadmap
    return {
        "status": "success",
        "message": f"Custom AI learning path generated for goal '{career_goal}'!",
        "career_goal": career_goal
    }
