import React, { useState } from 'react';
import { Bell, Shield, Smartphone, Globe, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [inAppNotif, setInAppNotif] = useState(true);
  const [streakNotif, setStreakNotif] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-2 bg-white shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Platform <span className="text-gradient">Settings</span></h1>
        <p className="text-xs text-slate-600">Manage notification preferences and AI Tutor interaction settings.</p>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 text-xs bg-white shadow-sm">
        <div className="space-y-4">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-600" /> Reminders & Notifications
          </h2>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-900">In-App Daily Study Nudges</div>
              <div className="text-[10px] text-slate-500">Receive gentle reminders when your 2-hour AI session is waiting.</div>
            </div>
            <input
              type="checkbox"
              checked={inAppNotif}
              onChange={(e) => setInAppNotif(e.target.checked)}
              className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-900">Streak Protection Alerts</div>
              <div className="text-[10px] text-slate-500">Get warned 2 hours before losing your 12-day learning streak.</div>
            </div>
            <input
              type="checkbox"
              checked={streakNotif}
              onChange={(e) => setStreakNotif(e.target.checked)}
              className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {saved && <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-4 h-4" /> Preferences Saved!</span>}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-purple-500/20"
          >
            Save Preferences
          </button>
        </div>
      </form>

    </div>
  );
};
