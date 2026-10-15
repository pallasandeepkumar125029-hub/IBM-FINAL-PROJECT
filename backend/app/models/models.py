from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default="student") # student, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False)
    learning_paths = relationship("LearningPath", back_populates="user")
    quiz_attempts = relationship("QuizAttempt", back_populates="user")
    streak = relationship("Streak", back_populates="user", uselist=False)

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    education_level = Column(String, default="B.Tech CSE")
    college = Column(String, default="Engineering Institute")
    degree = Column(String, default="Computer Science")
    year_of_study = Column(String, default="3rd Year")
    career_goal = Column(String, default="AI/ML Engineer")
    current_skill_level = Column(String, default="Beginner")
    daily_hours = Column(String, default="2 hours")
    learning_preferences = Column(String, default="Hands-on Projects & Step-by-Step AI Tutoring")
    onboarded = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="profile")

class UserSkill(Base):
    __tablename__ = "user_skills"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_name = Column(String, nullable=False)
    proficiency = Column(String, default="Beginner") # Beginner, Intermediate, Advanced

class LearningPath(Base):
    __tablename__ = "learning_paths"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    career_goal = Column(String, nullable=False)
    total_phases = Column(Integer, default=8)
    current_phase = Column(Integer, default=1)
    progress_percentage = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="learning_paths")
    phases = relationship("Phase", back_populates="learning_path", cascade="all, delete-orphan")

class Phase(Base):
    __tablename__ = "phases"
    
    id = Column(Integer, primary_key=True, index=True)
    learning_path_id = Column(Integer, ForeignKey("learning_paths.id"))
    order_index = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    estimated_hours = Column(Integer, default=10)
    difficulty = Column(String, default="Beginner")
    status = Column(String, default="not_started") # not_started, in_progress, completed
    
    learning_path = relationship("LearningPath", back_populates="phases")
    lessons = relationship("Lesson", back_populates="phase", cascade="all, delete-orphan")

class Lesson(Base):
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    phase_id = Column(Integer, ForeignKey("phases.id"))
    order_index = Column(Integer, default=1)
    title = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    content_markdown = Column(Text, nullable=False)
    code_snippet = Column(Text, nullable=True)
    estimated_minutes = Column(Integer, default=20)
    difficulty = Column(String, default="Beginner")
    
    phase = relationship("Phase", back_populates="lessons")

class LessonProgress(Base):
    __tablename__ = "lesson_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    is_completed = Column(Boolean, default=False)
    time_spent_minutes = Column(Integer, default=0)
    completed_at = Column(DateTime, nullable=True)

class Quiz(Base):
    __tablename__ = "quizzes"
    
    id = Column(Integer, primary_key=True, index=True)
    phase_id = Column(Integer, ForeignKey("phases.id"), nullable=True)
    title = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    difficulty = Column(String, default="Adaptive")
    total_questions = Column(Integer, default=5)
    
    questions = relationship("Question", back_populates="quiz", cascade="all, delete-orphan")

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    question_text = Column(Text, nullable=False)
    question_type = Column(String, default="mcq") # mcq, true_false, code, short
    options_json = Column(Text, nullable=True) # JSON string list
    correct_answer = Column(Text, nullable=False)
    explanation = Column(Text, nullable=False)
    
    quiz = relationship("Quiz", back_populates="questions")

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    score = Column(Integer, nullable=False)
    total_score = Column(Integer, nullable=False)
    accuracy_percentage = Column(Float, nullable=False)
    time_taken_seconds = Column(Integer, default=120)
    difficulty_level = Column(String, default="Medium")
    weak_topics_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="quiz_attempts")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    problem_statement = Column(Text, nullable=False)
    skills_json = Column(Text, nullable=False) # JSON list
    difficulty = Column(String, default="Beginner") # Beginner, Intermediate, Advanced
    duration_hours = Column(Integer, default=5)
    tech_stack_json = Column(Text, nullable=False) # JSON list
    learning_outcomes_json = Column(Text, nullable=False)
    steps_json = Column(Text, nullable=False)
    category = Column(String, default="AI/ML")

class ProjectSubmission(Base):
    __tablename__ = "project_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    project_id = Column(Integer, ForeignKey("projects.id"))
    repo_url = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String, default="Submitted") # Submitted, Under Review, Verified
    feedback = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)

class AIConversation(Base):
    __tablename__ = "ai_conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, default="New Conversation")
    active_agent = Column(String, default="tutor") # tutor, research, career, quiz, reminder, orchestrator
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    messages = relationship("AIMessage", back_populates="conversation", cascade="all, delete-orphan")

class AIMessage(Base):
    __tablename__ = "ai_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id"))
    sender = Column(String, nullable=False) # user, assistant
    agent_type = Column(String, default="tutor")
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    conversation = relationship("AIConversation", back_populates="messages")

class AIUpdate(Base):
    __tablename__ = "ai_updates"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, default="Research & Models")
    summary = Column(Text, nullable=False)
    why_it_matters = Column(Text, nullable=False)
    related_skills_json = Column(Text, nullable=False)
    paper_url = Column(String, nullable=True)
    source = Column(String, default="SkillPilot Research Desk")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    quiz_json = Column(Text, nullable=True)

class Streak(Base):
    __tablename__ = "streaks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    current_streak = Column(Integer, default=1)
    longest_streak = Column(Integer, default=1)
    xp_points = Column(Integer, default=150)
    level = Column(Integer, default=1)
    hours_learned = Column(Float, default=2.5)
    last_activity_date = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="streak")

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    icon = Column(String, default="trophy")
    unlocked_at = Column(DateTime, default=datetime.datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String, default="reminder") # streak, lesson, quiz, career
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class RAGDocument(Base):
    __tablename__ = "rag_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, default="General AI")
    content = Column(Text, nullable=False)
    source_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
