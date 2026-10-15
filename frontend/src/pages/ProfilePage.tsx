import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, GraduationCap, Target, Clock, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 bg-white shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
          {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'A'}
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-slate-900">{user?.full_name || 'Alex Kumar'}</h1>
          <p className="text-xs text-slate-500">{user?.email || 'alex@skillpilot.ai'}</p>
          <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start text-[11px]">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-semibold">
              Role: {user?.role || 'student'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold">
              Onboarded Status: Active
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-600" />
          <span>Academic Profile & Preferences</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-slate-500">Education Program</div>
            <div className="font-bold text-slate-900">{profile?.education_level || 'B.Tech CSE'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-slate-500">College / Institute</div>
            <div className="font-bold text-slate-900">{profile?.college || 'National Institute of Technology'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-slate-500">Target Career Goal</div>
            <div className="font-bold text-purple-700">{profile?.career_goal || 'AI/ML Engineer'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-slate-500">Daily Availability</div>
            <div className="font-bold text-amber-700">{profile?.daily_hours || '2 hours'}</div>
          </div>
        </div>
      </div>

    </div>
  );
};
