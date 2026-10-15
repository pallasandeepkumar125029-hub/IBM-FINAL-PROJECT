import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { DashboardData } from '../types';
import {
  Sparkles,
  Flame,
  Zap,
  BookOpen,
  MessageSquare,
  Award,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  Play,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.getDashboardSummary();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading your personalized AI learning hub...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. WELCOME BANNER WITH STUDENT PERSONA */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-gradient-to-r from-purple-50 via-white to-indigo-50/50 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Target Role: {data?.career_goal || 'AI/ML Engineer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome back, <span className="text-gradient">{user?.full_name || 'Alex Kumar'}</span>! 👋
            </h1>
            <p className="text-xs text-slate-600 max-w-xl">
              Your AI Mentor has prepared your daily study goal. You are currently on Phase {data?.current_phase_index || 2}: Mathematics & Statistics for AI.
            </p>
          </div>

          {/* Gamification Stats Pills */}
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-between sm:justify-start">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-amber-700 font-extrabold text-lg">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" /> {data?.current_streak || 12}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Day Streak</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-purple-700 font-extrabold text-lg">
                <Zap className="w-5 h-5 fill-purple-200 text-purple-600" /> {data?.xp_points || 1450}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">XP Earned</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-emerald-700 font-extrabold text-lg">
                <Target className="w-5 h-5 text-emerald-600" /> Lvl {data?.level || 4}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S GOAL & NEXT LESSON BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">Today's AI Learning Goal (2 Hours)</h2>
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              {data?.progress_percentage || 28.5}% Path Complete
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 h-full transition-all duration-500"
              style={{ width: `${data?.progress_percentage || 28.5}%` }}
            />
          </div>

          {/* Recommended Next Lesson Box */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">Up Next in Phase 2</span>
              <h3 className="text-sm font-bold text-slate-900">{data?.next_lesson?.title || 'Vectors, Matrices & Dot Products'}</h3>
              <p className="text-xs text-slate-600">Topic: {data?.next_lesson?.topic || 'Linear Algebra'}</p>
            </div>
            
            <Link
              id="dashboard-start-next-lesson-btn"
              to={`/lesson/${data?.next_lesson?.id || 4}`}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-all shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Lesson ({data?.next_lesson?.estimated_minutes || 25} min)</span>
            </Link>
          </div>
        </div>

        {/* Recommended Project Box */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-sm bg-white space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">Recommended Project</h2>
            </div>
            <p className="text-xs text-slate-600">Build this capstone project to master Phase 2 prerequisites.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{data?.recommended_project?.title || 'AI Student Chatbot'}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {data?.recommended_project?.difficulty || 'Beginner'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">Estimated Duration: {data?.recommended_project?.duration_hours || 6} Hours</div>
          </div>

          <Link
            id="dashboard-view-projects-btn"
            to="/projects"
            className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-300 shadow-sm transition-all"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* 3. QUICK ACTIONS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link
          id="dash-action-tutor"
          to="/tutor"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-200 flex items-center gap-4 bg-white"
        >
          <div className="p-3.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">Ask AI Tutor</div>
            <div className="text-xs text-slate-500">Multi-Agent Doubt Clearing</div>
          </div>
        </Link>

        <Link
          id="dash-action-path"
          to="/learning-path"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-200 flex items-center gap-4 bg-white"
        >
          <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">My Roadmap</div>
            <div className="text-xs text-slate-500">8-Phase Timeline</div>
          </div>
        </Link>

        <Link
          id="dash-action-quiz"
          to="/quizzes"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-200 flex items-center gap-4 bg-white"
        >
          <div className="p-3.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">Adaptive Quizzes</div>
            <div className="text-xs text-slate-500">Auto Difficulty Scaling</div>
          </div>
        </Link>

        <Link
          id="dash-action-career"
          to="/career"
          className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-200 flex items-center gap-4 bg-white"
        >
          <div className="p-3.5 rounded-xl bg-pink-50 text-pink-700 border border-pink-200">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">Career Coach</div>
            <div className="text-xs text-slate-500">Skill Gap & Mock Interview</div>
          </div>
        </Link>

      </div>

      {/* 4. SKILL MASTERY & ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Skill Mastery */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200 shadow-sm bg-white space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span>Skill Mastery Matrix</span>
          </h2>

          <div className="space-y-3 pt-2">
            {data?.skill_breakdown?.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium text-slate-700">
                  <span>{item.skill}</span>
                  <span className="text-purple-700 font-bold">{item.mastery}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full transition-all duration-500"
                    style={{ width: `${item.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocked Badges */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-sm bg-white space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Unlocked Badges ({data?.achievements?.length || 4})</span>
          </h2>

          <div className="space-y-3 pt-2">
            {data?.achievements?.map((ach) => (
              <div key={ach.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{ach.title}</div>
                  <div className="text-[10px] text-slate-500">{ach.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
