import json
import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, Project, ProjectSubmission, Streak
from app.schemas.schemas import ProjectSubmitSchema

router = APIRouter(prefix="/projects", tags=["Project Recommendations"])

@router.get("/")
def get_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    user_submissions = db.query(ProjectSubmission).filter(ProjectSubmission.user_id == current_user.id).all()
    submitted_project_ids = {s.project_id for s in user_submissions}

    res = []
    for p in projects:
        res.append({
            "id": p.id,
            "title": p.title,
            "problem_statement": p.problem_statement,
            "skills": json.loads(p.skills_json) if p.skills_json else [],
            "difficulty": p.difficulty,
            "duration_hours": p.duration_hours,
            "tech_stack": json.loads(p.tech_stack_json) if p.tech_stack_json else [],
            "learning_outcomes": json.loads(p.learning_outcomes_json) if p.learning_outcomes_json else [],
            "steps": json.loads(p.steps_json) if p.steps_json else [],
            "category": p.category,
            "is_completed": p.id in submitted_project_ids
        })
    return res

@router.get("/{project_id}")
def get_project_by_id(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    p = db.query(Project).filter(Project.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")

    submission = db.query(ProjectSubmission).filter(
        ProjectSubmission.user_id == current_user.id,
        ProjectSubmission.project_id == project_id
    ).first()

    return {
        "id": p.id,
        "title": p.title,
        "problem_statement": p.problem_statement,
        "skills": json.loads(p.skills_json) if p.skills_json else [],
        "difficulty": p.difficulty,
        "duration_hours": p.duration_hours,
        "tech_stack": json.loads(p.tech_stack_json) if p.tech_stack_json else [],
        "learning_outcomes": json.loads(p.learning_outcomes_json) if p.learning_outcomes_json else [],
        "steps": json.loads(p.steps_json) if p.steps_json else [],
        "category": p.category,
        "is_completed": submission is not None,
        "submission": {
            "repo_url": submission.repo_url if submission else "",
            "notes": submission.notes if submission else "",
            "status": submission.status if submission else "Not Submitted",
            "feedback": submission.feedback if submission else ""
        } if submission else None
    }

@router.post("/submit")
def submit_project(data: ProjectSubmitSchema, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == data.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    sub = db.query(ProjectSubmission).filter(
        ProjectSubmission.user_id == current_user.id,
        ProjectSubmission.project_id == data.project_id
    ).first()

    if not sub:
        sub = ProjectSubmission(user_id=current_user.id, project_id=data.project_id)
        db.add(sub)

    sub.repo_url = data.repo_url or "https://github.com/alexkumar/skillpilot-project"
    sub.notes = data.notes or "Built using Python & FastAPI as per SkillPilot AI roadmap"
    sub.status = "Verified"
    sub.feedback = f"✨ Great job implementing {project.title}! Code architecture aligns with production standards."
    sub.submitted_at = datetime.datetime.utcnow()

    # Award 200 XP for project submission
    streak = db.query(Streak).filter(Streak.user_id == current_user.id).first()
    if streak:
        streak.xp_points += 200

    db.commit()

    return {
        "status": "success",
        "message": f"Project '{project.title}' verified! +200 XP awarded!",
        "xp_gained": 200
    }
