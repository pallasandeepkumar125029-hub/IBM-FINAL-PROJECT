from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class BaseAIProvider(ABC):
    @abstractmethod
    def generate_text(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        pass

    @abstractmethod
    def generate_agent_response(
        self, 
        agent_type: str, 
        user_message: str, 
        context: Optional[Dict[str, Any]] = None,
        rag_sources: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        pass
