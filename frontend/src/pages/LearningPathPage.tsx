import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { LearningPath, Phase } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Play,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const LearningPathPage: React.FC = () => {
  const [path, setPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(2);
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    loadPath();
  }, []);

  const loadPath = async () => {
    try {
      const res = await api.getLearningPath();
      setPath(res);
    } catch (err) {
      console.error('Failed to load path:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      await api.generateRoadmap();
      await loadPath();
    } catch (err) {
      console.error('Recalculate error:', err);
    } finally {
      setRecalculating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading your 8-Phase AI Roadmap...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Target Goal: {path?.career_goal || 'AI/ML Engineer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Personalized <span className="text-gradient">AI Roadmap</span></h1>
          <p className="text-xs text-slate-600 max-w-lg">
            Structured across {path?.total_phases || 8} comprehensive phases from Python foundations to Generative AI & Interview Readiness.
          </p>
        </div>

        <button
          id="recalculate-roadmap-btn"
          onClick={handleRecalculate}
          disabled={recalculating}
          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-300 shadow-sm flex items-center gap-2 transition-all shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${recalculating ? 'animate-spin' : ''}`} />
          <span>{recalculating ? 'Recalculating...' : 'Recalculate Roadmap'}</span>
        </button>
      </div>

      {/* Progress Stats */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200 bg-white shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            {path?.progress_percentage || 28.5}%
          </div>
          <div>
            <div className="font-bold text-slate-900">Overall Learning Path Progress</div>
            <div className="text-slate-500">Current Phase: Phase {path?.current_phase || 2}</div>
          </div>
        </div>
        <div className="w-1/3 hidden sm:block bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div className="bg-purple-600 h-full" style={{ width: `${path?.progress_percentage || 28.5}%` }} />
        </div>
      </div>

      {/* 8-PHASE TIMELINE CARDS */}
      <div className="space-y-4">
        {path?.phases?.map((phase) => {
          const isExpanded = expandedPhaseId === phase.id;
          const isCompleted = phase.status === 'completed';
          const isInProgress = phase.status === 'in_progress';

          return (
            <div
              key={phase.id}
              className={`glass-card rounded-3xl border transition-all ${
                isInProgress
                  ? 'border-purple-300 bg-purple-50/40 shadow-md'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 bg-white opacity-90 shadow-sm'
              }`}
            >
              {/* Phase Header */}
              <div
                onClick={() => setExpandedPhaseId(isExpanded ? null : phase.id)}
                className="p-6 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : isInProgress
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-slate-100 text-slate-500 border border-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : phase.order_index}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{phase.title}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : isInProgress
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {phase.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <span className="hidden sm:inline-block text-slate-500 font-medium">{phase.estimated_hours} Hours</span>
                  <button className="p-2 text-slate-500 hover:text-slate-900">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Phase Lessons Drawer */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 space-y-3">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Lessons in this phase:</div>
                  {phase.lessons?.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.is_completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0" />
                        )}
                        <div>
                          <div className="font-semibold text-slate-900">{lesson.title}</div>
                          <div className="text-[10px] text-slate-500">Topic: {lesson.topic} • {lesson.estimated_minutes} min</div>
                        </div>
                      </div>

                      <Link
                        to={`/lesson/${lesson.id}`}
                        className="px-4 py-1.5 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{lesson.is_completed ? 'Review' : 'Start'}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
