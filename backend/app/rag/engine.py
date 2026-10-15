from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.models import RAGDocument
from app.rag.vector_store import vector_store

class RAGEngine:
    def __init__(self):
        self.is_initialized = False

    def sync_from_db(self, db: Session):
        """Populate vector store with documents from database."""
        docs = db.query(RAGDocument).all()
        vector_store.documents = []
        for doc in docs:
            vector_store.add_document(
                doc_id=doc.id,
                title=doc.title,
                category=doc.category,
                content=doc.content,
                source_url=doc.source_url or ""
            )
        self.is_initialized = True

    def retrieve_context(self, query: str, db: Session, top_k: int = 2) -> List[Dict[str, Any]]:
        if not self.is_initialized:
            self.sync_from_db(db)
        return vector_store.search(query, top_k=top_k)

rag_engine = RAGEngine()
