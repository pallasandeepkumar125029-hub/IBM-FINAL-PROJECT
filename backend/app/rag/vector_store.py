import math
import re
from typing import List, Dict, Any, Tuple

class SimpleVectorStore:
    """
    Lightweight, fast in-memory TF-IDF Vector Search engine for RAG knowledge retrieval.
    Can be easily swapped with pgvector/Pinecone/Qdrant in production.
    """
    def __init__(self):
        self.documents: List[Dict[str, Any]] = []

    def _tokenize(self, text: str) -> List[str]:
        """Convert text into lowercase tokens."""
        return re.findall(r'\w+', text.lower())

    def add_document(self, doc_id: int, title: str, category: str, content: str, source_url: str = ""):
        tokens = self._tokenize(title + " " + category + " " + content)
        self.documents.append({
            "id": doc_id,
            "title": title,
            "category": category,
            "content": content,
            "source_url": source_url,
            "tokens": tokens,
            "token_counts": self._count_tokens(tokens)
        })

    def _count_tokens(self, tokens: List[str]) -> Dict[str, int]:
        counts: Dict[str, int] = {}
        for t in tokens:
            counts[t] = counts.get(t, 0) + 1
        return counts

    def search(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        query_tokens = self._tokenize(query)
        if not query_tokens or not self.documents:
            return []

        scored_docs: List[Tuple[float, Dict[str, Any]]] = []

        for doc in self.documents:
            score = 0.0
            doc_counts = doc["token_counts"]
            total_doc_tokens = len(doc["tokens"]) or 1

            for qt in query_tokens:
                if qt in doc_counts:
                    # Term frequency calculation
                    tf = doc_counts[qt] / total_doc_tokens
                    # Title boost
                    if qt in doc["title"].lower():
                        tf *= 2.5
                    score += tf

            if score > 0:
                scored_docs.append((score, {
                    "id": doc["id"],
                    "title": doc["title"],
                    "category": doc["category"],
                    "content": doc["content"],
                    "source_url": doc["source_url"],
                    "score": round(score, 4)
                }))

        scored_docs.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scored_docs[:top_k]]

vector_store = SimpleVectorStore()
