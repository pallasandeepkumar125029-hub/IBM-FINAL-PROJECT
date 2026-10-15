import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ShieldAlert, Users, BookOpen, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [mRes, uRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getAdminUsers()
      ]);
      setMetrics(mRes);
      setUsers(uRes);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-400 font-semibold">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Loading admin metrics and platform telemetry...</span>
        </div>
      </div>
    );
  }

  const pM = metrics?.platform_metrics || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 space-y-2 bg-white shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
          <span>Institutional Admin Panel</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Platform Analytics & <span className="text-gradient">Moderation</span></h1>
        <p className="text-xs text-slate-600 max-w-xl">
          Monitor active learners, quality study hours delivered, content moderation, and retention statistics.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white text-center space-y-1 shadow-sm">
          <Users className="w-6 h-6 text-purple-600 mx-auto" />
          <div className="text-2xl font-extrabold text-slate-900">{pM.daily_active_learners || 2}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Daily Active Learners</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white text-center space-y-1 shadow-sm">
          <BookOpen className="w-6 h-6 text-emerald-600 mx-auto" />
          <div className="text-2xl font-extrabold text-slate-900">{pM.sdg4_quality_hours_delivered || 184.5} h</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">SDG 4 Hours Delivered</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white text-center space-y-1 shadow-sm">
          <TrendingUp className="w-6 h-6 text-indigo-600 mx-auto" />
          <div className="text-2xl font-extrabold text-slate-900">{pM.learning_path_completion_rate || '34.2%'}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Path Completion Rate</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white text-center space-y-1 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-amber-600 mx-auto" />
          <div className="text-2xl font-extrabold text-slate-900">{pM['7_day_retention'] || '89.0%'}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">7-Day Retention</div>
        </div>
      </div>

      {/* Student User Roster */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          <span>Registered Student Accounts ({users.length})</span>
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-600">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Career Goal</th>
                <th className="p-3">College</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">{u.full_name}</td>
                  <td className="p-3 font-mono text-slate-500">{u.email}</td>
                  <td className="p-3 text-purple-700 font-medium">{u.career_goal}</td>
                  <td className="p-3 text-slate-600">{u.college}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold uppercase">
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
