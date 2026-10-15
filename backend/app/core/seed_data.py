import json
import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, init_db
from app.core.security import hash_password
from app.models.models import (
    User, Profile, UserSkill, LearningPath, Phase, Lesson, LessonProgress,
    Quiz, Question, QuizAttempt, Project, ProjectSubmission, AIConversation,
    AIMessage, AIUpdate, Streak, Achievement, Notification, RAGDocument
)

def seed_database():
    init_db()
    db: Session = SessionLocal()
    
    # Check if demo user already exists
    existing_user = db.query(User).filter(User.email == "alex@skillpilot.ai").first()
    if existing_user:
        db.close()
        return

    print("Seeding database with SkillPilot AI demo data...")
    
    # 1. Create Demo Student User
    demo_user = User(
        email="alex@skillpilot.ai",
        hashed_password=hash_password("password123"),
        full_name="Alex Kumar",
        role="student",
        is_active=True
    )
    db.add(demo_user)
    
    # 2. Create Admin User
    admin_user = User(
        email="admin@skillpilot.ai",
        hashed_password=hash_password("adminpassword"),
        full_name="SkillPilot Educator",
        role="admin",
        is_active=True
    )
    db.add(admin_user)
    db.commit()
    db.refresh(demo_user)
    db.refresh(admin_user)

    # 3. Create Student Profile
    profile = Profile(
        user_id=demo_user.id,
        education_level="B.Tech CSE",
        college="National Institute of Technology",
        degree="Computer Science & Engineering",
        year_of_study="3rd Year",
        career_goal="AI/ML Engineer",
        current_skill_level="Beginner",
        daily_hours="2 hours",
        learning_preferences="Interactive AI Tutoring + Project-Based Coding",
        onboarded=True
    )
    db.add(profile)

    # 4. User Skills
    skills_data = [
        ("Python", "Beginner"),
        ("Mathematics & Linear Algebra", "Beginner"),
        ("Machine Learning Fundamentals", "Beginner"),
        ("Data Structures & Algorithms", "Beginner"),
        ("PyTorch & Neural Networks", "Not Started"),
        ("Generative AI & LLMs", "Not Started")
    ]
    for s_name, prof in skills_data:
        db.add(UserSkill(user_id=demo_user.id, skill_name=s_name, proficiency=prof))

    # 5. Streak & XP
    streak = Streak(
        user_id=demo_user.id,
        current_streak=12,
        longest_streak=14,
        xp_points=1450,
        level=4,
        hours_learned=18.5,
        last_activity_date=datetime.datetime.utcnow()
    )
    db.add(streak)

    # 6. Achievements
    achievements = [
        Achievement(user_id=demo_user.id, title="10-Day Streak Warrior", description="Maintained a learning streak for 10 straight days!", icon="zap"),
        Achievement(user_id=demo_user.id, title="Python Explorer", description="Completed all Python Fundamentals modules.", icon="code"),
        Achievement(user_id=demo_user.id, title="Quiz Ace", description="Scored over 90% in an adaptive AI quiz.", icon="award"),
        Achievement(user_id=demo_user.id, title="SDG 4 Advocate", description="Dedicated over 15 hours to self-paced quality AI education.", icon="globe")
    ]
    for ach in achievements:
        db.add(ach)

    # 7. Notifications
    notifications = [
        Notification(user_id=demo_user.id, title="🔥 Streak Alert", message="You are 1 day away from a 13-day learning streak! Keep it up!", notification_type="streak"),
        Notification(user_id=demo_user.id, title="🤖 AI Mentor Insight", message="Your Tutor Agent noticed you aced Matrix Operations. Ready for Vector Calculus?", notification_type="lesson"),
        Notification(user_id=demo_user.id, title="🚀 New Project Recommendation", message="Build a RAG-based College Assistant project to unlock Phase 6!", notification_type="project")
    ]
    for notif in notifications:
        db.add(notif)

    # 8. Learning Path & 8 Phases
    path = LearningPath(
        user_id=demo_user.id,
        title="AI/ML Engineer Mastery Path",
        career_goal="AI/ML Engineer",
        total_phases=8,
        current_phase=2,
        progress_percentage=28.5
    )
    db.add(path)
    db.commit()
    db.refresh(path)

    phases_info = [
        (1, "Phase 1: Python & Programming Foundations", "Master core Python 3.12, control flow, functions, OOP, and data processing libraries (NumPy, Pandas).", 12, "Beginner", "completed"),
        (2, "Phase 2: Mathematics & Statistics for AI", "Build intuition for Linear Algebra, Matrix Multiplication, Vector Spaces, Calculus derivatives, and Probability Distributions.", 15, "Beginner", "in_progress"),
        (3, "Phase 3: Data Structures & Algorithms for ML", "Master arrays, hash tables, trees, search algorithms, and algorithmic complexity essential for AI software engineering.", 14, "Intermediate", "not_started"),
        (4, "Phase 4: Classical Machine Learning & Scikit-Learn", "Learn Supervised & Unsupervised learning: Regression, Classification, Decision Trees, SVMs, Clustering, and Model Evaluation.", 20, "Intermediate", "not_started"),
        (5, "Phase 5: Deep Learning & Neural Networks", "Understand Multi-Layer Perceptrons, Backpropagation, Loss Functions, Optimizers (Adam, SGD), PyTorch framework, and CNNs/RNNs.", 25, "Intermediate", "not_started"),
        (6, "Phase 6: Generative AI, LLMs & Prompting", "Master Transformers Architecture, Self-Attention Mechanisms, Tokenization, Fine-Tuning, RAG, and Vector Databases.", 30, "Advanced", "not_started"),
        (7, "Phase 7: Hands-On Production AI Projects", "Build and deploy production-ready AI applications, Multi-Agent systems, and REST API microservices.", 35, "Advanced", "not_started"),
        (8, "Phase 8: AI Engineering Interview Mastery", "Master System Design for ML, Coding Assessments, Behavioral Interviews, and Portfolio building.", 20, "Advanced", "not_started"),
    ]

    phase_objects = []
    for order, p_title, p_desc, est_h, diff, status in phases_info:
        p_obj = Phase(
            learning_path_id=path.id,
            order_index=order,
            title=p_title,
            description=p_desc,
            estimated_hours=est_h,
            difficulty=diff,
            status=status
        )
        db.add(p_obj)
        phase_objects.append(p_obj)
    
    db.commit()

    # 9. Populate Lessons for Phase 1 & Phase 2
    lessons_data = [
        # Phase 1
        (phase_objects[0].id, 1, "Variables, Data Types & Operations", "Python Fundamentals",
         """# Python Variables & Data Types

Welcome to your first lesson in **SkillPilot AI**! Python is the core language of Artificial Intelligence.

## Core Data Types
- **Integers (`int`)**: Whole numbers like `42` or `-7`
- **Floats (`float`)**: Decimal numbers like `3.14159`
- **Strings (`str`)**: Text wrapped in quotes like `"SkillPilot"`
- **Booleans (`bool`)**: `True` or `False`

## Key Concepts
Python uses dynamic typing. You don't need to declare type explicitly:
```python
learning_goal = "AI Engineer"
daily_hours = 2
is_motivated = True
```

### Dynamic Type Casting
```python
score_str = "95"
score_int = int(score_str)
```
""", 
         "learning_goal = 'AI/ML Engineer'\ndaily_hours = 2\nprint(f'Target: {learning_goal} in {daily_hours}h/day!')", 15, "Beginner"),

        (phase_objects[0].id, 2, "Control Flow & Dynamic Loops", "Python Control Logic",
         """# Python Conditionals & Loops

Decision making is fundamental to algorithm design.

## `if / elif / else` Statements
```python
accuracy = 0.88

if accuracy >= 0.90:
    print("Model Performance: Excellent")
elif accuracy >= 0.75:
    print("Model Performance: Acceptable")
else:
    print("Model Needs Retraining")
```

## `for` Loops & List Comprehensions
```python
metrics = [0.82, 0.89, 0.94, 0.78]
high_performers = [m for m in metrics if m > 0.85]
```
""", 
         "metrics = [0.82, 0.89, 0.94]\nfor i, val in enumerate(metrics):\n    print(f'Epoch {i+1}: Accuracy = {val*100:.1f}%')", 20, "Beginner"),

        (phase_objects[0].id, 3, "NumPy Vectorized Arrays", "Scientific Computing",
         """# NumPy Vectorization for AI

NumPy is the bedrock of matrix math in Deep Learning and Data Science.

## Why NumPy over Standard Python Lists?
Standard Python lists execute loops in CPython bytecodes, which is slow. NumPy arrays perform operations using vectorized C-level CPU routines.

```python
import numpy as np

# Create 1D and 2D arrays
vector = np.array([1.0, 2.0, 3.0])
matrix = np.array([[1, 2], [3, 4]])

# Element-wise operations
scaled = vector * 2.5
```
""", 
         "import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nprint('Matrix Multiplication:\\n', np.dot(A, B))", 25, "Beginner"),

        # Phase 2 Lessons
        (phase_objects[1].id, 1, "Vectors, Matrices & Dot Products", "Linear Algebra",
         """# Linear Algebra: Vectors & Dot Products

Linear algebra provides the mathematical language for multi-dimensional data representation in AI.

## What is a Vector?
A vector is an ordered tuple of numbers representing a point or direction in space.
In ML, a feature vector represents an input sample (e.g. house features: `[bedrooms, area_sqft, age]`).

## Dot Product Intuition
The dot product measures the similarity or projection of two vectors:
$$\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^n a_i b_i$$

```python
import numpy as np

u = np.array([1, 2, 3])
v = np.array([4, 5, 6])
dot_prod = np.dot(u, v) # 1*4 + 2*5 + 3*6 = 32
```
""", 
         "import numpy as np\nu = np.array([0.5, 0.8, 0.1])\nw = np.array([1.2, -0.5, 2.0])\nsimilarity = np.dot(u, w)\nprint(f'Neuron activation energy: {similarity:.3f}')", 30, "Beginner"),

        (phase_objects[1].id, 2, "Matrix Multiplication & Transformations", "Linear Algebra",
         """# Matrix Multiplication in Neural Networks

Matrix multiplication is how dense layers transform feature representations in Artificial Neural Networks.

## Matrix Product Rule
For matrices $A_{m \\times n}$ and $B_{n \\times p}$, the result $C = A \\times B$ has dimension $m \\times p$.

$$C_{i,j} = \\sum_{k=1}^n A_{i,k} B_{k,j}$$

## Practical Neural Network Layer Computation
$$Y = X \\cdot W + B$$
Where:
- $X$: Input batch matrix $(N \\times D_{in})$
- $W$: Weight matrix $(D_{in} \\times D_{out})$
- $B$: Bias vector $(D_{out})$
""", 
         "import numpy as np\nX = np.array([[1.0, 2.0], [3.0, 4.0]]) # Batch of 2 samples\nW = np.array([[0.2, 0.8, 0.5], [0.1, -0.4, 0.9]]) # 2 -> 3 neurons\nB = np.array([0.1, 0.1, 0.1])\nY = np.dot(X, W) + B\nprint('Layer Output Matrix:\\n', Y)", 30, "Intermediate"),

        (phase_objects[1].id, 3, "Calculus & Derivatives for Optimization", "Calculus",
         """# Calculus & Gradient Intuition

To train neural networks, we need to minimize a Loss Function $L(\\theta)$. Derivatives tell us the slope and direction of steepest ascent!

## Gradient Vector $\\nabla L$
The gradient vector containing all partial derivatives points in the direction of greatest increase:
$$\\nabla L = \\left[ \\frac{\\partial L}{\\partial w_1}, \\frac{\\partial L}{\\partial w_2}, \\dots \\right]$$

## Gradient Descent Update Rule
To minimize loss, we step in the *opposite* direction:
$$w_{\\text{new}} = w_{\\text{old}} - \\eta \\cdot \\nabla L$$
Where $\\eta$ is the learning rate (e.g. `0.01`).
""", 
         "w = 5.0 # initial weight\nlearning_rate = 0.1\n# Loss function L(w) = w**2 -> Derivative dL/dw = 2*w\nfor epoch in range(5):\n    grad = 2 * w\n    w = w - learning_rate * grad\n    print(f'Epoch {epoch+1}: w = {w:.4f}, Loss = {w**2:.4f}')", 25, "Intermediate")
    ]

    for p_id, ord_i, t_name, top, markdown, code, mins, diff in lessons_data:
        lesson_obj = Lesson(
            phase_id=p_id,
            order_index=ord_i,
            title=t_name,
            topic=top,
            content_markdown=markdown,
            code_snippet=code,
            estimated_minutes=mins,
            difficulty=diff
        )
        db.add(lesson_obj)
    
    db.commit()

    # 10. Sample Adaptive Quizzes
    quiz1 = Quiz(
        phase_id=phase_objects[1].id,
        title="Linear Algebra & Matrix Operations Assessment",
        topic="Linear Algebra",
        difficulty="Adaptive",
        total_questions=4
    )
    db.add(quiz1)
    db.commit()
    db.refresh(quiz1)

    q_data = [
        (quiz1.id, "What is the dimension of the resulting matrix when multiplying matrix A (3x4) by matrix B (4x2)?", "mcq",
         json.dumps(["3x2", "4x4", "3x4", "2x3"]), "3x2", "In matrix multiplication A(m x n) * B(n x p), the resulting matrix dimension is m x p, which is 3x2."),
        (quiz1.id, "True or False: The dot product of two orthogonal (perpendicular) vectors is always equal to 0.", "true_false",
         json.dumps(["True", "False"]), "True", "Since dot product = |u||v|cos(theta), and cos(90 degrees) = 0, orthogonal vectors have a dot product of zero."),
        (quiz1.id, "In Gradient Descent, if the learning rate is set too large, what is most likely to happen?", "mcq",
         json.dumps(["The model diverges or overshoots the minimum", "The model converges instantly", "The loss function stops updating", "The weights become exactly zero"]),
         "The model diverges or overshoots the minimum", "An excessively large learning rate causes step sizes that bounce across the loss landscape without reaching the global minimum."),
        (quiz1.id, "What represents the batch linear transformation formula in a dense neural network layer?", "code",
         json.dumps(["Y = X * W + B", "Y = X + W * B", "Y = W * X - B", "Y = X / W + B"]), "Y = X * W + B", "Y = X * W + B is the standard linear transformation before applying non-linear activation functions.")
    ]

    for qz_id, q_txt, q_type, opts, corr, expl in q_data:
        db.add(Question(
            quiz_id=qz_id,
            question_text=q_txt,
            question_type=q_type,
            options_json=opts,
            correct_answer=corr,
            explanation=expl
        ))

    # 11. Sample Projects
    projects_data = [
        ("AI Student Chatbot & Homework Assistant",
         "Design an interactive command-line and web-based Python study assistant that answers computer science questions, formats code snippets, and maintains study logs.",
         json.dumps(["Python", "API Integration", "JSON Data Parsing"]),
         "Beginner", 6,
         json.dumps(["Python 3.12", "FastAPI", "OpenAI / Gemini API"]),
         json.dumps(["Master API integration", "Implement structured prompt engineering", "Build clean terminal/web UI"]),
         json.dumps(["Step 1: Set up project structure", "Step 2: Create AI client wrapper", "Step 3: Implement prompt template", "Step 4: Build interactive CLI / Web UI"]),
         "AI/ML"),

        ("RAG-based College Assistant",
         "Build a Retrieval-Augmented Generation (RAG) web service that ingests college course syllabi, lecture slides, and notes to provide instant factual context-backed answers.",
         json.dumps(["Python", "Vector Databases", "Embeddings", "FastAPI", "RAG"]),
         "Intermediate", 12,
         json.dumps(["Python", "FastAPI", "FAISS / ChromaDB", "PyPDF", "Sentence Transformers"]),
         json.dumps(["Understand text chunking strategies", "Store vector embeddings", "Perform semantic similarity retrieval"]),
         json.dumps(["Step 1: Extract text from PDF documents", "Step 2: Chunk text into 500-token blocks", "Step 3: Generate vector embeddings", "Step 4: Connect LLM with retrieved context"]),
         "Generative AI"),

        ("Multi-Agent AI Research Assistant",
         "Develop an autonomous team of AI agents (Planner, Web Searcher, Summarizer, Code Verifier) that collaboratively researches technical topics and produces comprehensive markdown reports.",
         json.dumps(["Multi-Agent Systems", "LangGraph / Custom Orchestrator", "Python", "Async Workflows"]),
         "Advanced", 20,
         json.dumps(["Python", "FastAPI", "React", "Vector Store", "LLM Function Calling"]),
         json.dumps(["Architect agentic feedback loops", "Implement state persistence", "Handle error fallback and verification"]),
         json.dumps(["Step 1: Define agent roles & tool interfaces", "Step 2: Build state machine orchestrator", "Step 3: Implement human-in-the-loop review", "Step 4: Create dashboard UI"]),
         "Agentic AI")
    ]

    for p_t, p_s, p_sk, p_d, p_dur, p_ts, p_out, p_step, p_cat in projects_data:
        db.add(Project(
            title=p_t,
            problem_statement=p_s,
            skills_json=p_sk,
            difficulty=p_d,
            duration_hours=p_dur,
            tech_stack_json=p_ts,
            learning_outcomes_json=p_out,
            steps_json=p_step,
            category=p_cat
        ))

    # 12. AI Updates / Knowledge Feed
    ai_updates_data = [
        ("Reasoning Models Break Benchmark Limits on Complex Coding & Math",
         "Research & Models",
         "New reasoning-oriented LLM architectures use test-time compute scaling and Monte Carlo tree search to verify intermediate thinking steps before generating final output.",
         "Students preparing for AI engineering roles should understand chain-of-thought verification, reasoning traces, and evaluation metrics beyond standard next-token prediction.",
         json.dumps(["Reasoning LLMs", "Test-Time Compute", "MCTS", "Evaluation"]),
         "https://arxiv.org/abs/2401.00001",
         "SkillPilot AI Research Desk",
         json.dumps({
             "question": "What key technique enables modern reasoning models to solve complex multi-step math problems?",
             "options": ["Test-Time Compute Scaling & Reasoning Traces", "Increasing learning rate during inference", "Deleting embedding layers", "Using standard n-gram models"],
             "correct": "Test-Time Compute Scaling & Reasoning Traces"
         })),

        ("PyTorch 2.5 Released with Enhanced Graph Compilation & FlexAttention",
         "Tools & Frameworks",
         "PyTorch 2.5 introduces native support for FlexAttention, accelerating transformer attention mechanisms by up to 3x with custom hardware kernel fusion.",
         "Optimized attention kernels are crucial for training long-context LLMs efficiently without memory bottlenecks.",
         json.dumps(["PyTorch", "FlexAttention", "GPU Optimization", "Transformers"]),
         "https://pytorch.org/blog/",
         "PyTorch Core Team Desk",
         json.dumps({
             "question": "What is the primary benefit of FlexAttention in PyTorch 2.5?",
             "options": ["Accelerates transformer attention mechanisms with kernel fusion", "Replaces Python with C++ entirely", "Eliminates gradient descent", "Decreases dataset size"],
             "correct": "Accelerates transformer attention mechanisms with kernel fusion"
         }))
    ]

    for u_title, u_cat, u_sum, u_why, u_rel, u_url, u_src, u_qz in ai_updates_data:
        db.add(AIUpdate(
            title=u_title,
            category=u_cat,
            summary=u_sum,
            why_it_matters=u_why,
            related_skills_json=u_rel,
            paper_url=u_url,
            source=u_src,
            quiz_json=u_qz
        ))

    # 13. RAG Documents
    rag_docs = [
        ("Linear Algebra in AI & Neural Networks", "Mathematics",
         "Linear algebra is the study of vectors and matrices. In neural networks, weights are organized into matrices W and biases into vectors b. Matrix multiplication Y = XW + b performs linear transformation across input features. Dot products measure vector alignment and cosine similarity.",
         "https://skillpilot.ai/docs/linear-algebra"),

        ("Gradient Descent & Backpropagation Architecture", "Deep Learning",
         "Gradient descent is an optimization algorithm that minimizes the loss function by updating parameters in the negative direction of the gradient. Backpropagation uses the chain rule of calculus to compute partial derivatives layer by layer from output to input.",
         "https://skillpilot.ai/docs/gradient-descent"),

        ("Retrieval-Augmented Generation (RAG) Architecture", "Generative AI",
         "RAG combines document retrieval with text generation. Source documents are chunked, embedded into dense vector space, and indexed in a vector store. When a user asks a query, vector search retrieves top-k relevant document chunks, which are passed as context to the LLM prompt.",
         "https://skillpilot.ai/docs/rag-architecture")
    ]

    for r_t, r_c, r_cnt, r_url in rag_docs:
        db.add(RAGDocument(
            title=r_t,
            category=r_c,
            content=r_cnt,
            source_url=r_url
        ))

    db.commit()
    db.close()
    print("SkillPilot AI database successfully seeded!")

if __name__ == "__main__":
    seed_database()
