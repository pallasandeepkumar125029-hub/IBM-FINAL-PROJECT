import React from 'react';
import { Globe, Heart, Shield, BookOpen, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <Globe className="w-4 h-4 text-emerald-600" /> UN SDG 4 — Quality Education
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">About <span className="text-gradient">SkillPilot AI</span></h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          SkillPilot AI is an Agentic AI learning companion designed around UN SDG 4 — Quality Education.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 border border-slate-200 bg-white shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
        <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
        <p>
          Traditional Learning Management Systems (LMS) and generic AI chatbots fall short when teaching complex STEM topics. LMS platforms are static, while generic chatbots lack structured curriculum tracking, difficulty adaptation, and career alignment.
        </p>
        <p>
          SkillPilot AI bridges this gap by functioning as a 24/7 personal AI mentor that understands student context, guides them through hands-on coding, conducts adaptive assessments, and evaluates career readiness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <BookOpen className="w-6 h-6 text-purple-600 mx-auto" />
            <div className="font-bold text-slate-900 text-xs">Inclusive Access</div>
            <div className="text-[11px] text-slate-500">Quality AI learning for all engineering students worldwide.</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Award className="w-6 h-6 text-indigo-600 mx-auto" />
            <div className="font-bold text-slate-900 text-xs">Empathetic Tutoring</div>
            <div className="text-[11px] text-slate-500">Step-by-step guidance without giving away quick answers.</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Shield className="w-6 h-6 text-emerald-600 mx-auto" />
            <div className="font-bold text-slate-900 text-xs">Grounded RAG Knowledge</div>
            <div className="text-[11px] text-slate-500">Source-attributed research and verified AI documentation.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
