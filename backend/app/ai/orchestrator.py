from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.ai.providers.gemini import GeminiAIProvider
from app.rag.engine import rag_engine

class AgentOrchestrator:
    def __init__(self):
        self.ai_provider = GeminiAIProvider()

    def determine_target_agent(self, query: str, user_preference: str = "auto") -> str:
        """Dynamically route user query to appropriate agent if preference is 'auto'."""
        if user_preference and user_preference != "auto":
            return user_preference
            
        q_lower = query.lower()
        
        # 1. Career Coach keywords
        if any(k in q_lower for k in ["career", "job", "interview", "resume", "internship", "certification", "salary", "what should i learn next", "role"]):
            return "career"
            
        # 2. Research Agent keywords
        if any(k in q_lower for k in ["latest", "paper", "arxiv", "news", "trend", "breakthrough", "recent model", "claude 3", "gpt-4", "deepseek", "llama"]):
            return "research"
            
        # 3. Quiz Agent keywords
        if any(k in q_lower for k in ["quiz", "test", "question", "assessment", "mcq", "challenge"]):
            return "quiz"
            
        # 4. Reminder Agent keywords
        if any(k in q_lower for k in ["streak", "reminder", "goal", "xp", "points", "badge", "hours"]):
            return "reminder"
            
        # Default -> Tutor Agent
        return "tutor"

    def process_user_query(
        self, 
        user_message: str, 
        db: Session, 
        preferred_agent: str = "auto",
        user_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        
        # 1. Determine target agent
        target_agent = self.determine_target_agent(user_message, preferred_agent)
        
        # 2. Retrieve relevant context via RAG
        rag_sources = rag_engine.retrieve_context(user_message, db, top_k=2)
        
        # 3. Execute agent via AI Provider
        response_data = self.ai_provider.generate_agent_response(
            agent_type=target_agent,
            user_message=user_message,
            context=user_context,
            rag_sources=rag_sources
        )
        
        response_data["rag_sources"] = rag_sources
        return response_data

orchestrator = AgentOrchestrator()
