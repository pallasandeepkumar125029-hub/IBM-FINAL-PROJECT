from typing import List, Dict, Any, Optional
from app.ai.providers.base import BaseAIProvider

class MockAIProvider(BaseAIProvider):
    """
    Context-aware AI Provider that produces high-quality structured responses 
    for all 5 SkillPilot AI agents without external API key dependencies.
    """
    
    def generate_text(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        return f"Response to: {prompt[:100]}..."

    def generate_agent_response(
        self, 
        agent_type: str, 
        user_message: str, 
        context: Optional[Dict[str, Any]] = None,
        rag_sources: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        
        msg_lower = user_message.lower()
        rag_context_str = ""
        if rag_sources:
            rag_context_str = "\n\n> 📚 **Verified Knowledge Source**: " + rag_sources[0].get("title", "") + "\n" + rag_sources[0].get("content", "")[:180] + "...\n"

        # 1. TUTOR AGENT (Patient Mentor: Explain -> Example -> Ask -> Practice)
        if agent_type == "tutor":
            if "backpropagation" in msg_lower or "gradient" in msg_lower:
                message = """# 🧠 Master Class: Backpropagation & Chain Rule

Backpropagation is how artificial neural networks calculate error gradients and update their weights!

""" + rag_context_str + """
### 1. Simple Intuition
Imagine you are playing archery blindfolded. Your mentor standing behind you says *"Aim 2 inches higher and 1 inch left"*. 
Backpropagation is that mentor — measuring how much each neuron contributed to the total target error!

### 2. Concrete Example
For a simple neuron y = w * x + b with target t:
1. **Forward Pass**: Compute prediction y_hat and Loss L = (y_hat - t)^2.
2. **Backward Pass**: Apply calculus chain rule to compute derivatives dL/dw = (dL/dy_hat) * (dy_hat/dw).

```python
# Mini Backprop Simulation in Python
x, target, w, b = 2.0, 10.0, 1.5, 0.5
learning_rate = 0.05

y_pred = w * x + b
loss = (y_pred - target) ** 2

# Gradients
dL_dpred = 2 * (y_pred - target)
dpred_dw = x

dL_dw = dL_dpred * dpred_dw
w_new = w - learning_rate * dL_dw

print(f"Loss: {loss:.2f} -> Updated weight w: {w_new:.2f}")
```

### 3. Quick Concept Check 🎯
*If we double the learning rate, will gradient descent converge faster or risk overshooting? What do you think?*
"""
                suggested = [
                    "What happens if gradients explode or vanish?",
                    "Can you explain the Adam optimizer?",
                    "Generate a backprop practice question!"
                ]

            elif "python" in msg_lower or "code" in msg_lower or "debug" in msg_lower:
                message = """# 🐍 Python Learning & Debugging Guide

Great question about Python execution! Python is an interpreted, dynamically-typed language that balances high readability with massive AI ecosystem support (NumPy, PyTorch, Scikit-Learn).

""" + rag_context_str + """
### Code Example & Debugging Strategy
```python
import numpy as np

# Defensive matrix shape check
def verify_layer_weights(X, W):
    if X.shape[1] != W.shape[0]:
        raise ValueError(f"Shape mismatch! Incompatible matrix dimensions: {X.shape} and {W.shape}")
    return np.dot(X, W)

# Example batch of 4 samples with 3 features
X = np.random.randn(4, 3)
W = np.random.randn(3, 5) # outputs 5 features
output = verify_layer_weights(X, W)
print("Transformation successful! Output matrix shape:", output.shape)
```

### Next Practice Step 🛠️
Try implementing a function that standardizes a dataset by subtracting the mean and dividing by the standard deviation. Would you like me to guide you step-by-step?
"""
                suggested = [
                    "How does vectorization speed up loops in NumPy?",
                    "Explain object-oriented programming in Python for AI",
                    "Give me a Python coding challenge"
                ]

            else:
                message = """# 🤖 SkillPilot AI Tutor

I am your personal AI Tutor for SDG 4 Quality Education! I'm here to help you break down complex AI, Math, and CS concepts step-by-step.

""" + rag_context_str + """
### How we'll learn together:
1. **Conceptual Intuition**: Plain language explanations.
2. **Mathematical Precision**: Formulating equations cleanly.
3. **Executable Code**: Hands-on Python snippets.
4. **Interactive Practice**: Immediate feedback on your answers.

What specific topic would you like to explore or debug right now? (e.g. *Linear Algebra, Neural Networks, Loss Functions, or PyTorch*)
"""
                suggested = [
                    "Explain Matrix Multiplication intuitively",
                    "What is the difference between Supervised and Unsupervised Learning?",
                    "How do Transformer models use Self-Attention?"
                ]

            return {
                "agent_type": "tutor",
                "agent_name": "Tutor Agent 👨‍🏫",
                "message": message,
                "suggested_actions": suggested
            }

        # 2. RESEARCH AGENT
        elif agent_type == "research":
            message = """# 📰 SkillPilot AI Research Desk

""" + rag_context_str + """
### Top AI Breakthroughs & Industry Developments

1. **Reasoning Models & Test-Time Compute Scaling**
   - **Key Finding**: Modern LLMs improve performance on complex STEM and coding problems by generating reasoning traces before returning answers.
   - **Why It Matters**: AI engineering is shifting from prompt engineering to system architecture and verification loops.

2. **Long-Context Window Memory & Vector Stores**
   - **Key Finding**: Hybrid RAG (combining sparse BM25 search + dense embedding search) achieves 94%+ retrieval precision.
   - **Student Skill Focus**: Learn vector indexing with FAISS/ChromaDB and chunking strategies.

### Recommended Next Paper / Reading:
📄 *“Attention Is All You Need”* & *“Retrieval-Augmented Generation for Knowledge-Intensive Tasks”*
"""
            return {
                "agent_type": "research",
                "agent_name": "Research Agent 🔬",
                "message": message,
                "suggested_actions": [
                    "Summarize the latest PyTorch updates",
                    "What vector databases should I learn first?",
                    "Take a 2-minute quiz on AI research"
                ]
            }

        # 3. CAREER COACH AGENT
        elif agent_type == "career":
            message = """# 💼 AI/ML Career Readiness Report

Hello Alex! Based on your target goal (**AI/ML Engineer**) and current profile (**B.Tech CSE, Beginner**):

""" + rag_context_str + """
### 📊 Skill Gap Matrix
- ✅ **Python Basics**: Strong foundation.
- 🟡 **Mathematics & Linear Algebra**: Currently in progress (70% matching required matrix concepts).
- 🔴 **PyTorch & Model Training**: Needed for internship readiness.
- 🔴 **RAG & Vector Search**: Essential for modern AI developer roles.

### 🎯 Recommended Career Roadmap (Next 60 Days):
1. **Complete Phase 2 & Phase 3** on your SkillPilot Learning Path.
2. **Build Capstone Project**: *RAG-based College Assistant*.
3. **Certifications to Consider**: AWS Certified Machine Learning Specialty or TensorFlow Developer.
4. **Target Roles**: Junior ML Engineer, AI Software Developer Intern.

Would you like to run a **Mock AI Technical Interview Question** right now?
"""
            return {
                "agent_type": "career",
                "agent_name": "Career Coach Agent 🎯",
                "message": message,
                "suggested_actions": [
                    "Start a Mock AI Technical Interview",
                    "Which certifications are worth taking?",
                    "Review my resume points for AI/ML roles"
                ]
            }

        # 4. QUIZ MASTER AGENT
        elif agent_type == "quiz":
            message = """# 🎯 SkillPilot Adaptive Quiz Challenge

Let's test your understanding and calibrate your learning difficulty!

### Question 1 (Linear Algebra & Deep Learning):
**In a dense neural network layer with weight matrix W of size (D_in, D_out), what is the function of the bias vector B?**

- A) It normalizes the input variance to 1.0.
- B) It allows the activation function to shift horizontally, enabling non-zero thresholding.
- C) It eliminates the need for matrix multiplication.
- D) It reduces the number of trainable parameters by half.

Reply with your answer (A, B, C, or D) to receive instant explanation & score adjustments!
"""
            return {
                "agent_type": "quiz",
                "agent_name": "Quiz Master Agent 🏆",
                "message": message,
                "suggested_actions": [
                    "Answer A",
                    "Answer B",
                    "Generate a Python coding quiz instead"
                ]
            }

        # 5. REMINDER AGENT
        else:
            message = """# 🔥 Daily Learning Consistency Alert

Hey Alex! You are currently on a **12-Day Learning Streak**! ⚡

- **Today's Goal**: 2 Hours (Linear Algebra & Matrix Operations)
- **XP Earned Today**: 150 XP
- **Next Milestone**: 14-Day Streak Badge 🏅

> *"Success is the sum of small efforts repeated day in and day out."*

Ready to spend 20 minutes on your next lesson now?
"""
            return {
                "agent_type": "reminder",
                "agent_name": "Reminder Agent ⏰",
                "message": message,
                "suggested_actions": [
                    "Continue Phase 2 Lesson 2",
                    "View My Learning Streak Stats",
                    "Set study timer for 30 minutes"
                ]
            }
