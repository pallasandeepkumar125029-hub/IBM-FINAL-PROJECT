from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import RAGDocument
from app.rag.engine import rag_engine

router = APIRouter(prefix="/rag", tags=["RAG & Knowledge Base"])

@router.get("/documents")
def get_rag_documents(db: Session = Depends(get_db)):
    docs = db.query(RAGDocument).all()
    return [{
        "id": d.id,
        "title": d.title,
        "category": d.category,
        "content_snippet": d.content[:150] + "...",
        "source_url": d.source_url
    } for d in docs]

@router.post("/search")
def search_rag(query_dict: dict, db: Session = Depends(get_db)):
    query = query_dict.get("query", "")
    results = rag_engine.retrieve_context(query, db, top_k=3)
    return {
        "query": query,
        "results_count": len(results),
        "documents": results
    }
