from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any, Dict
import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    education_level: Optional[str] = "B.Tech CSE"
    college: Optional[str] = "Engineering Institute"
    career_goal: Optional[str] = "AI/ML Engineer"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# Profile & Onboarding
class ProfileUpdate(BaseModel):
    education_level: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    year_of_study: Optional[str] = None
    career_goal: Optional[str] = None
    current_skill_level: Optional[str] = None
    daily_hours: Optional[str] = None
    learning_preferences: Optional[str] = None
    skills: Optional[List[Dict[str, str]]] = None # [{"skill_name": "Python", "proficiency": "Beginner"}]

class OnboardingSubmit(BaseModel):
    education_level: str
    college: str
    degree: str
    year_of_study: str
    career_goal: str
    current_skill_level: str
    daily_hours: str
    learning_preferences: str
    skills: List[Dict[str, str]]

# Learning Path & Lessons
class LessonSchema(BaseModel):
    id: int
    title: str
    topic: str
    content_markdown: str
    code_snippet: Optional[str] = None
    estimated_minutes: int
    difficulty: str
    is_completed: Optional[bool] = False

class PhaseSchema(BaseModel):
    id: int
    order_index: int
    title: str
    description: str
    estimated_hours: int
    difficulty: str
    status: str
    lessons: List[LessonSchema] = []

class LearningPathSchema(BaseModel):
    id: int
    title: str
    career_goal: str
    total_phases: int
    current_phase: int
    progress_percentage: float
    phases: List[PhaseSchema] = []

# AI Tutor & Orchestrator
class TutorQuery(BaseModel):
    conversation_id: Optional[int] = None
    message: str
    preferred_agent: Optional[str] = "auto" # auto, tutor, research, career, quiz, reminder

class TutorResponse(BaseModel):
    conversation_id: int
    sender: str = "assistant"
    agent_type: str
    agent_name: str
    message: str
    suggested_actions: Optional[List[str]] = []
    rag_sources: Optional[List[Dict[str, Any]]] = []

# Quizzes
class QuestionSchema(BaseModel):
    id: int
    question_text: str
    question_type: str
    options: Optional[List[str]] = []

class QuizSchema(BaseModel):
    id: int
    title: str
    topic: str
    difficulty: str
    total_questions: int
    questions: List[QuestionSchema] = []

class QuizSubmit(BaseModel):
    quiz_id: int
    user_answers: Dict[int, str] # question_id -> user answer
    time_taken_seconds: int

class QuizResultSchema(BaseModel):
    attempt_id: int
    score: int
    total_score: int
    accuracy_percentage: float
    difficulty_level: str
    passed: bool
    weak_topics: List[str]
    feedback_markdown: str
    xp_gained: int
    new_streak: int

# Projects
class ProjectSchema(BaseModel):
    id: int
    title: str
    problem_statement: str
    skills: List[str]
    difficulty: str
    duration_hours: int
    tech_stack: List[str]
    learning_outcomes: List[str]
    steps: List[str]
    category: str
    is_completed: Optional[bool] = False

class ProjectSubmitSchema(BaseModel):
    project_id: int
    repo_url: Optional[str] = ""
    notes: Optional[str] = ""

# Career Coach
class CareerAssessmentRequest(BaseModel):
    target_career: str

class SkillGapItem(BaseModel):
    skill: str
    status: str # "mastered", "in_progress", "missing"
    recommendation: str

class CareerAnalysisResponse(BaseModel):
    target_career: str
    readiness_percentage: float
    current_matches: List[str]
    missing_skills: List[SkillGapItem]
    recommended_certifications: List[str]
    recommended_projects: List[str]
    interview_topics: List[str]

# AI Updates
class AIUpdateSchema(BaseModel):
    id: int
    title: str
    category: str
    summary: str
    why_it_matters: str
    related_skills: List[str]
    paper_url: Optional[str] = None
    source: str
    timestamp: str
    quiz: Optional[Dict[str, Any]] = None

# Progress & Streak
class ProgressOverview(BaseModel):
    user_name: str
    career_goal: str
    level: int
    xp_points: int
    current_streak: int
    longest_streak: int
    hours_learned: float
    completed_topics: int
    total_topics: int
    progress_percentage: float
    next_lesson: Optional[Dict[str, Any]] = None
    recommended_project: Optional[Dict[str, Any]] = None
    recent_achievements: List[Dict[str, Any]] = []
    skill_breakdown: List[Dict[str, Any]] = []
