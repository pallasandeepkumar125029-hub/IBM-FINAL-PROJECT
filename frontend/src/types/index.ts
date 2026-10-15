export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  onboarded: boolean;
}

export interface Profile {
  education_level: string;
  college: string;
  degree: string;
  year_of_study: string;
  career_goal: string;
  current_skill_level: string;
  daily_hours: string;
  learning_preferences: string;
  onboarded: boolean;
  skills?: { skill_name: string; proficiency: string }[];
}

export interface Lesson {
  id: number;
  order_index?: number;
  title: string;
  topic: string;
  estimated_minutes: number;
  difficulty: string;
  is_completed: boolean;
  content_markdown?: string;
  code_snippet?: string;
}

export interface Phase {
  id: number;
  order_index: number;
  title: string;
  description: string;
  estimated_hours: number;
  difficulty: string;
  status: 'not_started' | 'in_progress' | 'completed';
  lessons: Lesson[];
}

export interface LearningPath {
  id: number;
  title: string;
  career_goal: string;
  total_phases: number;
  current_phase: number;
  progress_percentage: number;
  phases: Phase[];
}

export interface Question {
  id: number;
  question_text: string;
  question_type: string;
  options?: string[];
}

export interface Quiz {
  id: number;
  title: string;
  topic: string;
  difficulty: string;
  total_questions: number;
  questions?: Question[];
}

export interface Project {
  id: number;
  title: string;
  problem_statement: string;
  skills: string[];
  difficulty: string;
  duration_hours: number;
  tech_stack: string[];
  learning_outcomes: string[];
  steps: string[];
  category: string;
  is_completed: boolean;
  submission?: {
    repo_url: string;
    notes: string;
    status: string;
    feedback: string;
  };
}

export interface AIUpdate {
  id: number;
  title: string;
  category: string;
  summary: string;
  why_it_matters: string;
  related_skills: string[];
  paper_url?: string;
  source: string;
  timestamp: string;
  quiz?: {
    question: string;
    options: string[];
    correct: string;
  };
}

export interface DashboardData {
  user_name: string;
  email: string;
  career_goal: string;
  current_skill_level: string;
  daily_hours: string;
  level: number;
  xp_points: number;
  current_streak: number;
  longest_streak: number;
  hours_learned: number;
  completed_topics: number;
  total_topics: number;
  progress_percentage: number;
  current_phase_index: number;
  next_lesson?: {
    id: number;
    title: string;
    topic: string;
    estimated_minutes: number;
  };
  recommended_project?: {
    id: number;
    title: string;
    difficulty: string;
    duration_hours: number;
  };
  achievements: {
    id: number;
    title: string;
    description: string;
    icon: string;
    unlocked_at: string;
  }[];
  notifications: {
    id: number;
    title: string;
    message: string;
    notification_type: string;
    created_at: string;
  }[];
  skill_breakdown: { skill: string; mastery: number }[];
}

export interface AIMessage {
  id?: number;
  sender: 'user' | 'assistant';
  agent_type: string;
  agent_name?: string;
  message: string;
  timestamp?: string;
  suggested_actions?: string[];
  rag_sources?: { title: string; content: string; source_url: string }[];
}
