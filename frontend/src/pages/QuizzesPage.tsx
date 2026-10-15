import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Quiz } from '../types';
import { Award, Sparkles, Clock, Play, CheckCircle2 } from 'lucide-react';

export const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await api.getQuizzes();
      setQuizzes(res);
    } catch (err) {
      console.error('Failed to load quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading adaptive quizzes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200 bg-white shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Auto Difficulty Scaling Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Adaptive <span className="text-gradient">AI Quizzes</span></h1>
        <p className="text-xs text-slate-600 max-w-xl">
          Test your subject knowledge. Scores over 85% scale up difficulty; scores below 60% trigger targeted review material.
        </p>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((q) => (
          <div key={q.id} className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-700 uppercase tracking-wider">{q.topic}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                  {q.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{q.title}</h3>
              <p className="text-xs text-slate-500">Total Questions: {q.total_questions} Questions • Dynamic Scoring</p>
            </div>

            <Link
              id={`start-quiz-${q.id}`}
              to={`/quiz/${q.id}`}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Take Quiz Challenge</span>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};
