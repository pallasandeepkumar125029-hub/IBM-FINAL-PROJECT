import React from 'react';
import { Check, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Democratized <span className="text-gradient">Pricing</span></h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm">
          Aligned with UN SDG 4 Quality Education — High quality AI mentorship accessible to every student.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Student Plan */}
        <div className="glass-card rounded-3xl p-8 border border-purple-200 bg-gradient-to-b from-purple-50/60 to-white space-y-6 shadow-md hover:shadow-lg transition-all relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Student Plan</span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">100% Free</span>
          </div>

          <div>
            <span className="text-4xl font-extrabold text-slate-900">$0</span>
            <span className="text-xs text-slate-500"> / forever</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Full access to personalized AI roadmaps, 5-agent AI tutoring, adaptive quizzes, project recommendations, and career coach.
          </p>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Personalized 8-Phase Learning Path</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Multi-Agent AI Orchestration</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Adaptive Quiz Engine</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Skill Gap Matrix & Mock Interviews</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> RAG Knowledge Base Retrieval</li>
          </ul>

          <Link to="/register" className="block text-center w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-purple-500/20">
            Get Started Free
          </Link>
        </div>

        {/* Institution / University Plan */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 bg-white space-y-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Institution & College</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">Custom</span>
          </div>

          <div>
            <span className="text-3xl font-extrabold text-slate-900">Institutional</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            For engineering colleges and universities adopting SkillPilot AI to track department-wide learning outcomes.
          </p>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Student Analytics & Cohort Tracking</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Custom Syllabus Integration</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Dedicated RAG Document Vault</li>
          </ul>

          <a href="mailto:education@skillpilot.ai" className="block text-center w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-300 transition-all">
            Contact University Desk
          </a>
        </div>
      </div>
    </div>
  );
};
