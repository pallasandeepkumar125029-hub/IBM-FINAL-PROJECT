from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models.models import User, AIConversation, AIMessage
from app.schemas.schemas import TutorQuery, TutorResponse
from app.ai.orchestrator import orchestrator

router = APIRouter(prefix="/tutor", tags=["AI Tutor & Multi-Agent"])

@router.post("/chat", response_model=TutorResponse)
def chat_with_tutor(query: TutorQuery, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv_id = query.conversation_id
    conversation = None
    
    if conv_id:
        conversation = db.query(AIConversation).filter(
            AIConversation.id == conv_id, 
            AIConversation.user_id == current_user.id
        ).first()
        
    if not conversation:
        conversation = AIConversation(
            user_id=current_user.id,
            title=f"Chat about: {query.message[:30]}...",
            active_agent=query.preferred_agent or "auto"
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # Save User message
    user_msg = AIMessage(
        conversation_id=conversation.id,
        sender="user",
        agent_type=query.preferred_agent or "auto",
        message=query.message
    )
    db.add(user_msg)
    db.commit()

    # Process via Multi-Agent Orchestrator
    user_context = {
        "user_name": current_user.full_name,
        "education": current_user.profile.education_level if current_user.profile else "",
        "career_goal": current_user.profile.career_goal if current_user.profile else ""
    }

    ai_result = orchestrator.process_user_query(
        user_message=query.message,
        db=db,
        preferred_agent=query.preferred_agent or "auto",
        user_context=user_context
    )

    # Save Assistant message
    assistant_msg = AIMessage(
        conversation_id=conversation.id,
        sender="assistant",
        agent_type=ai_result["agent_type"],
        message=ai_result["message"]
    )
    db.add(assistant_msg)
    db.commit()

    return {
        "conversation_id": conversation.id,
        "sender": "assistant",
        "agent_type": ai_result["agent_type"],
        "agent_name": ai_result["agent_name"],
        "message": ai_result["message"],
        "suggested_actions": ai_result.get("suggested_actions", []),
        "rag_sources": ai_result.get("rag_sources", [])
    }

@router.get("/conversations")
def get_conversations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    convs = db.query(AIConversation).filter(AIConversation.user_id == current_user.id).order_by(AIConversation.created_at.desc()).all()
    return [{
        "id": c.id,
        "title": c.title,
        "active_agent": c.active_agent,
        "created_at": c.created_at.isoformat()
    } for c in convs]

@router.get("/conversations/{conv_id}")
def get_conversation_history(conv_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv = db.query(AIConversation).filter(AIConversation.id == conv_id, AIConversation.user_id == current_user.id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    msgs = db.query(AIMessage).filter(AIMessage.conversation_id == conv_id).order_by(AIMessage.timestamp.asc()).all()
    return {
        "id": conv.id,
        "title": conv.title,
        "messages": [{
            "id": m.id,
            "sender": m.sender,
            "agent_type": m.agent_type,
            "message": m.message,
            "timestamp": m.timestamp.isoformat()
        } for m in msgs]
    }
