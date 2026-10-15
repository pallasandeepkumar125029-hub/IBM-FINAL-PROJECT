import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Heart, Shield, BookOpen, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/90 pt-16 pb-12 mt-20 text-slate-600 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900">SkillPilot <span className="text-gradient">AI</span></span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your Personal AI Learning Companion that Learns, Teaches, Motivates, and Evolves Every Day. Built around United Nations Sustainable Development Goal 4.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
              <Globe className="w-4 h-4 text-emerald-600" /> UN SDG 4 — Quality Education
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform Features</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/learning-path" className="hover:text-purple-600 transition-colors">Personalized AI Roadmaps</Link></li>
              <li><Link to="/tutor" className="hover:text-purple-600 transition-colors">Multi-Agent AI Tutor</Link></li>
              <li><Link to="/quizzes" className="hover:text-purple-600 transition-colors">Adaptive Quizzes</Link></li>
              <li><Link to="/projects" className="hover:text-purple-600 transition-colors">Hands-on AI Projects</Link></li>
              <li><Link to="/career" className="hover:text-purple-600 transition-colors">AI Career Coach</Link></li>
            </ul>
          </div>

          {/* SDG Alignment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">SDG 4 Commitments</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-purple-600" /> Inclusive & Equitable Education</li>
              <li className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-indigo-600" /> Free Lifelong Learning Access</li>
              <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified AI Research Desk</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">SkillPilot AI Mission</h4>
            <p className="text-xs leading-relaxed text-slate-600">
              Transforming traditional engineering education into an adaptive, personalized mentor experience for every student worldwide.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              © {new Date().getFullYear()} SkillPilot AI. Built for Quality Education.
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for AI Engineering Students worldwide.
          </p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-700">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-700">Terms of Service</a>
            <a href="#sdg" className="hover:text-slate-700">SDG 4 Report</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
