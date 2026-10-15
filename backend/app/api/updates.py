import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import AIUpdate

router = APIRouter(prefix="/updates", tags=["AI Updates & Knowledge Feed"])

@router.get("/")
def get_ai_updates(db: Session = Depends(get_db)):
    updates = db.query(AIUpdate).order_by(AIUpdate.timestamp.desc()).all()
    res = []
    for u in updates:
        res.append({
            "id": u.id,
            "title": u.title,
            "category": u.category,
            "summary": u.summary,
            "why_it_matters": u.why_it_matters,
            "related_skills": json.loads(u.related_skills_json) if u.related_skills_json else [],
            "paper_url": u.paper_url,
            "source": u.source,
            "timestamp": u.timestamp.isoformat(),
            "quiz": json.loads(u.quiz_json) if u.quiz_json else None
        })
    return res

@router.get("/{update_id}")
def get_ai_update_by_id(update_id: int, db: Session = Depends(get_db)):
    u = db.query(AIUpdate).filter(AIUpdate.id == update_id).first()
    if not u:
        raise HTTPException(status_code=404, detail="AI Update not found")

    return {
        "id": u.id,
        "title": u.title,
        "category": u.category,
        "summary": u.summary,
        "why_it_matters": u.why_it_matters,
        "related_skills": json.loads(u.related_skills_json) if u.related_skills_json else [],
        "paper_url": u.paper_url,
        "source": u.source,
        "timestamp": u.timestamp.isoformat(),
        "quiz": json.loads(u.quiz_json) if u.quiz_json else None
    }
