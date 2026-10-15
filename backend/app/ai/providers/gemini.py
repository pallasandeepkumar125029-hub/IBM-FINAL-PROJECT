import requests
import json
from typing import List, Dict, Any, Optional
from app.ai.providers.base import BaseAIProvider
from app.ai.providers.mock_provider import MockAIProvider
from app.core.config import settings

class GeminiAIProvider(BaseAIProvider):
    """
    Google Gemini AI Provider with automatic fallback to MockAIProvider 
    if API key is missing or network call fails.
    """
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.fallback_provider = MockAIProvider()

    def generate_text(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        if not self.api_key:
            return self.fallback_provider.generate_text(prompt, system_instruction)
        
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={self.api_key}"
            payload = {
                "contents": [{"parts": [{"text": f"{system_instruction or ''}\n\nUser Question:\n{prompt}"}]}]
            }
            resp = requests.post(url, json=payload, timeout=10)
            if resp.status_code == 200:
                data = resp.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception:
            pass
            
        return self.fallback_provider.generate_text(prompt, system_instruction)

    def generate_agent_response(
        self, 
        agent_type: str, 
        user_message: str, 
        context: Optional[Dict[str, Any]] = None,
        rag_sources: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        if not self.api_key:
            return self.fallback_provider.generate_agent_response(agent_type, user_message, context, rag_sources)
            
        # If API key is available, call Gemini API
        try:
            rag_context = ""
            if rag_sources:
                rag_context = f"\nRelevant Knowledge Docs:\n" + "\n".join([f"- {s.get('title')}: {s.get('content')}" for s in rag_sources])
                
            prompt = f"Agent Type: {agent_type}\nLearner Message: {user_message}\n{rag_context}"
            system_prompt = f"You are SkillPilot AI's {agent_type.capitalize()} Agent adhering to UN SDG 4 Quality Education. Provide clear, empathetic, structured markdown explanations."
            
            text_result = self.generate_text(prompt, system_prompt)
            return {
                "agent_type": agent_type,
                "agent_name": f"{agent_type.capitalize()} Agent 🤖",
                "message": text_result,
                "suggested_actions": ["Ask a follow-up question", "Generate practice quiz", "Explain with another example"]
            }
        except Exception:
            return self.fallback_provider.generate_agent_response(agent_type, user_message, context, rag_sources)
