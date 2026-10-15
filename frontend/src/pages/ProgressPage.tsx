import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { DashboardData } from '../types';
import { TrendingUp, Flame, Zap, Award, BookOpen, Clock, Sparkles } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.getDashboardSummary();
      setData(res);
    } catch (err) {
      console.error('Failed to load progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading detailed analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-white shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
          <span>Student Analytics Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Learning <span className="text-gradient">Progress & Badges</span></h1>
        <p className="text-xs text-slate-600 max-w-xl">
          Detailed metrics tracking your study consistency, skill mastery, unlocked achievements, and SDG 4 quality study hours.
        </p>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm text-center space-y-1">
          <Flame className="w-6 h-6 text-amber-500 mx-auto fill-amber-500" />
          <div className="text-2xl font-extrabold text-slate-900">{data?.current_streak || 12} Days</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Current Streak</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm text-center space-y-1">
          <Zap className="w-6 h-6 text-purple-600 mx-auto fill-purple-200" />
          <div className="text-2xl font-extrabold text-slate-900">{data?.xp_points || 1450} XP</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total XP Earned</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm text-center space-y-1">
          <Clock className="w-6 h-6 text-emerald-600 mx-auto" />
          <div className="text-2xl font-extrabold text-slate-900">{data?.hours_learned || 18.5} hrs</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Quality Study Hours</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm text-center space-y-1">
          <BookOpen className="w-6 h-6 text-indigo-600 mx-auto" />
          <div className="text-2xl font-extrabold text-slate-900">{data?.completed_topics || 6} / {data?.total_topics || 20}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Lessons Mastered</div>
        </div>
      </div>

      {/* Achievements Unlocked */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span>Unlocked Badges & Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.achievements?.map((a) => (
            <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-900">{a.title}</div>
                <div className="text-slate-600">{a.description}</div>
                <div className="text-[10px] text-slate-400">Unlocked: {new Date(a.unlocked_at).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
